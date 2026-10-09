import crypto from 'node:crypto';
import { analyzeSeo, computeSeoScore } from '../../../../utils/seo-scoring'; // ★ ADDED

const RESOURCE_PAGE_DOCUMENT_PATH_REGEX =
  /^\/content-manager\/collection-types\/api::resource-page\.resource-page\/([^/?#]+)\/?$/;
const PAGE_BUILDER_HASH_ACF_KEY = '_pageBuilderHash';
const OMITTED_HASH_KEYS = new Set([
  'id',
  'documentId',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'createdBy',
  'updatedBy',
  '__pivot',
  '__temp_key',
  'locale',
  'localizations',
]);

type ResourcePageEntry = Record<string, unknown>;
type DynamicZoneComponent = Record<string, unknown> & { __component?: unknown };

function resourcePageSupportsAcf() {
  return Boolean(strapi.contentType('api::resource-page.resource-page')?.attributes?.acf);
}

function isPlainObject(value: unknown): value is ResourcePageEntry {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function tryParseJsonObject(value: unknown) {
  if (isPlainObject(value)) {
    return value;
  }

  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    return isPlainObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function normalizeValueForHash(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeValueForHash(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const normalizedEntries = Object.entries(value)
    .filter(([key, entryValue]) => !OMITTED_HASH_KEYS.has(key) && entryValue !== undefined)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, entryValue]) => [key, normalizeValueForHash(entryValue)]);

  return Object.fromEntries(normalizedEntries);
}

function computePageBuilderHash(pageBuilder: unknown) {
  const normalized = normalizeValueForHash(pageBuilder);
  return crypto
    .createHash('sha1')
    .update(JSON.stringify(normalized))
    .digest('hex');
}

function getRequestDocumentId() {
  const requestPath = strapi.requestContext.get()?.request?.path;
  if (typeof requestPath !== 'string') {
    return null;
  }

  return requestPath.match(RESOURCE_PAGE_DOCUMENT_PATH_REGEX)?.[1] || null;
}

function mergeAcfWithPageBuilderHash(existingAcf: unknown, nextAcf: unknown, hash: string) {
  return {
    ...(tryParseJsonObject(existingAcf) ?? {}),
    ...(tryParseJsonObject(nextAcf) ?? {}),
    [PAGE_BUILDER_HASH_ACF_KEY]: hash,
  };
}

async function getCurrentResourcePageState(documentId: string | null) {
  if (!resourcePageSupportsAcf()) {
    return null;
  }

  if (!documentId) {
    return null;
  }

  const resourcePageRow = await strapi.db
    .connection('resource_pages')
    .select(['id', 'document_id', 'acf'])
    .where('document_id', documentId)
    .first();

  if (!resourcePageRow) {
    return null;
  }

  const acf = tryParseJsonObject(resourcePageRow.acf) ?? {};

  return {
    id: resourcePageRow.id,
    documentId: resourcePageRow.document_id,
    acf,
    pageBuilderHash:
      typeof acf[PAGE_BUILDER_HASH_ACF_KEY] === 'string'
        ? acf[PAGE_BUILDER_HASH_ACF_KEY]
        : null,
  };
}

async function optimizeUnchangedPageBuilderUpdate(entry: ResourcePageEntry) {
  if (!Object.prototype.hasOwnProperty.call(entry, 'pageBuilder')) {
    return;
  }

  const incomingPageBuilder = entry.pageBuilder;
  if (!Array.isArray(incomingPageBuilder)) {
    return;
  }

  const documentId = getRequestDocumentId();
  const currentResourcePageState = await getCurrentResourcePageState(documentId);
  const incomingHash = computePageBuilderHash(incomingPageBuilder);

  if (!resourcePageSupportsAcf()) {
    return;
  }

  if (
    currentResourcePageState?.pageBuilderHash &&
    currentResourcePageState.pageBuilderHash === incomingHash
  ) {
    delete entry.pageBuilder;

    if (Object.prototype.hasOwnProperty.call(entry, 'acf')) {
      entry.acf = mergeAcfWithPageBuilderHash(
        currentResourcePageState.acf,
        entry.acf,
        incomingHash
      );
    }

    strapi.log.info(
      `[resource-page-save-skip-builder] documentId=${documentId} reason=unchanged-pageBuilder`
    );
    return;
  }

  entry.acf = mergeAcfWithPageBuilderHash(currentResourcePageState?.acf, entry.acf, incomingHash);
}

function parseJsonArray(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function normalizeSelectPostTypeValue(value: unknown) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'number') {
    return [String(value)];
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    if (trimmed.startsWith('[')) {
      const parsedArray = parseJsonArray(trimmed);

      if (parsedArray) {
        return parsedArray;
      }
    }

    return [trimmed];
  }

  if (isPlainObject(value)) {
    const id = value.id;

    if (typeof id === 'number' || typeof id === 'string') {
      return [String(id)];
    }
  }

  return undefined;
}

function normalizeObjectSelectPostType(entry: ResourcePageEntry) {
  if (!Object.prototype.hasOwnProperty.call(entry, 'select_post_type')) {
    return;
  }

  const normalizedValue = normalizeSelectPostTypeValue(entry.select_post_type);

  if (normalizedValue === undefined) {
    delete entry.select_post_type;
    return;
  }

  entry.select_post_type = normalizedValue;
}

function normalizeSelectPostTypeDeep(value: unknown) {
  if (Array.isArray(value)) {
    value.forEach((item) => normalizeSelectPostTypeDeep(item));
    return;
  }

  if (!isPlainObject(value)) {
    return;
  }

  normalizeObjectSelectPostType(value);

  Object.values(value).forEach((item) => normalizeSelectPostTypeDeep(item));
}

function normalizeDynamicZones(entry: ResourcePageEntry) {
  normalizeSelectPostTypeDeep(entry);
}

// ★ ADDED — computes seoScore + seoAnalysis and merges both into the
// seo component without touching any other seo sub-fields.
function applySeoScore(entry: ResourcePageEntry) {
  const analysis = analyzeSeo({
    title: entry.title as string | undefined,
    slug: entry.slug as string | undefined,
    seo: entry.seo as any,
  });

  const score = computeSeoScore(analysis);

  entry.seo = {
    ...((entry.seo as Record<string, unknown>) ?? {}),
    seoScore: score,
    seoAnalysis: analysis,
  };
}

export default {
  beforeCreate(event: { params?: { data?: unknown } }) {
    if (isPlainObject(event.params?.data)) {
      normalizeDynamicZones(event.params.data);
      applySeoScore(event.params.data); // ★ ADDED

      if (resourcePageSupportsAcf() && Array.isArray(event.params.data.pageBuilder)) {
        event.params.data.acf = mergeAcfWithPageBuilderHash(
          event.params.data.acf,
          event.params.data.acf,
          computePageBuilderHash(event.params.data.pageBuilder)
        );
      }
    }
  },

  async beforeUpdate(event: { params?: { data?: unknown } }) {
    if (isPlainObject(event.params?.data)) {
      normalizeDynamicZones(event.params.data);
      applySeoScore(event.params.data); // ★ ADDED
      await optimizeUnchangedPageBuilderUpdate(event.params.data);
    }
  },
};
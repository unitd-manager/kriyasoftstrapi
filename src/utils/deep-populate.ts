/**
 * Recursively builds a Strapi populate object for a dynamic zone (or any
 * component) by reading component schemas at runtime, so nested
 * components/repeatables are always populated without hand-listing every
 * component and field.
 */
const MAX_DEPTH = 5;

function buildComponentPopulate(componentUid: string, depth: number): unknown {
  if (depth <= 0) return true;

  const schema = strapi.components[componentUid];
  if (!schema) return true;

  const populate: Record<string, unknown> = {};

  for (const [key, attr] of Object.entries(schema.attributes) as [string, any][]) {
    if (attr.type === 'component') {
      populate[key] = { populate: buildComponentPopulate(attr.component, depth - 1) };
    } else if (attr.type === 'dynamiczone') {
      populate[key] = { on: buildDynamicZonePopulate(attr.components, depth - 1) };
    } else if (attr.type === 'media') {
      populate[key] = true;
    } else if (attr.type === 'relation') {
      populate[key] = true;
    }
  }

  return populate;
}

export function buildDynamicZonePopulate(
  componentUids: string[],
  depth = MAX_DEPTH
): Record<string, { populate: unknown }> {
  const on: Record<string, { populate: unknown }> = {};
  for (const uid of componentUids) {
    on[uid] = { populate: buildComponentPopulate(uid, depth) };
  }
  return on;
}
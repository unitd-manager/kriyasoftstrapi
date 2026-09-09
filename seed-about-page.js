const mysql = require('mysql2/promise');
const crypto = require('crypto');

(async () => {
  const conn = await mysql.createConnection({
    host: '66.29.154.85',
    port: 3307,
    user: 'root',
    password: 'd524acb933a468',
    database: 'kriyasoftadmin',
    charset: 'utf8mb4',
  });

  try {
    const [existingPages] = await conn.query('SELECT id FROM pages WHERE slug = ?', ['about']);
    let pageId = existingPages.length ? existingPages[0].id : null;

    if (!pageId) {
      const page = {
        document_id: crypto.randomUUID(),
        title: 'About',
        slug: 'about',
        page_type: 'landing',
        locale: 'en',
        acf: { _pageBuilderHash: 'about-seed' },
      };

      const [insert] = await conn.query(
        'INSERT INTO pages (document_id, title, slug, page_type, acf, created_at, updated_at, published_at, locale) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW(), ?)',
        [page.document_id, page.title, page.slug, page.page_type, JSON.stringify(page.acf), page.locale]
      );

      pageId = insert.insertId;
    }

    const storyId = 8;
    const statsId = 6;
    const iconGridId = 3;
    const diffSectionId = 3;

    await conn.query(
      'UPDATE components_acf_sections_qubi_story_sections SET eyebrow = ?, main_title = ?, title_line1 = ?, title_highlight = ?, title_line2 = ?, description = ?, button_label = ?, button_url = ?, publish = 1 WHERE id = ?',
      [
        'About Kriyasoft',
        'A technology partner for Healthcare, AI, and Finance',
        'A technology partner for',
        'Healthcare, AI,',
        'and Finance',
        'Kriyasoft is a technology services firm specializing in enterprise solutions for three primary sectors: Healthcare, AI, and Finance. With 10+ years of industry experience, our team of architects, engineers, and domain specialists delivers secure, scalable, and compliant solutions that drive measurable business value.',
        'Talk to Our Experts',
        '/contact',
        storyId,
      ]
    );

    await conn.query(
      'UPDATE components_acf_sections_qubi_icon_grid_sections SET eyebrow = ?, main_title = ?, description = ?, publish = 1 WHERE id = ?',
      [
        'What We Focus On',
        'Three sectors. One standard of care.',
        'We help healthcare, AI, and finance teams transform operations with secure and scalable digital platforms.',
        iconGridId,
      ]
    );

    await conn.query(
      'UPDATE components_acf_sections_qubi_differentiators_sections SET eyebrow = ?, main_title = ?, publish = 1 WHERE id = ?',
      [
        'Our Team',
        'Architects, engineers, and domain specialists.',
        diffSectionId,
      ]
    );

    await conn.query('DELETE FROM components_acf_sections_qubi_stats_sections_cmps WHERE entity_id = ? AND field = ?', [statsId, 'stats']);
    await conn.query('DELETE FROM components_acf_sections_qubi_icon_grid_sections_cmps WHERE entity_id = ? AND field = ?', [iconGridId, 'items']);
    await conn.query('DELETE FROM components_acf_sections_qubi_differentiators_78722_cmps WHERE entity_id = ? AND field = ?', [diffSectionId, 'items']);

    await conn.query('DELETE FROM pages_cmps WHERE entity_id = ? AND field = ?', [pageId, 'pageBuilder']);

    const statRows = [
      ['10+', 'Years Experience'],
      ['Architects', 'Systems Design'],
      ['Engineers', 'AI & Platform'],
      ['Domain Specialists', 'Healthcare & Finance'],
    ];
    const statItemIds = [];
    for (const [value, label] of statRows) {
      const [res] = await conn.query(
        'INSERT INTO components_acf_shared_qubi_stat_items (value, label, publish) VALUES (?, ?, 1)',
        [value, label]
      );
      statItemIds.push(res.insertId);
    }

    const iconRows = [
      ['HeartPulse', 'Healthcare', 'EHR integration, HIPAA-compliant architecture, patient data platforms, and telemedicine.', 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80'],
      ['Cpu', 'AI', 'Custom ML models, predictive analytics, intelligent automation, and NLP/computer vision.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'],
      ['Landmark', 'Finance', 'Payment systems, AML/KYC compliance, transaction settlement, and blockchain solutions.', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80'],
    ];
    const iconItemIds = [];
    for (const [icon, title, description, imageUrl] of iconRows) {
      const [res] = await conn.query(
        'INSERT INTO components_acf_shared_qubi_icon_card_items (icon, title, description, image_url, publish) VALUES (?, ?, ?, ?, 1)',
        [icon, title, description, imageUrl]
      );
      iconItemIds.push(res.insertId);
    }

    const diffRows = [
      ['Architects', 'Systems Design'],
      ['Engineers', 'AI & Platform'],
      ['Domain Specialists', 'Healthcare & Finance'],
    ];
    const diffItemIds = [];
    for (const [title, description] of diffRows) {
      const [res] = await conn.query(
        'INSERT INTO components_acf_shared_qubi_differentiator_items (title, description, publish) VALUES (?, ?, 1)',
        [title, description]
      );
      diffItemIds.push(res.insertId);
    }

    for (let i = 0; i < statItemIds.length; i++) {
      await conn.query(
        'INSERT INTO components_acf_sections_qubi_stats_sections_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [statsId, statItemIds[i], 'acf-shared.qubi-stat-item', 'stats', i]
      );
    }

    for (let i = 0; i < iconItemIds.length; i++) {
      await conn.query(
        'INSERT INTO components_acf_sections_qubi_icon_grid_sections_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [iconGridId, iconItemIds[i], 'acf-shared.qubi-icon-card-item', 'items', i]
      );
    }

    for (let i = 0; i < diffItemIds.length; i++) {
      await conn.query(
        'INSERT INTO components_acf_sections_qubi_differentiators_78722_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [diffSectionId, diffItemIds[i], 'acf-shared.qubi-differentiator-item', 'items', i]
      );
    }

    await conn.query(
      'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [pageId, storyId, 'acf-sections.qubi-story-section', 'pageBuilder', 1]
    );
    await conn.query(
      'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [pageId, statsId, 'acf-sections.qubi-stats-section', 'pageBuilder', 2]
    );
    await conn.query(
      'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [pageId, iconGridId, 'acf-sections.qubi-icon-grid-section', 'pageBuilder', 3]
    );
    await conn.query(
      'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [pageId, diffSectionId, 'acf-sections.qubi-differentiators-section', 'pageBuilder', 4]
    );

    console.log('about seed ok', JSON.stringify({ pageId, storyId, statsId, iconGridId, diffSectionId, statItemIds, iconItemIds, diffItemIds }));
  } finally {
    await conn.end();
  }
})();

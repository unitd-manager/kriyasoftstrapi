const mysql = require('mysql2/promise');

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
    const [pageRows] = await conn.query('SELECT id FROM pages WHERE slug = ? LIMIT 1', ['home']);
    if (!pageRows.length) {
      throw new Error('Home page row not found in pages table.');
    }

    const pageId = pageRows[0].id;

    const homeServicesSectionId = 3;
    const tickerSectionId = 3;

    await conn.query(
      'UPDATE components_acf_sections_qubi_home_services SET eyebrow = ?, title_line_1 = ?, title_highlight = ? WHERE id = ?',
      ['What We Do', 'One Platform.', 'Every Critical Industry.', homeServicesSectionId]
    );

    await conn.query('DELETE FROM components_acf_sections_qubi_home_services_cmps WHERE entity_id = ?', [homeServicesSectionId]);
    await conn.query('DELETE FROM components_acf_sections_qubi_client_tickers_cmps WHERE entity_id = ?', [tickerSectionId]);

    const itemRows = [
      {
        icon: 'Stethoscope',
        title: 'Healthcare Tech Solutions',
        description: 'EHR (Electronic Health Record) integration and modernization, HIPAA-compliant system architecture and data management, patient data integration platforms, telemedicine and telehealth platform development, healthcare analytics and business intelligence.',
        url: '/services/healthcare',
      },
      {
        icon: 'Cpu',
        title: 'AI & Machine Learning',
        description: 'Custom AI/ML model development and deployment, predictive analytics for business intelligence, intelligent automation solutions, natural language processing (NLP) implementations, computer vision applications.',
        url: '/services/ai',
      },
      {
        icon: 'Landmark',
        title: 'Finance & FinTech',
        description: 'Payment systems and processing platforms, regulatory compliance solutions (AML, KYC), transaction processing and settlement systems, blockchain and cryptocurrency solutions, financial data analytics and reporting.',
        url: '/services/finance',
      },
    ];

    const serviceItemIds = [];
    for (const item of itemRows) {
      const [res] = await conn.query(
        'INSERT INTO components_acf_shared_qubi_home_services_items (icon, title, description, url, publish) VALUES (?, ?, ?, ?, 1)',
        [item.icon, item.title, item.description, item.url]
      );
      serviceItemIds.push(res.insertId);
    }

    const tickerItems = [
      'Healthcare',
      'Artificial Intelligence',
      'Financial Services',
      'Cloud Technologies',
      'Enterprise Software',
      'Digital Transformation',
    ];

    const tickerItemIds = [];
    for (const name of tickerItems) {
      const [res] = await conn.query(
        'INSERT INTO components_acf_shared_qubi_client_ticker_items (name, logo, publish) VALUES (?, ?, 1)',
        [name, name]
      );
      tickerItemIds.push(res.insertId);
    }

    for (let i = 0; i < serviceItemIds.length; i++) {
      await conn.query(
        'INSERT INTO components_acf_sections_qubi_home_services_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [homeServicesSectionId, serviceItemIds[i], 'acf-shared.qubi-home-services-item', 'items', i + 1]
      );
    }

    for (let i = 0; i < tickerItemIds.length; i++) {
      await conn.query(
        'INSERT INTO components_acf_sections_qubi_client_tickers_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [tickerSectionId, tickerItemIds[i], 'acf-shared.qubi-client-ticker-item', 'items', i + 1]
      );
    }

    await conn.query('DELETE FROM pages_cmps WHERE entity_id = ? AND field = ?', [pageId, 'pageBuilder']);

    const homeHeroCmpId = 14;
    const clientTickerCmpId = tickerSectionId;
    const homeServicesCmpId = homeServicesSectionId;
    const capabilitiesCmpId = 14;
    const processCmpId = 14;
    const caseStudiesCmpId = 17;
    const ctaCmpId = 20;

    const pageBuilder = [
      { cmpId: homeHeroCmpId, type: 'acf-sections.qubi-home-hero', order: 1 },
      { cmpId: clientTickerCmpId, type: 'acf-sections.qubi-client-ticker', order: 2 },
      { cmpId: homeServicesCmpId, type: 'acf-sections.qubi-home-services', order: 3 },
      { cmpId: capabilitiesCmpId, type: 'acf-sections.qubi-capabilities-section', order: 4 },
      { cmpId: processCmpId, type: 'acf-sections.qubi-how-it-works-section', order: 5 },
      { cmpId: caseStudiesCmpId, type: 'acf-sections.qubi-case-studies-section', order: 6 },
      { cmpId: ctaCmpId, type: 'acf-sections.qubi-final-cta-section', order: 7 },
    ];

    for (const row of pageBuilder) {
      await conn.query(
        'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [pageId, row.cmpId, row.type, 'pageBuilder', row.order]
      );
    }

    console.log('home panel seed ok', JSON.stringify({ pageId, serviceItemIds, tickerItemIds }));
  } catch (e) {
    console.log(e.message);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
})();

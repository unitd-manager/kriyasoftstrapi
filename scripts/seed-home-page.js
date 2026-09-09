const { createStrapi } = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

const FRONTEND_ASSETS = 'C:/Users/USER/kriyasofotllp/src/assets';

async function uploadImage(strapi, filename) {
  const filepath = path.join(FRONTEND_ASSETS, filename);
  const [file] = await strapi.plugin('upload').service('upload').upload({
    data: { fileInfo: { name: filename } },
    files: {
      filepath,
      originalFilename: filename,
      mimetype: filename.endsWith('.avif') ? 'image/avif' : 'image/webp',
      size: fs.statSync(filepath).size,
    },
  });
  return { id: file.id, url: file.url };
}

const homepage = {
  pageBuilder: [
    {
      __component: 'acf-sections.qubi-home-hero',
      badge_text: 'Healthcare | AI | Finance',
      main_title: 'Creating Intelligent Solutions for a Digital World',
      description: 'Kriyasoft delivers enterprise software, AI-powered automation, cloud solutions, and digital transformation services for Healthcare, Financial Services, and AI-driven businesses. We build secure, scalable, and compliant technology that helps organizations innovate with confidence.',
      button: { label: 'Talk to Our Experts', url: '/contact' },
      experience_years: '10',
      experience_suffix: 'Years of Excellence',
      experience_description: 'Experienced team of architects, engineers and domain specialists',
      snapshot_label: 'Live Service Snapshot',
      snapshot_items: [
        { icon: 'Activity', label: 'Healthcare', status: 'HIPAA Compliant', color: 'text-sky-400' },
        { icon: 'BrainCircuit', label: 'AI & Machine Learning', status: 'Predictions Live', color: 'text-teal-400' },
        { icon: 'ShieldCheck', label: 'Finance & Fintech', status: 'AML/KYC Verified', color: 'text-blue-400' },
      ],
      snapshot_footer: 'Trusted across healthcare, finance and AI',
      badge: 'HIPAA | AML | KYC Ready',
    },
    {
      __component: 'acf-sections.qubi-client-ticker',
      items: [
        'Healthcare',
        'Artificial Intelligence',
        'Financial Services',
        'Cloud Technologies',
        'Enterprise Software',
        'Digital Transformation',
      ],
    },
    {
      __component: 'acf-sections.qubi-home-services',
      eyebrow: 'What We Do',
      title_line1: 'One Platform.',
      title_highlight: 'Every Critical Industry.',
      items: [
        {
          icon: 'Stethoscope',
          title: 'Healthcare Tech Solutions',
          points: [
            'EHR (Electronic Health Record) integration and modernization',
            'HIPAA-compliant system architecture and data management',
            'Patient data integration platforms',
            'Telemedicine and telehealth platform development',
            'Healthcare analytics and business intelligence',
          ],
          tags: ['EHR/HL7', 'HIPAA', 'Telehealth'],
        },
        {
          icon: 'Cpu',
          title: 'AI & Machine Learning',
          points: [
            'Custom AI/ML model development and deployment',
            'Predictive analytics for business intelligence',
            'Intelligent automation solutions',
            'Natural language processing (NLP) implementations',
            'Computer vision applications',
          ],
          tags: ['Predictive AI', 'NLP', 'Automation'],
        },
        {
          icon: 'Landmark',
          title: 'Finance & FinTech',
          points: [
            'Payment systems and processing platforms',
            'Regulatory compliance solutions (AML, KYC)',
            'Transaction processing and settlement systems',
            'Blockchain and cryptocurrency solutions',
            'Financial data analytics and reporting',
          ],
          tags: ['Payments', 'AML/KYC', 'Blockchain'],
        },
      ],
    },
    {
      __component: 'acf-sections.qubi-capabilities-section',
      eyebrow: 'Full-Spectrum Engineering',
      main_title: 'Technology Capabilities',
      capability_items: [
        {
          icon: 'Workflow',
          title: 'Full-Stack Custom Development',
          description: 'End-to-end product engineering across web, mobile, and cloud using modern frameworks that scale with your business.',
        },
        {
          icon: 'LineChart',
          title: 'System Integration & Modernization',
          description: 'Connect enterprise systems and modernize legacy platforms while maintaining business continuity.',
        },
        {
          icon: 'Cpu',
          title: 'Cloud Architecture & DevOps',
          description: 'Scalable cloud infrastructure, CI/CD pipelines and automated deployments for modern applications.',
        },
        {
          icon: 'Shield',
          title: 'Cybersecurity & Data Protection',
          description: 'Enterprise-grade cybersecurity, compliance and advanced protection for mission-critical applications.',
        },
      ],
    },
    {
      __component: 'acf-sections.qubi-how-it-works-section',
      eyebrow: 'How We Work',
      main_title: 'A disciplined process. Measurable outcomes.',
      steps: [
        {
          icon: 'Workflow',
          step_number: '01',
          title: 'Discover',
          description: 'We audit your current systems, map compliance requirements, and identify the highest-leverage opportunities for impact.',
        },
        {
          icon: 'Lock',
          step_number: '02',
          title: 'Architect',
          description: 'Our engineers design a secure, compliant, future-proof blueprint aligned with HIPAA, AML/KYC, or your regulatory needs.',
        },
        {
          icon: 'Cpu',
          step_number: '03',
          title: 'Build',
          description: 'Agile delivery in transparent sprints with production-grade code, full test coverage, and continuous deployment.',
        },
        {
          icon: 'Shield',
          step_number: '04',
          title: 'Operate',
          description: '24/7 monitoring, proactive maintenance, and compliance-aware evolution so your platform stays healthy and audit-ready.',
        },
      ],
    },
    {
      __component: 'acf-sections.qubi-case-studies-section',
      eyebrow: 'Case Studies',
      main_title: 'Results across healthcare, finance and AI.',
      case_studies: [
        {
          industry: 'Healthcare',
          title: 'HIPAA-compliant telehealth infrastructure for 5k patients',
          challenge: 'A regional healthcare network needed to modernize fragmented legacy EHR systems into a secure telehealth platform.',
          solution: 'Designed encrypted data pipelines, unified three legacy EHRs using HL7/FHIR, and delivered telehealth scheduling and analytics.',
          quote: 'Our clinicians stopped fighting the software and started using it.',
          quote_role: 'VP of Clinical Operations',
        },
        {
          industry: 'Finance',
          title: 'Real-time payments platform processing 2M+ transactions daily',
          challenge: 'A fintech client needed transaction processing and settlement that could scale while meeting AML and KYC requirements.',
          solution: 'Re-architected settlement for horizontal scale, automated compliance checks, and added regional failover.',
          quote: 'We went from dreading peak traffic to using it as a benchmark.',
          quote_role: 'Head of Engineering',
        },
        {
          industry: 'AI & Machine Learning',
          title: 'AI-powered supply chain optimization for global manufacturer',
          challenge: 'A global manufacturer needed predictive intelligence to reduce waste and downtime across its supply chain.',
          solution: 'Built predictive forecasting, intelligent automation, computer vision, and a unified supply chain dashboard.',
          quote: 'Our planners are working from forecasts instead of guesses.',
          quote_role: 'Director of Supply Chain',
        },
      ],
    },
    {
      __component: 'acf-sections.qubi-final-cta-section',
      main_title: 'Ready to transform your enterprise with AI, cloud, and confidence?',
      description: 'Whether it is a HIPAA-compliant healthcare platform, an AI-powered automation engine, or a secure financial system, our team delivers enterprise software built to scale, comply, and last.',
      button: { label: 'Talk to Our Experts', url: '/contact' },
    },
  ],
};

const servicesPage = {
  pageBuilder: [
    {
      __component: 'acf-sections.qubi-services-hero',
      eyebrow: 'What We Do',
      title: 'Empowering regulated industries with smart technology',
      description: 'Secure, scalable, and compliant technology across Healthcare, AI, and Finance, delivered by architects, engineers, and domain specialists who understand your regulatory environment.',
      button_label: 'Talk to Our Experts',
      button_url: '/contact',
      highlights: [
        { icon: 'Stethoscope', top: 'HIPAA', bottom: 'Healthcare Compliant' },
        { icon: 'Cpu', top: 'AI / ML', bottom: 'Predictive & Automated' },
        { icon: 'Landmark', top: 'AML / KYC', bottom: 'Finance Compliant' },
        { icon: 'ShieldCheck', top: '10+ Years', bottom: 'Regulated Delivery' },
      ],
    },
    {
      __component: 'acf-sections.qubi-services-list',
      eyebrow: 'Our Focus Areas',
      title: 'Three domains. Full depth.',
      description: 'Each vertical is staffed by specialists with domain-specific regulatory and engineering expertise.',
      items: [
        { id: '01', icon: 'Stethoscope', title: 'Healthcare Tech Solutions', blurb: 'HIPAA-compliant systems built for patient care at scale.', tags: ['HIPAA', 'EHR', 'Telemedicine', 'HL7'], points: ['EHR (Electronic Health Record) integration and modernization', 'HIPAA-compliant system architecture and data management', 'Patient data integration platforms', 'Telemedicine and telehealth platform development', 'Healthcare analytics and business intelligence'] },
        { id: '02', icon: 'Cpu', title: 'AI & Machine Learning', blurb: 'Intelligent systems that learn, predict, and automate.', tags: ['Predictive AI', 'NLP', 'Automation', 'Computer Vision'], points: ['Custom AI/ML model development and deployment', 'Predictive analytics for business intelligence', 'Intelligent automation solutions', 'Natural language processing (NLP) implementations', 'Computer vision applications'] },
        { id: '03', icon: 'Landmark', title: 'Finance & FinTech', blurb: 'Compliant, high-throughput systems for modern finance.', tags: ['Payments', 'AML/KYC', 'Blockchain', 'Analytics'], points: ['Payment systems and processing platforms', 'Regulatory compliance solutions (AML, KYC)', 'Transaction processing and settlement systems', 'Blockchain and cryptocurrency solutions', 'Financial data analytics and reporting'] },
      ],
    },
    {
      __component: 'acf-sections.qubi-services-capabilities',
      eyebrow: 'More Ways We Deliver',
      title: 'Services that go beyond the core.',
      items: [
        { icon: 'Workflow', title: 'Full-Stack Development', description: 'End-to-end web, mobile, and cloud application development tailored to your domain.', image_url: '/uploads/full_stack_1.webp' },
        { icon: 'Cpu', title: 'System Integration & Modernization', description: 'Legacy modernization and seamless connectivity between existing and new systems.', image_url: '/uploads/System_integration_and_legacy_modernization.webp' },
        { icon: 'Lock', title: 'Cloud Architecture & DevOps', description: 'Scalable cloud infrastructure, CI/CD pipelines, and automated deployments.', image_url: '/uploads/Cloud_architecture_and_DevOps_services.webp' },
        { icon: 'Shield', title: 'Cybersecurity & Data Protection', description: 'Data protection, compliance audits, and enterprise-grade security posture.', image_url: '/uploads/Cybersecurity_and_data_protection.webp' },
      ],
    },
    {
      __component: 'acf-sections.qubi-services-process',
      eyebrow: 'How We Work',
      title: 'A disciplined process. Measurable outcomes.',
      items: [
        { number: '01', icon: 'Workflow', title: 'Discover', description: 'We audit your current systems, map compliance requirements, and identify the highest-leverage opportunities for impact.' },
        { number: '02', icon: 'Lock', title: 'Architect', description: 'Our engineers design a secure, compliant, future-proof blueprint aligned with your regulatory needs.' },
        { number: '03', icon: 'Cpu', title: 'Build', description: 'Agile delivery in transparent sprints with production-grade code, full test coverage, and continuous deployment.' },
        { number: '04', icon: 'Shield', title: 'Operate', description: '24/7 monitoring, proactive maintenance, and compliance-aware evolution so your platform stays healthy.' },
      ],
    },
    {
      __component: 'acf-sections.qubi-services-cta',
      eyebrow: "Let's Build",
      title: 'Ready to transform your enterprise —',
      sub_title: 'with AI, cloud, and confidence?',
      description: 'Whether it is a HIPAA-compliant healthcare platform, an AI-powered automation engine, or a secure financial system, our team delivers enterprise software built to scale, comply, and last.',
      button_label: 'Talk to Our Experts',
      button_url: '/contact',
    },
  ],
};

async function main() {
  const app = await createStrapi({ distDir: './dist' }).load();
  try {
    const heroImage = await uploadImage(app, 'AI about.avif');
    const healthcareImage = await uploadImage(app, 'health1.webp');
    const financeImage = await uploadImage(app, 'finance11.webp');
    const aiImage = await uploadImage(app, 'AI11.webp');

    homepage.pageBuilder[0].hero_image = { connect: [heroImage.id] };
    homepage.pageBuilder[5].case_studies[0].image_url = healthcareImage.url;
    homepage.pageBuilder[5].case_studies[1].image_url = financeImage.url;
    homepage.pageBuilder[5].case_studies[2].image_url = aiImage.url;
    homepage.pageBuilder[0].image_url = heroImage.url;

    const pages = await app.documents('api::page.page').findMany({
      filters: { slug: 'home' },
      status: 'published',
    });
    if (!pages.length) throw new Error('Published page with slug "home" was not found.');

    const page = await app.documents('api::page.page').update({
      documentId: pages[0].documentId,
      data: homepage,
    });
    await app.db.connection('components_acf_sections_qubi_home_hero')
      .where({ main_title: homepage.pageBuilder[0].main_title })
      .update({
        image_url: heroImage.url,
        experience_years: homepage.pageBuilder[0].experience_years,
        experience_suffix: homepage.pageBuilder[0].experience_suffix,
        experience_description: homepage.pageBuilder[0].experience_description,
        snapshot_label: homepage.pageBuilder[0].snapshot_label,
        snapshot_items: JSON.stringify(homepage.pageBuilder[0].snapshot_items),
        snapshot_footer: homepage.pageBuilder[0].snapshot_footer,
        badge: homepage.pageBuilder[0].badge,
      });

    const servicePages = await app.documents('api::page.page').findMany({
      filters: { slug: 'services' },
      status: 'published',
    });
    if (servicePages.length) {
      await app.documents('api::page.page').update({
        documentId: servicePages[0].documentId,
        data: servicesPage,
      });
      console.log(`Seeded Services page ${servicePages[0].documentId}`);
    }
    console.log(`Seeded and published Home page ${page.documentId}`);
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import type { Schema, Struct } from '@strapi/strapi';

export interface AcfSectionsDemoSectionsCapabilityCard
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_demo_sections_capability_cards';
  info: {
    displayName: 'demo-sections.capability-card';
  };
  attributes: {
    card: Schema.Attribute.Component<'acf-shared.card', true>;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AcfSectionsDemoSectionsContactCta
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_demo_sections_contact_ctas';
  info: {
    displayName: 'demo-sections.contact-cta';
  };
  attributes: {
    cta_label: Schema.Attribute.String;
    cta_link: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    form_fields: Schema.Attribute.Component<'acf-shared.form-fields', true>;
    heading: Schema.Attribute.String;
    highlighted_word: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    request_content: Schema.Attribute.String;
    request_description: Schema.Attribute.Blocks;
    sub_description: Schema.Attribute.String;
  };
}

export interface AcfSectionsDemoSectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_demo_sections_heroes';
  info: {
    displayName: 'demo-sections.hero';
  };
  attributes: {
    cta_label: Schema.Attribute.String;
    cta_link: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    eyebrow_text: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    highlighted_word: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsDemoSectionsVideoShowcase
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_demo_sections_video_showcases';
  info: {
    displayName: 'demo-sections.video-showcase';
  };
  attributes: {
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    video_subtitle: Schema.Attribute.String;
    video_title: Schema.Attribute.String;
    video_url: Schema.Attribute.String;
  };
}

export interface AcfSectionsFaqCta extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_faq_ctas';
  info: {
    displayName: 'faq-cta';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    primary_cta_label: Schema.Attribute.String;
    primary_cta_link: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    secondary_cta_label: Schema.Attribute.String;
    secondary_cta_link: Schema.Attribute.String;
  };
}

export interface AcfSectionsFaqGroup extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_faq_groups';
  info: {
    displayName: 'faq-group';
  };
  attributes: {
    faq: Schema.Attribute.Component<'acf-sections.faq-item', true>;
    group_title: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsFaqHero extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_faq_heroes';
  info: {
    displayName: 'faq-hero';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    eyebrow_text: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    highlighted_word: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_faq_items';
  info: {
    displayName: 'faq-item';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    question: Schema.Attribute.String;
  };
}

export interface AcfSectionsFaqList extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_faq_lists';
  info: {
    displayName: 'faq-list';
  };
  attributes: {
    groups: Schema.Attribute.Component<'acf-sections.faq-group', true>;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    copyright_text: Schema.Attribute.String;
  };
}

export interface AcfSectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    title: Schema.Attribute.RichText;
  };
}

export interface AcfSectionsQubiAnalyticsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_analytics_section';
  info: {
    displayName: 'Qubi Analytics Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    features: Schema.Attribute.Component<
      'acf-shared.qubi-analytics-section-features',
      true
    >;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiBlogListSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_blog_list_sections';
  info: {
    description: 'Renders the blog articles from the Blog collection: optional featured article plus the latest-articles grid. The articles themselves are managed in Content Manager > Blog, not here.';
    displayName: 'Qubi Blog List Section';
  };
  attributes: {
    main_title: Schema.Attribute.String;
    max_posts: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    show_featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiCalloutSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_callout_sections';
  info: {
    description: 'Compact banner with icon, heading, and body text';
    displayName: 'Qubi Callout Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiCapabilitiesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_capabilities_section';
  info: {
    displayName: 'Qubi Capabilities Section';
  };
  attributes: {
    capability_items: Schema.Attribute.Component<
      'acf-shared.qubi-capabilities-section-capability-items',
      true
    >;
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiCaseStudiesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_case_studies_sections';
  info: {
    description: 'Section heading plus large case-study cards with challenge, solution, quote, and result metrics';
    displayName: 'Qubi Case Studies Section';
  };
  attributes: {
    case_studies: Schema.Attribute.Component<
      'acf-shared.qubi-case-study',
      true
    >;
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiClientTicker extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_client_tickers';
  info: {
    displayName: 'Qubi Client Ticker';
  };
  attributes: {
    items: Schema.Attribute.JSON;
  };
}

export interface AcfSectionsQubiComparisonSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_comparison_sections';
  info: {
    description: 'Comparison table: aspect vs competitor column vs qubi column';
    displayName: 'Qubi Comparison Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    rows: Schema.Attribute.Component<'acf-shared.qubi-comparison-row', true>;
    them_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Workflow Automation Tools'>;
    us_label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'qubi'>;
  };
}

export interface AcfSectionsQubiDemoPreview extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_demo_preview';
  info: {
    displayName: 'Qubi Demo Preview';
  };
  attributes: {
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    video_duration: Schema.Attribute.String;
    video_title: Schema.Attribute.Text;
    video_url: Schema.Attribute.Text;
  };
}

export interface AcfSectionsQubiDifferentiatorsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_differentiators_sections';
  info: {
    description: 'Four-column grid of check-marked cards used for "Why enterprise clients choose us"';
    displayName: 'Qubi Differentiators Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<
      'acf-shared.qubi-differentiator-item',
      true
    >;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiExecutionSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_execution_sections';
  info: {
    description: 'Heading with gradient tail, three icon cards, and a highlighted callout banner';
    displayName: 'Qubi Execution Section';
  };
  attributes: {
    callout_description: Schema.Attribute.Text;
    callout_title: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'acf-shared.qubi-icon-card-item', true>;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title_highlight: Schema.Attribute.String;
  };
}

export interface AcfSectionsQubiFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_faq_sections';
  info: {
    description: 'Eyebrow, heading, and a list of question/answer cards';
    displayName: 'Qubi FAQ Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'acf-shared.qubi-faq-item', true>;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiFinalCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_final_cta_section';
  info: {
    displayName: 'Qubi Final CTA Section';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.menu-item', false>;
    description: Schema.Attribute.RichText;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    secondary_button: Schema.Attribute.Component<'shared.menu-item', false>;
  };
}

export interface AcfSectionsQubiHomeHero extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_home_hero';
  info: {
    displayName: 'Qubi Home Hero';
  };
  attributes: {
    badge: Schema.Attribute.String;
    badge_text: Schema.Attribute.String;
    button: Schema.Attribute.Component<'shared.menu-item', false>;
    description: Schema.Attribute.RichText;
    experience_description: Schema.Attribute.Text;
    experience_suffix: Schema.Attribute.String;
    experience_years: Schema.Attribute.String;
    hero_image: Schema.Attribute.Media<'images'>;
    image_url: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    snapshot_footer: Schema.Attribute.String;
    snapshot_items: Schema.Attribute.JSON;
    snapshot_label: Schema.Attribute.String;
  };
}

export interface AcfSectionsQubiHomeServices extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_home_services';
  info: {
    displayName: 'Qubi Home Services';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.JSON;
    title_highlight: Schema.Attribute.String;
    title_line1: Schema.Attribute.String;
  };
}

export interface AcfSectionsQubiHowItWorksSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_how_it_works_section';
  info: {
    displayName: 'Qubi How It Works Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    steps: Schema.Attribute.Component<
      'acf-shared.qubi-how-it-works-section-steps',
      true
    >;
  };
}

export interface AcfSectionsQubiHumanInLoopSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_human_in_loop';
  info: {
    displayName: 'Qubi Human In Loop Section';
  };
  attributes: {
    badges: Schema.Attribute.Component<
      'acf-shared.qubi-human-in-loop-section-badges',
      true
    >;
    button: Schema.Attribute.Component<'shared.menu-item', false>;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiIconGridSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_icon_grid_sections';
  info: {
    description: 'Centered grid of icon cards with section heading (e.g. platform components)';
    displayName: 'Qubi Icon Grid Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'acf-shared.qubi-icon-card-item', true>;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiIntegrationSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_integration_section';
  info: {
    displayName: 'Qubi Integration Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    integration_items: Schema.Attribute.Component<
      'acf-shared.qubi-integration-section-integration-items',
      true
    >;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiOutcomesSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_outcomes_section';
  info: {
    displayName: 'Qubi Outcomes Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    outcome_items: Schema.Attribute.Component<
      'acf-shared.qubi-outcomes-section-outcome-items',
      true
    >;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiPlansSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_plans_sections';
  info: {
    description: 'Pricing plan cards with feature lists and a highlight option';
    displayName: 'Qubi Plans Section';
  };
  attributes: {
    cta_url: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    plans: Schema.Attribute.Component<'acf-shared.qubi-plan-item', true>;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiProblemSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_problem_section';
  info: {
    displayName: 'Qubi Problem Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    main_title: Schema.Attribute.Text;
    problem_items: Schema.Attribute.Component<
      'acf-shared.qubi-problem-section-problem-items',
      true
    >;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiServicesCapabilities
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_services_capabilities';
  info: {
    displayName: 'Qubi Services Capabilities';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSectionsQubiServicesCta extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_services_ctas';
  info: {
    displayName: 'Qubi Services CTA';
  };
  attributes: {
    button_label: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSectionsQubiServicesHero extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_services_heroes';
  info: {
    displayName: 'Qubi Services Hero';
  };
  attributes: {
    button_label: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    highlights: Schema.Attribute.JSON;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSectionsQubiServicesList extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_services_lists';
  info: {
    displayName: 'Qubi Services List';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSectionsQubiServicesProcess extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_services_processes';
  info: {
    displayName: 'Qubi Services Process';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSectionsQubiSimpleHero extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_simple_heroes';
  info: {
    description: 'Centered text-only page hero: badge, title, description';
    displayName: 'Qubi Simple Hero';
  };
  attributes: {
    badge_text: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_stats_sections';
  info: {
    description: 'Horizontal bar of big stat numbers with labels';
    displayName: 'Qubi Stats Section';
  };
  attributes: {
    stats: Schema.Attribute.Component<'acf-shared.qubi-stat-item', true>;
  };
}

export interface AcfSectionsQubiStorySection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_story_sections';
  info: {
    description: 'Eyebrow, heading, story paragraphs, and a row of stat cards';
    displayName: 'Qubi Story Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    paragraphs: Schema.Attribute.Component<
      'acf-shared.qubi-text-paragraph',
      true
    >;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    stats: Schema.Attribute.Component<'acf-shared.qubi-stat-item', true>;
  };
}

export interface AcfSectionsQubiSubscribeCtaSection
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_subscribe_cta_sections';
  info: {
    description: 'Centered heading, supporting text, and a single action button on a tinted band';
    displayName: 'Qubi Subscribe CTA Section';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.menu-item', false>;
    description: Schema.Attribute.Text;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsQubiUseCasesSection extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_qubi_use_cases_section';
  info: {
    displayName: 'Qubi Use Cases Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    main_title: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    use_case_items: Schema.Attribute.Component<
      'acf-shared.qubi-use-cases-section-use-case-items',
      true
    >;
  };
}

export interface AcfSectionsRoundtableSessionsSections
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_roundtable_sessions_sections';
  info: {
    displayName: 'Roundtable Sessions Sections';
  };
  attributes: {
    acf_id: Schema.Attribute.String;
    class_name: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    main_title: Schema.Attribute.String;
    roundtables: Schema.Attribute.Component<
      'acf-shared.roundtable-sessions-sections-roundtables',
      true
    >;
    section_space_padding: Schema.Attribute.Component<
      'acf-sections.section-space-padding',
      false
    >;
  };
}

export interface AcfSectionsSectionSpacePadding extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_section_space_padding';
  info: {
    displayName: 'Section Space (Padding)';
  };
  attributes: {
    desktop_padding: Schema.Attribute.Component<
      'acf-shared.section-space-padding-desktop-padding',
      false
    >;
    mobile_padding: Schema.Attribute.Component<
      'acf-shared.section-space-padding-mobile-padding',
      false
    >;
    position: Schema.Attribute.Component<
      'acf-shared.section-space-padding-position',
      false
    >;
  };
}

export interface AcfSectionsSessionItemSections extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_session_item_sections';
  info: {
    displayName: 'Session Item Sections';
  };
  attributes: {
    acf_id: Schema.Attribute.String;
    class_name: Schema.Attribute.String;
    main_title: Schema.Attribute.String;
    section_space_padding: Schema.Attribute.Component<
      'acf-sections.section-space-padding',
      false
    >;
    session_tabs: Schema.Attribute.Component<
      'acf-shared.session-item-sections-session-tabs',
      true
    >;
  };
}

export interface AcfSectionsSolutionsComparisonBlock
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_comparison_blocks';
  info: {
    displayName: 'Solutions Comparison Block';
    icon: 'layout';
  };
  attributes: {
    heading: Schema.Attribute.String;
    highlightedHeading: Schema.Attribute.String;
    othersItems: Schema.Attribute.Component<
      'acf-shared.solutions-comparison-item',
      true
    >;
    othersLabel: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    qubiItems: Schema.Attribute.Component<
      'acf-shared.solutions-comparison-item',
      true
    >;
    qubiLabel: Schema.Attribute.String;
  };
}

export interface AcfSectionsSolutionsExecutionFlow
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_execution_flows';
  info: {
    displayName: 'Solutions - Execution Flow';
    icon: 'layout';
  };
  attributes: {
    heading: Schema.Attribute.String;
    highlightedHeading: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    steps: Schema.Attribute.Component<
      'acf-shared.solutions-execution-flow-step',
      true
    >;
  };
}

export interface AcfSectionsSolutionsFinalCta extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_final_cta';
  info: {
    displayName: 'Solutions Final CTA';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsSolutionsHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_hero_banners';
  info: {
    displayName: 'Solutions - Hero Banner';
    icon: 'picture';
  };
  attributes: {
    badgeLabel: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    highlightedHeading: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsSolutionsIndustryLayout
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_industry_layout';
  info: {
    displayName: 'Solutions Industry Layout';
  };
  attributes: {
    acf_id: Schema.Attribute.String;
    class_name: Schema.Attribute.String;
    industry_cards: Schema.Attribute.Component<
      'acf-shared.solutions-industry-layout-industry-cards',
      true
    >;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsSolutionsProblemsBlock
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_problems_blocks';
  info: {
    displayName: 'Solutions Problems Block';
    icon: 'layout';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrowLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    problems: Schema.Attribute.Component<
      'acf-shared.solutions-problem-item',
      true
    >;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSectionsSolutionsStatsBand extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_stats_bands';
  info: {
    displayName: 'Solutions - Stats Band';
    icon: 'chart-bars';
  };
  attributes: {
    stats: Schema.Attribute.Component<
      'acf-shared.solutions-stats-band-item',
      true
    >;
  };
}

export interface AcfSectionsSolutionsUseCasesLayout
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_use_cases_layouts';
  info: {
    displayName: 'Solutions - Use Cases Layout';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrowLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    highlightedHeading: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    useCases: Schema.Attribute.Component<
      'acf-shared.solutions-use-cases-layout-items',
      true
    >;
  };
}

export interface AcfSectionsSolutionsWhatWeDo extends Struct.ComponentSchema {
  collectionName: 'components_acf_sections_solutions_what_we_do';
  info: {
    displayName: 'Solutions - What We Do';
    icon: 'brain';
  };
  attributes: {
    cards: Schema.Attribute.Component<
      'acf-shared.solutions-what-we-do-card',
      true
    >;
    description: Schema.Attribute.Text;
    eyebrowLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    highlightedHeading: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    tagline: Schema.Attribute.String;
    verbs: Schema.Attribute.Component<
      'acf-shared.solutions-what-we-do-verb',
      true
    >;
  };
}

export interface AcfSharedBulletPoints extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_bullet_points';
  info: {
    displayName: 'bullet_points';
  };
  attributes: {
    content: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSharedCard extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    bullet_points: Schema.Attribute.Component<'acf-shared.bullet-points', true>;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    duration_badge: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedFormFields extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_form_fields';
  info: {
    displayName: 'form_fields';
  };
  attributes: {
    field_name: Schema.Attribute.String;
    field_type: Schema.Attribute.Enumeration<
      ['text', 'email', 'tel', 'textarea']
    >;
    is_required: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    width: Schema.Attribute.Enumeration<['full', 'half']>;
  };
}

export interface AcfSharedQubiAnalyticsSectionFeatures
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_analytics_features';
  info: {
    displayName: 'Qubi Analytics Section Features';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSharedQubiCapabilitiesSectionCapabilityItems
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_capability_items';
  info: {
    displayName: 'Qubi Capabilities Section Capability Items';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSharedQubiCaseMetric extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_case_metrics';
  info: {
    displayName: 'Qubi Case Metric';
  };
  attributes: {
    label: Schema.Attribute.String;
    metric_type: Schema.Attribute.Enumeration<
      ['before_after', 'reduction', 'value']
    > &
      Schema.Attribute.DefaultTo<'value'>;
    primary_value: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    secondary_value: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiCaseStudy extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_case_studies';
  info: {
    displayName: 'Qubi Case Study';
  };
  attributes: {
    challenge: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    image_url: Schema.Attribute.String;
    industry: Schema.Attribute.String;
    metrics: Schema.Attribute.Component<'acf-shared.qubi-case-metric', true>;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    quote: Schema.Attribute.Text;
    quote_role: Schema.Attribute.String;
    solution: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiComparisonRow extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_comparison_rows';
  info: {
    displayName: 'Qubi Comparison Row';
  };
  attributes: {
    aspect: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    them: Schema.Attribute.String;
    us: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiDifferentiatorItem
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_differentiator_items';
  info: {
    description: 'Single check-marked card item used inside the differentiators ("Why enterprise clients choose us") section';
    displayName: 'Qubi Differentiator Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_faq_items';
  info: {
    displayName: 'Qubi FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    question: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiHowItWorksSectionSteps
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_hiw_steps';
  info: {
    displayName: 'Qubi How It Works Section Steps';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    step_number: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSharedQubiHumanInLoopSectionBadges
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_hil_badges';
  info: {
    displayName: 'Qubi Human In Loop Section Badges';
  };
  pluginOptions: {
    'content-manager': {
      mainField: 'title';
    };
  };
  attributes: {
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiIconCardItem extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_icon_card_items';
  info: {
    displayName: 'Qubi Icon Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiIntegrationSectionIntegrationItems
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_integration_items';
  info: {
    displayName: 'Qubi Integration Section Integration Items';
  };
  attributes: {
    count: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSharedQubiOutcomesSectionOutcomeItems
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_outcome_items';
  info: {
    displayName: 'Qubi Outcomes Section Outcome Items';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSharedQubiPlanItem extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_plan_items';
  info: {
    displayName: 'Qubi Plan Item';
  };
  attributes: {
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<
      'acf-shared.qubi-text-paragraph',
      true
    >;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiProblemSectionProblemItems
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_problem_items';
  info: {
    displayName: 'Qubi Problem Section Problem Items';
  };
  attributes: {
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSharedQubiStatItem extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_stat_items';
  info: {
    displayName: 'Qubi Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    value: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiTextParagraph extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_text_paragraphs';
  info: {
    displayName: 'Qubi Text Paragraph';
  };
  pluginOptions: {
    'content-manager': {
      mainField: 'label';
    };
  };
  attributes: {
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String;
  };
}

export interface AcfSharedQubiUseCasesSectionUseCaseItems
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_qubi_use_case_items';
  info: {
    displayName: 'Qubi Use Cases Section Use Case Items';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.Text;
  };
}

export interface AcfSharedRoundtableSessionsSectionsRoundtables
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_roundtable_sessions_sect_e500dad9';
  info: {
    displayName: 'Roundtable Sessions Sections Roundtables';
  };
  attributes: {
    roundtable_title: Schema.Attribute.String;
    speaker_company: Schema.Attribute.String;
    speaker_image: Schema.Attribute.Media<'images'>;
    speaker_name: Schema.Attribute.String;
    speaker_role_label: Schema.Attribute.String;
    speaker_title: Schema.Attribute.String;
    table: Schema.Attribute.Component<
      'acf-shared.roundtable-sessions-sections-roundtables-table',
      false
    >;
  };
}

export interface AcfSharedRoundtableSessionsSectionsRoundtablesTable
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_roundtable_sessions_sect_6d08c656';
  info: {
    displayName: 'Roundtable Sessions Sections Roundtables Table';
  };
  attributes: {
    table_row: Schema.Attribute.Component<
      'acf-shared.roundtable-sessions-sections-roundtables-table-table-row',
      true
    >;
  };
}

export interface AcfSharedRoundtableSessionsSectionsRoundtablesTableTableRow
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_roundtable_sessions_sect_55629251';
  info: {
    displayName: 'Roundtable Sessions Sections Roundtables Table Table Row';
  };
  attributes: {
    name_or_value: Schema.Attribute.Component<
      'acf-shared.roundtable-sessions-sections-roundtables-table-table-row-name-or-value',
      true
    >;
    type: Schema.Attribute.Enumeration<['th', 'td']>;
  };
}

export interface AcfSharedRoundtableSessionsSectionsRoundtablesTableTableRowNameOrValue
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_roundtable_sessions_sect_964807c2';
  info: {
    displayName: 'Roundtable Sessions Sections Roundtables Table Table Row Name Or Value';
  };
  attributes: {
    name: Schema.Attribute.RichText;
  };
}

export interface AcfSharedSectionSpacePaddingDesktopPadding
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_section_space_padding_de_e065a466';
  info: {
    displayName: 'Section Space (Padding) Desktop Padding';
  };
  attributes: {
    padding_bottom_desktop: Schema.Attribute.Integer;
    padding_top_desktop: Schema.Attribute.Integer;
  };
}

export interface AcfSharedSectionSpacePaddingMobilePadding
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_section_space_padding_mo_5e2fa5e7';
  info: {
    displayName: 'Section Space (Padding) Mobile Padding';
  };
  attributes: {
    padding_bottom_mobile: Schema.Attribute.Integer;
    padding_top_mobile: Schema.Attribute.Integer;
  };
}

export interface AcfSharedSectionSpacePaddingPosition
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_section_space_padding_position';
  info: {
    displayName: 'Section Space (Padding) Position';
  };
  attributes: {
    bottom: Schema.Attribute.Boolean;
    top: Schema.Attribute.Boolean;
  };
}

export interface AcfSharedSessionItemSectionsSessionTabs
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_session_item_sections_se_88e01cfa';
  info: {
    displayName: 'Session Item Sections Session Tabs';
  };
  attributes: {
    sessions: Schema.Attribute.Component<
      'acf-shared.session-item-sections-session-tabs-sessions',
      true
    >;
    tab_title: Schema.Attribute.String;
  };
}

export interface AcfSharedSessionItemSectionsSessionTabsSessions
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_session_item_sections_se_9500f9e1';
  info: {
    displayName: 'Session Item Sections Session Tabs Sessions';
  };
  attributes: {
    session_date_day_label: Schema.Attribute.String;
    session_description: Schema.Attribute.RichText;
    session_time: Schema.Attribute.String;
    session_title: Schema.Attribute.String;
    speaker_company: Schema.Attribute.String;
    speaker_image: Schema.Attribute.Media<'images'>;
    speaker_name: Schema.Attribute.String;
    speaker_role_label: Schema.Attribute.String;
    speaker_title: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsComparisonItem
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_comparison_items';
  info: {
    displayName: 'Solutions Comparison Item';
  };
  attributes: {
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsExecutionFlowStep
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_execution_flow_steps';
  info: {
    displayName: 'Solutions Execution Flow Step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsExecutionFlowVerb
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_execution_flow_verbs';
  info: {
    displayName: 'Solutions Execution Flow Verb';
  };
  attributes: {
    detail: Schema.Attribute.String;
    label: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface AcfSharedSolutionsIndustryLayoutHighlightItem
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_industry_layout_highlight_items';
  info: {
    displayName: 'Solutions Industry Highlight Item';
  };
  attributes: {
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsIndustryLayoutIndustryCards
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_industry_layout_cards';
  info: {
    displayName: 'Solutions Industry Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    highlights: Schema.Attribute.Component<
      'acf-shared.solutions-industry-layout-highlight-item',
      true
    >;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsProblemItem extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_problem_items';
  info: {
    displayName: 'Solutions Problem Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsStatsBandItem
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_stats_band_items';
  info: {
    displayName: 'Solutions Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    value: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsUseCasesLayoutItems
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_use_cases_layout_items';
  info: {
    displayName: 'Solutions Use Case Item';
  };
  attributes: {
    categoryLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    stats: Schema.Attribute.Component<
      'acf-shared.solutions-use-cases-layout-stat-item',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsUseCasesLayoutStatItem
  extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_use_cases_layout_stat_items';
  info: {
    displayName: 'Solutions Use Case Stat Item';
  };
  attributes: {
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsWhatWeDoCard extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_what_we_do_cards';
  info: {
    displayName: 'Solutions What We Do Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface AcfSharedSolutionsWhatWeDoVerb extends Struct.ComponentSchema {
  collectionName: 'components_acf_shared_solutions_what_we_do_verbs';
  info: {
    displayName: 'Solutions What We Do Verb';
  };
  attributes: {
    detail: Schema.Attribute.Text;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    verb: Schema.Attribute.String;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.menu-item', false>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs';
  info: {
    displayName: 'FAQ Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    images: Schema.Attribute.Media;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    image: Schema.Attribute.Media;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTestimonialSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonial Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    testimonials: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SharedMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_menu_items';
  info: {
    displayName: 'Menu Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    Publish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    url: Schema.Attribute.Text;
  };
}

export interface SharedNavParent extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_parents';
  info: {
    displayName: 'nav-parent';
    icon: 'bulletList';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.menu-item', true>;
    label: Schema.Attribute.String;
    publish: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    focusKeyword: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<'images'>;
    metaTitle: Schema.Attribute.String;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
    schema: Schema.Attribute.JSON;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'acf-sections.demo-sections-capability-card': AcfSectionsDemoSectionsCapabilityCard;
      'acf-sections.demo-sections-contact-cta': AcfSectionsDemoSectionsContactCta;
      'acf-sections.demo-sections-hero': AcfSectionsDemoSectionsHero;
      'acf-sections.demo-sections-video-showcase': AcfSectionsDemoSectionsVideoShowcase;
      'acf-sections.faq-cta': AcfSectionsFaqCta;
      'acf-sections.faq-group': AcfSectionsFaqGroup;
      'acf-sections.faq-hero': AcfSectionsFaqHero;
      'acf-sections.faq-item': AcfSectionsFaqItem;
      'acf-sections.faq-list': AcfSectionsFaqList;
      'acf-sections.footer': AcfSectionsFooter;
      'acf-sections.hero': AcfSectionsHero;
      'acf-sections.qubi-analytics-section': AcfSectionsQubiAnalyticsSection;
      'acf-sections.qubi-blog-list-section': AcfSectionsQubiBlogListSection;
      'acf-sections.qubi-callout-section': AcfSectionsQubiCalloutSection;
      'acf-sections.qubi-capabilities-section': AcfSectionsQubiCapabilitiesSection;
      'acf-sections.qubi-case-studies-section': AcfSectionsQubiCaseStudiesSection;
      'acf-sections.qubi-client-ticker': AcfSectionsQubiClientTicker;
      'acf-sections.qubi-comparison-section': AcfSectionsQubiComparisonSection;
      'acf-sections.qubi-demo-preview': AcfSectionsQubiDemoPreview;
      'acf-sections.qubi-differentiators-section': AcfSectionsQubiDifferentiatorsSection;
      'acf-sections.qubi-execution-section': AcfSectionsQubiExecutionSection;
      'acf-sections.qubi-faq-section': AcfSectionsQubiFaqSection;
      'acf-sections.qubi-final-cta-section': AcfSectionsQubiFinalCtaSection;
      'acf-sections.qubi-home-hero': AcfSectionsQubiHomeHero;
      'acf-sections.qubi-home-services': AcfSectionsQubiHomeServices;
      'acf-sections.qubi-how-it-works-section': AcfSectionsQubiHowItWorksSection;
      'acf-sections.qubi-human-in-loop-section': AcfSectionsQubiHumanInLoopSection;
      'acf-sections.qubi-icon-grid-section': AcfSectionsQubiIconGridSection;
      'acf-sections.qubi-integration-section': AcfSectionsQubiIntegrationSection;
      'acf-sections.qubi-outcomes-section': AcfSectionsQubiOutcomesSection;
      'acf-sections.qubi-plans-section': AcfSectionsQubiPlansSection;
      'acf-sections.qubi-problem-section': AcfSectionsQubiProblemSection;
      'acf-sections.qubi-services-capabilities': AcfSectionsQubiServicesCapabilities;
      'acf-sections.qubi-services-cta': AcfSectionsQubiServicesCta;
      'acf-sections.qubi-services-hero': AcfSectionsQubiServicesHero;
      'acf-sections.qubi-services-list': AcfSectionsQubiServicesList;
      'acf-sections.qubi-services-process': AcfSectionsQubiServicesProcess;
      'acf-sections.qubi-simple-hero': AcfSectionsQubiSimpleHero;
      'acf-sections.qubi-stats-section': AcfSectionsQubiStatsSection;
      'acf-sections.qubi-story-section': AcfSectionsQubiStorySection;
      'acf-sections.qubi-subscribe-cta-section': AcfSectionsQubiSubscribeCtaSection;
      'acf-sections.qubi-use-cases-section': AcfSectionsQubiUseCasesSection;
      'acf-sections.roundtable-sessions-sections': AcfSectionsRoundtableSessionsSections;
      'acf-sections.section-space-padding': AcfSectionsSectionSpacePadding;
      'acf-sections.session-item-sections': AcfSectionsSessionItemSections;
      'acf-sections.solutions-comparison-block': AcfSectionsSolutionsComparisonBlock;
      'acf-sections.solutions-execution-flow': AcfSectionsSolutionsExecutionFlow;
      'acf-sections.solutions-final-cta': AcfSectionsSolutionsFinalCta;
      'acf-sections.solutions-hero-banner': AcfSectionsSolutionsHeroBanner;
      'acf-sections.solutions-industry-layout': AcfSectionsSolutionsIndustryLayout;
      'acf-sections.solutions-problems-block': AcfSectionsSolutionsProblemsBlock;
      'acf-sections.solutions-stats-band': AcfSectionsSolutionsStatsBand;
      'acf-sections.solutions-use-cases-layout': AcfSectionsSolutionsUseCasesLayout;
      'acf-sections.solutions-what-we-do': AcfSectionsSolutionsWhatWeDo;
      'acf-shared.bullet-points': AcfSharedBulletPoints;
      'acf-shared.card': AcfSharedCard;
      'acf-shared.form-fields': AcfSharedFormFields;
      'acf-shared.qubi-analytics-section-features': AcfSharedQubiAnalyticsSectionFeatures;
      'acf-shared.qubi-capabilities-section-capability-items': AcfSharedQubiCapabilitiesSectionCapabilityItems;
      'acf-shared.qubi-case-metric': AcfSharedQubiCaseMetric;
      'acf-shared.qubi-case-study': AcfSharedQubiCaseStudy;
      'acf-shared.qubi-comparison-row': AcfSharedQubiComparisonRow;
      'acf-shared.qubi-differentiator-item': AcfSharedQubiDifferentiatorItem;
      'acf-shared.qubi-faq-item': AcfSharedQubiFaqItem;
      'acf-shared.qubi-how-it-works-section-steps': AcfSharedQubiHowItWorksSectionSteps;
      'acf-shared.qubi-human-in-loop-section-badges': AcfSharedQubiHumanInLoopSectionBadges;
      'acf-shared.qubi-icon-card-item': AcfSharedQubiIconCardItem;
      'acf-shared.qubi-integration-section-integration-items': AcfSharedQubiIntegrationSectionIntegrationItems;
      'acf-shared.qubi-outcomes-section-outcome-items': AcfSharedQubiOutcomesSectionOutcomeItems;
      'acf-shared.qubi-plan-item': AcfSharedQubiPlanItem;
      'acf-shared.qubi-problem-section-problem-items': AcfSharedQubiProblemSectionProblemItems;
      'acf-shared.qubi-stat-item': AcfSharedQubiStatItem;
      'acf-shared.qubi-text-paragraph': AcfSharedQubiTextParagraph;
      'acf-shared.qubi-use-cases-section-use-case-items': AcfSharedQubiUseCasesSectionUseCaseItems;
      'acf-shared.roundtable-sessions-sections-roundtables': AcfSharedRoundtableSessionsSectionsRoundtables;
      'acf-shared.roundtable-sessions-sections-roundtables-table': AcfSharedRoundtableSessionsSectionsRoundtablesTable;
      'acf-shared.roundtable-sessions-sections-roundtables-table-table-row': AcfSharedRoundtableSessionsSectionsRoundtablesTableTableRow;
      'acf-shared.roundtable-sessions-sections-roundtables-table-table-row-name-or-value': AcfSharedRoundtableSessionsSectionsRoundtablesTableTableRowNameOrValue;
      'acf-shared.section-space-padding-desktop-padding': AcfSharedSectionSpacePaddingDesktopPadding;
      'acf-shared.section-space-padding-mobile-padding': AcfSharedSectionSpacePaddingMobilePadding;
      'acf-shared.section-space-padding-position': AcfSharedSectionSpacePaddingPosition;
      'acf-shared.session-item-sections-session-tabs': AcfSharedSessionItemSectionsSessionTabs;
      'acf-shared.session-item-sections-session-tabs-sessions': AcfSharedSessionItemSectionsSessionTabsSessions;
      'acf-shared.solutions-comparison-item': AcfSharedSolutionsComparisonItem;
      'acf-shared.solutions-execution-flow-step': AcfSharedSolutionsExecutionFlowStep;
      'acf-shared.solutions-execution-flow-verb': AcfSharedSolutionsExecutionFlowVerb;
      'acf-shared.solutions-industry-layout-highlight-item': AcfSharedSolutionsIndustryLayoutHighlightItem;
      'acf-shared.solutions-industry-layout-industry-cards': AcfSharedSolutionsIndustryLayoutIndustryCards;
      'acf-shared.solutions-problem-item': AcfSharedSolutionsProblemItem;
      'acf-shared.solutions-stats-band-item': AcfSharedSolutionsStatsBandItem;
      'acf-shared.solutions-use-cases-layout-items': AcfSharedSolutionsUseCasesLayoutItems;
      'acf-shared.solutions-use-cases-layout-stat-item': AcfSharedSolutionsUseCasesLayoutStatItem;
      'acf-shared.solutions-what-we-do-card': AcfSharedSolutionsWhatWeDoCard;
      'acf-shared.solutions-what-we-do-verb': AcfSharedSolutionsWhatWeDoVerb;
      'sections.cta': SectionsCta;
      'sections.faq-section': SectionsFaqSection;
      'sections.gallery': SectionsGallery;
      'sections.hero': SectionsHero;
      'sections.testimonial-section': SectionsTestimonialSection;
      'shared.menu-item': SharedMenuItem;
      'shared.nav-parent': SharedNavParent;
      'shared.seo': SharedSeo;
    }
  }
}

/**
 * seed-qubi-pricing-page.js — Creates the Pricing page entry with qubi
 * pageBuilder blocks (hero, callout, plans, platform components, execution,
 * comparison table, FAQ, final CTA).
 *
 * Run from the project root:  node scripts/seed-qubi-pricing-page.js [--force]
 * --force overwrites the pageBuilder of an existing "pricing" page.
 */
"use strict";

const DEMO_URL = "https://meetings.hubspot.com/maheshv";
const FORCE = process.argv.includes("--force");

const pageBuilder = [
  {
    __component: "acf-sections.qubi-simple-hero",
    badge_text: "Outcome-Based Pricing",
    main_title: "You pay for work completed, not licenses consumed",
    description:
      "qBotica is a managed service, not a software subscription. We run your operations end-to-end and charge based on outcomes delivered.",
  },
  {
    __component: "acf-sections.qubi-callout-section",
    icon: "Lightbulb",
    main_title: "Automation-as-a-Service",
    description:
      "Unlike software platforms, qBotica is an execution partner. We design, deploy, and operate your AI workflows 24/7. No internal team needed. No implementation risk. Just outcomes.",
  },
  {
    __component: "acf-sections.qubi-plans-section",
    eyebrow: "Plans",
    main_title: "Execution programs for every scale",
    description: "All plans are custom-scoped. These are starting frameworks - contact us for a tailored proposal.",
    cta_url: DEMO_URL,
    plans: [
      {
        tagline: "For single-workflow deployments",
        title: "Starter Execution",
        description: "Ideal for organizations that want to start with one critical workflow and prove ROI before scaling.",
        cta_label: "Talk to Sales",
        highlight: false,
        features: [
          { text: "1 end-to-end workflow execution" },
          { text: "DocumentAI for up to 3 document types" },
          { text: "AI agent decision-making" },
          { text: "Up to 5 enterprise system integrations" },
          { text: "Standard SLA (business hours)" },
          { text: "Dedicated implementation engineer" },
          { text: "Monthly outcome reporting" },
        ],
      },
      {
        tagline: "For multi-workflow, enterprise-scale operations",
        title: "Enterprise Execution",
        description: "Full-scale AI execution across multiple workflows, with our team running everything as a managed service.",
        cta_label: "Talk to Sales",
        highlight: true,
        features: [
          { text: "Unlimited workflow executions" },
          { text: "Full DocumentAI any document type" },
          { text: "Advanced AI agent orchestration" },
          { text: "Unlimited enterprise integrations" },
          { text: "24/7 managed service SLA" },
          { text: "Dedicated execution team" },
          { text: "Real-time outcome dashboards" },
          { text: "Exception handling and escalation management" },
        ],
      },
      {
        tagline: "For transformational initiatives",
        title: "Custom Program",
        description: "Co-design an enterprise AI execution program aligned to your most critical operational transformation goals.",
        cta_label: "Contact Us",
        highlight: false,
        features: [
          { text: "Everything in Enterprise Execution" },
          { text: "Co-designed execution roadmap" },
          { text: "Executive sponsorship alignment" },
          { text: "Custom outcome metrics and SLAs" },
          { text: "Dedicated VP of Delivery" },
          { text: "Innovation lab access" },
          { text: "Priority feature development" },
        ],
      },
    ],
  },
  {
    __component: "acf-sections.qubi-icon-grid-section",
    eyebrow: "The Execution Engine",
    main_title: "Platform Components",
    description: "Not standalone products. Components of one execution engine, working together to run your operations.",
    items: [
      { icon: "FileText", title: "DocumentAI", description: "Intelligent document processing that reads, extracts, and validates at scale." },
      { icon: "Bot", title: "AI Agents", description: "Autonomous agents that make decisions and take action within your workflows." },
      { icon: "Settings", title: "Workflow Automation", description: "End-to-end process orchestration that connects every step." },
      { icon: "Link2", title: "Orchestration", description: "Enterprise-grade coordination across systems, teams, and exceptions." },
    ],
  },
  {
    __component: "acf-sections.qubi-execution-section",
    main_title: "AI is not the problem.",
    title_highlight: "Execution is.",
    description: "Most enterprise AI promises intelligence. But intelligence without action is just another dashboard.",
    items: [
      { icon: "BarChart2", title: "Analyzes but does not act", description: "Insight-only tools generate dashboards while your team still executes manually. AI that never acts is not reducing your workload." },
      { icon: "MousePointerClick", title: "Assists but does not complete", description: "Copilots and assistants help, but they do not finish the job. Someone still has to validate, correct, and push through every system." },
      { icon: "Unplug", title: "Sits outside operations", description: "Disconnected from your systems. Disconnected from your workflows. Disconnected from where the actual work happens." },
    ],
    callout_title: "qBotica does not sell intelligence. We sell execution.",
    callout_description: "Stop managing AI projects. Start getting work done.",
  },
  {
    __component: "acf-sections.qubi-comparison-section",
    eyebrow: "Comparison",
    main_title: "Why qBotica, not workflow tools?",
    them_label: "Workflow Automation Tools",
    us_label: "qubi",
    rows: [
      { aspect: "AI Role", them: "Optional add-on", us: "Core decision engine" },
      { aspect: "Document Processing", them: "Requires separate tools", us: "Built-in DocumentAI" },
      { aspect: "Delivery Model", them: "You build and operate", us: "We design and run (managed)" },
      { aspect: "Success Metric", them: "Task completion", us: "Business outcomes" },
      { aspect: "Exception Handling", them: "Manual intervention", us: "AI-powered escalation" },
      { aspect: "Pricing Model", them: "Per-seat or per-task licenses", us: "Outcome-based" },
    ],
  },
  {
    __component: "acf-sections.qubi-faq-section",
    eyebrow: "FAQ",
    main_title: "Common questions",
    items: [
      {
        question: "How is qBotica priced?",
        answer:
          "qBotica operates on an outcome-based model. You pay for work completed, not licenses consumed. Pricing is scoped per workflow based on volume, complexity, and the number of systems involved. We provide a detailed SOW after a discovery session.",
      },
      {
        question: "Is there a free trial or POC?",
        answer:
          "We do not offer free trials or open-ended POCs. We do offer a paid pilot on a single workflow with defined success metrics, so you can validate ROI before committing to full deployment.",
      },
      {
        question: "How long does implementation take?",
        answer:
          "Most workflows go live within 6-10 weeks. Complex multi-system orchestrations may take 12-16 weeks. We provide a detailed timeline during scoping.",
      },
      {
        question: "What systems does qubi integrate with?",
        answer:
          "qubi has 500+ pre-built connectors covering SAP, Oracle, Salesforce, ServiceNow, Workday, and most major enterprise platforms. We also build custom integrations as part of the managed service.",
      },
      {
        question: "What happens when there is an exception?",
        answer:
          "qubi handles most exceptions autonomously using AI-powered escalation logic. Cases requiring human judgment are routed to the right person with full context - no manual triage needed.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We measure success by the business outcomes defined in your SOW - processing time reduction, cost savings, accuracy improvement, and throughput increase. Every client has a custom outcome dashboard.",
      },
    ],
  },
  {
    __component: "acf-sections.qubi-final-cta-section",
    main_title: "Get a custom proposal for your workflow",
    description:
      "Every engagement starts with a 30-minute discovery call. We'll scope your workflow, define success metrics, and provide a tailored proposal.",
    button: { label: "Book a Discovery Call", url: DEMO_URL, targetBlank: true },
    secondary_button: { label: "Talk to an Expert", url: DEMO_URL, targetBlank: true },
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const existing = await app.documents("api::page.page").findFirst({
      filters: { slug: "pricing" },
    });

    if (existing && !FORCE) {
      console.log(
        `Page 'pricing' already exists (documentId=${existing.documentId}). Re-run with --force to overwrite its pageBuilder.`
      );
    } else if (existing) {
      await app.documents("api::page.page").update({
        documentId: existing.documentId,
        data: { pageBuilder },
        status: "published",
      });
      console.log(`Updated 'pricing' page with ${pageBuilder.length} qubi blocks.`);
    } else {
      const created = await app.documents("api::page.page").create({
        data: {
          title: "Pricing",
          slug: "pricing",
          pageType: "landing",
          pageBuilder,
        },
        status: "published",
      });
      console.log(
        `Created 'pricing' page (documentId=${created.documentId}) with ${pageBuilder.length} qubi blocks.`
      );
    }
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

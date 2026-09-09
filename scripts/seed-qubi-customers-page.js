/**
 * seed-qubi-customers-page.js — Creates the Customers page entry with qubi
 * pageBuilder blocks (simple hero, stats bar, case studies, why-us grid,
 * story, final CTA).
 *
 * Run from the project root:  node scripts/seed-qubi-customers-page.js [--force]
 * --force overwrites the pageBuilder of an existing "customers" page.
 */
"use strict";

const DEMO_URL = "https://meetings.hubspot.com/maheshv";
const FORCE = process.argv.includes("--force");

const pageBuilder = [
  {
    __component: "acf-sections.qubi-simple-hero",
    badge_text: "Proven Results",
    main_title: "Real Results from Real Operations",
    description:
      "Proven outcomes across enterprise workflows. No demos. No POCs. Real execution delivering measurable business impact.",
  },
  {
    __component: "acf-sections.qubi-stats-section",
    stats: [
      { value: "85%", label: "Average reduction in processing time across all clients" },
      { value: "10x", label: "Average increase in operational throughput" },
      { value: "$50M+", label: "Documented savings delivered to clients" },
      { value: "99%+", label: "Client retention rate" },
    ],
  },
  {
    __component: "acf-sections.qubi-case-studies-section",
    eyebrow: "Case Studies",
    main_title: "How we execute for enterprise clients",
    case_studies: [
      {
        industry: "Financial Services",
        title: "Invoice Reconciliation",
        challenge:
          "Manual invoice reconciliation taking 3 weeks per month, requiring a team of 12 analysts working nights and weekends at month-end close.",
        solution:
          "End-to-end invoice processing with AI decision-making via qubi. AI agents read invoices, match against POs, validate against ERP data, resolve exceptions autonomously, and post without human intervention.",
        quote:
          "We went from dreading month-end close to finishing in 2 days. The team now focuses on exceptions that actually need human judgment.",
        quote_role: "VP of Finance",
        metrics: [
          { label: "Processing Time", metric_type: "before_after", secondary_value: "21 days", primary_value: "2 days" },
          { label: "Accuracy", metric_type: "value", primary_value: "95%" },
          { label: "Annual Savings", metric_type: "value", primary_value: "$2M" },
        ],
      },
      {
        industry: "Healthcare",
        title: "Claims Processing",
        challenge:
          "40% manual review rate causing processing bottleneck. Claims that should take minutes were taking 3-5 business days due to manual queues.",
        solution:
          "AI agents handling claims extraction, validation, and routing. qubi reads EOBs, validates against policy rules, auto-adjudicates clean claims, and routes only exceptions to human reviewers.",
        quote:
          "Our adjudicators used to spend 80% of their time on routine claims. Now they handle only the cases that truly need clinical judgment.",
        quote_role: "Director of Claims Operations",
        metrics: [
          { label: "Processing Time", metric_type: "reduction", primary_value: "-60%" },
          { label: "Throughput", metric_type: "value", primary_value: "3x increase" },
          { label: "Accuracy", metric_type: "value", primary_value: "98%" },
        ],
      },
      {
        industry: "Shared Services",
        title: "Order-to-Cash",
        challenge:
          "Process fragmented across 5 disconnected systems - ERP, CRM, billing, fulfillment, and payments - with manual handoffs at every step.",
        solution:
          "qubi orchestrating all systems with AI decision-making. A single execution layer reads orders, validates customer data, triggers fulfillment, generates invoices, and reconciles payments.",
        quote:
          "Five systems, zero manual handoffs. qubi orchestrates everything. Our shared services team shifted from data entry to value-added analysis.",
        quote_role: "Head of Shared Services",
        metrics: [
          { label: "Manual Data Entry", metric_type: "value", primary_value: "Eliminated" },
          { label: "O2C Cycle Time", metric_type: "reduction", primary_value: "-50%" },
          { label: "Accuracy", metric_type: "value", primary_value: "99.2%" },
        ],
      },
    ],
  },
  {
    __component: "acf-sections.qubi-differentiators-section",
    eyebrow: "Why qBotica",
    main_title: "Why enterprise clients choose us",
    items: [
      { title: "We Own the Outcome", description: "qBotica doesn't hand you a tool and walk away. We design, deploy, monitor, and optimize your process continuously." },
      { title: "No Demos. No POCs.", description: "We don't demo hypothetical workflows. We execute real operations that are already running for clients like you." },
      { title: "Managed Service, Not Software", description: "You don't need a team to run it. We run it. Our experts manage your AI execution 24/7 as an operational partner." },
      { title: "Results-Based Accountability", description: "We measure success by your business outcomes, processing time, accuracy, cost savings, not by uptime or license seats." },
    ],
  },
  {
    __component: "acf-sections.qubi-story-section",
    eyebrow: "Our Story",
    main_title: "Why We Built qBotica",
    paragraphs: [
      { text: "Enterprises don't have a technology problem. They have an execution problem." },
      { text: "AI made intelligence easy. Models got smarter, faster, cheaper. But the work? The work is still stuck. Still manual. Still waiting on someone to act." },
      { text: "We watched companies buy AI tools, build dashboards, hire consultants. And still process invoices by hand. Still route claims through spreadsheets. Still reconcile financials at 2 AM." },
      { text: "qBotica was built to fix that. Not with another tool. Not with another platform. With a team and an engine that takes your operations and runs them." },
    ],
    stats: [
      { value: "85%", label: "Reduction in processing time" },
      { value: "10x", label: "Increase in throughput" },
      { value: "99.2%", label: "Accuracy rate achieved" },
    ],
  },
  {
    __component: "acf-sections.qubi-final-cta-section",
    main_title: "Become our next success story",
    description:
      "Tell us your most critical workflow. In 30 minutes, we'll show you exactly how qubi executes it end-to-end.",
    button: { label: "Book a Demo", url: DEMO_URL, targetBlank: true },
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const existing = await app.documents("api::page.page").findFirst({
      filters: { slug: "customers" },
    });

    if (existing && !FORCE) {
      console.log(
        `Page 'customers' already exists (documentId=${existing.documentId}). Re-run with --force to overwrite its pageBuilder.`
      );
    } else if (existing) {
      await app.documents("api::page.page").update({
        documentId: existing.documentId,
        data: { pageBuilder },
        status: "published",
      });
      console.log(`Updated 'customers' page with ${pageBuilder.length} qubi blocks.`);
    } else {
      const created = await app.documents("api::page.page").create({
        data: {
          title: "Customers",
          slug: "customers",
          pageType: "landing",
          pageBuilder,
        },
        status: "published",
      });
      console.log(
        `Created 'customers' page (documentId=${created.documentId}) with ${pageBuilder.length} qubi blocks.`
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

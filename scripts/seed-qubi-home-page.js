/**
 * seed-qubi-home-page.js — Creates the Home page entry with all qubi orchestro
 * home sections as pageBuilder dynamic-zone blocks.
 *
 * Run from the project root:  node scripts/seed-qubi-home-page.js [--force]
 * --force overwrites the pageBuilder of an existing "home" page.
 */
"use strict";

const DEMO_URL = "https://meetings.hubspot.com/maheshv";
const FORCE = process.argv.includes("--force");

const pageBuilder = [
  {
    __component: "acf-sections.qubi-home-hero",
    badge_text: "Agentic Automation Platform",
    main_title: "Orchestrate AI Agents, Bots, Systems & People with qubi",
    description:
      "A unified platform for designing, deploying, and managing intelligent workflows powered by AI agents, automation, human input, and enterprise integrations.",
    button: { label: "Book a Demo", url: DEMO_URL, targetBlank: true },
  },
  {
    __component: "acf-sections.qubi-demo-preview",
    video_title: "qubi Platform Full Demo",
    video_duration: "12 minutes End-to-end execution walkthrough",
  },
  {
    __component: "acf-sections.qubi-problem-section",
    main_title: "Enterprise work is too fragmented to automate with bots alone",
    description:
      "Most enterprises struggle with siloed tools, manual processes, and limited scalability - making true end-to-end automation impossible.",
    problem_items: [
      { icon: "Unlink", title: "Disconnected systems" },
      { icon: "HandMetal", title: "Manual handoffs" },
      { icon: "AlertTriangle", title: "Exception-heavy workflows" },
      { icon: "Eye", title: "Limited visibility" },
      { icon: "Scaling", title: "Difficulty scaling automation" },
    ],
  },
  {
    __component: "acf-sections.qubi-capabilities-section",
    eyebrow: "What qubi is",
    main_title: "One platform. Modular capabilities. Enterprise control.",
    capability_items: [
      { icon: "Paintbrush", title: "Design", description: "Build automations and AI-powered workflows with low-code tools." },
      { icon: "Layers", title: "Orchestrate", description: "Coordinate bots, agents, systems, and workloads from one control layer." },
      { icon: "Plug", title: "Integrate", description: "Connect enterprise systems, apps, data, and AI services seamlessly." },
      { icon: "Users", title: "Collaborate", description: "Bring humans into the loop when judgment or approvals are required." },
      { icon: "BarChart3", title: "Optimize", description: "Measure performance, ROI, and operational impact in real time." },
      { icon: "ShieldCheck", title: "Support & Govern", description: "Manage access, support issues, and enterprise reliability at scale." },
    ],
  },
  {
    __component: "acf-sections.qubi-outcomes-section",
    eyebrow: "Platform outcomes",
    main_title: "Built for measurable operational impact",
    outcome_items: [
      { icon: "Zap", title: "Faster cycle times", description: "Accelerate end-to-end process completion" },
      { icon: "DollarSign", title: "Lower operating cost", description: "Reduce manual effort and rework" },
      { icon: "TrendingUp", title: "Better productivity", description: "Free teams for higher-value work" },
      { icon: "Shield", title: "More resilient operations", description: "Handle exceptions gracefully at scale" },
      { icon: "Eye", title: "Better visibility into ROI", description: "Track measurable outcomes in real time" },
      { icon: "Lock", title: "Stronger governance", description: "Centralized access and compliance control" },
    ],
  },
  {
    __component: "acf-sections.qubi-how-it-works-section",
    eyebrow: "How it works",
    main_title: "From discovery to scale in four steps",
    steps: [
      { icon: "Search", step_number: "01", title: "Identify", description: "Discover high-value automation opportunities across your organization." },
      { icon: "PenTool", step_number: "02", title: "Design", description: "Build workflows and agent experiences with low-code tools and AI assistance." },
      { icon: "Rocket", step_number: "03", title: "Deploy", description: "Roll out automations across systems and teams with enterprise-grade reliability." },
      { icon: "LineChart", step_number: "04", title: "Optimize", description: "Monitor, measure, and continuously scale for maximum operational impact." },
    ],
  },
  {
    __component: "acf-sections.qubi-use-cases-section",
    eyebrow: "Use cases",
    main_title: "Automation that fits your business",
    use_case_items: [
      { icon: "Headphones", title: "Customer Service & Support", description: "Automate ticket routing, resolution, and follow-ups with AI agents and human escalation." },
      { icon: "Calculator", title: "Finance & Back Office", description: "Streamline invoicing, reconciliation, and compliance workflows across systems." },
      { icon: "Monitor", title: "IT Operations", description: "Orchestrate monitoring, incident response, and infrastructure management." },
      { icon: "FileText", title: "Document-Heavy Workflows", description: "Extract, validate, and process documents with intelligent automation." },
      { icon: "UserCog", title: "Employee Operations", description: "Automate onboarding, HR requests, and internal service delivery." },
      { icon: "GitBranch", title: "Cross-System Orchestration", description: "Connect and coordinate processes spanning multiple enterprise platforms." },
    ],
  },
  {
    __component: "acf-sections.qubi-integration-section",
    eyebrow: "Integrations",
    main_title: "Works across your existing stack",
    description:
      "Connect to the systems you already use - from enterprise ERPs to modern AI APIs - with pre-built connectors and extensible integration layers.",
    integration_items: [
      { icon: "Building2", label: "Enterprise Apps", count: "500+" },
      { icon: "Database", label: "Databases", count: "50+" },
      { icon: "Globe", label: "APIs", count: "200+" },
      { icon: "Brain", label: "AI Services / LLMs", count: "20+" },
      { icon: "Wrench", label: "Third-Party Tools", count: "300+" },
    ],
  },
  {
    __component: "acf-sections.qubi-human-in-loop-section",
    eyebrow: "Human-in-the-Loop",
    main_title: "Automation where it makes sense. Human judgment where it matters.",
    description:
      "qubi seamlessly routes tasks between AI agents and human operators. When a workflow requires approval, exception handling, or expert judgment, the right person is brought into the loop - with full context and zero friction.",
    badges: [
      { title: "Attended automation" },
      { title: "Smart routing" },
      { title: "Approval workflows" },
    ],
    button: { label: "Learn More", url: DEMO_URL, targetBlank: true },
  },
  {
    __component: "acf-sections.qubi-analytics-section",
    eyebrow: "Analytics and Trust",
    main_title: "Visibility, performance, and accountability built in",
    features: [
      { icon: "BarChart3", title: "ROI tracking", description: "Quantify the value of every automated workflow." },
      { icon: "Activity", title: "Pipeline visibility", description: "See all running automations in real time." },
      { icon: "Gauge", title: "Automation performance", description: "Track success rates, latency, and throughput." },
      { icon: "Monitor", title: "Workload monitoring", description: "Balance agent capacity and system load." },
      { icon: "Headphones", title: "Support management", description: "Manage support tickets and SLA compliance." },
      { icon: "Lock", title: "Centralized access control", description: "Role-based governance across the platform." },
    ],
  },
  {
    __component: "acf-sections.qubi-final-cta-section",
    main_title: "See what qubi can automate in your enterprise",
    description:
      "Ready to move from fragmented processes to intelligent, orchestrated workflows? Let's talk.",
    button: { label: "Book a Demo", url: DEMO_URL, targetBlank: true },
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
      filters: { slug: "home" },
    });

    if (existing && !FORCE) {
      console.log(
        `Page 'home' already exists (documentId=${existing.documentId}). Re-run with --force to overwrite its pageBuilder.`
      );
    } else if (existing) {
      await app.documents("api::page.page").update({
        documentId: existing.documentId,
        data: { pageBuilder },
      });
      console.log(`Updated 'home' page with ${pageBuilder.length} qubi blocks.`);
    } else {
      const created = await app.documents("api::page.page").create({
        data: {
          title: "Home",
          slug: "home",
          pageType: "landing",
          pageBuilder,
        },
      });
      console.log(
        `Created 'home' page (documentId=${created.documentId}) with ${pageBuilder.length} qubi blocks.`
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

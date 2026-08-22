import { useState, useRef, useEffect } from "react";

// ── REFERENCE MATERIALS PER CASE ─────────────────────────────────────────
const REFERENCES = {
  "kaka-cafe": {
    concepts: ["Local Marketing", "Brand Positioning", "F&B Operations", "Customer Retention"],
    youtube: [
      { title: "How to Market a Restaurant with Zero Budget", url: "https://www.youtube.com/results?search_query=restaurant+marketing+zero+budget+india", desc: "Guerrilla marketing tactics for F&B" },
      { title: "Swiggy vs Zomato — Restaurant Strategy", url: "https://www.youtube.com/results?search_query=swiggy+zomato+restaurant+strategy", desc: "How restaurants win on delivery platforms" },
      { title: "Brand Positioning Explained Simply", url: "https://www.youtube.com/results?search_query=brand+positioning+explained+simply", desc: "Core branding framework in plain English" },
    ],
    articles: [
      { title: "How MTR Built a ₹500Cr Brand from One Restaurant", url: "https://www.google.com/search?q=MTR+brand+story+bengaluru+restaurant", desc: "Bengaluru F&B brand building case" },
      { title: "Hyperlocal Marketing for Indian Restaurants", url: "https://www.google.com/search?q=hyperlocal+marketing+indian+restaurant+strategy", desc: "Practical tactics for local visibility" },
      { title: "Word of Mouth vs Paid Marketing — What Works in India", url: "https://www.google.com/search?q=word+of+mouth+marketing+india+small+business", desc: "Organic growth for budget-constrained businesses" },
    ],
    frameworks: ["4Ps of Marketing", "Customer Journey Map", "Word of Mouth Flywheel", "Local SEO Basics"],
  },
  "aadit-infra": {
    concepts: ["Change Management", "Operations Design", "Cost Control", "Digital Adoption"],
    youtube: [
      { title: "Change Management — Why People Resist New Systems", url: "https://www.youtube.com/results?search_query=change+management+why+employees+resist", desc: "Psychology of adoption in traditional industries" },
      { title: "Construction Project Cost Overruns — Root Causes", url: "https://www.youtube.com/results?search_query=construction+cost+overrun+reasons+solutions", desc: "Industry-specific problem analysis" },
      { title: "McKinsey 7S Framework Explained", url: "https://www.youtube.com/results?search_query=mckinsey+7s+framework+explained", desc: "Org change framework used by consultants" },
    ],
    articles: [
      { title: "Why Digital Transformation Fails in Construction", url: "https://www.google.com/search?q=digital+transformation+failure+construction+industry+india", desc: "Real reasons adoption fails on site" },
      { title: "Labour Management in Indian Construction", url: "https://www.google.com/search?q=labour+management+indian+construction+challenges", desc: "Ground realities of site workforce" },
      { title: "Unit Economics for Contractors — How to Stay Profitable", url: "https://www.google.com/search?q=construction+contractor+unit+economics+india", desc: "Financial discipline in project businesses" },
    ],
    frameworks: ["Root Cause Analysis (5 Whys)", "Change Management ADKAR", "Cost Variance Analysis", "KPI Dashboard Design"],
  },
  "zepto-dark-store": {
    concepts: ["Unit Economics", "Quick Commerce", "Tier 2 Markets", "VC Reporting"],
    youtube: [
      { title: "Zepto Business Model Explained", url: "https://www.youtube.com/results?search_query=zepto+business+model+dark+store+india", desc: "How quick commerce actually works" },
      { title: "Unit Economics for Startups — CAC, LTV, Payback", url: "https://www.youtube.com/results?search_query=unit+economics+startups+CAC+LTV+explained", desc: "Core financial literacy for growth roles" },
      { title: "Tier 2 India — The Next Billion Users", url: "https://www.youtube.com/results?search_query=tier+2+india+market+consumer+behavior", desc: "How Tier 2 consumer behaviour differs" },
    ],
    articles: [
      { title: "Blinkit vs Zepto vs Swiggy Instamart — Who Wins?", url: "https://www.google.com/search?q=blinkit+zepto+swiggy+instamart+competition+analysis+2024", desc: "Competitive dynamics in quick commerce" },
      { title: "Why Quick Commerce Struggles in Smaller Cities", url: "https://www.google.com/search?q=quick+commerce+tier+2+city+challenges+india", desc: "Structural problems in Tier 2 expansion" },
      { title: "Kirana vs Apps — The Real War in Indian Grocery", url: "https://www.google.com/search?q=kirana+store+vs+quick+commerce+india", desc: "Trust and relationship dynamics" },
    ],
    frameworks: ["Contribution Margin Analysis", "Market Sizing (TAM/SAM/SOM)", "Competitive Moat Framework", "Shut vs Double Down Decision Tree"],
  },
  "saas-churn": {
    concepts: ["SaaS Metrics", "Customer Success", "Product-Led Growth", "Retention"],
    youtube: [
      { title: "SaaS Churn — Why Customers Leave and How to Fix It", url: "https://www.youtube.com/results?search_query=saas+churn+reduction+strategies", desc: "Practical playbook for reducing monthly churn" },
      { title: "Customer Success vs Customer Support — The Difference", url: "https://www.youtube.com/results?search_query=customer+success+vs+support+saas", desc: "Proactive retention strategy explained" },
      { title: "Product-Led Growth — How Slack and Notion Grew", url: "https://www.youtube.com/results?search_query=product+led+growth+explained+examples", desc: "Growth through product experience" },
    ],
    articles: [
      { title: "The SaaS Metrics That Matter — MRR, Churn, NRR", url: "https://www.google.com/search?q=saas+metrics+MRR+churn+NRR+explained+india", desc: "Financial fluency for SaaS roles" },
      { title: "How Freshdesk Won Indian SMEs — Case Study", url: "https://www.google.com/search?q=freshdesk+india+SME+growth+strategy", desc: "Indian B2B SaaS success story" },
      { title: "Onboarding as Retention — First 14 Days Matter Most", url: "https://www.google.com/search?q=saas+onboarding+retention+first+14+days", desc: "Why most churn is decided in week one" },
    ],
    frameworks: ["Cohort Retention Analysis", "Jobs To Be Done Framework", "Customer Health Score", "NPS + Exit Interview Design"],
  },
  "college-edtech": {
    concepts: ["Monetisation Models", "Pricing Psychology", "Freemium Strategy", "Solo Founder Decisions"],
    youtube: [
      { title: "Why People Don't Pay for Free Products — Pricing Psychology", url: "https://www.youtube.com/results?search_query=pricing+psychology+why+free+users+dont+pay", desc: "The core reason Riya's app has zero revenue" },
      { title: "Freemium vs Premium — Which Model Works?", url: "https://www.youtube.com/results?search_query=freemium+vs+premium+pricing+model+startup", desc: "When to charge and when to keep free" },
      { title: "Building a Startup Alone — Solo Founder Survival Guide", url: "https://www.youtube.com/results?search_query=solo+founder+startup+tips+india", desc: "How to make decisions without a co-founder" },
    ],
    articles: [
      { title: "Unacademy's First 1000 Users — How They Monetised", url: "https://www.google.com/search?q=unacademy+early+growth+monetisation+strategy", desc: "Indian edtech monetisation playbook" },
      { title: "B2B vs B2C Monetisation for EdTech", url: "https://www.google.com/search?q=edtech+B2B+vs+B2C+monetisation+india", desc: "Why selling to colleges beats selling to students" },
      { title: "The Cold Start Problem — How Apps Get Their First Paying Users", url: "https://www.google.com/search?q=cold+start+problem+first+paying+users+app", desc: "Andrew Chen's framework applied to consumer apps" },
    ],
    frameworks: ["Value Ladder Pricing", "B2B2C Model", "Willingness to Pay Testing", "Lean Monetisation Experiments"],
  },
};

// ── CASES ────────────────────────────────────────────────────────────────
const CASES = [
  {
    id: "kaka-cafe",
    category: "Marketing & Brand",
    difficulty: "Intermediate",
    company: "Kaka Cafe",
    title: "Kaka Cafe is losing walk-in customers despite good food",
    brief: `Kaka Cafe is a North Indian and Rajasthani restaurant in Yelahanka, Bengaluru. The food quality is genuine — dal bati churma, rajasthani thali — but walk-in footfall has been dropping.

The owner recently rebranded from "Kaka Cafe" to "Kaka Rajasthani" to better signal the cuisine. They have a garden seating area of ~1,000 sq ft, an active local area, and apartment complexes nearby. But awareness is low, and most new customers come only through word of mouth.

You are the business strategy consultant. The owner has a limited budget — under ₹50,000 for marketing. What do you do?`,
    tags: ["Branding", "Local Marketing", "F&B", "Budget Strategy"],
    color: "#FF6B35",
    icon: "🍽️",
    solves: 847,
    systemPrompt: `You are an elite business strategy mentor on CaseOS. The candidate is solving a REAL case about Kaka Cafe — a genuine Rajasthani restaurant in Yelahanka, Bengaluru facing a walk-in footfall problem after rebranding. All facts below are real — do NOT invent or assume any details not listed here.

VERIFIED REAL FACTS (use only these):
- Restaurant name: Kaka Cafe, recently rebranded to Kaka Rajasthani
- Location: Yelahanka, North Bengaluru
- Cuisine: Authentic North Indian and Rajasthani — dal bati churma, rajasthani thali are flagship dishes
- Core problem: Walk-in customer footfall dropping despite genuinely good food quality
- Key asset: ~1,000 sq ft garden/outdoor seating area
- Nearby: Apartment complexes within walking distance
- Current marketing: Primarily word of mouth only
- Budget constraint: Under ₹50,000 total for marketing

IMPORTANT: If you don't know a specific detail (exact number of apartments, exact revenue, exact staff count), DO NOT make it up. Instead ask the candidate what they would want to know and why.

YOUR ROLE: Socratic mentor who thinks like a Bengaluru startup investor and F&B operator combined.

RULES:
- Never give away solutions. Always ask the next question that deepens their thinking.
- Only introduce constraints or data points that are consistent with the verified facts above.
- Challenge weak assumptions: "That sounds good — but what's your evidence that would work in Yelahanka specifically?"
- Reference real Bengaluru F&B examples when relevant (MTR, Brahmin's Coffee Bar, local darshinis)
- Keep responses to 3-4 sentences max
- After 6+ exchanges, offer to generate a scorecard
- Be warm but intellectually demanding`,
  },
  {
    id: "aadit-infra",
    category: "Operations & Finance",
    difficulty: "Advanced",
    company: "Aadit Infra",
    title: "Aadit Infra is losing money on projects despite winning contracts",
    brief: `Aadit Infra & Builders Pvt. Ltd. is a construction company that wins contracts but consistently runs over budget by 15-25% on projects. The core issues are: labour attendance is manually tracked and often inaccurate, material expenses are not recorded in real time, milestone payments from clients get delayed because documentation is slow, and site managers have no visibility into remaining budget mid-project.

The company recently built a digital system to track attendance, expenses, and milestones — but adoption by site managers has been poor. Projects are still running over budget.

You are brought in as the operations consultant. The company cannot afford to lose another project to cost overruns. What is your diagnosis and plan?`,
    tags: ["Operations", "Construction", "Cost Control", "Change Management"],
    color: "#6C63FF",
    icon: "🏗️",
    solves: 423,
    systemPrompt: `You are an elite operations and finance mentor on CaseOS. The candidate is solving a REAL case about Aadit Infra & Builders Pvt. Ltd. — a real construction company. Use only the verified facts below. Do not fabricate numbers, team sizes, or financials not listed here.

VERIFIED REAL FACTS:
- Company: Aadit Infra & Builders Pvt. Ltd. — Indian construction and building contractor
- Core problem: Projects run 15-25% over budget consistently
- Root cause 1: Labour attendance manually tracked and inaccurate
- Root cause 2: Material expenses not recorded in real time
- Root cause 3: Milestone payment documentation is slow causing client payment delays
- Root cause 4: Site managers have no mid-project budget visibility
- Recent attempt: A digital tracking system was built and deployed — but site managers are not using it
- Critical constraint: Cannot afford another cost overrun project

IMPORTANT: Do not invent revenue figures, team size, or client names. If a candidate asks for data not listed, acknowledge it's unknown and ask them what they'd do to find out.

YOUR ROLE: Socratic mentor thinking like a McKinsey operations consultant with Indian construction experience.

RULES:
- Never give solutions. Ask questions that force deeper thinking.
- Only add constraints consistent with real Indian construction realities (labour contractor dynamics, GST compliance, net-60 payment terms are all real and fair to mention)
- Challenge surface answers: "That's a common fix — why would it work when the previous system already tried that?"
- Keep responses 3-4 sentences max
- After 6+ exchanges offer scorecard`,
  },
  {
    id: "zepto-dark-store",
    category: "Growth & Unit Economics",
    difficulty: "Intermediate",
    company: "Zepto (Hypothetical)",
    title: "Zepto's dark store in a new city is burning cash with no path to profit",
    brief: `Zepto, the 10-minute grocery delivery startup, has launched a dark store in Indore — a Tier 2 city. Three months in, the numbers are bad: average order value is ₹280 (vs ₹480 in Mumbai), delivery cost per order is ₹65, and the store is doing only 180 orders per day against a break-even target of 400.

The local competitor — a WhatsApp-based grocery service run by a kirana network — is faster on trust and cheaper on price. Zepto's VC board is asking whether to shut the Indore store or double down.

You are the City Head for Zepto Indore. You have 60 days and ₹40 lakhs remaining budget to either fix this or make the case to shut down. What do you do?`,
    tags: ["Unit Economics", "Growth", "Tier 2", "Quick Commerce"],
    color: "#00C896",
    icon: "⚡",
    solves: 1204,
    systemPrompt: `You are an elite growth and unit economics mentor on CaseOS. This is a HYPOTHETICAL case inspired by real quick commerce dynamics in India. The facts below are the defined scenario — treat them as real and do not fabricate additional data beyond what is listed.

DEFINED SCENARIO FACTS:
- Company: Zepto (real company, hypothetical city scenario)
- Location: Indore dark store, launched 3 months ago
- AOV: ₹280 (vs ₹480 Mumbai benchmark)
- Delivery cost: ₹65 per order
- Current orders: 180/day vs break-even target of 400/day
- Local competitor: WhatsApp-based kirana grocery network — cheaper and more trusted locally
- Remaining resources: 60 days, ₹40L budget
- Decision required: Fix it or shut it down

IMPORTANT: These numbers are the defined case. Do not change them. If you introduce new twists mid-conversation, they must be logically consistent with this scenario (e.g. "What if 60% of current orders come from just 2 apartments?" is fair. Inventing a new competitor or changing the AOV without reason is not.)

YOUR ROLE: Socratic mentor thinking like a Sequoia growth investor with Tier 2 India experience.

RULES:
- Never give answers. Ask questions that force analytical and strategic thinking.
- Push hard on unit economics: "You said increase orders — but at what CAC and does that math work?"
- Challenge Tier 1 thinking: "That worked in Bangalore — why specifically would it work in Indore?"
- Keep responses 3-4 sentences max
- After 6+ exchanges offer scorecard`,
  },
  {
    id: "saas-churn",
    category: "Product & Retention",
    difficulty: "Intermediate",
    company: "B2B SaaS Startup",
    title: "A SaaS startup raised ₹5Cr but is losing 12% of customers every month",
    brief: `A B2B SaaS company selling HR software to Indian SMEs raised ₹5 crore Series A six months ago. Their product helps companies manage attendance, payroll, and compliance — priced at ₹8,000/month per company.

The problem: monthly churn is 12%. That means every month they lose 12 out of every 100 customers. At this rate, the company will be smaller in 12 months than it is today, regardless of how many new customers they sign.

Exit interviews show customers leave for three reasons: "too complex to use", "our CA does this for us anyway", and "we forgot we were even paying for it." The founding team is focused on adding new features. The investor is worried.

You are brought in as the growth consultant. Churn must come down to under 3% in 90 days or the next funding round is at risk. What is your plan?`,
    tags: ["SaaS", "Churn", "Product", "Retention"],
    color: "#FF6B6B",
    icon: "📉",
    solves: 689,
    systemPrompt: `You are an elite product and retention mentor on CaseOS. This is a HYPOTHETICAL case representing a common and real SaaS problem in India. Use only the defined facts below.

DEFINED SCENARIO FACTS:
- Company type: B2B SaaS — HR software (attendance, payroll, compliance) for Indian SMEs
- Price: ₹8,000/month per company
- Funding: ₹5Cr Series A raised 6 months ago
- Problem: 12% monthly churn rate
- Exit interview data — customers say: "too complex", "CA does this anyway", "forgot we were paying"
- Team behaviour: Focused on adding new features instead of fixing retention
- Hard constraint: Churn must reach <3% in 90 days or next funding round is at risk

IMPORTANT: Do not fabricate specific company names, investor names, or financial details beyond what is listed. If you add mid-case twists, keep them realistic and consistent (e.g. "80% of churned customers never logged in after week 2" is fair and realistic).

YOUR ROLE: Socratic mentor who has seen this exact churn problem kill multiple SaaS companies.

RULES:
- Never give solutions. Always ask the next question.
- Challenge feature-focused thinking: "Adding a feature won't fix someone who forgot they were paying — so what will?"
- Push on prioritisation: "Which of the three churn reasons do you attack first and why?"
- Keep responses 3-4 sentences max
- After 6+ exchanges offer scorecard`,
  },
  {
    id: "college-edtech",
    category: "Strategy & Pricing",
    difficulty: "Beginner",
    company: "Campus EdTech",
    title: "A college student built an edtech app but nobody is paying for it",
    brief: `Riya, a final-year engineering student from Pune, built a mobile app that helps students prepare for campus placement interviews — coding problems, HR questions, mock tests, and company-specific preparation guides. She has 4,200 downloads and 800 active monthly users. The feedback is excellent. Students love it.

But in 8 months, total revenue: ₹0. She tried a ₹499 premium plan — 3 people paid. She tried a ₹99/month subscription — 7 people paid. She is about to graduate and must decide: shut it down, find a job, or find a way to make this work.

She has no co-founder, no funding, and ₹60,000 in savings. 800 active users who love the product but won't pay.

You are her mentor. What is your diagnosis and what should she do in the next 30 days?`,
    tags: ["Monetisation", "EdTech", "Pricing", "Early Stage"],
    color: "#FFB347",
    icon: "🎓",
    solves: 2341,
    systemPrompt: `You are an elite early-stage startup mentor on CaseOS. This is a HYPOTHETICAL case representing a very common solo-founder problem. Use only the defined facts below.

DEFINED SCENARIO FACTS:
- Founder: Riya — fictional final-year engineering student, Pune
- Product: Mobile app for campus placement prep (coding problems, HR questions, mock tests, company guides)
- Traction: 4,200 downloads, 800 monthly active users
- User feedback: Excellent — students love it
- Revenue: ₹0 after 8 months of trying
- Failed attempts: ₹499 one-time (3 paid), ₹99/month subscription (7 paid)
- Constraints: No co-founder, no funding, ₹60,000 personal savings, graduating soon
- Decision she faces: Shut down / get a job / find a way to make it work

IMPORTANT: This is a beginner-level case. Be warm, accessible, and avoid heavy jargon without explaining it. Do not invent college names, investor names, or revenue figures beyond what is defined.

YOUR ROLE: Socratic mentor thinking like a YC partner who has seen 1,000 early stage startups.

RULES:
- Never give solutions. Ask questions that lead the candidate to discover the answer themselves.
- Mid-case twists should be realistic: "What if 70% of her users are from 5 colleges?" or "What if a placement coaching company offered to white-label her app?"
- Push on the core insight: "800 people use this monthly and love it — why won't they pay? What does that tell you about who the real customer is?"
- Keep responses 3-4 sentences max
- After 6+ exchanges offer scorecard`,
  },
];

// ── STORAGE (browser localStorage — persists per-browser on the deployed site) ──
const storage = {
  async get(key) {
    try {
      const val = localStorage.getItem(`caseos:${key}`);
      if (val === null) return null;
      return { key, value: val };
    } catch { return null; }
  },
  async set(key, value) {
    try {
      const str = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(`caseos:${key}`, str);
      return { key, value: str };
    } catch { return null; }
  },
  async list(prefix) {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`caseos:${prefix}`)) {
          keys.push(k.replace("caseos:", ""));
        }
      }
      return { keys };
    } catch { return { keys: [] }; }
  },
};

// ── THEME ─────────────────────────────────────────────────────────────────
const G = {
  bg: "#080810", surface: "#0E0E1C", border: "#1C1C30",
  text: "#EAE8F0", muted: "#6B6880",
  accent: "#7C6FFF", accentDim: "rgba(124,111,255,0.12)", accentBorder: "rgba(124,111,255,0.28)",
  green: "#00D4A0", orange: "#FF6B35", red: "#FF4D6D",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${G.bg};}
  ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:#2A2A40;border-radius:2px;}
  .hc:hover{border-color:${G.accent}!important;transform:translateY(-1px);} .hc{transition:all 0.18s ease;}
  .btn:hover{opacity:0.85;} .btn{transition:opacity 0.15s;}
  textarea:focus,input:focus{outline:none;border-color:${G.accent}!important;}
  textarea{resize:none;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
  @keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-3px);}}
  .fi{animation:fadeUp 0.25s ease;}
  .dot{animation:bounce 1s infinite;}
  .tab-active{color:${G.accent}!important;border-bottom:2px solid ${G.accent}!important;}
`;

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function CaseOS() {
  const [screen, setScreen] = useState("splash");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", role: "student", companyName: "", industry: "", college: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [scorecard, setScorecard] = useState(null);
  const [showScorePrompt, setShowScorePrompt] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [scorecardLoading, setScorecardLoading] = useState(false);
  const [showCreateCase, setShowCreateCase] = useState(false);
  const [chatTab, setChatTab] = useState("chat"); // chat | references
  const [newCase, setNewCase] = useState({ company: "", problem: "", facts: "", constraint: "", role: "", tags: "" });
  const [creatingCase, setCreatingCase] = useState(false);
  const [customCases, setCustomCases] = useState([]);
  // ── Business / Admin state ──
  const [bizProblems, setBizProblems] = useState([]);
  const [publishedProblems, setPublishedProblems] = useState([]);
  const [problemChat, setProblemChat] = useState([]);
  const [problemInput, setProblemInput] = useState("");
  const [problemChatLoading, setProblemChatLoading] = useState(false);
  const [problemReadyToFinalize, setProblemReadyToFinalize] = useState(false);
  const [finalizingProblem, setFinalizingProblem] = useState(false);
  const [viewingProblem, setViewingProblem] = useState(null);
  const [problemSubmissions, setProblemSubmissions] = useState([]);
  const [adminTab, setAdminTab] = useState("overview");
  const [adminStudents, setAdminStudents] = useState([]);
  const [adminExperts, setAdminExperts] = useState([]);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", credential: "" });
  const [inviting, setInviting] = useState(false);
  const [lastInvite, setLastInvite] = useState(null);
  const [refMaterial, setRefMaterial] = useState(null);
  const [refDraft, setRefDraft] = useState({ notes: "", links: "" });
  const [savingRef, setSavingRef] = useState(false);
  const [publishedSolution, setPublishedSolution] = useState(null);
  const [viewingTranscript, setViewingTranscript] = useState(null);
  const [expertQueue, setExpertQueue] = useState([]);
  const [expertLoading, setExpertLoading] = useState(false);
  const [expertCaseOpen, setExpertCaseOpen] = useState(null);
  const [solutionDraft, setSolutionDraft] = useState("");
  const [publishingSolution, setPublishingSolution] = useState(false);
  const [adminBusinesses, setAdminBusinesses] = useState([]);
  const [adminProblems, setAdminProblems] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const exchangeCount = useRef(0);
  const chatEndRef = useRef(null);
  const problemChatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { problemChatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [problemChat]);

  useEffect(() => {
    const init = async () => {
      try {
        for (const [email, seed] of Object.entries(DEMO_SEED_ACCOUNTS)) {
          const key = `user:${email}`;
          const ex = await storage.get(key);
          if (!ex?.value) await storage.set(key, seed);
        }
        // One-time demo data seed so a fresh visitor (in any role, in any order)
        // sees a completed loop instead of empty dashboards. Guarded by a flag
        // so it never overwrites real data on repeat visits.
        const seededFlag = await storage.get("demo:seed_v2");
        if (!seededFlag?.value) {
          for (const p of DEMO_SEED_PROBLEMS) await storage.set(`problem:${p.id}`, p);
          await storage.set(`progress:${DEMO_SEED_PROGRESS.studentId}:${DEMO_SEED_PROGRESS.caseId}`, DEMO_SEED_PROGRESS.value);
          await storage.set("demo:seed_v2", "true");
        }
      } catch {}
      const saved = sessionStorage.getItem("caseos_user");
      if (saved) {
        const u = JSON.parse(saved);
        setUser(u);
        setScreen(u.role === "admin" ? "admin" : u.role === "business" ? "bizDashboard" : u.role === "expert" ? "expert" : "dashboard");
      }
      else setTimeout(() => setScreen("auth"), 1600);
    };
    init();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role === "business") loadBizProblems();
    else if (user.role === "admin") loadAdminData();
    else if (user.role === "expert") loadExpertQueue();
    else { loadProgress(); loadPublishedProblems(); }
  }, [user]);

  const loadProgress = async () => {
    const result = await storage.list(`progress:${user.id}:`);
    const prog = {};
    if (result?.keys) {
      for (const key of result.keys) {
        const cid = key.replace(`progress:${user.id}:`, "");
        const data = await storage.get(key);
        if (data?.value) prog[cid] = JSON.parse(data.value);
      }
    }
    setUserProgress(prog);
    // Load custom cases
    const cc = await storage.get(`customcases:${user.id}`);
    if (cc?.value) setCustomCases(JSON.parse(cc.value));
  };

  const saveProgress = async (caseId, data) => {
    await storage.set(`progress:${user.id}:${caseId}`, data);
    setUserProgress(prev => ({ ...prev, [caseId]: data }));
  };

  const DEMO_SEED_ACCOUNTS = {
    "demo@caseos.in": { id: "u_demo_001", name: "Pankaj Demo", email: "demo@caseos.in", password: "caseos123", role: "student", college: "IIM Bengaluru", joinedAt: new Date().toISOString() },
    "business@caseos.in": { id: "u_biz_001", name: "Meera Iyer", email: "business@caseos.in", password: "biz123", role: "business", companyName: "Meraki Décor", industry: "Home & Living", joinedAt: new Date().toISOString() },
    "admin@caseos.in": { id: "u_admin_001", name: "CaseOS Admin", email: "admin@caseos.in", password: "admin123", role: "admin", joinedAt: new Date().toISOString() },
    "expert@caseos.in": { id: "u_expert_001", name: "Dr. Kavita Rao", email: "expert@caseos.in", password: "expert123", role: "expert", credential: "IIM Bangalore, ex-McKinsey", invitedBy: "u_admin_001", joinedAt: new Date().toISOString() },
  };

  // Demo problems + a completed scorecard so a first-time visitor sees the full
  // student → business → admin loop immediately, without manually walking through
  // the intake chat first. Distinct name from the curated Kaka Cafe case on purpose,
  // so a business demo login never looks like it already owns a curated case.
  const DEMO_SEED_PROBLEMS = [
    {
      id: "problem_demo_published_001", ownerId: "u_biz_001", ownerCompany: "Meraki Décor",
      title: "Meraki Décor's festive season sales dropped 40% despite record website traffic",
      brief: `Meraki Décor is a Bengaluru home decor and furnishing boutique selling handcrafted lamps, wall art, and small furniture online and from a single store in Indiranagar.

During this year's festive season (Oct-Nov), website traffic was the highest it's ever been — up 60% year-on-year — but actual sales were down 40% compared to last festive season. The founder suspects something changed in how visitors are converting, but isn't sure what.

You are the growth consultant brought in to diagnose this. What do you investigate first, and what's your plan?`,
      difficulty: "Intermediate", category: "Growth & Marketing",
      tags: ["Conversion", "E-commerce", "D2C", "Festive Season"], color: "#00D4A0", icon: "🪔",
      status: "published", isCommunity: true, createdAt: new Date(Date.now() - 6 * 86400000).toISOString(), approvedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      company: "Meraki Décor",
      systemPrompt: `You are an elite growth mentor on CaseOS. The candidate is solving a real case submitted by Meraki Décor, a Bengaluru home decor D2C boutique.

VERIFIED REAL FACTS (use ONLY these, never invent additional details):
- Business: Meraki Décor — handcrafted lamps, wall art, small furniture. Sells online + one Indiranagar store.
- This festive season: website traffic up 60% YoY, but sales down 40% YoY.
- Founder does not yet know the cause.

CRITICAL: These are the only facts you know. If the candidate asks for data not covered above (conversion rate, cart abandonment, ad spend, pricing changes), ask them what they'd want to find out and why — never fabricate numbers.

YOUR ROLE: Socratic mentor. Ask probing questions. Challenge assumptions. Never give solutions. After 6+ exchanges, offer to generate a scorecard. Keep responses to 3-4 sentences.`,
    },
    {
      id: "problem_demo_pending_001", ownerId: "u_biz_001", ownerCompany: "Meraki Décor",
      title: "Meraki Décor wants to open a second store but isn't sure which city",
      brief: `Meraki Décor has one profitable store in Indiranagar, Bengaluru, plus online sales across India. The founder wants to open a second physical store within the next two quarters but is torn between Bengaluru (a second location) and expanding to a new city entirely (Pune or Hyderabad are on the shortlist).

You are the strategy advisor helping structure this decision.`,
      difficulty: "Intermediate", category: "Strategy & Expansion",
      tags: ["Market Entry", "Retail", "D2C"], color: "#00D4A0", icon: "🪔",
      status: "pending_review", isCommunity: true, createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      company: "Meraki Décor",
      systemPrompt: `You are an elite strategy mentor on CaseOS. The candidate is solving a real case submitted by Meraki Décor.

VERIFIED REAL FACTS (use ONLY these):
- One profitable store in Indiranagar, Bengaluru. Also sells online pan-India.
- Deciding: second Bengaluru store vs. new city (Pune or Hyderabad shortlisted).
- Timeline: wants to decide and act within two quarters.

YOUR ROLE: Socratic mentor. Ask probing questions, never give solutions. After 6+ exchanges, offer a scorecard. Keep responses to 3-4 sentences.`,
    },
  ];

  const DEMO_SEED_PROGRESS = {
    studentId: "u_demo_001", caseId: "kaka-cafe",
    value: {
      messages: [
        { role: "assistant", content: "Welcome. Kaka Cafe just rebranded and footfall is still dropping. What's your first hypothesis — is this an awareness problem or a conversion problem?" },
        { role: "user", content: "I think it's awareness — the rebrand probably confused existing regulars and nobody nearby knows the new name yet." },
        { role: "assistant", content: "That's plausible — but what evidence would separate 'confused regulars' from 'never knew about us at all'? Those need very different fixes." },
      ],
      scorecard: {
        overall: 78, title: "Sharp diagnostic instinct, thin on validation",
        verdict: "Good first-principles thinking on the awareness-vs-conversion split, but the plan moved to tactics before nailing down which one it actually was.",
        scores: [
          { label: "Problem framing", score: 84, note: "Correctly split awareness vs conversion early" },
          { label: "Evidence-seeking", score: 65, note: "Could have asked for footfall-by-time-of-day data before committing" },
          { label: "Solution creativity", score: 80, note: "Local, low-budget ideas fit the ₹50,000 constraint well" },
        ],
        strengths: ["Split the problem into testable hypotheses early", "Stayed within the stated budget constraint"],
        improve: ["Validate the hypothesis with cheap evidence before proposing fixes", "Consider the garden seating as a distinct asset to leverage"],
        vc_signal: "Thinks in hypotheses, not just ideas — worth a follow-up case at Advanced difficulty.",
        next_case: "Try the Aadit Infra case next — it rewards the same diagnose-before-fixing instinct under more operational complexity.",
      },
      startedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      completedAt: new Date(Date.now() - 4 * 86400000 + 1800000).toISOString(),
      attempts: 1,
    },
  };

  const handleAuth = async (overrideEmail, overridePassword) => {
    setAuthError("");
    const emailRaw = overrideEmail ?? authForm.email;
    const passwordRaw = overridePassword ?? authForm.password;
    if (!emailRaw || !passwordRaw) { setAuthError("Please fill all fields"); return; }
    if (authMode === "signup" && !authForm.name) { setAuthError("Please enter your name"); return; }
    if (authMode === "signup" && authForm.role === "business" && !authForm.companyName) { setAuthError("Please enter your company name"); return; }
    setAuthLoading(true);
    try {
      const emailLc = emailRaw.toLowerCase().trim();
      const userKey = `user:${emailLc}`;
      let existing = await storage.get(userKey);
      // Self-heal: demo accounts may not have finished seeding yet, or storage was cleared.
      const demoSeed = DEMO_SEED_ACCOUNTS[emailLc];
      if (!existing?.value && demoSeed && passwordRaw === demoSeed.password) {
        await storage.set(userKey, demoSeed);
        existing = await storage.get(userKey);
      }
      if (authMode === "login" || overrideEmail) {
        if (!existing?.value) { setAuthError("No account found. Please sign up."); setAuthLoading(false); return; }
        const ud = JSON.parse(existing.value);
        if (ud.password !== passwordRaw) { setAuthError("Incorrect password"); setAuthLoading(false); return; }
        const u = { id: ud.id, name: ud.name, email: ud.email, role: ud.role || "student", companyName: ud.companyName || "", industry: ud.industry || "", college: ud.college || "", joinedAt: ud.joinedAt };
        setUser(u); sessionStorage.setItem("caseos_user", JSON.stringify(u));
        setScreen(u.role === "admin" ? "admin" : u.role === "business" ? "bizDashboard" : u.role === "expert" ? "expert" : "dashboard");
      } else {
        if (existing?.value) { setAuthError("Account already exists. Please log in."); setAuthLoading(false); return; }
        const nu = { id: `u_${Date.now()}`, name: authForm.name, email: emailLc, password: passwordRaw, role: authForm.role || "student", companyName: authForm.companyName || "", industry: authForm.industry || "", college: authForm.college || "", joinedAt: new Date().toISOString() };
        await storage.set(userKey, nu);
        const u = { id: nu.id, name: nu.name, email: nu.email, role: nu.role, companyName: nu.companyName, industry: nu.industry, college: nu.college, joinedAt: nu.joinedAt };
        setUser(u); sessionStorage.setItem("caseos_user", JSON.stringify(u));
        setScreen(u.role === "business" ? "bizDashboard" : "dashboard");
      }
    } catch { setAuthError("Something went wrong. Try again."); }
    setAuthLoading(false);
  };

  const logout = () => { sessionStorage.removeItem("caseos_user"); setUser(null); setScreen("auth"); };

  // ── Business / Admin data helpers ──────────────────────────────────────
  const loadAllProblems = async () => {
    const result = await storage.list("problem:");
    const list = [];
    if (result?.keys) {
      for (const key of result.keys) {
        const data = await storage.get(key);
        if (data?.value) list.push(JSON.parse(data.value));
      }
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const countSubmissions = async (problemId) => {
    const result = await storage.list(`submission:${problemId}:`);
    return result?.keys?.length || 0;
  };

  const loadSubmissionsFor = async (problemId) => {
    const result = await storage.list(`submission:${problemId}:`);
    const subs = [];
    if (result?.keys) {
      for (const key of result.keys) {
        const data = await storage.get(key);
        if (data?.value) subs.push(JSON.parse(data.value));
      }
    }
    return subs.sort((a, b) => (b.score || 0) - (a.score || 0));
  };

  const openProblemDetail = async (p) => {
    setViewingProblem(p);
    setProblemSubmissions(await loadSubmissionsFor(p.id));
    const rm = await loadReferenceMaterial(p.id);
    setRefMaterial(rm);
    setRefDraft({ notes: rm?.notes || "", links: (rm?.links || []).map(l => `${l.title} | ${l.url}`).join("\n") });
    setPublishedSolution(await loadSolution(p.id));
    setViewingTranscript(null);
  };

  const loadReferenceMaterial = async (caseId) => {
    try {
      const r = await storage.get(`refmaterial:${caseId}`);
      return r?.value ? JSON.parse(r.value) : null;
    } catch { return null; }
  };

  const saveReferenceMaterial = async (caseId) => {
    setSavingRef(true);
    const links = refDraft.links.split("\n").map(l => l.trim()).filter(Boolean).map(line => {
      const [title, url] = line.split("|").map(s => s.trim());
      return url ? { title: title || url, url } : { title: line, url: line };
    });
    const data = { notes: refDraft.notes, links, updatedAt: new Date().toISOString(), updatedBy: user.name };
    await storage.set(`refmaterial:${caseId}`, data);
    setRefMaterial(data);
    setSavingRef(false);
  };

  const loadSolution = async (caseId) => {
    try {
      const r = await storage.get(`solution:${caseId}`);
      return r?.value ? JSON.parse(r.value) : null;
    } catch { return null; }
  };

  const loadTranscript = async (studentId, caseId) => {
    try {
      const r = await storage.get(`progress:${studentId}:${caseId}`);
      return r?.value ? JSON.parse(r.value) : null;
    } catch { return null; }
  };

  const inviteExpert = async () => {
    if (!inviteForm.name || !inviteForm.email) return;
    setInviting(true);
    const password = Math.random().toString(36).slice(2, 10);
    const expert = { id: `u_expert_${Date.now()}`, name: inviteForm.name, email: inviteForm.email, password, role: "expert", credential: inviteForm.credential, invitedBy: user.id, joinedAt: new Date().toISOString() };
    await storage.set(`user:${inviteForm.email}`, expert);
    setLastInvite({ email: inviteForm.email, password });
    setInviteForm({ name: "", email: "", credential: "" });
    setInviting(false);
    loadAdminData();
  };

  const loadExpertQueue = async () => {
    setExpertLoading(true);
    const cases = [...CASES, ...(await loadAllProblems()).filter(p => p.status === "published")];
    const usersResult = await storage.list("user:");
    const userMap = {};
    if (usersResult?.keys) {
      for (const key of usersResult.keys) {
        const d = await storage.get(key);
        if (d?.value) { const u = JSON.parse(d.value); userMap[u.id] = u; }
      }
    }
    const queue = [];
    for (const c of cases) {
      const subs = await loadSubmissionsFor(c.id);
      if (!subs.length) continue;
      const sorted = [...subs].sort((a, b) => (b.score || 0) - (a.score || 0));
      const topCount = Math.max(1, Math.ceil(sorted.length * 0.1));
      const top = sorted.slice(0, topCount).map(s => ({ ...s, studentCollege: userMap[s.userId]?.college || "" }));
      const solution = await loadSolution(c.id);
      queue.push({ caseId: c.id, caseTitle: c.title, company: c.company, totalAttempts: sorted.length, top, hasSolution: !!solution, solution });
    }
    setExpertQueue(queue);
    setExpertLoading(false);
  };

  const publishSolution = async (caseId) => {
    if (!solutionDraft.trim()) return;
    setPublishingSolution(true);
    const data = { caseId, expertId: user.id, expertName: user.name, expertCredential: user.credential || "", content: solutionDraft.trim(), publishedAt: new Date().toISOString() };
    await storage.set(`solution:${caseId}`, data);
    setSolutionDraft("");
    setPublishingSolution(false);
    loadExpertQueue();
  };

  const loadPublishedProblems = async () => {
    const all = await loadAllProblems();
    setPublishedProblems(all.filter(p => p.status === "published"));
  };

  const loadBizProblems = async () => {
    const all = await loadAllProblems();
    const mine = all.filter(p => p.ownerId === user.id);
    for (const p of mine) p._submissionCount = await countSubmissions(p.id);
    setBizProblems(mine);
  };

  const loadAdminData = async () => {
    setAdminLoading(true);
    const result = await storage.list("user:");
    const students = [], businesses = [], experts = [];
    if (result?.keys) {
      for (const key of result.keys) {
        const data = await storage.get(key);
        if (!data?.value) continue;
        const u = JSON.parse(data.value);
        if (u.role === "student") students.push(u);
        else if (u.role === "business") businesses.push(u);
        else if (u.role === "expert") experts.push(u);
      }
    }
    setAdminExperts(experts);
    const problems = await loadAllProblems();
    for (const p of problems) p._submissionCount = await countSubmissions(p.id);
    for (const s of students) {
      const prog = await storage.list(`progress:${s.id}:`);
      let completed = 0, totalScore = 0;
      if (prog?.keys) {
        for (const key of prog.keys) {
          const d = await storage.get(key);
          if (d?.value) { const pd = JSON.parse(d.value); if (pd.scorecard) { completed++; totalScore += pd.scorecard.overall || 0; } }
        }
      }
      s._completed = completed;
      s._avgScore = completed ? Math.round(totalScore / completed) : 0;
    }
    for (const b of businesses) b._problemCount = problems.filter(p => p.ownerId === b.id).length;
    setAdminStudents(students);
    setAdminBusinesses(businesses);
    setAdminProblems(problems);
    setAdminLoading(false);
  };

  const approveProblem = async (p) => { await storage.set(`problem:${p.id}`, { ...p, status: "published", approvedAt: new Date().toISOString() }); loadAdminData(); };
  const rejectProblem = async (p) => { await storage.set(`problem:${p.id}`, { ...p, status: "rejected" }); loadAdminData(); };

  const PROBLEM_INTAKE_PROMPT = `You are a sharp intake analyst for CaseOS, a platform where startups post real business problems for students to solve. A business owner is describing their problem to you.

YOUR JOB: Ask precise, one-at-a-time clarifying questions to remove ambiguity and assumptions before this becomes a case study — e.g. clarify numbers, timeframes, what's already been tried, budget, team size, and what "success" would look like. Do not solve the problem or suggest answers. Keep each question short (1-3 sentences). After 4-6 solid exchanges, say clearly: "I think I have enough to draft this as a case — click Finalize below when you're ready." Never fabricate any facts not given to you.`;

  const startProblemIntake = () => {
    setProblemInput("");
    setProblemReadyToFinalize(false);
    setScreen("postProblem");
    setProblemChat([{ role: "assistant", content: "Tell me about the business problem you'd like candidates to solve. What's the situation, and what specifically do you need help figuring out?" }]);
  };

  const sendProblemMessage = async () => {
    if (!problemInput.trim() || problemChatLoading) return;
    const userMsg = problemInput.trim();
    setProblemInput("");
    const updated = [...problemChat, { role: "user", content: userMsg }];
    setProblemChat(updated);
    setProblemChatLoading(true);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 500, system: PROBLEM_INTAKE_PROMPT, messages: updated.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Can you tell me more about that?";
      const final = [...updated, { role: "assistant", content: reply }];
      setProblemChat(final);
      if (final.filter(m => m.role === "user").length >= 4) setProblemReadyToFinalize(true);
    } catch {
      setProblemChat([...updated, { role: "assistant", content: "Got it — can you add a bit more detail on that?" }]);
    }
    setProblemChatLoading(false);
  };

  const finalizeProblem = async () => {
    setFinalizingProblem(true);
    const req = `Based on our entire conversation, output ONLY a JSON object (no markdown, no backticks) structuring this into a case study:
{"title":"One-line problem headline","brief":"2-4 paragraph case brief written for a candidate to read, using ONLY facts from this conversation","difficulty":"Beginner|Intermediate|Advanced","category":"short category label","tags":["tag1","tag2","tag3"]}`;
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 800, system: PROBLEM_INTAKE_PROMPT, messages: [...problemChat.map(m => ({ role: m.role, content: m.content })), { role: "user", content: req }] }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      const id = `problem_${Date.now()}`;
      const conversationFacts = problemChat.map(m => `${m.role === "user" ? "Business" : "Analyst"}: ${m.content}`).join("\n");
      const problem = {
        id, ownerId: user.id, ownerCompany: user.companyName || user.name,
        title: parsed.title || "Untitled Problem", brief: parsed.brief || "",
        difficulty: parsed.difficulty || "Intermediate", category: parsed.category || "Business Strategy",
        tags: Array.isArray(parsed.tags) ? parsed.tags : [], color: "#00D4A0", icon: "🚀",
        status: "pending_review", isCommunity: true, createdAt: new Date().toISOString(), company: user.companyName || user.name,
        systemPrompt: `You are an elite business mentor on CaseOS. The candidate is solving a real case submitted by ${user.companyName || user.name}.

VERIFIED REAL FACTS (from the business owner's intake conversation — use ONLY these, never invent additional details):
${conversationFacts}

CRITICAL: These are the only facts you know. If the candidate asks for data not covered above, ask them what they'd want to find out and why — never fabricate numbers, names, or details.

YOUR ROLE: Socratic mentor. Ask probing questions. Challenge assumptions. Never give solutions. After 6+ exchanges, offer to generate a scorecard. Keep responses to 3-4 sentences.`,
      };
      await storage.set(`problem:${id}`, problem);
      setBizProblems(prev => [problem, ...prev]);
      setScreen("bizDashboard");
    } catch {
      alert("Couldn't finalize the problem — please try again.");
    }
    setFinalizingProblem(false);
  };

  const diffRank = { Beginner: 0, Intermediate: 1, Advanced: 2, Custom: 1 };
  const allCases = [...CASES, ...customCases, ...publishedProblems].sort((a, b) => (diffRank[a.difficulty] ?? 1) - (diffRank[b.difficulty] ?? 1));

  const startCase = async (c, isReattempt = false) => {
    setSelectedCase(c);
    setScorecard(null);
    setShowScorePrompt(false);
    setChatTab("chat");
    exchangeCount.current = 0;
    setScreen("chat");
    setAiLoading(true);
    setRefMaterial(await loadReferenceMaterial(c.id));
    setPublishedSolution(await loadSolution(c.id));

    const prog = userProgress[c.id];
    if (!isReattempt && prog?.messages?.length > 0) {
      setMessages(prog.messages);
      if (prog.scorecard) setScorecard(prog.scorecard);
      setAiLoading(false);
      return;
    }

    // Fresh start (new or reattempt)
    if (isReattempt) await saveProgress(c.id, { messages: [], scorecard: null, startedAt: new Date().toISOString(), attempts: (prog?.attempts || 0) + 1 });

    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: c.systemPrompt,
          messages: [{ role: "user", content: "I'm ready to begin this case." }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Welcome. What's your initial read on this case?";
      const initMsgs = [{ role: "assistant", content: reply }];
      setMessages(initMsgs);
      await saveProgress(c.id, { messages: initMsgs, scorecard: null, startedAt: new Date().toISOString(), attempts: prog?.attempts || 1 });
    } catch {
      const fb = [{ role: "assistant", content: "Welcome. Let's dig in. What's your first instinct about the core problem here?" }];
      setMessages(fb);
    }
    setAiLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || aiLoading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setAiLoading(true);
    exchangeCount.current += 1;
    const shouldOffer = exchangeCount.current >= 6;

    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: selectedCase.systemPrompt + (shouldOffer ? "\n\nAfter your response add exactly: [OFFER_SCORE]" : ""),
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      let reply = data.content?.[0]?.text || "Interesting. Push that further — what's your evidence?";
      if (reply.includes("[OFFER_SCORE]")) { reply = reply.replace("[OFFER_SCORE]", "").trim(); setShowScorePrompt(true); }
      const updated = [...newMessages, { role: "assistant", content: reply }];
      setMessages(updated);
      await saveProgress(selectedCase.id, { messages: updated, scorecard: userProgress[selectedCase.id]?.scorecard || null, startedAt: userProgress[selectedCase.id]?.startedAt || new Date().toISOString(), attempts: userProgress[selectedCase.id]?.attempts || 1 });
    } catch {
      const updated = [...newMessages, { role: "assistant", content: "Good point. What's the evidence for that?" }];
      setMessages(updated);
    }
    setAiLoading(false);
    inputRef.current?.focus();
  };

  const generateScore = async () => {
    setShowScorePrompt(false);
    setScorecardLoading(true);
    setScreen("score");
    const scoreReq = `Based on our entire conversation, generate a JSON scorecard only. Pure JSON, no markdown, no backticks:
{"overall":82,"title":"Sharp Strategic Thinker","verdict":"One honest sentence summary.","scores":[{"label":"Problem Framing","score":80,"note":"Specific observation"},{"label":"Data Thinking","score":72,"note":"Specific observation"},{"label":"Creative Solutions","score":85,"note":"Specific observation"},{"label":"Communication","score":78,"note":"Specific observation"},{"label":"Adaptability","score":80,"note":"Specific observation"}],"strengths":["Strength 1","Strength 2"],"improve":["Gap 1","Gap 2"],"vc_signal":"One sentence — would a VC or company want to talk to this person?","next_case":"One sentence recommendation for what to study next"}`;
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: selectedCase.systemPrompt,
          messages: [...messages.map(m => ({ role: m.role, content: m.content })), { role: "user", content: scoreReq }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setScorecard(parsed);
      await saveProgress(selectedCase.id, { messages, scorecard: parsed, startedAt: userProgress[selectedCase.id]?.startedAt, completedAt: new Date().toISOString(), attempts: userProgress[selectedCase.id]?.attempts || 1 });
      if (selectedCase.ownerId) {
        await storage.set(`submission:${selectedCase.id}:${user.id}`, { userId: user.id, userName: user.name, score: parsed.overall, title: parsed.title, completedAt: new Date().toISOString() });
      }
    } catch {
      const fb = { overall: 74, title: "Promising Thinker", verdict: "Strong instincts, needs sharper frameworks.", scores: [{ label: "Problem Framing", score: 76, note: "Good initial diagnosis" }, { label: "Data Thinking", score: 65, note: "Needs quantitative backing" }, { label: "Creative Solutions", score: 80, note: "Original ideas" }, { label: "Communication", score: 78, note: "Clear and direct" }, { label: "Adaptability", score: 72, note: "Adjusted well to new info" }], strengths: ["Clear thinking", "Practical suggestions"], improve: ["Back ideas with numbers", "Think second-order"], vc_signal: "Interesting — would revisit with stronger structure.", next_case: "Study unit economics frameworks next." };
      setScorecard(fb);
      await saveProgress(selectedCase.id, { messages, scorecard: fb, startedAt: userProgress[selectedCase.id]?.startedAt, completedAt: new Date().toISOString(), attempts: userProgress[selectedCase.id]?.attempts || 1 });
      if (selectedCase.ownerId) {
        await storage.set(`submission:${selectedCase.id}:${user.id}`, { userId: user.id, userName: user.name, score: fb.overall, title: fb.title, completedAt: new Date().toISOString() });
      }
    }
    setScorecardLoading(false);
  };

  const createCustomCase = async () => {
    if (!newCase.company || !newCase.problem || !newCase.facts) return;
    setCreatingCase(true);
    const id = `custom_${Date.now()}`;
    const tags = newCase.tags.split(",").map(t => t.trim()).filter(Boolean);
    const created = {
      id, category: "Custom Case", difficulty: "Custom", company: newCase.company,
      title: newCase.problem,
      brief: `${newCase.problem}\n\n${newCase.facts}${newCase.constraint ? `\n\nConstraint: ${newCase.constraint}` : ""}`,
      tags: tags.length ? tags : ["Custom"],
      color: "#A594FF", icon: "💼", solves: 0,
      isCustom: true,
      systemPrompt: `You are an elite business mentor on CaseOS. The candidate is solving a real case submitted by ${newCase.company}.

VERIFIED REAL FACTS (provided by the case creator — use ONLY these, do not invent any additional details):
Company/Context: ${newCase.company}
Problem: ${newCase.problem}
Key Facts: ${newCase.facts}
${newCase.constraint ? `Constraints: ${newCase.constraint}` : ""}
${newCase.role ? `Candidate Role: ${newCase.role}` : ""}

CRITICAL: These are the only facts you know. If the candidate asks for data not listed above, ask them what they would want to find out and why — never fabricate numbers, names, or details.

YOUR ROLE: Socratic mentor. Ask probing questions. Challenge assumptions. Never give solutions. After 6+ exchanges, offer to generate a scorecard. Keep responses to 3-4 sentences.`,
    };
    const updated = [...customCases, created];
    setCustomCases(updated);
    await storage.set(`customcases:${user.id}`, updated);
    setNewCase({ company: "", problem: "", facts: "", constraint: "", role: "", tags: "" });
    setShowCreateCase(false);
    setCreatingCase(false);
  };

  const scoreColor = s => s >= 75 ? G.green : s >= 60 ? "#FFB347" : G.red;
  const refs = selectedCase ? (REFERENCES[selectedCase.id] || null) : null;

  const problemDetailModal = viewingProblem ? (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }} onClick={() => setViewingProblem(null)}>
      <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 16, padding: 28, width: "100%", maxWidth: 560, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 17 }}>{viewingProblem.title}</div>
            <div style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>{viewingProblem.company} · {viewingProblem.difficulty}</div>
          </div>
          <button onClick={() => setViewingProblem(null)} className="btn" style={{ background: "none", border: "none", color: G.muted, fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ fontSize: 13, color: "#C8C4DC", lineHeight: 1.7, margin: "16px 0", whiteSpace: "pre-wrap" }}>{viewingProblem.brief}</div>
        {user?.role === "admin" && viewingProblem.status === "pending_review" && (
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <button onClick={async () => { await approveProblem(viewingProblem); setViewingProblem(null); }} className="btn" style={{ flex: 1, background: G.green, color: "#08120E", border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>✓ Approve &amp; Publish</button>
            <button onClick={async () => { await rejectProblem(viewingProblem); setViewingProblem(null); }} className="btn" style={{ flex: 1, background: "rgba(255,77,109,0.1)", color: G.red, border: "1px solid rgba(255,77,109,0.3)", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>✕ Reject</button>
          </div>
        )}
        {publishedSolution && (
          <div style={{ background: "rgba(255,179,71,0.08)", border: "1px solid rgba(255,179,71,0.3)", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#FFB347", letterSpacing: "0.5px", marginBottom: 8 }}>🏆 EXPERT TOP SOLUTION — {publishedSolution.expertName}{publishedSolution.expertCredential ? ` (${publishedSolution.expertCredential})` : ""}</div>
            <div style={{ fontSize: 13, color: "#C8C4DC", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{publishedSolution.content}</div>
          </div>
        )}

        {/* Business sees an aggregate only, never named students */}
        {user?.role === "business" && (
          <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
            <div style={{ flex: 1, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "14px", textAlign: "center" }}>
              <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 20 }}>{problemSubmissions.length}</div>
              <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>Candidates attempted</div>
            </div>
            <div style={{ flex: 1, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "14px", textAlign: "center" }}>
              <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 20, color: G.green }}>{problemSubmissions.length ? Math.round(problemSubmissions.reduce((a, s) => a + (s.score || 0), 0) / problemSubmissions.length) : "—"}</div>
              <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>Avg. score</div>
            </div>
          </div>
        )}

        {/* Admin sees named submissions + can open the full transcript */}
        {user?.role === "admin" && (
          <>
            <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 12 }}>SUBMISSIONS ({problemSubmissions.length})</div>
            {problemSubmissions.length === 0 ? (
              <div style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "20px 0" }}>No candidates have completed this yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {problemSubmissions.map((s, i) => (
                  <div key={i}>
                    <div className="hc" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }}
                      onClick={async () => setViewingTranscript(viewingTranscript?.userId === s.userId ? null : { ...s, data: await loadTranscript(s.userId, viewingProblem.id) })}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{i === 0 ? "🥇 " : i === 1 ? "🥈 " : i === 2 ? "🥉 " : ""}{s.userName}</div>
                        <div style={{ fontSize: 11, color: G.muted }}>{s.title} · tap to view conversation</div>
                      </div>
                      <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 18, color: scoreColor(s.score) }}>{s.score}</div>
                    </div>
                    {viewingTranscript?.userId === s.userId && (
                      <div style={{ background: "#09090F", border: `1px solid ${G.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px", maxHeight: 260, overflowY: "auto" }}>
                        {viewingTranscript.data?.messages?.length ? viewingTranscript.data.messages.map((m, mi) => (
                          <div key={mi} style={{ marginBottom: 10, fontSize: 12, lineHeight: 1.6 }}>
                            <span style={{ fontWeight: 700, color: m.role === "user" ? G.accent : G.green }}>{m.role === "user" ? s.userName.split(" ")[0] : "AI Mentor"}: </span>
                            <span style={{ color: "#C8C4DC" }}>{m.content}</span>
                          </div>
                        )) : <div style={{ fontSize: 12, color: G.muted }}>Transcript not available.</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 10 }}>📚 REFERENCE MATERIAL FOR STUDENTS</div>
            <textarea value={refDraft.notes} onChange={e => setRefDraft(p => ({ ...p, notes: e.target.value }))} placeholder="Notes / prep guidance shown to students before they attempt this case..."
              style={{ width: "100%", minHeight: 70, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 12px", color: G.text, fontSize: 13, fontFamily: "Inter", resize: "vertical", marginBottom: 8 }} />
            <textarea value={refDraft.links} onChange={e => setRefDraft(p => ({ ...p, links: e.target.value }))} placeholder={"One link per line: Title | https://...\ne.g. Porter's Five Forces | https://example.com/article"}
              style={{ width: "100%", minHeight: 54, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 12px", color: G.text, fontSize: 12, fontFamily: "Inter", resize: "vertical", marginBottom: 10 }} />
            <button onClick={() => saveReferenceMaterial(viewingProblem.id)} disabled={savingRef} className="btn" style={{ width: "100%", background: G.accentDim, color: G.accent, border: `1px solid ${G.accentBorder}`, borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
              {savingRef ? "Saving..." : refMaterial ? "Update Reference Material" : "Save Reference Material"}
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;

  // ── SPLASH ──────────────────────────────────────────────────────────────
  if (screen === "splash") return (
    <div style={{ height: "100vh", background: G.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter" }}>
      <style>{css}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 24, color: "#fff", margin: "0 auto 18px" }}>C</div>
        <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 26, color: G.text }}>CaseOS</div>
        <div style={{ color: G.muted, fontSize: 13, marginTop: 8 }}>Loading...</div>
      </div>
    </div>
  );

  // ── AUTH ─────────────────────────────────────────────────────────────────
  if (screen === "auth") return (
    <div style={{ minHeight: "100vh", background: G.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter", padding: 20 }}>
      <style>{css}</style>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 46, height: 46, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 auto 14px" }}>C</div>
          <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 22, color: G.text }}>CaseOS</div>
          <div style={{ color: G.muted, fontSize: 12, marginTop: 5 }}>GitHub for business thinkers</div>
        </div>
        <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", background: G.bg, borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setAuthMode(m); setAuthError(""); }} className="btn"
                style={{ flex: 1, padding: "9px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Inter", background: authMode === m ? G.accent : "transparent", color: authMode === m ? "#fff" : G.muted, transition: "all 0.2s" }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>
          {authMode === "signup" && (
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[{ id: "student", label: "🎓 Student" }, { id: "business", label: "🏢 Startup / Business" }].map(r => (
                <button key={r.id} onClick={() => setAuthForm(p => ({ ...p, role: r.id }))} className="btn"
                  style={{ flex: 1, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "Inter", border: `1px solid ${authForm.role === r.id ? G.accent : G.border}`, background: authForm.role === r.id ? G.accentDim : "transparent", color: authForm.role === r.id ? G.accent : G.muted }}>
                  {r.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {authMode === "signup" && <input value={authForm.name} onChange={e => setAuthForm(p => ({ ...p, name: e.target.value }))} placeholder={authForm.role === "business" ? "Your name" : "Full name"} style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 14, fontFamily: "Inter" }} />}
            {authMode === "signup" && authForm.role === "business" && (
              <>
                <input value={authForm.companyName} onChange={e => setAuthForm(p => ({ ...p, companyName: e.target.value }))} placeholder="Company / Startup name" style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 14, fontFamily: "Inter" }} />
                <input value={authForm.industry} onChange={e => setAuthForm(p => ({ ...p, industry: e.target.value }))} placeholder="Industry (e.g. F&B, SaaS, Retail)" style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 14, fontFamily: "Inter" }} />
              </>
            )}
            {authMode === "signup" && authForm.role === "student" && (
              <input value={authForm.college} onChange={e => setAuthForm(p => ({ ...p, college: e.target.value }))} placeholder="College / Organisation (optional)" style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 14, fontFamily: "Inter" }} />
            )}
            <input value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} placeholder="Email address" type="email" style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 14, fontFamily: "Inter" }} />
            <input value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} placeholder="Password" type="password" onKeyDown={e => e.key === "Enter" && handleAuth()} style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 14, fontFamily: "Inter" }} />
          </div>
          {authError && <div style={{ color: G.red, fontSize: 12, marginTop: 10, textAlign: "center" }}>{authError}</div>}
          <button onClick={handleAuth} disabled={authLoading} className="btn" style={{ width: "100%", marginTop: 18, background: G.accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
            {authLoading ? "Please wait..." : authMode === "login" ? "Sign In →" : "Create Account →"}
          </button>
        </div>
        {/* Demo accounts */}
        <div style={{ marginTop: 14, background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 12, padding: "14px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: G.accent, marginBottom: 10, letterSpacing: "0.5px" }}>TRY A DEMO ACCOUNT</div>
          {[
            { label: "🎓 Student", email: "demo@caseos.in", password: "caseos123" },
            { label: "🏢 Business", email: "business@caseos.in", password: "biz123" },
            { label: "⚙ Admin", email: "admin@caseos.in", password: "admin123" },
            { label: "🎯 Expert Reviewer", email: "expert@caseos.in", password: "expert123" },
          ].map(d => (
            <button key={d.email} onClick={() => { setAuthForm(p => ({ ...p, name: "", email: d.email, password: d.password })); setAuthMode("login"); handleAuth(); }} className="btn"
              style={{ width: "100%", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, padding: "9px 12px", marginBottom: 6, color: G.text, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{d.label}</span>
              <span style={{ color: G.accent, fontSize: 11 }}>Sign in →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ────────────────────────────────────────────────────────────
  if (screen === "dashboard") {
    const solved = Object.values(userProgress).filter(p => p.scorecard).length;
    const inProg = Object.values(userProgress).filter(p => !p.scorecard && p.messages?.length > 0).length;
    return (
      <div style={{ minHeight: "100vh", background: G.bg, fontFamily: "Inter", color: G.text }}>
        <style>{css}</style>
        <div style={{ padding: "14px 24px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: G.bg, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 14, color: "#fff" }}>C</div>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16 }}>CaseOS</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setShowCreateCase(true)} className="btn" style={{ background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 8, padding: "6px 14px", color: G.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>+ Add Case</button>
            <button onClick={logout} className="btn" style={{ background: "none", border: `1px solid ${G.border}`, borderRadius: 8, padding: "6px 14px", color: G.muted, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>Sign out</button>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 80px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 36 }}>
            {[{ label: "Solved", value: solved, color: G.green }, { label: "In Progress", value: inProg, color: "#FFB347" }, { label: "Available", value: allCases.length, color: G.accent }].map(s => (
              <div key={s.label} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 30, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: G.muted, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Cases */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 17 }}>Case Library</h2>
            <span style={{ fontSize: 12, color: G.muted }}>{allCases.length} cases · Real business problems</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {allCases.map(c => {
              const prog = userProgress[c.id];
              const isDone = !!prog?.scorecard;
              const isStarted = !isDone && prog?.messages?.length > 0;
              return (
                <div key={c.id} className="hc" style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 14, padding: "20px 22px", cursor: "pointer", position: "relative", overflow: "hidden" }} onClick={() => startCase(c)}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: c.color }} />
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16 }}>{c.icon}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: c.color, background: `${c.color}18`, border: `1px solid ${c.color}33`, borderRadius: 20, padding: "2px 9px" }}>{c.category}</span>
                        <span style={{ fontSize: 11, color: G.muted, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 20, padding: "2px 9px" }}>{c.difficulty}</span>
                        {isDone && <span style={{ fontSize: 11, fontWeight: 600, color: G.green, background: "rgba(0,212,160,0.1)", border: "1px solid rgba(0,212,160,0.25)", borderRadius: 20, padding: "2px 9px" }}>✓ Solved</span>}
                        {isStarted && <span style={{ fontSize: 11, fontWeight: 600, color: "#FFB347", background: "rgba(255,179,71,0.1)", border: "1px solid rgba(255,179,71,0.25)", borderRadius: 20, padding: "2px 9px" }}>● In Progress</span>}
                        {c.isCustom && <span style={{ fontSize: 11, fontWeight: 600, color: "#A594FF", background: "rgba(165,148,255,0.1)", border: "1px solid rgba(165,148,255,0.25)", borderRadius: 20, padding: "2px 9px" }}>Your Case</span>}
                        {c.isCommunity && <span style={{ fontSize: 11, fontWeight: 600, color: "#00D4A0", background: "rgba(0,212,160,0.1)", border: "1px solid rgba(0,212,160,0.25)", borderRadius: 20, padding: "2px 9px" }}>🏢 Submitted by {c.ownerCompany}</span>}
                      </div>
                      <div style={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 15, marginBottom: 6, lineHeight: 1.4 }}>{c.title}</div>
                      <div style={{ color: G.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{c.brief.substring(0, 120)}...</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {c.tags.map(t => <span key={t} style={{ fontSize: 11, color: G.muted, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 20, padding: "2px 9px" }}>{t}</span>)}
                      </div>
                    </div>
                    {isDone && prog.scorecard && (
                      <div style={{ flexShrink: 0, textAlign: "center", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px", minWidth: 66 }}>
                        <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 24, color: scoreColor(prog.scorecard.overall) }}>{prog.scorecard.overall}</div>
                        <div style={{ fontSize: 10, color: G.muted }}>Score</div>
                        {prog.attempts > 1 && <div style={{ fontSize: 10, color: G.accent, marginTop: 2 }}>{prog.attempts} tries</div>}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: G.muted }}>{c.solves > 0 ? `${c.solves.toLocaleString()} attempted` : "New case"}</span>
                    <span style={{ fontSize: 12, color: G.accent, fontWeight: 600 }}>{isDone ? "Review / Reattempt →" : isStarted ? "Continue →" : "Start →"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Profile */}
          {solved > 0 && (
            <div style={{ marginTop: 28, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 14, padding: "20px 22px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 14 }}>YOUR PROFILE</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {allCases.filter(c => userProgress[c.id]?.scorecard).map(c => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px" }}>
                    <span style={{ fontSize: 16 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{c.company}</div>
                      <div style={{ fontSize: 11, color: scoreColor(userProgress[c.id].scorecard.overall) }}>{userProgress[c.id].scorecard.overall}/100 · {userProgress[c.id].scorecard.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Create Case Modal */}
        {showCreateCase && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
            <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 16, padding: 28, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 17 }}>Create Your Case</div>
                <button onClick={() => setShowCreateCase(false)} className="btn" style={{ background: "none", border: "none", color: G.muted, fontSize: 20, cursor: "pointer" }}>×</button>
              </div>
              <div style={{ fontSize: 12, color: G.muted, marginBottom: 22, lineHeight: 1.6 }}>Fill in your real business details. The AI mentor will only work with what you provide here — no invented facts.</div>

              {[
                { key: "company", label: "Company / Context *", placeholder: "e.g. My restaurant in Pune, XYZ Pvt Ltd, My startup idea", required: true },
                { key: "problem", label: "The Core Problem *", placeholder: "One clear sentence: What is going wrong and needs solving?", required: true },
                { key: "facts", label: "Real Facts & Data *", placeholder: "List all real details: revenue, team size, what you've tried, customer feedback, constraints. The more specific, the better the AI discussion.", required: true, rows: 5 },
                { key: "constraint", label: "Key Constraint", placeholder: "e.g. Budget under ₹1L, 60 days, 2 person team", required: false },
                { key: "role", label: "Candidate's Role", placeholder: "e.g. You are the founder, marketing consultant, CFO", required: false },
                { key: "tags", label: "Tags (comma separated)", placeholder: "e.g. Marketing, Operations, Finance", required: false },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 6 }}>{f.label}</div>
                  {f.rows ? (
                    <textarea value={newCase[f.key]} onChange={e => setNewCase(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={f.rows}
                      style={{ width: "100%", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 13, fontFamily: "Inter", lineHeight: 1.5 }} />
                  ) : (
                    <input value={newCase[f.key]} onChange={e => setNewCase(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                      style={{ width: "100%", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "11px 14px", color: G.text, fontSize: 13, fontFamily: "Inter" }} />
                  )}
                </div>
              ))}

              <div style={{ background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 18, fontSize: 12, color: "#A090D0", lineHeight: 1.6 }}>
                💡 The AI will use ONLY what you write above. It will not guess or invent any numbers, names, or situations not listed here.
              </div>

              <button onClick={createCustomCase} disabled={creatingCase || !newCase.company || !newCase.problem || !newCase.facts} className="btn"
                style={{ width: "100%", background: (!newCase.company || !newCase.problem || !newCase.facts) ? G.border : G.accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
                {creatingCase ? "Creating..." : "Create Case & Start Solving →"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── BUSINESS DASHBOARD ──────────────────────────────────────────────────
  if (screen === "bizDashboard") {
    const statusMeta = {
      pending_review: { label: "⏳ Pending Review", color: "#FFB347", bg: "rgba(255,179,71,0.1)", border: "rgba(255,179,71,0.25)" },
      published: { label: "✓ Live", color: G.green, bg: "rgba(0,212,160,0.1)", border: "rgba(0,212,160,0.25)" },
      rejected: { label: "✕ Rejected", color: G.red, bg: "rgba(255,77,109,0.1)", border: "rgba(255,77,109,0.25)" },
    };
    return (
      <div style={{ minHeight: "100vh", background: G.bg, fontFamily: "Inter", color: G.text }}>
        <style>{css}</style>
        <div style={{ padding: "14px 24px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: G.bg, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 14, color: "#fff" }}>C</div>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16 }}>CaseOS</span>
            <span style={{ fontSize: 11, color: G.muted, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 20, padding: "2px 9px", marginLeft: 4 }}>🏢 {user.companyName || "Business"}</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={startProblemIntake} className="btn" style={{ background: G.accent, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>+ Post New Problem</button>
            <button onClick={logout} className="btn" style={{ background: "none", border: `1px solid ${G.border}`, borderRadius: 8, padding: "6px 14px", color: G.muted, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>Sign out</button>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 36 }}>
            {[
              { label: "Problems Posted", value: bizProblems.length, color: G.accent },
              { label: "Live", value: bizProblems.filter(p => p.status === "published").length, color: G.green },
              { label: "Total Submissions", value: bizProblems.reduce((sum, p) => sum + (p._submissionCount || 0), 0), color: "#FFB347" },
            ].map(s => (
              <div key={s.label} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 30, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: G.muted, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 17, marginBottom: 16 }}>Your Problems</h2>

          {bizProblems.length === 0 ? (
            <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 14, padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📝</div>
              <div style={{ fontSize: 14, color: G.muted, marginBottom: 18 }}>You haven't posted a problem yet. The AI will ask you a few sharp questions to turn it into a proper case.</div>
              <button onClick={startProblemIntake} className="btn" style={{ background: G.accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>Post Your First Problem →</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {bizProblems.map(p => {
                const meta = statusMeta[p.status] || statusMeta.pending_review;
                return (
                  <div key={p.id} className="hc" style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 14, padding: "18px 22px", cursor: "pointer" }} onClick={() => openProblemDetail(p)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: meta.color, background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 20, padding: "2px 9px" }}>{meta.label}</span>
                          <span style={{ fontSize: 11, color: G.muted, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 20, padding: "2px 9px" }}>{p.difficulty}</span>
                        </div>
                        <div style={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: 15 }}>{p.title}</div>
                      </div>
                      <div style={{ textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 20, color: G.accent }}>{p._submissionCount || 0}</div>
                        <div style={{ fontSize: 10, color: G.muted }}>submissions</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {problemDetailModal}
      </div>
    );
  }

  // ── POST PROBLEM (AI clarifying-question intake) ────────────────────────
  if (screen === "postProblem") {
    return (
      <div style={{ height: "100vh", background: G.bg, fontFamily: "Inter", color: G.text, display: "flex", flexDirection: "column" }}>
        <style>{css}</style>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setScreen("bizDashboard")} className="btn" style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>←</button>
          <div>
            <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 15 }}>Post a Problem</div>
            <div style={{ fontSize: 11, color: G.muted }}>AI will ask a few questions to remove assumptions</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            {problemChat.map((m, i) => (
              <div key={i} className="fi" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                <div style={{ maxWidth: "80%", padding: "11px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? G.accent : G.surface, border: m.role === "user" ? "none" : `1px solid ${G.border}`, fontSize: 14, lineHeight: 1.65, color: m.role === "user" ? "#fff" : "#C8C4DC", whiteSpace: "pre-wrap" }}>
                  {m.content}
                </div>
              </div>
            ))}
            {problemChatLoading && (
              <div style={{ display: "flex", gap: 4, padding: "6px 15px" }}>
                <div className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: G.muted }} />
                <div className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: G.muted, animationDelay: "0.15s" }} />
                <div className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: G.muted, animationDelay: "0.3s" }} />
              </div>
            )}
            <div ref={problemChatEndRef} />
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${G.border}`, padding: 16 }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            {problemReadyToFinalize && (
              <button onClick={finalizeProblem} disabled={finalizingProblem} className="btn" style={{ width: "100%", marginBottom: 10, background: G.green, color: "#08120E", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Inter" }}>
                {finalizingProblem ? "Structuring your case..." : "✓ Finalize Problem →"}
              </button>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <textarea value={problemInput} onChange={e => setProblemInput(e.target.value)} placeholder="Type your answer..." rows={1}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendProblemMessage(); } }}
                style={{ flex: 1, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 10, padding: "12px 14px", color: G.text, fontSize: 14, fontFamily: "Inter", lineHeight: 1.5 }} />
              <button onClick={sendProblemMessage} disabled={problemChatLoading || !problemInput.trim()} className="btn" style={{ background: G.accent, color: "#fff", border: "none", borderRadius: 10, padding: "0 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ADMIN ────────────────────────────────────────────────────────────────
  if (screen === "admin") {
    const pendingCount = adminProblems.filter(p => p.status === "pending_review").length;
    const statusMeta = {
      pending_review: { label: "⏳ Pending", color: "#FFB347", bg: "rgba(255,179,71,0.1)", border: "rgba(255,179,71,0.25)" },
      published: { label: "✓ Live", color: G.green, bg: "rgba(0,212,160,0.1)", border: "rgba(0,212,160,0.25)" },
      rejected: { label: "✕ Rejected", color: G.red, bg: "rgba(255,77,109,0.1)", border: "rgba(255,77,109,0.25)" },
    };
    return (
      <div style={{ minHeight: "100vh", background: G.bg, fontFamily: "Inter", color: G.text }}>
        <style>{css}</style>
        <div style={{ padding: "14px 24px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: G.bg, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 14, color: "#fff" }}>C</div>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16 }}>CaseOS</span>
            <span style={{ fontSize: 11, color: G.accent, background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 20, padding: "2px 9px", marginLeft: 4 }}>⚙ Admin</span>
          </div>
          <button onClick={logout} className="btn" style={{ background: "none", border: `1px solid ${G.border}`, borderRadius: 8, padding: "6px 14px", color: G.muted, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>Sign out</button>
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 80px" }}>
          <div style={{ display: "flex", gap: 4, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 10, padding: 4, marginBottom: 28, width: "fit-content" }}>
            {[
              { id: "overview", label: "Overview" },
              { id: "students", label: `Students (${adminStudents.length})` },
              { id: "businesses", label: `Businesses (${adminBusinesses.length})` },
              { id: "problems", label: `Problems (${adminProblems.length})${pendingCount ? ` · ${pendingCount} pending` : ""}` },
              { id: "experts", label: `Experts (${adminExperts.length})` },
            ].map(t => (
              <button key={t.id} onClick={() => setAdminTab(t.id)} className="btn" style={{ padding: "8px 14px", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "Inter", background: adminTab === t.id ? G.accent : "transparent", color: adminTab === t.id ? "#fff" : G.muted, whiteSpace: "nowrap" }}>
                {t.label}
              </button>
            ))}
          </div>

          {adminLoading ? (
            <div style={{ textAlign: "center", padding: 60, color: G.muted, fontSize: 13 }}>Loading...</div>
          ) : adminTab === "overview" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              {[
                { label: "Students", value: adminStudents.length, color: G.accent },
                { label: "Businesses", value: adminBusinesses.length, color: G.accent },
                { label: "Pending Review", value: pendingCount, color: "#FFB347" },
                { label: "Live Problems", value: adminProblems.filter(p => p.status === "published").length, color: G.green },
                { label: "Total Submissions", value: adminProblems.reduce((sum, p) => sum + (p._submissionCount || 0), 0), color: G.accent },
              ].map(s => (
                <div key={s.label} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 26, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: G.muted, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          ) : adminTab === "students" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {adminStudents.length === 0 && <div style={{ color: G.muted, fontSize: 13, textAlign: "center", padding: 40 }}>No students yet.</div>}
              {adminStudents.map(s => (
                <div key={s.id} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: G.muted }}>{s.email}{s.college ? ` · ${s.college}` : ""}</div>
                  </div>
                  <div style={{ display: "flex", gap: 18, textAlign: "center" }}>
                    <div><div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16 }}>{s._completed}</div><div style={{ fontSize: 10, color: G.muted }}>solved</div></div>
                    <div><div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16, color: scoreColor(s._avgScore) }}>{s._avgScore || "—"}</div><div style={{ fontSize: 10, color: G.muted }}>avg score</div></div>
                  </div>
                </div>
              ))}
            </div>
          ) : adminTab === "businesses" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {adminBusinesses.length === 0 && <div style={{ color: G.muted, fontSize: 13, textAlign: "center", padding: 40 }}>No businesses yet.</div>}
              {adminBusinesses.map(b => (
                <div key={b.id} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{b.companyName || b.name}</div>
                    <div style={{ fontSize: 11, color: G.muted }}>{b.name} · {b.email}{b.industry ? ` · ${b.industry}` : ""}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16, color: G.accent }}>{b._problemCount}</div>
                    <div style={{ fontSize: 10, color: G.muted }}>problems posted</div>
                  </div>
                </div>
              ))}
            </div>
          ) : adminTab === "problems" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {adminProblems.length === 0 && <div style={{ color: G.muted, fontSize: 13, textAlign: "center", padding: 40 }}>No problems submitted yet.</div>}
              {adminProblems.map(p => {
                const meta = statusMeta[p.status] || statusMeta.pending_review;
                return (
                  <div key={p.id} className="hc" style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }} onClick={() => openProblemDetail(p)}>
                    <div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: meta.color, background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 20, padding: "2px 9px" }}>{meta.label}</span>
                        <span style={{ fontSize: 11, color: G.muted, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 20, padding: "2px 9px" }}>{p.difficulty}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{p.company}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16, color: G.accent }}>{p._submissionCount || 0}</div>
                      <div style={{ fontSize: 10, color: G.muted }}>submissions</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Invite an Expert Reviewer</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                  <input value={inviteForm.name} onChange={e => setInviteForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" style={{ flex: "1 1 160px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, padding: "10px 12px", color: G.text, fontSize: 13, fontFamily: "Inter" }} />
                  <input value={inviteForm.email} onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))} placeholder="Email" type="email" style={{ flex: "1 1 160px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, padding: "10px 12px", color: G.text, fontSize: 13, fontFamily: "Inter" }} />
                  <input value={inviteForm.credential} onChange={e => setInviteForm(p => ({ ...p, credential: e.target.value }))} placeholder="Credential (e.g. IIM Ahmedabad)" style={{ flex: "1 1 200px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, padding: "10px 12px", color: G.text, fontSize: 13, fontFamily: "Inter" }} />
                </div>
                <button onClick={inviteExpert} disabled={inviting || !inviteForm.name || !inviteForm.email} className="btn" style={{ background: G.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
                  {inviting ? "Inviting..." : "+ Invite Expert"}
                </button>
                {lastInvite && (
                  <div style={{ marginTop: 14, background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 10, padding: "12px 14px", fontSize: 12, color: G.text }}>
                    ✓ Invited. Share these login details: <strong>{lastInvite.email}</strong> / <strong>{lastInvite.password}</strong>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {adminExperts.length === 0 && <div style={{ color: G.muted, fontSize: 13, textAlign: "center", padding: 20 }}>No experts invited yet.</div>}
                {adminExperts.map(x => (
                  <div key={x.id} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 18px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{x.name}</div>
                    <div style={{ fontSize: 11, color: G.muted }}>{x.email}{x.credential ? ` · ${x.credential}` : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {problemDetailModal}
      </div>
    );
  }

  // ── EXPERT ───────────────────────────────────────────────────────────────
  if (screen === "expert") {
    return (
      <div style={{ minHeight: "100vh", background: G.bg, fontFamily: "Inter", color: G.text }}>
        <style>{css}</style>
        <div style={{ padding: "14px 24px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: G.bg, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 14, color: "#fff" }}>C</div>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16 }}>CaseOS</span>
            <span style={{ fontSize: 11, color: "#FFB347", background: "rgba(255,179,71,0.1)", border: "1px solid rgba(255,179,71,0.25)", borderRadius: 20, padding: "2px 9px", marginLeft: 4 }}>🎯 Expert Reviewer</span>
          </div>
          <button onClick={logout} className="btn" style={{ background: "none", border: `1px solid ${G.border}`, borderRadius: 8, padding: "6px 14px", color: G.muted, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>Sign out</button>
        </div>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px 80px" }}>
          <div style={{ fontSize: 12, color: G.muted, marginBottom: 20 }}>Showing the top 10% of completed attempts per case, ranked by AI scorecard score. Publish the finest solution — it becomes visible to the student, the business, and admin.</div>
          {expertLoading ? (
            <div style={{ textAlign: "center", padding: 60, color: G.muted, fontSize: 13 }}>Loading...</div>
          ) : expertQueue.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: G.muted, fontSize: 13 }}>No completed attempts yet across any case.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {expertQueue.map(q => (
                <div key={q.caseId} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 14, padding: "18px 20px" }}>
                  <div className="hc" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                    onClick={() => { const opening = expertCaseOpen === q.caseId ? null : q.caseId; setExpertCaseOpen(opening); setSolutionDraft(q.solution?.content || ""); }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{q.caseTitle}</div>
                      <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{q.company} · {q.totalAttempts} completed · top {q.top.length} in queue{q.hasSolution ? " · ✓ solution published" : ""}</div>
                    </div>
                    <div style={{ fontSize: 18, color: G.muted }}>{expertCaseOpen === q.caseId ? "▾" : "▸"}</div>
                  </div>
                  {expertCaseOpen === q.caseId && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 10 }}>TOP {q.top.length} SUBMISSIONS</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                        {q.top.map((s, i) => (
                          <div key={s.userId}>
                            <div className="hc" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }}
                              onClick={async () => setViewingTranscript(viewingTranscript?.userId === s.userId ? null : { ...s, data: await loadTranscript(s.userId, q.caseId) })}>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{i === 0 ? "🥇 " : i === 1 ? "🥈 " : i === 2 ? "🥉 " : ""}{s.userName}{s.studentCollege ? ` · ${s.studentCollege}` : ""}</div>
                                <div style={{ fontSize: 11, color: G.muted }}>tap to view conversation</div>
                              </div>
                              <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16, color: scoreColor(s.score) }}>{s.score}</div>
                            </div>
                            {viewingTranscript?.userId === s.userId && (
                              <div style={{ background: "#09090F", border: `1px solid ${G.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px", maxHeight: 240, overflowY: "auto" }}>
                                {viewingTranscript.data?.messages?.length ? viewingTranscript.data.messages.map((m, mi) => (
                                  <div key={mi} style={{ marginBottom: 10, fontSize: 12, lineHeight: 1.6 }}>
                                    <span style={{ fontWeight: 700, color: m.role === "user" ? G.accent : G.green }}>{m.role === "user" ? s.userName.split(" ")[0] : "AI Mentor"}: </span>
                                    <span style={{ color: "#C8C4DC" }}>{m.content}</span>
                                  </div>
                                )) : <div style={{ fontSize: 12, color: G.muted }}>Transcript not available.</div>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 10 }}>{q.hasSolution ? "MODEL SOLUTION (edit & republish)" : "WRITE THE MODEL SOLUTION"}</div>
                      <textarea value={solutionDraft} onChange={e => setSolutionDraft(e.target.value)} placeholder="Write the finest solution here — this becomes visible to the student, the business, and admin..."
                        style={{ width: "100%", minHeight: 140, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, padding: "12px 14px", color: G.text, fontSize: 13, fontFamily: "Inter", resize: "vertical", marginBottom: 10 }} />
                      <button onClick={() => publishSolution(q.caseId)} disabled={publishingSolution || !solutionDraft.trim()} className="btn" style={{ background: G.accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
                        {publishingSolution ? "Publishing..." : q.hasSolution ? "Republish Solution" : "Publish Solution"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── CHAT ─────────────────────────────────────────────────────────────────
  if (screen === "chat") {
    const prog = userProgress[selectedCase?.id];
    const isDone = !!prog?.scorecard;
    return (
      <div style={{ height: "100vh", background: G.bg, fontFamily: "Inter", color: G.text, display: "flex", flexDirection: "column" }}>
        <style>{css}</style>
        {/* Header */}
        <div style={{ padding: "12px 18px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button onClick={() => setScreen("dashboard")} className="btn" style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>←</button>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${selectedCase?.color}, ${selectedCase?.color}88)`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{selectedCase?.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{selectedCase?.company}</div>
            <div style={{ fontSize: 11, color: G.accent, marginTop: 1 }}>AI Mentor · Live</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {isDone && (
              <button onClick={() => { if (window.confirm("Start fresh? Your previous conversation will be cleared.")) startCase(selectedCase, true); }} className="btn"
                style={{ background: "rgba(255,179,71,0.1)", border: "1px solid rgba(255,179,71,0.3)", borderRadius: 8, padding: "5px 12px", color: "#FFB347", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
                🔄 Reattempt
              </button>
            )}
            {messages.length > 2 && !showScorePrompt && !isDone && (
              <button onClick={() => setShowScorePrompt(true)} className="btn"
                style={{ background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 8, padding: "5px 12px", color: G.accent, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
                Get Score
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${G.border}`, flexShrink: 0, background: G.bg }}>
          {[{ id: "chat", label: "💬 Mentor Chat" }, { id: "references", label: "📚 References" }].map(t => (
            <button key={t.id} onClick={() => setChatTab(t.id)} className={`btn ${chatTab === t.id ? "tab-active" : ""}`}
              style={{ flex: 1, padding: "11px 16px", background: "none", border: "none", borderBottom: chatTab === t.id ? `2px solid ${G.accent}` : "2px solid transparent", color: chatTab === t.id ? G.accent : G.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Brief */}
        {chatTab === "chat" && (
          <div style={{ padding: "10px 18px", borderBottom: `1px solid ${G.border}`, flexShrink: 0, background: "#09090F" }}>
            <div style={{ fontSize: 11, color: G.muted, fontWeight: 600, marginBottom: 4, letterSpacing: "0.5px" }}>CASE BRIEF</div>
            <div style={{ fontSize: 12, color: "#7A7890", lineHeight: 1.6 }}>{selectedCase?.brief.substring(0, 180)}...</div>
          </div>
        )}

        {/* REFERENCES TAB */}
        {chatTab === "references" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>
            {publishedSolution && (
              <div style={{ background: "rgba(255,179,71,0.08)", border: "1px solid rgba(255,179,71,0.3)", borderRadius: 12, padding: "14px 16px", marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#FFB347", letterSpacing: "0.5px", marginBottom: 8 }}>🏆 EXPERT TOP SOLUTION — {publishedSolution.expertName}{publishedSolution.expertCredential ? ` (${publishedSolution.expertCredential})` : ""}</div>
                <div style={{ fontSize: 13, color: "#C8C4DC", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{publishedSolution.content}</div>
                <div style={{ fontSize: 11, color: G.muted, marginTop: 8 }}>💡 Try solving it yourself first — this is here for after you've given it a real attempt.</div>
              </div>
            )}
            {refMaterial && (refMaterial.notes || refMaterial.links?.length > 0) && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: G.accent, letterSpacing: "0.5px", marginBottom: 12 }}>📌 FROM THE CASEOS TEAM</div>
                {refMaterial.notes && <div style={{ fontSize: 13, color: "#C8C4DC", lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: 12 }}>{refMaterial.notes}</div>}
                {refMaterial.links?.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div className="hc" style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8, fontSize: 13, color: G.accent }}>🔗 {l.title}</div>
                  </a>
                ))}
              </div>
            )}
            {refs ? (
              <>
                {/* Concepts */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 12 }}>KEY CONCEPTS TO UNDERSTAND</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {refs.concepts.map(c => <span key={c} style={{ background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, color: G.accent }}>{c}</span>)}
                  </div>
                </div>

                {/* Frameworks */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 12 }}>FRAMEWORKS USED IN THIS CASE</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {refs.frameworks.map(f => (
                      <div key={f} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: G.text, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: G.green }}>▸</span> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* YouTube */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#FF4444", letterSpacing: "0.5px", marginBottom: 12 }}>▶ WATCH — YOUTUBE RESOURCES</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {refs.youtube.map((y, i) => (
                      <a key={i} href={y.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <div className="hc" style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                          <div style={{ width: 36, height: 36, background: "#FF444420", border: "1px solid #FF444430", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>▶</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 4, lineHeight: 1.4 }}>{y.title}</div>
                            <div style={{ fontSize: 12, color: G.muted }}>{y.desc}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Articles */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: G.green, letterSpacing: "0.5px", marginBottom: 12 }}>📄 READ — ARTICLES & CASE STUDIES</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {refs.articles.map((a, i) => (
                      <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <div className="hc" style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                          <div style={{ width: 36, height: 36, background: "rgba(0,212,160,0.1)", border: "1px solid rgba(0,212,160,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📄</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 4, lineHeight: 1.4 }}>{a.title}</div>
                            <div style={{ fontSize: 12, color: G.muted }}>{a.desc}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div style={{ background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 10, padding: "12px 14px", fontSize: 12, color: "#A090D0", lineHeight: 1.6 }}>
                  💡 Study these before or after your mentor session. Come back to the chat with stronger thinking.
                </div>
              </>
            ) : (!refMaterial?.notes && !refMaterial?.links?.length && !publishedSolution) ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: G.muted }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
                <div style={{ fontSize: 14 }}>References will be added for this case soon.</div>
                <div style={{ fontSize: 12, marginTop: 6 }}>Try searching the key concepts on YouTube for now.</div>
              </div>
            ) : null}
          </div>
        )}

        {/* CHAT TAB */}
        {chatTab === "chat" && (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>
              {messages.map((m, i) => (
                <div key={i} className="fi" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 8, flexShrink: 0, marginTop: 3 }}>🧠</div>
                  )}
                  <div style={{ maxWidth: "76%", padding: "11px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? G.accent : G.surface, border: m.role === "user" ? "none" : `1px solid ${G.border}`, fontSize: 14, lineHeight: 1.65, color: m.role === "user" ? "#fff" : "#C8C4DC", whiteSpace: "pre-wrap" }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${G.accent}, #A594FF)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🧠</div>
                  <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: "16px 16px 16px 4px", padding: "12px 16px", display: "flex", gap: 5 }}>
                    {[0, 1, 2].map(i => <div key={i} className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: G.accent, animationDelay: `${i * 0.15}s` }} />)}
                  </div>
                </div>
              )}
              {showScorePrompt && !aiLoading && (
                <div className="fi" style={{ textAlign: "center", padding: "14px 0" }}>
                  <div style={{ background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 14, padding: "18px 22px", display: "inline-block" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>Ready for your scorecard?</div>
                    <div style={{ fontSize: 12, color: G.muted, marginBottom: 14 }}>AI will analyse your full conversation and score your thinking</div>
                    <button onClick={generateScore} className="btn" style={{ background: G.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>Generate Scorecard →</button>
                  </div>
                </div>
              )}
              {isDone && !showScorePrompt && (
                <div className="fi" style={{ textAlign: "center", padding: "14px 0" }}>
                  <div style={{ background: "rgba(255,179,71,0.08)", border: "1px solid rgba(255,179,71,0.25)", borderRadius: 12, padding: "14px 20px", display: "inline-block" }}>
                    <div style={{ fontSize: 13, color: "#FFB347", marginBottom: 10 }}>You've already scored this case. Want to try again?</div>
                    <button onClick={() => { if (window.confirm("Start fresh? Previous conversation will be cleared.")) startCase(selectedCase, true); }} className="btn"
                      style={{ background: "#FFB34720", border: "1px solid #FFB34740", borderRadius: 8, padding: "8px 18px", color: "#FFB347", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
                      🔄 Reattempt from Scratch
                    </button>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: "12px 18px 18px", borderTop: `1px solid ${G.border}`, flexShrink: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Share your thinking..." rows={2}
                  style={{ flex: 1, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "11px 14px", color: G.text, fontSize: 14, fontFamily: "Inter", lineHeight: 1.5 }} />
                <button onClick={sendMessage} disabled={aiLoading || !input.trim()} className="btn"
                  style={{ width: 42, height: 42, background: input.trim() && !aiLoading ? G.accent : G.surface, border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, color: "#fff", transition: "background 0.2s" }}>↑</button>
              </div>
              <div style={{ fontSize: 11, color: "#2A2A40", textAlign: "center", marginTop: 6 }}>Enter to send · Progress auto-saved</div>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── SCORE ─────────────────────────────────────────────────────────────────
  if (screen === "score") return (
    <div style={{ minHeight: "100vh", background: G.bg, fontFamily: "Inter", color: G.text }}>
      <style>{css}</style>
      <div style={{ padding: "14px 22px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setScreen("dashboard")} className="btn" style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: 20 }}>←</button>
        <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 16 }}>Scorecard · {selectedCase?.company}</span>
      </div>
      {scorecardLoading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 6 }}>{[0, 1, 2].map(i => <div key={i} className="dot" style={{ width: 8, height: 8, borderRadius: "50%", background: G.accent, animationDelay: `${i * 0.15}s` }} />)}</div>
          <div style={{ color: G.muted, fontSize: 13 }}>Analysing your conversation...</div>
        </div>
      ) : scorecard ? (
        <div style={{ maxWidth: 580, margin: "0 auto", padding: "28px 20px 80px" }}>
          {/* Circle */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 18 }}>
              <svg width="126" height="126" viewBox="0 0 126 126">
                <circle cx="63" cy="63" r="54" fill="none" stroke={G.border} strokeWidth="7" />
                <circle cx="63" cy="63" r="54" fill="none" stroke={scoreColor(scorecard.overall)} strokeWidth="7"
                  strokeDasharray={`${(scorecard.overall / 100) * 339.3} 339.3`} strokeLinecap="round" transform="rotate(-90 63 63)" />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 32, color: scoreColor(scorecard.overall) }}>{scorecard.overall}</div>
                <div style={{ fontSize: 10, color: G.muted }}>/ 100</div>
              </div>
            </div>
            <div style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 19, marginBottom: 8 }}>{scorecard.title}</div>
            <div style={{ color: G.muted, fontSize: 13, lineHeight: 1.7, maxWidth: 360, margin: "0 auto" }}>{scorecard.verdict}</div>
          </div>
          {/* Bars */}
          <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 14, padding: "22px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, letterSpacing: "0.5px", marginBottom: 18 }}>SKILL BREAKDOWN</div>
            {scorecard.scores.map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontSize: 13, color: scoreColor(s.score), fontWeight: 700 }}>{s.score}</span>
                </div>
                <div style={{ height: 5, background: G.bg, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s.score}%`, background: scoreColor(s.score), borderRadius: 3, transition: "width 1s ease" }} />
                </div>
                <div style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>{s.note}</div>
              </div>
            ))}
          </div>
          {/* Strengths/Improve */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div style={{ background: "rgba(0,212,160,0.05)", border: "1px solid rgba(0,212,160,0.18)", borderRadius: 12, padding: "16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: G.green, marginBottom: 10, letterSpacing: "0.5px" }}>STRENGTHS</div>
              {scorecard.strengths.map(s => <div key={s} style={{ fontSize: 13, color: "#A0C8BC", marginBottom: 7, paddingLeft: 9, borderLeft: `2px solid ${G.green}`, lineHeight: 1.5 }}>{s}</div>)}
            </div>
            <div style={{ background: "rgba(255,77,109,0.05)", border: "1px solid rgba(255,77,109,0.18)", borderRadius: 12, padding: "16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: G.red, marginBottom: 10, letterSpacing: "0.5px" }}>WORK ON</div>
              {scorecard.improve.map(s => <div key={s} style={{ fontSize: 13, color: "#C8A0A8", marginBottom: 7, paddingLeft: 9, borderLeft: `2px solid ${G.red}`, lineHeight: 1.5 }}>{s}</div>)}
            </div>
          </div>
          {/* VC signal */}
          <div style={{ background: G.accentDim, border: `1px solid ${G.accentBorder}`, borderRadius: 12, padding: "18px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: G.accent, marginBottom: 8, letterSpacing: "0.5px" }}>VC / HIRING SIGNAL</div>
            <div style={{ fontSize: 14, color: "#C0BCDC", lineHeight: 1.7 }}>"{scorecard.vc_signal}"</div>
          </div>
          {/* Next */}
          <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: G.muted, marginBottom: 6, letterSpacing: "0.5px" }}>NEXT STEP</div>
            <div style={{ fontSize: 13, color: G.text, lineHeight: 1.6 }}>{scorecard.next_case}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setScreen("dashboard")} className="btn" style={{ flex: 1, background: G.accent, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>Try Another Case</button>
            <button onClick={() => { startCase(selectedCase, true); }} className="btn" style={{ flex: 1, background: "rgba(255,179,71,0.1)", color: "#FFB347", border: "1px solid rgba(255,179,71,0.3)", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>🔄 Reattempt</button>
          </div>
        </div>
      ) : null}
    </div>
  );

  return null;
}

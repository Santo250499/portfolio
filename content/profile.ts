// Public site origin, used for canonical URLs, Open Graph URLs, robots.txt and sitemap.xml.
// Set NEXT_PUBLIC_SITE_URL at build time (no trailing slash). Leave it unset to keep URLs relative
// (no canonical tags, empty sitemap) until the final domain is known.
const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'').trim().replace(/\/+$/,'');
export const profile = {
  name: 'Md Tanvir Mannan',
  photo: '',
  title: 'ICT Support & Systems Professional | Building AI and Automation Tools',
  currentRole: 'ICT Support Officer, Lutheran Services',
  email: 'mdtanvirmannan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/md-tanvir-mannan-517839217',
  linkedinLabel: 'linkedin.com/in/md-tanvir-mannan-517839217',
  github: 'Santo250499',
  siteUrl,
  location: 'Gold Coast, Australia',
};
export const navigation = [['Home','/'],['About','/about/'],['Projects','/projects/'],['Web Projects','/web-development/'],['Skills','/skills/'],['Experience','/experience/'],['Certifications','/certifications/'],['Demos','/demos/'],['Dashboard','/github/'],['Blog','/blog/'],['Contact','/contact/']];
export const skillGroups = [
  {title:'Enterprise IT & Systems',icon:'network',description:'My day-to-day work supporting a multi-site Microsoft environment.',skills:['Microsoft 365','Entra ID','Active Directory','Exchange Online','Intune','Windows Autopilot','PowerShell','Windows Server','Group Policy','MFA & Conditional Access','Defender','SharePoint','Teams','OneDrive','Windows 10/11','Azure','Endpoint Management','Identity & Access Management','Apple Business Manager','iOS & Android Management','Networking','DNS','DHCP','VPN','Wi-Fi','Enterprise Telephony','Jira']},
  {title:'AI & LLM', icon:'brain', description:'Using language models in work tools and my own projects.',skills:['Atlassian Rovo','Microsoft Copilot','ChatGPT','Claude','OpenAI API','LLM Applications','Prompt Engineering','Structured Outputs','AI Agent Fundamentals']},
  {title:'Programming & Backend',icon:'terminal',description:'The scripts, APIs and apps behind my projects.',skills:['Python','FastAPI','Streamlit','REST APIs','JSON','API Integrations','PowerShell']},
  {title:'Web Development (personal projects)',icon:'code',description:'Used in my own personal web projects, outside my employment.',skills:['HTML','CSS','JavaScript','TypeScript','React','Next.js','Tailwind CSS','Supabase','PostgreSQL','Responsive Design']},
  {title:'SEO (personal projects)',icon:'search',description:'SEO fundamentals applied to my own personal web projects.',skills:['On-page SEO','Technical SEO','Keyword Research','Meta Titles & Descriptions','Schema Markup','XML Sitemaps & Robots.txt']},
  {title:'Development Tools',icon:'git',description:'A repeatable workflow from idea to working code.',skills:['Git','GitHub','VS Code','API Testing','Technical Documentation']},
  {title:'Currently Learning',icon:'learn',description:'Topics I am studying and practising. Not yet used in a published project.',skills:['RAG','Embeddings','Agentic Workflows']},
];
export const seoSkills = ['On-page SEO','Technical SEO','Keyword Research','Meta Titles & Descriptions','Heading Structure & Internal Linking','XML Sitemaps & Robots.txt','Schema Markup','Mobile-friendly Layouts'];

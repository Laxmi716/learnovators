// Detailed 4-year roadmaps, recommended tools, certifications, and entry roles
export const careerRoadmaps = {
  'data-science': {
    title: 'Data Science & Analytics',
    overview:
      'A structured path from statistics and coding fundamentals to production machine learning models and business insight communication.',
    entryRoles: ['Junior Data Analyst', 'Associate BI Developer', 'Data Science Intern', 'Research Analyst'],
    salaryOutlook: '₹6.5 LPA – ₹14 LPA entry range in India ($75k–$110k US/Global)',
    keyTools: ['Python (pandas, numpy, scikit-learn)', 'SQL & PostgreSQL', 'Tableau / Power BI', 'Git & Docker'],
    certifications: [
      'Google Advanced Data Analytics Professional Certificate (Coursera)',
      'IBM Data Science Professional Certificate',
      'AWS Certified Data Analytics — Specialty',
    ],
    timeline: [
      {
        year: 'Year 1: Foundations & Core Logic',
        focus: 'Mathematics, basic programming, and data curiosity',
        milestones: [
          'Master Python programming syntax, data structures, and algorithms',
          'Learn linear algebra, differential calculus, and probability theory',
          'Build small data manipulation scripts using Pandas and NumPy',
        ],
      },
      {
        year: 'Year 2: Exploratory Data Analysis & SQL',
        focus: 'Database design, querying, and exploratory data visualization',
        milestones: [
          'Master SQL joins, window functions, and database schema normalisation',
          'Create 3 visual dashboards in Tableau or Power BI with public datasets',
          'Learn statistical hypothesis testing and A/B testing principles',
        ],
      },
      {
        year: 'Year 3: Machine Learning & Modeling',
        focus: 'Predictive modeling, regression, classification, and validation',
        milestones: [
          'Implement supervised and unsupervised machine learning algorithms from scratch',
          'Participate in Kaggle student competitions to benchmark modeling skills',
          'Deploy first predictive API using FastAPI or Flask and Streamlit',
        ],
      },
      {
        year: 'Year 4: Production & Capstone Portfolio',
        focus: 'End-to-end data pipelines, internships, and interview readiness',
        milestones: [
          'Publish a comprehensive capstone project on GitHub with live demo',
          'Complete an industry internship or research assistantship',
          'Prepare for technical interviews: SQL live coding, ML fundamentals, and portfolio defense',
        ],
      },
    ],
  },

  'finance': {
    title: 'Finance & Investment Analysis',
    overview:
      'Combines quantitative financial modeling, market valuation, and macroeconomic analysis to evaluate assets and corporate strategy.',
    entryRoles: ['Financial Analyst', 'Investment Banking Analyst', 'Equity Research Associate', 'Risk Consultant'],
    salaryOutlook: '₹7 LPA – ₹16 LPA entry range in India ($80k–$120k US/Global)',
    keyTools: ['Advanced Microsoft Excel (VBA, Power Query)', 'Financial Modeling & DCF', 'Bloomberg Terminal / Capital IQ', 'Python for Finance'],
    certifications: [
      'CFA Level 1 Candidate',
      'FMVA (Financial Modeling & Valuation Analyst — CFI)',
      'NISM Research Analyst Certification',
    ],
    timeline: [
      {
        year: 'Year 1: Accounting & Market Fundamentals',
        focus: 'Three financial statements and micro/macro economics',
        milestones: [
          'Understand balance sheets, income statements, and cash flows thoroughly',
          'Follow global financial markets, interest rates, and inflation indicators daily',
          'Build intermediate spreadsheet proficiency with financial formulas',
        ],
      },
      {
        year: 'Year 2: Valuation & Financial Modeling',
        focus: 'Discounted Cash Flow (DCF) and comparative company analysis',
        milestones: [
          'Build 3-statement financial models in Excel for listed companies',
          'Learn relative valuation multiples (P/E, EV/EBITDA, P/B)',
          'Complete introductory modules for CFA Level 1 or equivalent certification',
        ],
      },
      {
        year: 'Year 3: Equity Research & Sector Specialisation',
        focus: 'Industry deep-dives and investment thesis writing',
        milestones: [
          'Write two comprehensive initiation-of-coverage equity research notes',
          'Understand debt markets, bond yields, and credit risk rating metrics',
          'Secure a summer analyst internship in corporate finance, advisory, or fintech',
        ],
      },
      {
        year: 'Year 4: Portfolio Management & Deal Dynamics',
        focus: 'Mergers & acquisitions (M&A) rationale and investment pitch books',
        milestones: [
          'Create an investment pitch deck and defend assumptions against peer scrutiny',
          'Clear CFA Level 1 examination or state financial licensing tests',
          'Network with alumni analysts and participate in national case competitions',
        ],
      },
    ],
  },

  'research': {
    title: 'Academic or Scientific Research',
    overview:
      'Pursues discovery through empirical methods, peer review, literature synthesis, and investigative experiments.',
    entryRoles: ['Research Assistant', 'Junior Fellow', 'Policy Analyst', 'Think Tank Associate'],
    salaryOutlook: '₹5 LPA – ₹10 LPA stipend/starting fellowship ($45k–$70k US graduate fellowship)',
    keyTools: ['Zotero / Mendeley (Citation management)', 'R / LaTeX / SPSS', 'Qualitative Analysis (NVivo)', 'Experimental Protocol Design'],
    certifications: [
      'CSIR NET / UGC NET (for Indian research institutions)',
      'Responsible Conduct of Research (CITI Program)',
      'Johns Hopkins Data Analysis in R specialization',
    ],
    timeline: [
      {
        year: 'Year 1: Research Methodology & Literature Review',
        focus: 'Critical reading, academic writing, and ethics in research',
        milestones: [
          'Read 20 seminal papers in your focus domain and write synthetic summaries',
          'Learn LaTeX for academic typesetting and reference management tools',
          'Identify faculty advisors with active laboratory or policy grants',
        ],
      },
      {
        year: 'Year 2: Data Collection & Statistical Inference',
        focus: 'Quantitative or qualitative empirical data gathering',
        milestones: [
          'Assist a senior doctoral candidate with lab experiments or field interviews',
          'Master statistical regression, significance levels, and error confidence bands in R or Python',
          'Draft an original conference paper proposal or undergraduate symposium poster',
        ],
      },
      {
        year: 'Year 3: First Author Paper & Grants',
        focus: 'Peer review submission and academic networking',
        milestones: [
          'Submit a co-authored manuscript to a peer-reviewed journal or indexed workshop',
          'Apply for undergraduate research travel grants and summer fellowship programs',
          'Present research findings at an inter-university conference',
        ],
      },
      {
        year: 'Year 4: Undergraduate Thesis & Master\'s / PhD Applications',
        focus: 'Comprehensive thesis defense and graduate school admissions',
        milestones: [
          'Complete an honours thesis with primary data and novel findings',
          'Prepare Statement of Purpose (SOP) and assemble faculty recommendation letters',
          'Target top-tier PhD or research Master\'s programs globally and nationally',
        ],
      },
    ],
  },

  'ux-design': {
    title: 'UX / Product Design',
    overview:
      'Designs intuitive, accessible, and delightful digital user experiences by harmonising customer psychology, interface aesthetics, and business goals.',
    entryRoles: ['Junior Product Designer', 'UI/UX Associate', 'User Researcher', 'Interaction Designer'],
    salaryOutlook: '₹6 LPA – ₹13 LPA entry range in India ($75k–$105k US/Global)',
    keyTools: ['Figma (Auto Layout, Component Systems)', 'UserTesting / Maze', 'FigJam / Miro', 'Framer / Webflow'],
    certifications: [
      'Google UX Design Professional Certificate',
      'Interaction Design Foundation (IxDF) Certifications',
      'Nielsen Norman Group UX Master Certified',
    ],
    timeline: [
      {
        year: 'Year 1: Design Principles & Tool Fluency',
        focus: 'Typography, visual hierarchy, grid systems, and Figma basics',
        milestones: [
          'Understand Gestalt principles of perception and color theory',
          'Master vector tools, auto-layout, and reusable component libraries in Figma',
          'Deconstruct 10 popular mobile apps and document what makes their UX work',
        ],
      },
      {
        year: 'Year 2: User Research & Wireframing',
        focus: 'User interviews, journey mapping, and wireframing flows',
        milestones: [
          'Conduct 5 contextual user interviews for a problem in your college community',
          'Create user personas, empathy maps, and end-to-end user journey flows',
          'Build interactive click-through prototypes and run usability tests',
        ],
      },
      {
        year: 'Year 3: Design Systems & Case Study Portfolio',
        focus: 'Design systems, accessibility (WCAG), and case studies',
        milestones: [
          'Publish 2 comprehensive product design case studies highlighting rationale and iterations',
          'Learn WCAG 2.1 accessibility standards (contrast, focus states, tap targets)',
          'Secure an internship at a tech product company or design agency',
        ],
      },
      {
        year: 'Year 4: Business Strategy & Portfolio Polish',
        focus: 'Metrics-driven design, design tokens, and job ready presentation',
        milestones: [
          'Launch a personal portfolio website showcasing 3 polished case studies',
          'Learn to articulate design trade-offs in business terms (conversion, retention)',
          'Prepare for portfolio walkthroughs and whiteboard design challenges',
        ],
      },
    ],
  },

  'content-media': {
    title: 'Content Strategy & Digital Media',
    overview:
      'Creates compelling written, audio, and visual narratives that build authentic audiences and establish trusted brand voices.',
    entryRoles: ['Content Strategist', 'Digital Media Associate', 'Copywriter', 'Brand Storyteller'],
    salaryOutlook: '₹4.5 LPA – ₹9 LPA entry range in India ($55k–$85k US/Global)',
    keyTools: ['Notion (Editorial Calendar)', 'Adobe Premiere / DaVinci Resolve', 'Canva / Adobe Photoshop', 'Google Analytics & SEO tools'],
    certifications: [
      'HubSpot Content Marketing Certification',
      'Google Digital Marketing & E-Commerce Certificate',
      'Semrush SEO Fundamentals',
    ],
    timeline: [
      {
        year: 'Year 1: Voice, Storytelling & Media Literacy',
        focus: 'Writing clarity, storytelling hooks, and cross-platform dynamics',
        milestones: [
          'Publish weekly essays or newsletter dispatches on Substack or LinkedIn',
          'Understand narrative pacing, hook formulas, and audience engagement retention',
          'Learn basic video and audio editing in CapCut or DaVinci Resolve',
        ],
      },
      {
        year: 'Year 2: Audience Building & SEO',
        focus: 'Keyword research, on-page optimization, and distribution channels',
        milestones: [
          'Grow a thematic content channel or student newsletter to 500+ subscribers',
          'Master search engine optimization (search intent, backlink strategy, metadata)',
          'Produce a 5-part video or podcast series with clean production quality',
        ],
      },
      {
        year: 'Year 3: Strategic Campaign Design',
        focus: 'Editorial calendars, multi-channel syndication, and analytics',
        milestones: [
          'Direct an awareness campaign for a student organization or local business',
          'Analyze web traffic metrics (bounce rates, scroll depth, click-through rates)',
          'Complete a paid copywriting or social media content internship',
        ],
      },
      {
        year: 'Year 4: Content Operations & Portfolio',
        focus: 'Brand positioning, ghostwriting, and comprehensive agency reel',
        milestones: [
          'Assemble a portfolio displaying measurable business impact of content campaigns',
          'Develop brand voice guidelines and editorial style manuals for client briefs',
          'Interview for brand strategist, media producer, or content marketing roles',
        ],
      },
    ],
  },

  'architecture': {
    title: 'Architecture & Spatial Design',
    overview:
      'Combines structural engineering principles, cultural aesthetics, and sustainable urban design to shape physical spaces.',
    entryRoles: ['Architectural Intern', 'Junior Spatial Designer', 'BIM Modeler', 'Draftsperson'],
    salaryOutlook: '₹4.5 LPA – ₹9 LPA entry range in India ($60k–$85k US/Global)',
    keyTools: ['Autodesk AutoCAD & Revit', 'Rhinoceros & Grasshopper', 'SketchUp & Lumion', 'Physical model making'],
    certifications: [
      'LEED Green Associate (USGBC)',
      'Autodesk Certified Professional: Revit for Architectural Design',
      'Council of Architecture (COA) registration path',
    ],
    timeline: [
      {
        year: 'Year 1: Drafting, Scale & Spatial Perception',
        focus: 'Orthographic projections, perspective drawing, and physical craft',
        milestones: [
          'Master manual drafting with technical pens, scale rules, and drafting tables',
          'Construct precise architectural scale models in balsa wood and chipboard',
          'Transition hand drawings to digital CAD tools (AutoCAD line conventions)',
        ],
      },
      {
        year: 'Year 2: Structural Logic & 3D Modeling',
        focus: 'Load paths, materials science, and digital 3D visualization',
        milestones: [
          'Understand structural systems (columns, beams, cantilevers, soil conditions)',
          'Model complex volumetric concepts in Rhino and SketchUp',
          'Produce photorealistic environmental renderings in Lumion or Enscape',
        ],
      },
      {
        year: 'Year 3: Sustainability & Building Codes',
        focus: 'Passive solar design, thermal performance, and municipal zoning',
        milestones: [
          'Design an eco-conscious community center integrating rainwater harvesting and daylighting',
          'Learn local building bylaws, floor space index (FSI), and egress requirements',
          'Undertake an apprenticeship at an architectural studio or urban planning firm',
        ],
      },
      {
        year: 'Year 4: Studio Thesis & Professional Dossier',
        focus: 'Comprehensive design thesis, working drawings, and portfolio review',
        milestones: [
          'Complete a full set of municipal construction working drawings',
          'Defend a comprehensive capstone architectural thesis before a jury of practitioners',
          'Publish an international standard design portfolio for top studio recruitment',
        ],
      },
    ],
  },

  'hr-org-psychology': {
    title: 'Human Resources & Organisational Psychology',
    overview:
      'Applies psychological principles and people systems to attract talent, mediate conflict, and foster thriving team cultures.',
    entryRoles: ['People Operations Associate', 'HR Generalist Trainee', 'Talent Acquisition Coordinator', 'Culture Associate'],
    salaryOutlook: '₹5 LPA – ₹10 LPA entry range in India ($60k–$85k US/Global)',
    keyTools: ['HRIS (Workday, BambooHR)', 'Applicant Tracking Systems (Lever, Greenhouse)', 'Performance Management Frameworks (OKRs, 360 Reviews)', 'Employee Engagement Analytics'],
    certifications: [
      'SHRM Certified Professional (SHRM-CP)',
      'Associate Professional in Human Resources (aPHR)',
      'Dale Carnegie Conflict Resolution / Leadership training',
    ],
    timeline: [
      {
        year: 'Year 1: Organisational Behavior & Active Listening',
        focus: 'Psychology of work, motivation theories, and communication',
        milestones: [
          'Study Herzberg, Maslow, and self-determination theory applied to modern workplace retention',
          'Practice structured mediation, active listening, and conflict de-escalation',
          'Lead team recruitment and coordination for college clubs or student unions',
        ],
      },
      {
        year: 'Year 2: Talent Acquisition & Employment Law',
        focus: 'Structured behavioral interviewing and statutory workplace compliance',
        milestones: [
          'Design competency-based interview rubrics and candidate evaluation matrices',
          'Learn regional labor laws, anti-harassment policies, and equal opportunity standards',
          'Run a mini-onboarding program for incoming college juniors or fresh recruits',
        ],
      },
      {
        year: 'Year 3: People Analytics & Culture Architecture',
        focus: 'Employee Net Promoter Score (eNPS), attrition analytics, and compensation',
        milestones: [
          'Analyze workforce survey data to detect burnout and morale bottlenecks',
          'Complete a corporate HR or talent acquisition summer internship',
          'Design a competitive compensation and fringe benefits benchmark model',
        ],
      },
      {
        year: 'Year 4: Change Management & Strategic Leadership',
        focus: 'M&A integration, remote work governance, and executive partnership',
        milestones: [
          'Build a playbook for managing team reorganizations and cultural shifts',
          'Prepare for SHRM-CP or aPHR foundational certification exams',
          'Secure placement in high-growth startup People teams or established HR leadership tracks',
        ],
      },
    ],
  },

  'social-work': {
    title: 'Social Work & Community Development',
    overview:
      'Empowers communities and vulnerable populations through grass-roots mobilization, policy advocacy, and welfare interventions.',
    entryRoles: ['Community Outreach Coordinator', 'Program Associate (NGO)', 'Child & Family Welfare Worker', 'Policy Research Fellow'],
    salaryOutlook: '₹4 LPA – ₹8 LPA entry range in India ($48k–$70k US/Global)',
    keyTools: ['Program Monitoring & Evaluation (M&E)', 'Grant Writing & Donor Reporting', 'Community Needs Assessment', 'Case Management Software'],
    certifications: [
      'Licensed Baccalaureate Social Worker (LBSW) path',
      'Project Management for Development Professionals (PMD Pro)',
      'UNICEF / WHO Child Protection Certification',
    ],
    timeline: [
      {
        year: 'Year 1: Social Systems, Human Rights & Empathy',
        focus: 'Social stratification, welfare history, and field observation',
        milestones: [
          'Volunteer 100 hours with a local grass-roots community initiative or rehabilitation center',
          'Understand social determinants of health, education access, and systemic inequality',
          'Learn trauma-informed interviewing and ethical community engagement',
        ],
      },
      {
        year: 'Year 2: Fieldwork & Grassroots Needs Assessment',
        focus: 'Participatory rural/urban appraisal and community dialogues',
        milestones: [
          'Conduct a structured community needs assessment in an underserved neighborhood',
          'Facilitate group counseling or adolescent skill workshops with supervised guidance',
          'Master documentation of client case files while upholding confidentiality',
        ],
      },
      {
        year: 'Year 3: Program Management & Grant Writing',
        focus: 'Logical frameworks, donor grant proposals, and budget allocation',
        milestones: [
          'Co-write a grant proposal for a development project with defined impact metrics',
          'Execute a targeted community advocacy campaign (sanitation, literacy, health)',
          'Complete a semester-long block field placement with a registered NGO or welfare body',
        ],
      },
      {
        year: 'Year 4: Policy Impact & Capstone Intervention',
        focus: 'Welfare policy reform, sustainable scalability, and graduate studies',
        milestones: [
          'Implement an independent community development intervention with measurable post-survey outcomes',
          'Publish a policy brief on local governance welfare delivery gaps',
          'Apply for Master of Social Work (MSW) or direct recruitment in international development organizations',
        ],
      },
    ],
  },

  'education': {
    title: 'Education & Edtech',
    overview:
      'Reimagines learning experiences through pedagogical science, adaptive curriculum design, and digital educational technologies.',
    entryRoles: ['Associate Instructional Designer', 'Edtech Product Associate', 'Curriculum Developer', 'Educator / Academic Specialist'],
    salaryOutlook: '₹5 LPA – ₹11 LPA entry range in India ($60k–$85k US/Global)',
    keyTools: ['LMS platforms (Canvas, Moodle)', 'Instructional Design (Articulate 360)', 'Bloom\'s Taxonomy Frameworks', 'EdTech Analytics (Quiz & Retention metrics)'],
    certifications: [
      'Instructional Design Principles for Course Creation (Coursera)',
      'Google Certified Educator Level 1 & 2',
      'Harvard BOK Higher Education Teaching Certificate',
    ],
    timeline: [
      {
        year: 'Year 1: Cognitive Learning Theories & Student Psychology',
        focus: 'How people learn, memory retention, and pedagogical frameworks',
        milestones: [
          'Understand Bloom\'s Taxonomy, Vygotsky\'s Scaffolding, and Mayer\'s Multimedia Learning principles',
          'Tutor younger students in foundational subjects and document where comprehension fails',
          'Analyze top online learning courses for pacing and engagement strategies',
        ],
      },
      {
        year: 'Year 2: Curriculum Design & Interactive Content',
        focus: 'Syllabus structuring, formative assessments, and gamification',
        milestones: [
          'Create a 4-module micro-course with lesson objectives, quizzes, and reflection rubrics',
          'Learn instructional authoring tools like Articulate Storyline or H5P interactive widgets',
          'Incorporate universal design for learning (UDL) to cater to diverse learning paces',
        ],
      },
      {
        year: 'Year 3: Edtech Product Management & Analytics',
        focus: 'Learning Management Systems (LMS) and learning outcome metrics',
        milestones: [
          'Deploy a complete course on Canvas or Moodle and analyze student drop-off points',
          'Complete a summer internship at an edtech startup, school network, or university lab',
          'Design adaptive learning quizzes that automatically recalibrate question difficulty',
        ],
      },
      {
        year: 'Year 4: Portfolio Showcase & Industry Integration',
        focus: 'Scaled curriculum rollouts and educational venture building',
        milestones: [
          'Publish an instructional design portfolio showcasing 3 interactive course blueprints',
          'Lead a peer learning initiative or student workshop series with 100+ participants',
          'Interview for instructional designer, edtech product manager, or institutional educator roles',
        ],
      },
    ],
  },

  'software-engineering': {
    title: 'Software Engineering',
    overview:
      'Designs, develops, tests, and maintains scalable web platforms, backend architectures, and distributed systems.',
    entryRoles: ['Junior Software Engineer', 'Full Stack Developer', 'Backend Associate', 'Cloud Developer'],
    salaryOutlook: '₹7 LPA – ₹18 LPA entry range in India ($85k–$130k US/Global)',
    keyTools: ['JavaScript / TypeScript / Node.js', 'React / Next.js', 'PostgreSQL & Redis', 'Git, CI/CD & Linux'],
    certifications: [
      'AWS Certified Developer — Associate',
      'Meta Front-End or Back-End Developer Certificate',
      'HashiCorp Certified: Terraform Associate',
    ],
    timeline: [
      {
        year: 'Year 1: Data Structures, Algorithms & Fundamentals',
        focus: 'Clean code, computational thinking, and version control',
        milestones: [
          'Master one core language deeply (TypeScript, Python, or Java)',
          'Solve 150+ DSA problems covering arrays, strings, trees, graphs, and dynamic programming',
          'Push code daily to GitHub and understand Git branch workflows',
        ],
      },
      {
        year: 'Year 2: Full-Stack Web Development & Databases',
        focus: 'Client-server architecture, RESTful APIs, and relational databases',
        milestones: [
          'Build and deploy a full-stack React + Node.js application with user authentication',
          'Design normalized PostgreSQL database schemas with indexing and foreign keys',
          'Contribute your first pull request to an open-source project',
        ],
      },
      {
        year: 'Year 3: System Design & Cloud Infrastructure',
        focus: 'Caching, microservices, concurrency, and cloud deployment',
        milestones: [
          'Implement Redis caching, message queues, and rate-limiting in a backend service',
          'Deploy applications to AWS or GCP using Docker containers and automated CI/CD pipelines',
          'Crack a software engineering summer internship at a product engineering firm',
        ],
      },
      {
        year: 'Year 4: Production Scalability & Interview Readiness',
        focus: 'Distributed systems, unit testing, and technical interview mastery',
        milestones: [
          'Write comprehensive unit and integration tests (Jest / PyTest) with >80% coverage',
          'Conduct mock technical interviews for data structures, algorithms, and system design',
          'Secure high-impact full-time developer offers across product and tech enterprises',
        ],
      },
    ],
  },

  'cybersecurity': {
    title: 'Cybersecurity & Ethical Hacking',
    overview:
      'Defends networks, clouds, and computer systems from unauthorized intrusions, vulnerabilities, and cyber attacks.',
    entryRoles: ['Junior Security Analyst (SOC)', 'Penetration Tester', 'Cloud Security Associate', 'Incident Response Trainee'],
    salaryOutlook: '₹6.5 LPA – ₹15 LPA entry range in India ($80k–$120k US/Global)',
    keyTools: ['Wireshark & Nmap', 'Burp Suite / OWASP ZAP', 'Linux Command Line & Bash scripting', 'Splunk / SIEM tools'],
    certifications: [
      'CompTIA Security+',
      'Certified Ethical Hacker (CEH) or eJPT (Junior Penetration Tester)',
      'AWS Certified Security — Specialty',
    ],
    timeline: [
      {
        year: 'Year 1: Networking Protocols & Linux Mastery',
        focus: 'TCP/IP model, packet analysis, and operating system kernels',
        milestones: [
          'Understand OSI layers, DNS, DHCP, SSL/TLS, and HTTP/HTTPS handshakes',
          'Operate comfortably in Linux terminal environments and write automated bash scripts',
          'Set up a home virtualization lab using VirtualBox with Kali Linux and vulnerable target VMs',
        ],
      },
      {
        year: 'Year 2: Web App Vulnerabilities & Defense Tools',
        focus: 'OWASP Top 10 vulnerabilities and network scanning',
        milestones: [
          'Identify and remediate SQL injection, Cross-Site Scripting (XSS), and CSRF vulnerabilities',
          'Practice capture-the-flag (CTF) challenges on TryHackMe and OverTheWire',
          'Attain CompTIA Network+ or Security+ foundational certification',
        ],
      },
      {
        year: 'Year 3: Penetration Testing & Threat Hunting',
        focus: 'Exploit development, privilege escalation, and SIEM monitoring',
        milestones: [
          'Perform ethical penetration testing on simulated enterprise domains',
          'Learn Security Operations Center (SOC) log analysis using Splunk or the ELK stack',
          'Land a cybersecurity analyst or vulnerability assessment internship',
        ],
      },
      {
        year: 'Year 4: Cloud Security & Defense Readiness',
        focus: 'IAM hardening, zero-trust architectures, and incident response playbooks',
        milestones: [
          'Audit an AWS cloud environment against the CIS benchmarks',
          'Author a formal penetration test report with executive summary and technical remediation',
          'Target security engineering roles across banks, defense contractors, and SaaS providers',
        ],
      },
    ],
  },

  'ai-ml': {
    title: 'Artificial Intelligence & Machine Learning',
    overview:
      'Engineers neural networks, transformer models, and generative AI agents that solve complex predictive and perceptual problems.',
    entryRoles: ['AI Engineer', 'Machine Learning Associate', 'NLP/Computer Vision Intern', 'MLOps Specialist'],
    salaryOutlook: '₹8 LPA – ₹20 LPA entry range in India ($95k–$150k US/Global)',
    keyTools: ['PyTorch & TensorFlow', 'Hugging Face Transformers', 'Vector Databases (Pinecone, Chroma)', 'MLflow & Docker'],
    certifications: [
      'DeepLearning.AI Deep Learning Specialization',
      'Google Cloud Professional Machine Learning Engineer',
      'AWS Certified Machine Learning — Specialty',
    ],
    timeline: [
      {
        year: 'Year 1: Advanced Mathematics & Python Scientific Stack',
        focus: 'Multivariable calculus, matrix decompositions, and vectorised computation',
        milestones: [
          'Master linear algebra (eigenvalues, SVD), multivariate calculus, and probability distributions',
          'Write vectorised array operations in NumPy without nested loops',
          'Build a basic neural network with forward pass and backpropagation from scratch in Python',
        ],
      },
      {
        year: 'Year 2: Deep Learning Architectures & Frameworks',
        focus: 'CNNs, RNNs, and PyTorch model training loops',
        milestones: [
          'Build convolutional neural networks for computer vision classification',
          'Understand loss functions, optimizers (Adam, SGD), and regularization (dropout, batch norm)',
          'Implement training, validation, and checkpointing pipelines using PyTorch',
        ],
      },
      {
        year: 'Year 3: Transformers, LLMs & Retrieval Augmented Generation (RAG)',
        focus: 'Attention mechanisms, fine-tuning, and modern agentic architectures',
        milestones: [
          'Understand self-attention mechanisms and transformer encoder-decoder models',
          'Build and deploy a production RAG application using Hugging Face, vector embeddings, and LangChain',
          'Secure an AI/ML research or engineering internship at a tech company or laboratory',
        ],
      },
      {
        year: 'Year 4: MLOps, Model Optimization & Capstone',
        focus: 'Quantization, latency optimization, CI/CD for models, and thesis defense',
        milestones: [
          'Deploy a low-latency ML service with Docker, Triton or FastAPI, and model monitoring',
          'Publish a novel fine-tuned model or technical benchmark paper on arXiv or Hugging Face Hub',
          'Recruit for top tier AI Labs, autonomous tech companies, and enterprise AI engineering teams',
        ],
      },
    ],
  },
};

// Career path recommendations per top interest category.
// Each path has a dynamic "why" function that references the user's actual profile.

export const careerPaths = {
  analytical: [
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      icon: '📊',
      description:
        'Turn data into decisions. Data scientists design models that find patterns hidden in numbers — used in healthcare, finance, and every major tech company.',
      why: (profile) =>
        `Your analytical thinking aligns perfectly with this field${profile.stream === 'Science' || profile.stream === 'Engineering' ? `, and your ${profile.stream} background gives you a strong foundation` : ''}${profile.marks && parseInt(profile.marks) >= 75 ? ` — your marks of ${profile.marks}% show the academic rigour this path rewards` : ''}.`,
      tags: ['Statistics', 'Python', 'Machine Learning'],
    },
    {
      id: 'finance',
      title: 'Finance & Investment Analysis',
      icon: '💹',
      description:
        'Financial analysts research markets, evaluate companies, and guide investment decisions. A career built on precise thinking and structured problem-solving.',
      why: (profile) =>
        `Your preference for logic and evidence makes you well-suited to financial modelling${profile.stream === 'Commerce' ? `, and your Commerce background is a direct advantage` : ''}${profile.certifications ? ` — your certifications also signal the self-driven learning this industry values` : ''}.`,
      tags: ['CFA', 'Equity Research', 'Economics'],
    },
    {
      id: 'research',
      title: 'Academic or Scientific Research',
      icon: '🔬',
      description:
        'Researchers ask the questions nobody has answered yet. Whether in social science, biology, or economics — this path rewards curiosity and rigour.',
      why: (profile) =>
        `Your interest in analysis suggests you thrive when going deep on a question${profile.stream === 'Science' ? `, and a Science stream background is a natural head start` : ''}. Research careers suit those who don\'t settle for surface-level answers.`,
      tags: ['Academia', 'PhD pathways', 'Think Tanks'],
    },
  ],

  creative: [
    {
      id: 'ux-design',
      title: 'UX / Product Design',
      icon: '🎨',
      description:
        'UX designers shape how millions of people experience apps, websites, and products. Creativity meets psychology meets business in this fast-growing field.',
      why: (profile) =>
        `Your creative orientation translates directly into design thinking${profile.certifications ? ` — and your certification experience shows you take your development seriously` : ''}. UX is one of the highest-demand creative careers right now.`,
      tags: ['Figma', 'User Research', 'Prototyping'],
    },
    {
      id: 'content-media',
      title: 'Content Strategy & Digital Media',
      icon: '✍️',
      description:
        'From video production to brand storytelling, content professionals shape how organisations communicate in the digital age.',
      why: (profile) =>
        `Your creative strengths are an asset in a world where every company needs to tell a compelling story${profile.stream === 'Arts' ? ` — an Arts background gives you a real edge in this space` : ''}.`,
      tags: ['Writing', 'Video', 'Brand Strategy'],
    },
    {
      id: 'architecture',
      title: 'Architecture & Spatial Design',
      icon: '🏛️',
      description:
        'Architects blend creative vision with technical precision to design the spaces where people live, work, and gather.',
      why: (profile) =>
        `Spatial and visual thinking are core strengths in your profile${profile.stream === 'Science' ? `, and your Science background will support the technical modules in architecture programmes` : ''}. Architecture rewards those who think both aesthetically and structurally.`,
      tags: ['Design', 'Engineering', 'Urban Planning'],
    },
  ],

  social: [
    {
      id: 'hr-org-psychology',
      title: 'Human Resources & Organisational Psychology',
      icon: '🤝',
      description:
        'HR professionals shape company cultures, resolve conflicts, and build the systems that help people do their best work.',
      why: (profile) =>
        `Your social orientation — how you connect with and support people — is exactly what this field runs on${profile.stream === 'Arts' ? `. An Arts background sharpens the empathy and communication skills HR depends on` : ''}.`,
      tags: ['People Management', 'Organisational Behaviour', 'Coaching'],
    },
    {
      id: 'social-work',
      title: 'Social Work & Community Development',
      icon: '🌱',
      description:
        'Social workers and community leaders create real change in people\'s lives — in healthcare, education, policy, and community organisations.',
      why: (profile) =>
        `Your instinct to support others is your biggest professional asset. Social development careers allow you to channel that into meaningful, lasting work${profile.certifications ? ` — your initiative in gaining certifications reflects the self-motivation this field requires` : ''}.`,
      tags: ['Counselling', 'NGO', 'Public Policy'],
    },
    {
      id: 'education',
      title: 'Education & Edtech',
      icon: '📚',
      description:
        'Educators and curriculum designers shape what the next generation learns. Edtech roles combine teaching instincts with product thinking to scale impact.',
      why: (profile) =>
        `Your ability to connect with people makes you a natural in educational environments${profile.marks && parseInt(profile.marks) >= 70 ? ` — and your strong academic record means you understand learning from the inside` : ''}. Teaching and edtech are growing rapidly in India and globally.`,
      tags: ['Teaching', 'Curriculum Design', 'Edtech Product'],
    },
  ],

  technical: [
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      icon: '💻',
      description:
        'Software engineers build the systems, apps, and platforms that power modern life — from banking apps to AI systems to games.',
      why: (profile) =>
        `Your technical orientation puts you right at home in a field that rewards builders${profile.stream === 'Engineering' || profile.stream === 'Science' ? ` — your ${profile.stream} background gives you exactly the quantitative foundation top programmes look for` : ''}${profile.marks && parseInt(profile.marks) >= 75 ? `, and ${profile.marks}% is a competitive score for leading engineering roles` : ''}.`,
      tags: ['Programming', 'System Design', 'Cloud'],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: '🔐',
      description:
        'Cybersecurity professionals protect systems, networks, and data from threats. One of the fastest-growing fields — with critical global demand.',
      why: (profile) =>
        `Problem-solving under pressure is central to security work, which suits your technical and resilient profile${profile.certifications ? ` — your certifications already signal the self-directed learning cybersecurity roles value highly` : ''}.`,
      tags: ['Ethical Hacking', 'Security Operations', 'Networking'],
    },
    {
      id: 'ai-ml',
      title: 'Artificial Intelligence & Machine Learning',
      icon: '🤖',
      description:
        'AI/ML engineers design the algorithms and systems that learn from data — powering everything from recommendation engines to medical diagnostics.',
      why: (profile) =>
        `Your technical interest, combined with a field that also requires logical thinking, makes AI/ML a compelling direction${profile.stream === 'Engineering' ? ` — Engineering is one of the strongest pathways into this space` : ''}${profile.examScore ? ` and your competitive exam score (${profile.examScore}) demonstrates the analytical readiness this field demands` : ''}.`,
      tags: ['Python', 'Deep Learning', 'Research Engineering'],
    },
  ],
};

export function getCareerPaths(topCategory) {
  return careerPaths[topCategory] || careerPaths.technical;
}

export function getTopCategory(interestScores) {
  return Object.entries(interestScores).sort((a, b) => b[1] - a[1])[0][0];
}

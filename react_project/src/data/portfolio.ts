import { 
  Code, 
  Database, 
  Layout, 
  Layers,
  Server, 
  Smartphone, 
  Terminal,
  Clock,
  Award,
  Briefcase,
  User,
  Zap,
  BookOpen,
  Mail,
  Facebook,
  MessageCircle
} from 'lucide-react';

// --- Constants ---
const START_WORK_DATE = new Date(2015, 7, 1); // Month is 0-indexed (Aug = 7)

// --- Helper for dynamic calculations ---
const getTimeDiff = (startDate: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {
    days: diffDays,
    years: (diffDays / 365).toFixed(1),
    hours: Math.floor(diffDays * 24 * 0.35).toLocaleString(), // Logic from Flutter: hours * 0.35
    coffee: Math.ceil(diffDays * 1.5).toLocaleString()
  };
};

const workStats = getTimeDiff(START_WORK_DATE);

export const HERO_DATA = {
  name: "Phat Nguyen",
  title: "Solution Architect & Specialist",
  location: "Vietnam 🇻🇳",
  intro: "Translating complex business requirements into scalable, high-performance technical architectures. I bridge the gap between visionary strategy and flawless execution.",
  cta: "OPEN FOR PARTNERSHIPS",
  avatar: "/images/profile-2.jpg" // Using the image from assets
};

export const ABOUT_DATA = {
  personalities: [
    "#confident",
    "#forward-thinking",
    "#passionate",
    "#funny"
  ],
  bio: [
    "I am a Solution Architect and Technology Specialist with a deep focus on building sustainable, high-scale systems. My journey has evolved from writing code to designing the ecosystems that businesses rely on to thrive.",
    "As a Business Owner, I understand that technology is an investment, not just a tool. I specialize in aligning technical strategy with business goals, ensuring every line of code contributes to the bottom line.",
    "I thrive on solving 'impossible' problems—whether it's architecting a distributed financial system, optimizing high-frequency trading platforms, or leading teams through digital transformations.",
    "My expertise spans the entire stack, but my true value lies in the big picture: selecting the right paradigms, mitigating risks, and future-proofing infrastructure against rapid industry shifts.",
    "I don't just build software; I build the foundation for growth, innovation, and long-term success."
  ],
  funFacts: [
    { label: "Years of Work", value: workStats.years, icon: Briefcase },
    { label: "Hours of Work", value: `~${workStats.hours}`, icon: Clock },
    { label: "Projects", value: "25+", icon: Layers },
    { label: "Awards/Certs", value: "6", icon: Award },
    { label: "Console Logs", value: "∞", icon: Terminal },
    { label: "Git Commits", value: `~${(Number(workStats.days) * 5).toLocaleString()}`, icon: Terminal },
    { label: "Bugs Resolved", value: `~${(Number(workStats.days) * 3).toLocaleString()}`, icon: Zap },
    { label: "Tech Stack", value: "15+", icon: Code },
  ]
};

export const EXPERIENCE_DATA = [
  {
    id: 1,
    time: "2019 - Present",
    place: "Freelancer & Consultant & Business Owner",
    role: "PRINCIPAL SOLUTIONS ARCHITECT",
    details: [
      "Orchestrating a distributed engineering team of 10+ specialists, delivering end-to-end enterprise solutions for global clients.",
      "Engineered a proprietary Algo-Trading infrastructure, optimizing order execution latency by 40% through low-level C++ tuning.",
      "Architecting scalable data lakes for financial modeling, ingesting and processing 1TB+ of daily market tick data.",
      "Delivered enterprise solutions for Korean market including Samick Furniture ERP, GongCheck platform, and DMA HFT systems."
    ]
  },
  {
    id: 2,
    time: "2018 - 2019",
    place: "Nexpando Corporation",
    role: "TECHNICAL LEAD",
    details: [
      "Spearheaded the architecture of Vietjet's 'Instant Ticketing System', enabling reliable transaction processing for 50k+ concurrent users.",
      "Redesigned the 'Nexbus' core platform, achieving a 30% reduction in cloud infrastructure costs while improving system availability to 99.99%."
    ]
  },
  {
    id: 3,
    time: "2017 - 2018",
    place: "Dinosys Corporation",
    role: "LEAD BACKEND ENGINEER (JAVA)",
    details: [
      "Directed technical strategy for a 5-member Java team, successfully delivering 4 complex concurrent projects on strict timelines.",
      "Modernized legacy systems by introducing microservices patterns with Spring Boot, enhancing scalability and deployment velocity."
    ]
  },
  {
    id: 4,
    time: "2016 - 2017",
    place: "Dinosys Corporation",
    role: "FULL-STACK ENGINEER",
    details: [
      "Developed a comprehensive Travel Ecosystem (Web, Android, API), integrating complex third-party GDS (Global Distribution Systems).",
      "Optimized API response times to <200ms through aggressive caching strategies and database query tuning."
    ]
  },
  {
    id: 5,
    time: "2015 - 2016",
    place: "Wisky Solution",
    role: "ANDROID ARCHITECT",
    details: [
      "Owned the complete Android vertical, deploying a robust Loyalty CRM system deployed across 50+ retail chains.",
      "Served as Internal Technical Trainer, upskilling the engineering team on advanced Android architectural patterns and memory management."
    ]
  },
  {
    id: 6,
    time: "2014 - 2015",
    place: "FPT Software",
    role: "SOFTWARE ENGINEER",
    details: [
      "Contributed to enterprise-scale mobile solutions, gaining deep foundational expertise in clean architecture and rigorous testing standards."
    ]
  }
];

export const EDUCATION_DATA = [
  {
    id: 1,
    time: "2021",
    place: "Google",
    title: "DATA ANALYTICS PROFESSIONAL CERTIFICATE",
    details: [
      "Mastered end-to-end data lifecycles, specializing in Business Intelligence and predictive modeling.",
      "Engineered automated financial analysis models to derive high-stakes market insights."
    ]
  },
  {
    id: 2,
    time: "2016",
    place: "IBM Bluemix",
    title: "GLOBAL CLOUD INNOVATION AWARD",
    details: [
      "Championed a global innovation challenge, securing $24,000 USD in seed funding for architectural excellence.",
      "Recognized by IBM for superior application design on cloud-native infrastructure."
    ]
  },
  {
    id: 3,
    time: "2015",
    place: "Oracle",
    title: "ORACLE CERTIFIED ASSOCIATE (OCA)",
    details: [
      "Validated professional-grade proficiency in enterprise Java development and systems architecture."
    ]
  },
  {
    id: 4,
    time: "2012 - 2016",
    place: "FPT University",
    title: "B.ENG. SOFTWARE ENGINEERING",
    details: [
      "Graduated with Distinction (GPA 8.7/10), focused on Advanced Algorithms and System Design.",
      "Pioneered an IoT-driven indoor navigation ecosystem, awarded 'Best Capstone Project' for technical innovation."
    ]
  },
  {
    id: 5,
    time: "2009 - 2012",
    place: "Nguyen Dinh Chieu High School",
    title: "ALGORITHMIC EXCELLENCE AWARD",
    details: [
      "Secured top honors in district software competition, establishing an early foundation in complex problem-solving."
    ]
  }
];

export const SKILLS_DATA = {
  languages: [
    { category: "Languages", items: ['Java', 'Kotlin', 'Rust', 'Go', 'Elixir', 'Python', 'C/C++', 'TS/JS'] },
    { category: "Frameworks", items: ['Spring Boot', 'React', 'Next.js', 'Node.js', 'Flutter', 'Elixir Phoenix'] },
    { category: "Persistence", items: ['PostgreSQL', 'TimescaleDB', 'ElasticSearch', 'Redis', 'MongoDB'] },
    { category: "Infrastructure", items: ['Docker', 'Kubernetes', 'CI/CD', 'Linux (Nvim)', 'AWS/Cloud'] },
  ],
  technical: [
    { name: 'Distributed Systems', level: 0.95, icon: Server },
    { name: 'Cloud Native Arch', level: 0.9, icon: Database },
    { name: 'Frontend Eng', level: 0.85, icon: Layout },
    { name: 'Algorithm Design', level: 0.9, icon: Code },
    { name: 'DevOps & CI/CD', level: 0.8, icon: Terminal },
    { name: 'Mobile Architecture', level: 0.85, icon: Smartphone },
  ],
  soft: [
    { name: 'Strategic Vision', level: 0.95, icon: BookOpen },
    { name: 'Tech Leadership', level: 0.9, icon: User },
    { name: 'Project Mgmt', level: 0.85, icon: Briefcase },
    { name: 'Client Negotiation', level: 0.85, icon: MessageCircle },
    { name: 'Innovation Drive', level: 0.9, icon: Zap },
    { name: 'Mentorship', level: 0.9, icon: User },
  ],
  descriptions: [
    "I specialize in designing fault-tolerant, high-throughput distributed systems that serve as the backbone of modern enterprises.",
    "My architectural approach balances strict consistency with eventual scalability, selecting the right persistence layer (PostgreSQL, TimescaleDB, ElasticSearch) for the specific data shape.",
    "I view code as a liability and architecture as an asset; my goal is to maximize business value while minimizing technical debt through clean, modular design patterns.",
    "From optimizing low-level C++ algorithms to orchestrating serverless Node.js microservices, I bridge the gap between bare-metal performance and cloud agility."
  ]
};

export type ProjectCategory = 'IoT' | 'Mobile' | 'Web' | 'Enterprise' | 'Finance' | 'Backend';

export interface Project {
  title: string;
  image: string;
  description: string;
  techStack: string[];
  category: ProjectCategory;
  highlights: string[];
  year: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    title: 'Beacon Indoor Navigation',
    image: '/images/work11.jpg',
    description: 'Award-winning IoT ecosystem for indoor positioning using BLE beacons. Capstone project recognized as "Best Innovation" at FPT University.',
    techStack: ['Android', 'BLE', 'Node.js', 'MongoDB', 'Machine Learning'],
    category: 'IoT',
    highlights: ['Sub-meter accuracy', 'Real-time tracking', 'IBM Bluemix Award Winner'],
    year: '2016'
  },
  {
    title: 'Myo Gesture Control',
    image: '/images/work10.jpg',
    description: 'Experimental wearable integration using Myo armband for gesture-based device control and accessibility applications.',
    techStack: ['Android', 'Myo SDK', 'Bluetooth', 'Signal Processing'],
    category: 'IoT',
    highlights: ['8 gesture patterns', 'Low latency response', 'Accessibility focused'],
    year: '2016'
  },
  {
    title: 'Smart Home IoT Hub',
    image: '/images/work2.jpg',
    description: 'Centralized IoT management platform connecting multiple smart devices with real-time monitoring and automation rules.',
    techStack: ['React', 'Node.js', 'MQTT', 'PostgreSQL', 'Docker'],
    category: 'IoT',
    highlights: ['50+ device types', 'Custom automation', 'Voice integration'],
    year: '2017'
  },
  {
    title: 'Travel Booking Platform',
    image: '/images/work6.jpg',
    description: 'Full-stack travel ecosystem integrating GDS systems for flight, hotel, and tour bookings with real-time availability.',
    techStack: ['Java', 'Spring Boot', 'Angular', 'Amadeus GDS', 'Redis'],
    category: 'Web',
    highlights: ['<200ms API response', 'Multi-GDS integration', '100k+ bookings'],
    year: '2017'
  },
  {
    title: 'Enterprise ERP System',
    image: '/images/work5.png',
    description: 'Comprehensive enterprise resource planning solution covering HR, inventory, finance, and project management modules.',
    techStack: ['Java', 'Spring', 'Oracle DB', 'Angular', 'Jasper Reports'],
    category: 'Enterprise',
    highlights: ['Multi-tenant', '15+ modules', 'Custom workflow engine'],
    year: '2018'
  },
  {
    title: 'Retail Loyalty CRM',
    image: '/images/work7.jpg',
    description: 'Mobile-first loyalty and CRM platform deployed across 50+ retail chains with points management and customer analytics.',
    techStack: ['Android', 'Kotlin', 'Spring Boot', 'PostgreSQL', 'Firebase'],
    category: 'Mobile',
    highlights: ['50+ retail chains', '1M+ users', 'Real-time rewards'],
    year: '2016'
  },
  {
    title: 'Transportation Ticketing System',
    image: '/images/work13.jpg',
    description: 'High-performance ticketing platform for Vietjet Air and NexBus, handling 50k+ concurrent users with instant booking, dynamic pricing, and fault-tolerant architecture.',
    techStack: ['Java', 'Spring Boot', 'React', 'Kafka', 'Redis', 'Kubernetes', 'PostgreSQL'],
    category: 'Enterprise',
    highlights: ['50k concurrent users', '99.99% uptime', '30% cost reduction'],
    year: '2018 - 2019'
  },
  {
    title: 'Stock Trading Platform',
    image: '/images/work14.jpg',
    description: 'Real-time trading application with live market data, portfolio management, and technical analysis tools.',
    techStack: ['C++', 'Rust', 'TypeScript', 'React', 'Redis', 'Docker'],
    category: 'Finance',
    highlights: ['Real-time quotes', 'Advanced charting', 'Portfolio analytics'],
    year: '2021'
  },
  {
    title: 'Algorithmic Trading Engine',
    image: '/images/work15.jpg',
    description: 'Low-latency algo-trading infrastructure with custom strategy backtesting and automated order execution.',
    techStack: ['C++', 'Rust', 'TypeScript', 'React', 'Redis', 'Docker'],
    category: 'Finance',
    highlights: ['40% latency reduction', '1TB+ daily data', 'ML predictions'],
    year: '2022'
  },
  // --- Business Projects (Freelance & Consultancy) ---
  {
    title: 'Samick Furniture ERP',
    image: '/images/work5.png',
    description: 'End-to-end ERP system for Samick Korea, managing production planning, inventory, supply chain, and sales operations for premium furniture manufacturing.',
    techStack: ['TypeScript', 'React', 'PostgreSQL', 'Redis', 'Firebase', 'AWS', 'Docker'],
    category: 'Enterprise',
    highlights: ['Full supply chain', 'Korea market', 'Multi-warehouse'],
    year: '2020'
  },
  {
    title: 'GongCheck Platform',
    image: '/images/work6.jpg',
    description: 'On-demand marketplace connecting architects, interior designers, and furniture providers in Korea. Think "Grab for Home Design" with real-time matching and project management.',
    techStack: ['Flutter', 'Dart', 'Firebase', 'PostgreSQL', 'AWS'],
    category: 'Mobile',
    highlights: ['Real-time matching', 'B2B2C platform', 'Korea launch'],
    year: '2021'
  },
  {
    title: 'Korea DMA HFT System',
    image: '/images/work15.jpg',
    description: 'Ultra-low-latency Direct Market Access system for Korean equities, featuring co-located infrastructure and custom FPGA-accelerated order routing.',
    techStack: ['C++', 'Rust', 'TypeScript', 'React', 'Redis', 'Docker'],
    category: 'Finance',
    highlights: ['Sub-ms latency', 'DMA certified', 'Co-located infra'],
    year: '2023'
  },
  {
    title: 'Enterprise HRM Suite',
    image: '/images/work5.png',
    description: 'Comprehensive human resource management platform with payroll, attendance, performance reviews, and employee self-service portal for mid-size enterprises.',
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Keycloak', 'Docker'],
    category: 'Enterprise',
    highlights: ['500+ employees', 'Payroll automation', 'Self-service portal'],
    year: '2022'
  },
  {
    title: 'Gym Chain Loyalty System',
    image: '/images/work7.jpg',
    description: 'Multi-tenant loyalty and membership platform deployed across fitness chains, featuring points rewards, class booking, and member engagement analytics.',
    techStack: ['TypeScript', 'React', 'PostgreSQL', 'Redis', 'Firebase', 'AWS', 'Docker'],
    category: 'Mobile',
    highlights: ['Multi-tenant SaaS', '10+ gym chains', 'Member analytics'],
    year: '2023'
  },
];

export const CONTACT_DATA = [
  {
    name: 'Email',
    address: 'tanphat199@gmail.com',
    href: 'mailto:tanphat199@gmail.com?subject=[Portfolio] Get Me In Touch!',
    color: 'text-primary',
    icon: Mail,
  },
  {
    name: 'Messenger',
    address: 'Phat Nguyen Tan',
    href: 'https://m.me/phatnt199',
    color: 'text-info', // Blue
    icon: Facebook, // Close enough to Messenger
  },
  {
    name: 'Telegram',
    address: 'Phat Nguyen',
    href: 'https://t.me/tanphat199',
    color: 'text-info',
    icon:  Zap, // Placeholder for Telegram
  },
  {
    name: 'Teams',
    address: 'tanphat199@outlook.com',
    href: 'https://teams.microsoft.com/l/chat/0/0?users=tanphat199@outlook.com',
    color: 'text-info',
    icon: MessageCircle,
  },
];

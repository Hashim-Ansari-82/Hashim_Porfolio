export const profile = {
  name: 'Mohammad Hashim',
  firstName: 'Mohammad',
  lastName: 'Hashim',
  title: 'Java Full Stack Developer',
  location: 'Mumbai, Maharashtra, India',
 photo: '/profile-transparent.png',
  resumePath: '/Hashim_Resume.pdf',
  resumeFileName: 'Mohammad_Hashim_Resume.pdf',
  email: 'mohammadhashim7922@gmail.com',
  phone: '+91 7233867025',
  phoneHref: 'tel:+917233867025',
  github: 'https://github.com/Hashim-Ansari-82',
  linkedin: 'https://www.linkedin.com/in/hashimansari82/',
} as const;

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
] as const;

export const footerNavigation = navigation.filter((item) => item.href !== '#journey');

export const heroIntro = {
  greeting: "HELLO, I'M",
  description:
    "I'm a B.Sc. Information Technology student passionate about Java development and building secure, scalable backend applications. I enjoy developing practical software solutions using Java, Spring Boot, Spring Security, and modern database technologies.",
} as const;

export const techMarquee = [
  'JAVA',
  'SPRING BOOT',
  'SPRING SECURITY',
  'HIBERNATE',
  'JDBC',
  'MYSQL',
  'POSTGRESQL',
  'SPRING DATA JPA',
  'JWT',
  'REST APIs',
  'MAVEN',
  'GITHUB',
] as const;

export const aboutContent = {
  eyebrow: 'Who I am',
  heading: 'ABOUT ME',
  subheading: 'Building secure applications, one line of code at a time.',
  paragraphs: [
    "I'm Mohammad Hashim, a second-year B.Sc. Information Technology student based in Mumbai, Maharashtra.",
    'I focus on Java development and backend technologies, including Core Java, JDBC, Hibernate, Spring Boot, Spring Security, and REST APIs.',
    'I have worked on practical projects such as a Hospital Management System and SecureBank Banking Management System, where I implemented database integration, RESTful operations, authentication, authorization, and business logic.',
    "I'm continuously improving my programming knowledge and exploring ways to build reliable and secure software applications.",
  ],
  facts: [
    { label: 'Education', value: 'B.Sc. Information Technology' },
    { label: 'College', value: 'Shri Mahadev Baburao Chaughule College' },
    { label: 'Location', value: 'Mumbai, Maharashtra, India' },
  ],
} as const;

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  icon: 'Code2' | 'Server' | 'Database' | 'HardDrive' | 'Wrench' | 'Layers';
  items: readonly string[];
}

export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'language',
    index: '01',
    title: 'Programming Language',
    icon: 'Code2',
    items: ['Java', 'Core Java', 'Object-Oriented Programming'],
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend Development',
    icon: 'Server',
    items: ['Spring Boot', 'Spring Framework', 'Spring Security', 'REST APIs', 'JSON Web Token (JWT)'],
  },
  {
    id: 'persistence',
    index: '03',
    title: 'Persistence Technologies',
    icon: 'HardDrive',
    items: ['Spring Data JPA', 'Hibernate', 'JDBC'],
  },
  {
    id: 'database',
    index: '04',
    title: 'Database',
    icon: 'Database',
    items: ['MySQL', 'PostgreSQL'],
  },
  {
    id: 'tools',
    index: '05',
    title: 'Development Tools',
    icon: 'Wrench',
    items: ['Git', 'GitHub', 'Postman', 'Maven'],
  },
  {
    id: 'concepts',
    index: '06',
    title: 'Core Concepts',
    icon: 'Layers',
    items: ['OOP', 'MVC Architecture', 'CRUD Operations', 'Input Validation', 'Exception Handling'],
  },
];

export interface Project {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  technologies: readonly string[];
  features: readonly string[];
  repoUrl: string;
  visual: 'hospital' | 'bank';
  accent: 'blue' | 'violet';
}

export const projects: readonly Project[] = [
  {
    id: 'hospital-management',
    index: '01',
    category: 'JAVA / SPRING BOOT / DATABASE',
    title: 'Hospital Management System',
    description:
      'Developed a Hospital Management System using Java and Spring Boot to manage hospital operations and maintain patient-related information.',
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'REST APIs'],
    features: [
      'Doctor Management',
      'Patient Management',
      'Department Management',
      'Appointment Management',
      'Billing and Payment Management',
      'Prescription Management',
      'JPA and Hibernate Entity Relationships',
      'REST API CRUD Operations',
      'MySQL Database Integration',
      'Input Validation',
      'Centralized Exception Handling',
    ],
    repoUrl: 'https://github.com/Hashim-Ansari-82/Java_Project/tree/HR/HospitalMangement',
    visual: 'hospital',
    accent: 'blue',
  },
  {
    id: 'securebank',
    index: '02',
    category: 'JAVA / SPRING SECURITY / JWT',
    title: 'SecureBank – Banking Management System',
    description:
      'Developed a secure banking management backend using Java and Spring Boot. Implemented JWT-based authentication, Spring Security, and role-based access control for USER, MANAGER, and ADMIN roles.',
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JSON Web Token (JWT)',
      'REST APIs',
      'Spring Data JPA',
      'Hibernate',
      'PostgreSQL',
      'Maven',
    ],
    features: [
      'JWT Authentication',
      'Spring Security Integration',
      'Role-Based Access Control',
      'User Registration and Login',
      'Bank Account Management',
      'Deposit and Withdrawal Operations',
      'Transaction Processing',
      'KYC Verification',
      'Beneficiary Management',
      'Notifications',
      'PostgreSQL Database Integration',
    ],
    repoUrl: 'https://github.com/Hashim-Ansari-82/Banking-Project',
    visual: 'bank',
    accent: 'violet',
  },
];

export const journeyEntries = [
  {
    id: 'bsc-it',
    period: 'July 2025 – March 2028',
    kind: 'Education',
    title: 'Bachelor of Science in Information Technology',
    organization: 'Shri Mahadev Baburao Chaughule College',
    status: 'Currently Pursuing — Second Year',
    description:
      'Currently pursuing B.Sc. Information Technology and developing practical knowledge in Java programming, database management, backend development, and software engineering concepts.',
  },
] as const;

export const contactContent = {
  heading: 'LET’S CONNECT',
  question: 'Have a project or opportunity in mind?',
  description:
    "I'm open to connecting with developers, exploring opportunities, and discussing Java development projects.",
} as const;

export const socialLinks = [
  { id: 'github', label: 'GitHub', href: profile.github, icon: 'Github' },
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, icon: 'Linkedin' },
  { id: 'email', label: 'Email', href: `mailto:${profile.email}`, icon: 'Mail' },
] as const;

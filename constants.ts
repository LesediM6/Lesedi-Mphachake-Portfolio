import { Profile, Project, SkillCategory } from './types';

export const PROFILE: Profile = {
  name: "Lesedi Mphachake",
  title: "Software Developer → Data Engineering & AI",
  location: "Johannesburg, South Africa",
  email: "lesedimoreno000@gmail.com",
  phone: "060 804 6435",
  linkedin: "https://www.linkedin.com/in/lesedi-mphachake-1b5080251/",
  education: "National Diploma in IT, Rosebank College (2022-2024)",
  languages: ["isiZulu", "sePedi", "Afrikaans", "English", "seSotho"],
  bio: "Highly motivated Software Engineer transitioning into Data Engineering and AI. Proficient in Python, SQL, and full-stack development with hands-on experience in AI integration and data pipelines. Recent graduate with practical project experience in e-commerce AI systems, sentiment analysis, and ethical AI auditing. Passionate about leveraging data to drive informed decision-making and building scalable, accessible systems.",
  objective: "Seeking Data Engineering/AI roles where I can apply my software development background to build robust data pipelines, implement machine learning solutions, and contribute to data-driven decision making. Particularly interested in ethical AI, data governance, and scalable system design.",
  profileImage: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/main/lesedi.jpg?raw=true"
};

export const SKILLS: SkillCategory[] = [
  {
    category: "AI & Machine Learning",
    skills: ["Python", "Jupyter", "pandas", "Statistical Analysis", "Ethical AI"]
  },
  {
    category: "Data Engineering",
    skills: ["PostgreSQL", "MySQL", "Redis", "Data Modeling", "Data Pipelines"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["Vercel", "Azure", "Firebase", "Git/GitHub"]
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Java", "REST APIs", "JWT Authentication"]
  },
  {
    category: "Frontend Development",
    skills: ["React", "JavaScript", "HTML/CSS", "Tailwind"]
  },
  {
    category: "Tools",
    skills: ["Visual Studio Code", "Android Studio", "Microsoft Office"]
  }
];

// Placeholder images used for demonstration
const IMAGES = {
  ai: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000",
  web: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  mobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000"
};

export const PROJECTS: Project[] = [
  {
    id: "mzansi-market-ai",
    title: "Mzansi Market AI",
    shortDescription: "AI-powered E-commerce Platform with smart recommendations.",
    description: "A comprehensive e-commerce platform leveraging the Vercel AI SDK to provide intelligent product recommendations and a seamless user experience. The system features robust data modeling and caching strategies to ensure high performance.",
    technologies: ["PostgreSQL", "Redis", "Vercel AI SDK", "JWT", "React"],
    category: "AI & Data",
    github: "https://mzansimarket.vercel.app/",
    demo: "https://mzansimarket.vercel.app/",
    image: "https://i.pinimg.com/1200x/21/c4/8b/21c48bb96e1c9a891b961d020729ec52.jpg",
    featured: true,
    deepDive: {
      problem: "E-commerce platforms often struggle with generic search results that don't match user intent, leading to lower conversion rates.",
      solution: "Implemented vector similarity search using PostgreSQL and Vercel AI SDK to provide context-aware product suggestions.",
      features: ["Semantic Search", "Real-time Inventory Caching", "Secure JWT Auth", "Responsive Dashboard"]
    }
  },
  {
    id: "sentimentsphere",
    title: "SentimentSphere",
    shortDescription: "Real-time sentiment analysis pipeline.",
    description: "An end-to-end data processing pipeline that ingests text data and performs real-time sentiment analysis using machine learning models. Deployed as an interactive web application.",
    technologies: ["Python", "ML models", "React", "FastAPI"],
    category: "AI & Data",
    github: "https://sentimentsphere22.vercel.app/",
    demo: "https://sentimentsphere22.vercel.app/",
    image: "https://i.pinimg.com/1200x/52/ad/6a/52ad6a11c1dcb1692ff9e321bd520167.jpg",
    featured: true,
    deepDive: {
      problem: "Businesses need to understand customer sentiment instantly across various channels to address PR issues quickly.",
      solution: "Created a lightweight NLP pipeline that processes text input and visualizes sentiment polarity in real-time.",
      features: ["Natural Language Processing", "Interactive Visualizations", "REST API Integration", "Mobile Responsive"]
    }
  },
  {
    id: "ats-cv-generator",
    title: "ATS-Free CV Generator",
    shortDescription: "Resume builder optimized for Applicant Tracking Systems.",
    description: "A specialized tool designed to help job seekers create resumes that are parsing-friendly for Applicant Tracking Systems (ATS), increasing the likelihood of passing automated screenings.",
    technologies: ["React", "Node.js", "Algorithmic Design"],
    category: "Web Development",
    github: "https://cvgeneration-rho.vercel.app/",
    demo: "https://cvgeneration-rho.vercel.app/",
    image: IMAGES.web,
    featured: true,
    deepDive: {
      problem: "Many qualified candidates are rejected by automated ATS software due to poor formatting or missing keywords.",
      solution: "Built a structured data ingestion form that maps inputs to an ATS-compliant template output.",
      features: ["Live Preview", "PDF Generation", "Keyword Optimization Logic", "Clean UI"]
    }
  },
  {
    id: "gender-bias-audit",
    title: "Gender Bias Audit Report",
    shortDescription: "Ethical AI auditing and data governance analysis.",
    description: "A critical analysis project focused on detecting and quantifying gender bias within datasets. This project demonstrates advanced statistical auditing techniques essential for responsible AI deployment.",
    technologies: ["Python", "Jupyter", "pandas", "Statistical Analysis"],
    category: "AI & Data",
    github: "https://github.com/durksie/GENDER-BIAS-AUDIT-REPORT",
    demo: "",
    image: IMAGES.data,
    featured: true,
    deepDive: {
      problem: "Machine learning models trained on biased historical data often perpetuate discrimination in automated decision-making.",
      solution: "Conducted a statistical audit on a dataset to identify disparities in representation and outcome distributions.",
      features: ["Data Distribution Analysis", "Bias Metrics Calculation", "Visualization of Disparities", "Mitigation Recommendations"]
    }
  },
  {
    id: "fangtastic-jewellers",
    title: "Fangtastic Jewellers App",
    shortDescription: "Luxury e-commerce jewelry platform.",
    description: "A visually rich e-commerce platform for a jewelry brand, focusing on high-end UI/UX design principles and smooth user interactions.",
    technologies: ["React", "Tailwind CSS", "UI/UX"],
    category: "Web Development",
    github: "https://github.com/Mndi-Iviwe/FANG-Jewellers-Website",
    demo: "",
    image: "https://i.pinimg.com/736x/8a/f4/dd/8af4dd0eeb2a28ee43435f33e0d0dfa5.jpg",
    featured: false
  }
];
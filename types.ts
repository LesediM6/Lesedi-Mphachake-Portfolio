export interface ProjectDetails {
  problem: string;
  solution: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  category: 'AI & Data' | 'Web Development' | 'Cloud & DevOps' | 'Mobile';
  github: string;
  demo: string;
  image: string;
  featured: boolean;
  deepDive?: ProjectDetails;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // e.g., "March 2025"
  pdfUrl: string; // URL to the PDF file
  credentialId?: string;
  skills: string[];
  previewImage?: string; // Optional URL for card thumbnail
  
  // Extended properties
  credentialUrl?: string;
  image?: string;
  description?: string;
  category?: string;
  verificationId?: string;
  expirationDate?: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  education: string;
  languages: string[];
  bio: string;
  objective: string;
  profileImage: string;
}
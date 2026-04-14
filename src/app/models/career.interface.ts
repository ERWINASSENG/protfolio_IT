export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: 'technical' | 'soft' | 'tool';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  highlights?: string[];
}

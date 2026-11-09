// RoleSharp 2.0 — Typed API Contracts

export interface UserSession {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    targetRole?: string;
    targetCountry?: string;
  };
  plans?: {
    planId: 'free' | 'pro' | 'student';
    name: string;
    interval: 'monthly' | 'annual';
    status: 'active' | 'trial' | 'canceled';
    renewsAt?: string;
    allowances: {
      tailoredResumes: number;
      coverLetters: number;
      atsChecks: number;
    };
  };
  features: {
    ats_analyzer: boolean;
    tailoring: boolean;
    cover_letter: boolean;
    linkedin_optimizer: boolean;
    interview_prep: boolean;
    auto_apply: boolean;
    voice_interview_enabled?: boolean;
  };
  usage: {
    tailoredResumesUsed: number;
    coverLettersUsed: number;
    atsChecksUsed: number;
  };
  credits: number;
  legalVersions: {
    terms: string;
    privacy: string;
  };
}

export interface ResumeDocument {
  id: string;
  name: string;
  role: string;
  template: 'classic' | 'modern' | 'editorial' | 'compact';
  updatedAt: string;
  content: {
    personal: {
      fullName: string;
      title: string;
      email: string;
      phone: string;
      location: string;
      website?: string;
      linkedin?: string;
    };
    summary: string;
    experience: Array<{
      id: string;
      role: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      bullets: string[];
    }>;
    education: Array<{
      id: string;
      degree: string;
      school: string;
      location: string;
      graduationYear: string;
    }>;
    skills: string[];
    projects?: Array<{
      id: string;
      name: string;
      description: string;
      link?: string;
    }>;
  };
}

export interface ATSCheckResult {
  overallScore: number;
  filename: string;
  wordCount: number;
  dimensions: {
    parseability: number;
    layoutRisk: 'Low' | 'Moderate' | 'High';
    keywordCoverage: number;
    evidenceStrength: number;
    roleFit: number;
  };
  gaps: Array<{
    id: string;
    category: 'skill' | 'metric' | 'clarity' | 'structure';
    title: string;
    description: string;
    sourceExcerpt?: string;
    recommendedAction: string;
  }>;
  recruiterFeedback: string[];
}

export type ApplicationStatus = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface ApplicationItem {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  jobUrl?: string;
  notes?: string;
  resumeId?: string;
  resumeVariantLabel?: string;
  location?: string;
  salary?: string;
  appliedDate?: string;
  lastUpdated: string;
  events?: Array<{
    date: string;
    type: string;
    description: string;
  }>;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  remote: boolean;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  postedAge: string;
  source: string;
  sourceUrl: string;
  salary?: string;
  fitCompatibilityScore: number;
  evidenceConfidence: 'High' | 'Medium' | 'Low';
  rationale: string;
  stale?: boolean;
}

export interface InterviewQnA {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'impact' | 'role-alignment';
  modelAnswer: string;
  evidenceReference: string;
  rehearsed: boolean;
}

export interface CoverLetterDraft {
  id: string;
  resumeId: string;
  company: string;
  role: string;
  tone: 'formal' | 'warm' | 'direct';
  content: string;
  updatedAt: string;
}

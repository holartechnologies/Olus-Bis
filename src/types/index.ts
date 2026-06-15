import type { Role } from "@prisma/client";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  image?: string | null;
}

export interface AuthSession {
  user: SessionUser;
  expires: string;
}

export interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source?: string;
}

export interface AssessmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  currentLocation: string;
  immigrationGoal: string;
  educationLevel: string;
  employmentStatus: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ConsultationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  type: string;
  notes?: string;
}

export interface DashboardStats {
  totalLeads: number;
  totalConsultations: number;
  totalClients: number;
  totalDocuments: number;
  recentLeads: number;
  conversionRate: number;
  appointmentsToday: number;
  pendingDocuments: number;
}

// RoleSharp 2.0 — Authoritative Applications API Adapter
// Strictly implements: GET /api/applications, POST /api/applications, PATCH /api/applications/{id}, DELETE /api/applications/{id}

import { ApplicationStatus, ApplicationItem } from './types';

export type { ApplicationStatus };

export const VALID_APPLICATION_STATUSES: readonly ApplicationStatus[] = [
  'saved',
  'applied',
  'interview',
  'offer',
  'rejected',
] as const;

export function isValidApplicationStatus(status: unknown): status is ApplicationStatus {
  return typeof status === 'string' && (VALID_APPLICATION_STATUSES as readonly string[]).includes(status);
}

export function sanitizeApplicationStatus(status: unknown): ApplicationStatus {
  if (isValidApplicationStatus(status)) return status;
  // Normalize known legacy or UI labels safely to canonical backend enums
  if (status === 'archived' || status === 'Archived / Rejected') return 'rejected';
  if (status === 'interviewing' || status === 'Interviewing') return 'interview';
  if (status === 'Offer Received') return 'offer';
  if (status === 'Applied') return 'applied';
  return 'saved';
}

export interface CreateApplicationPayload {
  company: string;
  role: string;
  status: ApplicationStatus;
  jobUrl?: string;
  notes?: string;
  resumeId?: string;
  salary?: string;
  location?: string;
}

export interface UpdateApplicationPayload {
  status?: ApplicationStatus;
  notes?: string;
  salary?: string;
  location?: string;
}

export const OFFLINE_STORAGE_KEY = 'rolesharp_tracker_applications';

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app_1',
    company: 'Stripe',
    role: 'Staff Infrastructure Lead',
    status: 'interview',
    appliedDate: 'Applied Nov 3, 2026',
    salary: '$250k',
    location: 'Remote (US)',
    notes: 'Tailored resume v1.4 submitted. Technical Architecture Round Thursday 2:00 PM.',
    jobUrl: 'https://stripe.com/jobs/staff-infrastructure-lead',
    lastUpdated: '2026-11-03T14:00:00Z',
  },
  {
    id: 'app_2',
    company: 'Datadog',
    role: 'Senior Systems Architect',
    status: 'interview',
    appliedDate: 'Applied Nov 1, 2026',
    salary: '$235k',
    location: 'New York, NY',
    notes: 'Passed initial screening. Deep dive into Kafka streaming topology scheduled.',
    lastUpdated: '2026-11-01T10:30:00Z',
  },
  {
    id: 'app_3',
    company: 'Linear',
    role: 'Product Systems & Experience Lead',
    status: 'applied',
    appliedDate: 'Applied Nov 7, 2026',
    salary: '$210k',
    location: 'Remote Global',
    notes: 'Submitted via Ashby with customized cover letter focusing on state sync.',
    lastUpdated: '2026-11-07T16:20:00Z',
  },
  {
    id: 'app_4',
    company: 'Figma',
    role: 'Senior Engineering Manager — Design Systems',
    status: 'saved',
    appliedDate: 'Saved Nov 8, 2026',
    salary: '$255k',
    location: 'San Francisco, CA',
    notes: 'Tailor resume for Design Systems leadership before submitting.',
    lastUpdated: '2026-11-08T09:15:00Z',
  },
  {
    id: 'app_5',
    company: 'Vercel',
    role: 'Principal Edge Infrastructure Architect',
    status: 'saved',
    appliedDate: 'Saved Nov 9, 2026',
    salary: '$270k',
    location: 'Remote',
    notes: 'Review cold-start latency reduction bullets.',
    lastUpdated: '2026-11-09T11:45:00Z',
  },
  {
    id: 'app_6',
    company: 'Cloudflare',
    role: 'Lead Systems Engineer',
    status: 'offer',
    appliedDate: 'Applied Oct 18, 2026',
    salary: '$260k + Equity',
    location: 'Austin, TX / Remote',
    notes: 'Written offer received. Evaluating equity vesting schedule and compensation package.',
    lastUpdated: '2026-10-18T15:00:00Z',
  },
  {
    id: 'app_7',
    company: 'Legacy Corp',
    role: 'Enterprise Cloud Specialist',
    status: 'rejected',
    appliedDate: 'Applied Oct 12, 2026',
    notes: 'Role closed due to internal restructuring.',
    lastUpdated: '2026-10-12T13:00:00Z',
  },
];

// Offline Cache Helpers
export function getOfflineCachedApplications(): ApplicationItem[] {
  if (typeof window === 'undefined') return INITIAL_APPLICATIONS;
  try {
    const raw = localStorage.getItem(OFFLINE_STORAGE_KEY);
    if (!raw) return INITIAL_APPLICATIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item) => ({
        ...item,
        status: sanitizeApplicationStatus(item.status),
      }));
    }
  } catch (_) {}
  return INITIAL_APPLICATIONS;
}

export function setOfflineCachedApplications(apps: ApplicationItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(apps));
  } catch (_) {}
}

export const applicationsApi = {
  /**
   * GET /api/applications
   * Fetches applications from the authoritative backend endpoint.
   * If backend is unavailable, gracefully falls back to the client-side offline cache.
   */
  async getApplications(): Promise<{ applications: ApplicationItem[]; source: 'backend' | 'offline_fallback' }> {
    try {
      const response = await fetch('/api/applications', {
        headers: { credentials: 'include', Accept: 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.applications)) {
          const sanitized = data.applications.map((app: any) => ({
            ...app,
            status: sanitizeApplicationStatus(app.status),
          }));
          setOfflineCachedApplications(sanitized);
          return { applications: sanitized, source: 'backend' };
        }
      }
    } catch (_) {
      // Backend unavailable; offline mode
    }
    const cached = getOfflineCachedApplications();
    setOfflineCachedApplications(cached);
    return { applications: cached, source: 'offline_fallback' };
  },

  /**
   * POST /api/applications
   * Creates an application on the backend and updates the offline fallback cache.
   */
  async createApplication(payload: CreateApplicationPayload): Promise<ApplicationItem> {
    const sanitizedStatus = sanitizeApplicationStatus(payload.status);
    const body = {
      company: payload.company,
      role: payload.role,
      status: sanitizedStatus, // strictly valid enum
      salary: payload.salary,
      location: payload.location,
      notes: payload.notes,
      jobUrl: payload.jobUrl,
    };

    let createdApp: ApplicationItem = {
      id: `app_${Math.random().toString(36).substring(2, 7)}`,
      company: payload.company,
      role: payload.role,
      status: sanitizedStatus,
      salary: payload.salary,
      location: payload.location,
      notes: payload.notes,
      jobUrl: payload.jobUrl,
      appliedDate: 'Added today',
      lastUpdated: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', credentials: 'include' },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const result = await response.json();
        if (result && result.id) {
          createdApp = { ...result, status: sanitizeApplicationStatus(result.status) };
        }
      }
    } catch (_) {
      // Offline fallback handling
    }

    const current = getOfflineCachedApplications();
    setOfflineCachedApplications([createdApp, ...current]);
    return createdApp;
  },

  /**
   * PATCH /api/applications/{id}
   * Updates an application status or details on the backend.
   */
  async updateApplication(id: string, payload: UpdateApplicationPayload): Promise<ApplicationItem | null> {
    const body: Record<string, unknown> = {};
    if (payload.status !== undefined) {
      body.status = sanitizeApplicationStatus(payload.status);
    }
    if (payload.notes !== undefined) body.notes = payload.notes;
    if (payload.salary !== undefined) body.salary = payload.salary;
    if (payload.location !== undefined) body.location = payload.location;

    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', credentials: 'include' },
        body: JSON.stringify(body),
      });
    } catch (_) {
      // Offline fallback
    }

    const current = getOfflineCachedApplications();
    const updated = current.map((app) =>
      app.id === id ? { ...app, ...(body as Partial<ApplicationItem>), lastUpdated: new Date().toISOString() } : app
    );
    setOfflineCachedApplications(updated);
    return updated.find((a) => a.id === id) || null;
  },

  /**
   * DELETE /api/applications/{id}
   */
  async deleteApplication(id: string): Promise<boolean> {
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: { credentials: 'include' },
      });
    } catch (_) {
      // Offline fallback
    }

    const current = getOfflineCachedApplications();
    const filtered = current.filter((a) => a.id !== id);
    setOfflineCachedApplications(filtered);
    return true;
  },
};

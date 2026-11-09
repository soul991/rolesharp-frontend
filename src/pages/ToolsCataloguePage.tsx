import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  FileCheck2,
  Sparkles,
  FileText,
  Briefcase,
  Flame,
  KanbanSquare,
  Mail,
  Linkedin,
  Mic,
  Send,
  Search,
  ArrowRight,
} from 'lucide-react';

interface ToolItem {
  id: string;
  category: 'Check' | 'Tailor' | 'Prepare' | 'Apply' | 'Track';
  title: string;
  description: string;
  route: string;
  icon: any;
  badge?: string;
  inMemory?: boolean;
}

const TOOLS: ToolItem[] = [
  // Check
  {
    id: 't_ats_checker',
    category: 'Check',
    title: 'In-Memory ATS Analyzer',
    description: 'Instant PDF/DOCX diagnostic audit across 4 dimensions: formatting risk, keyword coverage, evidence density, and parseability.',
    route: '/checker',
    icon: FileCheck2,
    badge: 'Core Diagnostic',
    inMemory: true,
  },
  {
    id: 't_cl_analyzer',
    category: 'Check',
    title: 'Cover Letter Diagnostic',
    description: 'Real-time text audit checking length, evidence metrics density, target alignment, and overused buzzword clichés.',
    route: '/cover-letter-analyzer',
    icon: Mail,
    inMemory: true,
  },
  // Tailor
  {
    id: 't_tailor',
    category: 'Tailor',
    title: 'Job-Calibrated Tailoring Studio',
    description: 'Grounds your master resume against target job requirements with progressive animation and bullet-by-bullet diff acceptance.',
    route: '/tailor',
    icon: Sparkles,
    badge: 'Superdesign Animation',
  },
  {
    id: 't_builder',
    category: 'Tailor',
    title: 'Structured Resume Builder',
    description: 'Full section-level editor with real-time paper sheet preview and 3D Interactive Card Stack for 4 ATS-tested templates.',
    route: '/resume-builder',
    icon: FileText,
  },
  {
    id: 't_resumes',
    category: 'Tailor',
    title: 'Resume Repository & Versions',
    description: 'Manage master and customized resume drafts with duplicate, rename, PDF export, and DOCX download actions.',
    route: '/resumes',
    icon: FileText,
  },
  // Prepare
  {
    id: 't_cover_letter',
    category: 'Prepare',
    title: 'Evidence Cover Letter Generator',
    description: 'Synthesizes persuasive cover letters matching employer culture using the Superdesign Animated List tone selector.',
    route: '/cover-letter',
    icon: Mail,
  },
  {
    id: 't_linkedin',
    category: 'Prepare',
    title: 'LinkedIn Profile Optimizer',
    description: 'Calibrate your public headline, About hook, and recruiter boolean keywords under a strict zero-scraping policy.',
    route: '/linkedin',
    icon: Linkedin,
    badge: 'Zero-Scraping',
  },
  {
    id: 't_interview',
    category: 'Prepare',
    title: 'Interview Practice Studio',
    description: '6 rigorous interview prompts anchored to your verified career history, STAR model answers, and interactive answer timer.',
    route: '/interview',
    icon: Mic,
  },
  // Apply
  {
    id: 't_auto_apply',
    category: 'Apply',
    title: 'Controlled Auto Apply Queue',
    description: 'Ethical outbound application packages prepared for verified contact channels with explicit one-time human review.',
    route: '/auto-apply',
    icon: Send,
    badge: 'Human-in-Loop',
  },
  // Track
  {
    id: 't_jobs',
    category: 'Track',
    title: 'Verified Job Opportunities',
    description: 'Search direct employer listings with salary ranges, ATS source tags (Greenhouse, Lever, Ashby), and direct outbound links.',
    route: '/jobs',
    icon: Briefcase,
  },
  {
    id: 't_daily_matches',
    category: 'Track',
    title: 'Daily Matches Digest',
    description: 'Curated 9:00 AM batch with independent Role Fit and Evidence Confidence badges and ethical scoring disclaimers.',
    route: '/daily-matches',
    icon: Flame,
  },
  {
    id: 't_tracker',
    category: 'Track',
    title: '5-Column Application Tracker',
    description: 'Kanban pipeline tracking applications across Saved, Applied, Interviewing, Offer Received, and Archived/Rejected.',
    route: '/tracker',
    icon: KanbanSquare,
  },
];

export const ToolsCataloguePage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Check', 'Tailor', 'Prepare', 'Apply', 'Track'];

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppShell title="RoleSharp Career Tools Directory">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--rs-blue)',
              }}
            >
              COMPLETE SUITE CATALOGUE
            </span>
            <StatusBadge status="success" label="18 Operational Modules" />
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--rs-ink)',
              letterSpacing: '-0.03em',
            }}
          >
            RoleSharp Career Tools Directory
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
            Explore our end-to-end evidence advancement toolkit. Categorized by the 5 stages of career velocity: Check, Tailor, Prepare, Apply, and Track.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: selectedCategory === cat ? 'var(--rs-blue-strong)' : 'var(--rs-surface)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--rs-muted)',
                  fontSize: '13px',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                {cat === 'All' ? 'All Tools (12)' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={15} color="var(--rs-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input
              type="text"
              name="toolsSearch"
              aria-label="Search tools by title or functionality"
              placeholder="Search tools & workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 34px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                style={{
                  borderRadius: '16px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface)',
                  padding: '24px',
                  boxShadow: 'var(--rs-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'transform 0.18s ease, border-color 0.18s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--rs-surface-2)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--rs-blue)',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--rs-surface-2)',
                          color: 'var(--rs-blue)',
                          border: '1px solid var(--rs-line)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {tool.category}
                      </span>
                      {tool.badge && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'color-mix(in srgb, var(--rs-amber) 15%, var(--rs-surface))',
                            color: 'var(--rs-amber)',
                            border: '1px solid color-mix(in srgb, var(--rs-amber) 30%, transparent)',
                          }}
                        >
                          {tool.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 6px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--rs-ink)',
                    }}
                  >
                    {tool.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.5' }}>
                    {tool.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--rs-line)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)' }}>
                    {tool.route}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(tool.route)}
                    icon={<ArrowRight size={13} />}
                  >
                    Launch
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
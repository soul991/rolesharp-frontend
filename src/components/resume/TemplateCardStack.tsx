import React, { useState } from 'react';
import { Check, Layers, Sparkles } from 'lucide-react';

export interface ResumeTemplate {
  id: string;
  name: string;
  style: string;
  bestFor: string;
  description: string;
  fontPrimary: string;
  columns: string;
  accentColor: string;
}

export const TEMPLATES: ResumeTemplate[] = [
  {
    id: 'editorial',
    name: 'Classic Editorial',
    style: 'Refined serif accents, spacious margins, executive hierarchy',
    bestFor: 'Product Leaders, Design Directors, Management Consultants',
    description: 'Clean typographic distinction using Space Grotesk and Playfair accents. Unrivaled readability.',
    fontPrimary: 'Playfair Display + DM Sans',
    columns: 'Single Column (Strict ATS)',
    accentColor: 'var(--rs-amber)',
  },
  {
    id: 'modern',
    name: 'Modern Executive',
    style: 'Bold headers, crisp dividers, metrics-focused bullet density',
    bestFor: 'VP / Directors, Founders, Operations Leaders',
    description: 'Emphasizes quantitative business outcomes, team scale, and strategic initiatives.',
    fontPrimary: 'Space Grotesk + DM Sans',
    columns: 'Single Column (Strict ATS)',
    accentColor: 'var(--rs-blue-strong)',
  },
  {
    id: 'technical',
    name: 'Technical Depth',
    style: 'Monospace tech stack tags, repository links, concise architecture summaries',
    bestFor: 'Software Architects, Staff Engineers, Infrastructure Leads',
    description: 'Optimized for engineering hiring managers and technical recruiters. High signal-to-noise ratio.',
    fontPrimary: 'Geist Mono + DM Sans',
    columns: 'Single Column (Strict ATS)',
    accentColor: 'var(--rs-emerald)',
  },
  {
    id: 'compact',
    name: 'Compact Single-Page',
    style: 'Ultra-efficient measure, tight line heights, disciplined 1-page rule',
    bestFor: 'Early-to-Mid Career, Silicon Valley Tech, Finance',
    description: 'Guarantees standard 1-page compliance without sacrificing whitespace or legibility.',
    fontPrimary: 'DM Sans',
    columns: 'Single Column (Strict ATS)',
    accentColor: 'var(--rs-blue)',
  },
];

export interface TemplateCardStackProps {
  selectedTemplateId?: string;
  onSelectTemplate?: (template: ResumeTemplate) => void;
}

export const TemplateCardStack: React.FC<TemplateCardStackProps> = ({
  selectedTemplateId = 'editorial',
  onSelectTemplate,
}) => {
  const [activeId, setActiveId] = useState<string>(selectedTemplateId);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = TEMPLATES.findIndex((t) => t.id === activeId);
  const currentTemplate = TEMPLATES[activeIndex] || TEMPLATES[0];

  const handleSelect = (template: ResumeTemplate) => {
    setActiveId(template.id);
    onSelectTemplate?.(template);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '740px',
        margin: '0 auto',
      }}
    >
      {/* Stack Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="var(--rs-blue-strong)" />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--rs-blue)',
            }}
          >
            INTERACTIVE TEMPLATE STACK
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
          Click or hover cards to explore layout structures
        </span>
      </div>

      {/* 3D Layered Interactive Card Deck */}
      <div
        style={{
          position: 'relative',
          height: '380px',
          marginBottom: '32px',
          perspective: '1000px',
        }}
      >
        {TEMPLATES.map((tmpl, idx) => {
          const isSelected = tmpl.id === activeId;
          const offset = idx - activeIndex;

          // Compute 3D translation & stacking
          let translateY = offset * 18;
          const scale = 1 - Math.abs(offset) * 0.04;
          const zIndex = 10 - Math.abs(offset);
          const opacity = isSelected ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.25);

          if (hoveredIndex !== null) {
            // Fan out on hover
            translateY = (idx - hoveredIndex) * 36;
          }

          return (
            <div
              key={tmpl.id}
              onClick={() => handleSelect(tmpl)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              role="button"
              tabIndex={0}
              aria-label={`Select template ${tmpl.name}`}
              aria-selected={isSelected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelect(tmpl);
                }
              }}
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                borderRadius: '16px',
                border: isSelected
                  ? `2px solid ${tmpl.accentColor}`
                  : '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                boxShadow: isSelected ? 'var(--rs-shadow)' : '0 4px 12px rgba(0,0,0,0.08)',
                padding: '24px 28px',
                cursor: 'pointer',
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '240px',
                boxSizing: 'border-box',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: tmpl.accentColor,
                      }}
                    />
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      {tmpl.name}
                    </h3>
                  </div>

                  {isSelected && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: tmpl.accentColor,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--rs-surface-2)',
                        border: '1px solid var(--rs-line)',
                      }}
                    >
                      <Check size={12} />
                      ACTIVE TEMPLATE
                    </span>
                  )}
                </div>

                <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--rs-muted)' }}>
                  {tmpl.description}
                </p>
              </div>

              {/* Template Specs Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--rs-line)',
                  fontSize: '11.5px',
                }}
              >
                <div>
                  <span style={{ color: 'var(--rs-muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Best For
                  </span>
                  <span style={{ color: 'var(--rs-ink)', fontWeight: 600 }}>{tmpl.bestFor.split(',')[0]}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--rs-muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Typography
                  </span>
                  <span style={{ color: 'var(--rs-ink)', fontWeight: 600 }}>{tmpl.fontPrimary}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--rs-muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Formatting
                  </span>
                  <span style={{ color: 'var(--rs-ink)', fontWeight: 600 }}>{tmpl.columns}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Template Highlights */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          backgroundColor: 'var(--rs-surface-2)',
          border: '1px solid var(--rs-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color={currentTemplate.accentColor} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--rs-ink)' }}>
            Selected: <strong style={{ color: currentTemplate.accentColor }}>{currentTemplate.name}</strong> · {currentTemplate.style}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
          100% ATS-Compliant Single Column
        </span>
      </div>
    </div>
  );
};

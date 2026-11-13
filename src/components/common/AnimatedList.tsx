import React, { useState } from 'react';
import { Check } from 'lucide-react';

export interface AnimatedListItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface AnimatedListProps {
  items: AnimatedListItem[];
  selectedId: string;
  onSelect: (item: AnimatedListItem) => void;
  label?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  selectedId,
  onSelect,
  label = 'Select an option',
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      role="radiogroup"
      aria-label={label}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}
    >
      {items.map((item, idx) => {
        const isSelected = item.id === selectedId;
        const isHovered = item.id === hoveredId;

        return (
          <div
            key={item.id}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            onClick={() => onSelect(item)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(item);
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextItem = items[(idx + 1) % items.length];
                onSelect(nextItem);
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevItem = items[(idx - 1 + items.length) % items.length];
                onSelect(prevItem);
              }
            }}
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              border: isSelected
                ? '1.5px solid var(--rs-blue-strong)'
                : isHovered
                ? '1px solid color-mix(in srgb, var(--rs-blue-strong) 40%, var(--rs-line))'
                : '1px solid var(--rs-line)',
              backgroundColor: isSelected
                ? 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))'
                : 'var(--rs-surface)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.2s var(--rs-ease), border-color 0.2s ease, background-color 0.2s ease',
              outline: 'none',
              animation: `fadeInUp 0.3s ease-out ${idx * 0.05}s both`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Radio Circle / Checkmark */}
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: isSelected
                    ? '2px solid var(--rs-blue-strong)'
                    : '2px solid var(--rs-line)',
                  backgroundColor: isSelected ? 'var(--rs-blue-strong)' : 'transparent',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0,
                  transition: 'border-color 0.18s ease, background-color 0.18s ease',
                }}
              >
                {isSelected && <Check size={13} strokeWidth={3} />}
              </div>

              {/* Title & Description */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: 'var(--rs-ink)',
                    }}
                  >
                    {item.title}
                  </span>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--rs-surface-2)',
                        color: 'var(--rs-blue)',
                        border: '1px solid var(--rs-line)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: 'var(--rs-muted)', lineHeight: '1.4' }}>
                  {item.description}
                </p>
              </div>
            </div>

            {/* Optional Item Icon */}
            {item.icon && (
              <div
                style={{
                  color: isSelected ? 'var(--rs-blue-strong)' : 'var(--rs-muted)',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

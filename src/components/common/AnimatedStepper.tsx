import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface AnimatedStepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  allowStepClick?: boolean;
}

export const AnimatedStepper: React.FC<AnimatedStepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  allowStepClick = false,
}) => {
  return (
    <nav aria-label="Progress Stepper" style={{ width: '100%', margin: '0 auto 36px' }}>
      <ol
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Continuous Connecting Track */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '30px',
            right: '30px',
            height: '2px',
            backgroundColor: 'var(--rs-line)',
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          {/* Active Progress Fill */}
          <div
            style={{
              height: '100%',
              backgroundColor: 'var(--rs-blue-strong)',
              width: `${(currentStepIndex / Math.max(1, steps.length - 1)) * 100}%`,
              transition: 'width 0.4s var(--rs-ease)',
            }}
          />
        </div>

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isClickable = allowStepClick && (isCompleted || isCurrent);

          return (
            <li
              key={step.id}
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                flex: 1,
              }}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(idx)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: isClickable ? 'pointer' : 'default',
                  border: isCurrent
                    ? '2px solid var(--rs-amber)'
                    : isCompleted
                    ? '2px solid var(--rs-blue-strong)'
                    : '2px solid var(--rs-line)',
                  backgroundColor: isCompleted
                    ? 'var(--rs-blue-strong)'
                    : isCurrent
                    ? 'var(--rs-surface)'
                    : 'var(--rs-surface-2)',
                  color: isCompleted
                    ? 'var(--rs-blue-ink)'
                    : isCurrent
                    ? 'var(--rs-ink)'
                    : 'var(--rs-muted)',
                  boxShadow: isCurrent ? '0 0 0 4px color-mix(in srgb, var(--rs-amber) 25%, transparent)' : 'none',
                  transition: 'all 0.3s var(--rs-ease)',
                }}
                aria-label={`Step ${idx + 1}: ${step.title} ${
                  isCompleted ? '(Completed)' : isCurrent ? '(Current)' : '(Pending)'
                }`}
              >
                {isCompleted ? <Check size={18} strokeWidth={2.5} /> : idx + 1}
              </button>

              <div style={{ textAlign: 'center', maxWidth: '120px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: isCurrent ? 750 : 600,
                    color: isCurrent ? 'var(--rs-ink)' : isCompleted ? 'var(--rs-ink)' : 'var(--rs-muted)',
                    fontFamily: 'var(--font-display)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span
                    style={{
                      display: 'block',
                      fontSize: '10.5px',
                      color: 'var(--rs-muted)',
                      marginTop: '2px',
                    }}
                    className="hidden-mobile"
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

import React from 'react';

export interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 110,
  strokeWidth = 6,
  label = 'ATS match score',
}) => {
  const clampedScore = Math.min(100, Math.max(0, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'var(--rs-green)';
    if (val >= 60) return 'var(--rs-amber)';
    return 'var(--rs-red)';
  };

  const color = getScoreColor(clampedScore);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Hairline background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="var(--rs-line)"
            strokeWidth={strokeWidth}
          />
          {/* Animated score ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s var(--rs-ease), stroke 0.3s ease',
            }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontVariantNumeric: 'tabular-nums',
              fontSize: `${Math.round(size * 0.3)}px`,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--rs-ink)',
            }}
          >
            {clampedScore}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--rs-muted)',
              marginTop: '3px',
            }}
          >
            / 100
          </span>
        </div>
      </div>
      {label && (
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--rs-muted)',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

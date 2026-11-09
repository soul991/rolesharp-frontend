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
  strokeWidth = 8,
  label = 'ATS Score',
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
          {/* Background track */}
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
              transition: 'stroke-dashoffset 1s var(--rs-ease), stroke 0.3s ease',
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
              fontFamily: 'var(--font-display)',
              fontSize: `${Math.round(size * 0.32)}px`,
              fontWeight: 700,
              lineHeight: 1,
              color: 'var(--rs-ink)',
            }}
          >
            {clampedScore}
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--rs-muted)',
              marginTop: '2px',
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
            fontWeight: 700,
            color: 'var(--rs-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

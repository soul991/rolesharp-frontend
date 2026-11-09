import React, { useEffect, useRef, useState } from 'react';

export const KineticBrandStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'static'>('idle');

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPlayState('static');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setPlayState('static');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          setPlayState('playing');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        observer.disconnect();
        setPlayState('static');
      }
    };

    mediaQuery.addEventListener?.('change', handleMotionChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  const question = 'Do you know what it takes to secure a job rather than Degree and Skills?';
  const answer = 'A perfect resume that explains you more than yourself!!';
  const invitation = ['So,', 'choose', 'RoleSharp', 'to', 'tailor', 'your', 'resume.'];

  const renderWords = (text: string, delayBase: number, step: number, accented: string[] = []) => {
    const words = text.split(' ');
    return words.map((word, i) => {
      const cleanWord = word.replace(/[!?.,]/g, '');
      const isAccent = accented.includes(cleanWord);
      const delay = delayBase + i * step;

      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            margin: '-0.08em -0.035em',
            padding: '0.08em 0.035em',
            verticalAlign: 'bottom',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              animation: playState === 'playing' ? `rs-quote-rise 470ms var(--rs-ease) ${delay}ms both` : undefined,
              color: isAccent ? 'var(--rs-amber)' : undefined,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        marginTop: 'clamp(40px, 5.5vw, 68px)',
        minHeight: '130px',
      }}
      aria-label="Brand Philosophy Statement"
    >
      <p className="sr-only">
        Do you know what it takes to secure a job rather than Degree and Skills? well! A perfect resume that explains you
        more than yourself!! So, choose RoleSharp to tailor your resume.
      </p>

      <div
        style={{
          position: 'relative',
          display: 'grid',
          minHeight: '115px',
          alignItems: 'center',
          justifyContent: 'start',
        }}
        aria-hidden="true"
      >
        {playState === 'static' ? (
          /* Static presentation for reduced-motion or completed state */
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 2.8vw, 2.45rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              color: 'var(--rs-ink)',
              maxWidth: '30ch',
            }}
          >
            So, choose{' '}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-display)',
                fontWeight: 750,
                letterSpacing: '-0.05em',
              }}
            >
              <i
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '1em',
                  height: '1em',
                  borderRadius: '0.22em',
                  background: 'linear-gradient(145deg, #527DBA, #102B53 68%, #D9B65E)',
                  color: 'white',
                  fontStyle: 'normal',
                  fontSize: '0.85em',
                }}
              >
                R
              </i>
              <span>ole</span>
              <b style={{ color: 'var(--rs-blue-strong)' }}>Sharp</b>
            </span>{' '}
            to tailor your resume.
          </div>
        ) : (
          /* Kinetic staggered sequences */
          <div style={{ position: 'relative', display: 'grid', width: '100%', minHeight: '114px' }}>
            {/* Step 1: Question */}
            <p
              style={{
                gridArea: '1/1',
                margin: 0,
                maxWidth: '31ch',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.75rem)',
                fontWeight: 650,
                lineHeight: 1.2,
                letterSpacing: '-0.04em',
                color: 'var(--rs-ink)',
                visibility: playState === 'playing' ? 'visible' : 'hidden',
                animation: playState === 'playing' ? 'rs-quote-out 280ms ease-in 1850ms both' : undefined,
              }}
            >
              {renderWords(question, 0, 48)}
            </p>

            {/* Step 2: Beat ("well!") */}
            <p
              style={{
                gridArea: '1/1',
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                lineHeight: 1.05,
                color: 'var(--rs-amber)',
                visibility: playState === 'playing' ? 'visible' : 'hidden',
                animation:
                  playState === 'playing'
                    ? 'rs-quote-rise 330ms var(--rs-ease) 1950ms both, rs-quote-out 250ms ease-in 2850ms forwards'
                    : undefined,
              }}
            >
              well
              <span
                style={{
                  display: 'inline-block',
                  animation: playState === 'playing' ? 'rs-quote-pulse 360ms ease 2260ms 2 both' : undefined,
                }}
              >
                !
              </span>
            </p>

            {/* Step 3: Answer */}
            <p
              style={{
                gridArea: '1/1',
                margin: 0,
                maxWidth: '24ch',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.7rem, 3vw, 2.55rem)',
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--rs-ink)',
                visibility: playState === 'playing' ? 'visible' : 'hidden',
                animation: playState === 'playing' ? 'rs-quote-out 300ms ease-in 4250ms forwards' : undefined,
              }}
            >
              {renderWords(answer, 3000, 55, ['perfect', 'resume'])}
            </p>

            {/* Step 4: Final Invitation */}
            <p
              style={{
                gridArea: '1/1',
                margin: 0,
                maxWidth: '28ch',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3vw, 2.45rem)',
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--rs-ink)',
                visibility: playState === 'playing' ? 'visible' : 'hidden',
              }}
            >
              {invitation.map((word, i) => {
                const delay = 4400 + i * 57;
                if (word === 'RoleSharp') {
                  return (
                    <span
                      key={i}
                      style={{
                        display: 'inline-block',
                        overflow: 'hidden',
                        margin: '-0.08em -0.035em',
                        padding: '0.08em 0.035em',
                        verticalAlign: 'bottom',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 750,
                          letterSpacing: '-0.05em',
                          animation: playState === 'playing' ? `rs-quote-rise 480ms var(--rs-ease) ${delay}ms both` : undefined,
                        }}
                      >
                        <i
                          style={{
                            display: 'grid',
                            placeItems: 'center',
                            width: '1em',
                            height: '1em',
                            borderRadius: '0.22em',
                            background: 'linear-gradient(145deg, #527DBA, #102B53 68%, #D9B65E)',
                            color: 'white',
                            fontStyle: 'normal',
                            fontSize: '0.85em',
                          }}
                        >
                          R
                        </i>
                        <span>ole</span>
                        <b style={{ color: 'var(--rs-blue-strong)' }}>Sharp</b>
                      </span>{' '}
                    </span>
                  );
                }
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      margin: '-0.08em -0.035em',
                      padding: '0.08em 0.035em',
                      verticalAlign: 'bottom',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        animation: playState === 'playing' ? `rs-quote-rise 480ms var(--rs-ease) ${delay}ms both` : undefined,
                      }}
                    >
                      {word}
                    </span>{' '}
                  </span>
                );
              })}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes rs-quote-rise {
          from { opacity: 0; transform: translateY(0.65em); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rs-quote-out {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-0.25em); }
        }
        @keyframes rs-quote-pulse {
          0%, 10%, 90%, 100% { opacity: 0; transform: translateY(0.08em) scale(0.88); }
          28%, 66% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

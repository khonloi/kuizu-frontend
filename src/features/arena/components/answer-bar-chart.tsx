'use client';

import React from 'react';

interface AnswerDistributionProps {
  distribution: Record<string, number>; // { choiceId: count }
  choices: {
    id: string;
    text: string;
    color: string;
  }[];
  correctChoiceId?: string | null;
}

const COLOR_MAP: Record<string, { bg: string; shadow: string; symbol: string }> = {
  red: { bg: 'var(--kahoot-red)', shadow: 'var(--kahoot-red-shadow)', symbol: '▲' },
  blue: { bg: 'var(--kahoot-blue)', shadow: 'var(--kahoot-blue-shadow)', symbol: '◆' },
  yellow: { bg: 'var(--kahoot-yellow)', shadow: 'var(--kahoot-yellow-shadow)', symbol: '●' },
  green: { bg: 'var(--kahoot-green)', shadow: 'var(--kahoot-green-shadow)', symbol: '■' },
};

export function AnswerBarChart({
  distribution,
  choices,
  correctChoiceId,
}: AnswerDistributionProps) {
  const totalVotes = Math.max(
    1,
    Object.values(distribution).reduce((acc, val) => acc + val, 0)
  );

  return (
    <div
      role="region"
      aria-label="Poll result distribution chart"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '2rem',
        height: '220px',
        width: '100%',
        maxWidth: '720px',
        margin: '2rem auto',
        padding: '1rem',
      }}
    >
      {choices.map((choice) => {
        const count = distribution[choice.id] || 0;
        const percent = Math.round((count / totalVotes) * 100);
        const colorConfig = COLOR_MAP[choice.color] || COLOR_MAP.red;
        const isCorrect = correctChoiceId === choice.id;

        // Bar height between 28px and 170px
        const barHeight = Math.max(28, (count / totalVotes) * 170);

        return (
          <div
            key={choice.id}
            role="progressbar"
            aria-label={`${choice.text}: ${count} votes (${percent}%)${isCorrect ? ' - Correct answer' : ''}`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              gap: '0.5rem',
            }}
          >
            {/* Number of voters */}
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: isCorrect ? '#ffffff' : 'var(--text-secondary)',
              }}
            >
              {count}
            </span>

            {/* Distribution Bar */}
            <div
              style={{
                width: '100%',
                height: `${barHeight}px`,
                backgroundColor: colorConfig.bg,
                boxShadow: `0 4px 0 ${colorConfig.shadow}`,
                borderRadius: '12px 12px 4px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: isCorrect ? '3px solid #ffffff' : 'none',
                transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="animate-slide-up"
            >
              <span style={{ fontSize: '1.5rem', color: '#ffffff' }} aria-hidden="true">
                {colorConfig.symbol}
              </span>
            </div>

            {/* Percentage Badge */}
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--text-muted)',
              }}
            >
              {percent}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

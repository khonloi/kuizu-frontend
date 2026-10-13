import styles from '@/features/arena/arena.module.css';

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
      className={styles.chartContainer}
    >
      {choices.map((choice) => {
        const count = distribution[choice.id] || 0;
        const percent = Math.round((count / totalVotes) * 100);
        const colorConfig = COLOR_MAP[choice.color] || COLOR_MAP.red;
        const isCorrect = correctChoiceId === choice.id;

        // Bar height between 28px and 170px
        const barHeight = Math.max(28, (count / totalVotes) * 170);

        const barCustomStyle = {
          '--bar-height': `${barHeight}px`,
          '--bar-bg': colorConfig.bg,
          '--bar-shadow': colorConfig.shadow,
        } as React.CSSProperties;

        return (
          <div
            key={choice.id}
            role="progressbar"
            aria-label={`${choice.text}: ${count} votes (${percent}%)${isCorrect ? ' - Correct answer' : ''}`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className={styles.chartColumn}
          >
            {/* Number of voters */}
            <span
              className={`${styles.chartVoteCount} ${isCorrect ? styles.chartVoteCountCorrect : ''}`}
            >
              {count}
            </span>

            {/* Distribution Bar */}
            <div
              style={barCustomStyle}
              className={`${styles.chartBar} ${isCorrect ? styles.chartBarCorrect : ''} animate-slide-up`}
            >
              <span className={styles.chartSymbol} aria-hidden="true">
                {colorConfig.symbol}
              </span>
            </div>

            {/* Percentage Badge */}
            <span className={styles.chartPercent}>
              {percent}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

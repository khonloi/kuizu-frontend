import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnswerBarChart } from '../components/answer-bar-chart';

const mockChoices = [
  { id: 'c1', text: 'Option Red', color: 'red' },
  { id: 'c2', text: 'Option Blue', color: 'blue' },
  { id: 'c3', text: 'Option Yellow', color: 'yellow' },
  { id: 'c4', text: 'Option Green', color: 'green' },
];

describe('AnswerBarChart Component', () => {
  it('renders progressbars for all choices and calculates vote percentages', () => {
    // Total 10 votes: c1=6 (60%), c2=2 (20%), c3=1 (10%), c4=1 (10%)
    const distribution = { c1: 6, c2: 2, c3: 1, c4: 1 };

    render(
      <AnswerBarChart
        choices={mockChoices}
        distribution={distribution}
        correctChoiceId="c1"
      />
    );

    expect(screen.getByRole('region', { name: /poll result distribution chart/i })).toBeInTheDocument();

    const progressbars = screen.getAllByRole('progressbar');
    expect(progressbars).toHaveLength(4);

    // c1 is correct and has 60%
    expect(progressbars[0]).toHaveAttribute('aria-valuenow', '60');
    expect(progressbars[0]).toHaveAttribute('aria-label', expect.stringContaining('Option Red: 6 votes (60%)'));
    expect(progressbars[0]).toHaveAttribute('aria-label', expect.stringContaining('Correct answer'));

    // c2 has 20%
    expect(progressbars[1]).toHaveAttribute('aria-valuenow', '20');
  });

  it('renders cleanly when there are zero total votes', () => {
    render(
      <AnswerBarChart
        choices={mockChoices}
        distribution={{}}
      />
    );

    const progressbars = screen.getAllByRole('progressbar');
    expect(progressbars).toHaveLength(4);
    // All 0%
    progressbars.forEach((bar) => {
      expect(bar).toHaveAttribute('aria-valuenow', '0');
    });
  });
});

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../accordion';

const items = [
  { id: 'item-1', title: 'What is Kuizu?', content: 'A gamified learning platform.' },
  { id: 'item-2', title: 'How do Arenas work?', content: 'Live multiplayer quiz battles.' },
];

describe('Accordion Primitive', () => {
  it('renders accordion items collapsed by default', () => {
    render(<Accordion items={items} />);

    expect(screen.getByText('What is Kuizu?')).toBeInTheDocument();
    expect(screen.queryByText('A gamified learning platform.')).toBeNull();

    const header = screen.getByRole('button', { name: /what is kuizu/i });
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands item content on header click', () => {
    render(<Accordion items={items} />);

    const header = screen.getByRole('button', { name: /what is kuizu/i });
    fireEvent.click(header);

    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('A gamified learning platform.')).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('A gamified learning platform.')).toBeNull();
  });

  it('allows multiple items open when allowMultiple is true', () => {
    render(<Accordion items={items} allowMultiple={true} />);

    const header1 = screen.getByRole('button', { name: /what is kuizu/i });
    const header2 = screen.getByRole('button', { name: /how do arenas work/i });

    fireEvent.click(header1);
    fireEvent.click(header2);

    expect(screen.getByText('A gamified learning platform.')).toBeInTheDocument();
    expect(screen.getByText('Live multiplayer quiz battles.')).toBeInTheDocument();
  });
});

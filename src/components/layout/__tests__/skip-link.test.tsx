import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '../skip-link';

describe('SkipLink Component', () => {
  it('renders default skip link with #main-content target', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: /skip to main content/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('renders custom targetId and custom label', () => {
    render(<SkipLink targetId="custom-section" label="Jump to section" />);

    const link = screen.getByRole('link', { name: /jump to section/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#custom-section');
  });
});

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from '../textarea';

describe('Textarea Primitive', () => {
  it('renders textarea with label and placeholder', () => {
    render(<Textarea label="Feedback" placeholder="Write your thoughts..." />);

    expect(screen.getByLabelText('Feedback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your thoughts...')).toBeInTheDocument();
  });

  it('displays character counter when showCount is true with maxLength', () => {
    render(
      <Textarea
        label="Bio"
        value="Learning Japanese"
        maxLength={100}
        showCount={true}
        readOnly
      />
    );

    expect(screen.getByText('17 / 100')).toBeInTheDocument();
  });

  it('renders error message with alert role and aria-invalid', () => {
    render(
      <Textarea
        label="Notes"
        error="Field cannot be blank."
      />
    );

    const textarea = screen.getByLabelText('Notes');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Field cannot be blank.');
  });
});

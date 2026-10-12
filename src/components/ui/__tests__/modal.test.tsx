import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../modal';
import { Button } from '../button';

describe('Modal Primitive Component', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden Modal">
        <p>Modal content</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders dialog, title, content and footer when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title="Quit Lesson?"
        footer={<Button>Stay</Button>}
      >
        <p>Your current session progress will be lost.</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Quit Lesson?')).toBeInTheDocument();
    expect(screen.getByText('Your current session progress will be lost.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stay' })).toBeInTheDocument();
  });

  it('calls onClose callback when clicking the close button or pressing Escape', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Quit Lesson?">
        <p>Dialog body</p>
      </Modal>
    );

    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});

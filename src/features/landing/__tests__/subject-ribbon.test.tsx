import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubjectRibbon } from '../components/subject-ribbon/subject-ribbon';

const mockPlayPop = vi.fn();
vi.mock('@/stores/audio.store', () => ({
  useAudioStore: () => ({
    playPop: mockPlayPop,
  }),
}));

describe('SubjectRibbon Component', () => {
  it('renders exact Duolingo subject list items including English, Chess, and Math', () => {
    render(<SubjectRibbon />);

    expect(screen.getByText('ENGLISH')).toBeInTheDocument();
    expect(screen.getByText('CHESS')).toBeInTheDocument();
    expect(screen.getByText('MATH')).toBeInTheDocument();
    expect(screen.getByText('SPANISH')).toBeInTheDocument();
  });

  it('scrolls and plays audio when clicking navigation arrows', () => {
    render(<SubjectRibbon />);

    const scrollRightBtn = screen.getByRole('button', { name: /Scroll subjects right/i });
    fireEvent.click(scrollRightBtn);

    expect(mockPlayPop).toHaveBeenCalled();
  });
});

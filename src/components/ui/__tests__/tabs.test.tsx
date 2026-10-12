import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../tabs';

const mockTabs = [
  { id: 'tab-1', label: 'Overview', content: <div>Overview Content</div> },
  { id: 'tab-2', label: 'Curriculum', content: <div>Curriculum Content</div> },
  { id: 'tab-3', label: 'Reviews', content: <div>Reviews Content</div> },
];

describe('Tabs Primitive', () => {
  it('renders tab triggers and active tab panel content', () => {
    render(<Tabs tabs={mockTabs} defaultTab="tab-1" />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Curriculum' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('Overview Content')).toBeInTheDocument();
  });

  it('switches active tab and panel on click', () => {
    const handleChange = vi.fn();
    render(<Tabs tabs={mockTabs} defaultTab="tab-1" onChange={handleChange} />);

    const curriculumTab = screen.getByRole('tab', { name: 'Curriculum' });
    fireEvent.click(curriculumTab);

    expect(handleChange).toHaveBeenCalledWith('tab-2');
    expect(curriculumTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Curriculum Content')).toBeInTheDocument();
    expect(screen.queryByText('Overview Content')).toBeNull();
  });

  it('supports arrow key navigation across tabs', () => {
    render(<Tabs tabs={mockTabs} defaultTab="tab-1" />);

    const overviewTab = screen.getByRole('tab', { name: 'Overview' });

    // Arrow Right moves to next tab
    fireEvent.keyDown(overviewTab, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Curriculum' })).toHaveAttribute('aria-selected', 'true');

    // Arrow Left moves back
    const curriculumTab = screen.getByRole('tab', { name: 'Curriculum' });
    fireEvent.keyDown(curriculumTab, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('respects controlled activeTab prop', () => {
    const { rerender } = render(<Tabs tabs={mockTabs} activeTab="tab-1" />);
    expect(screen.getByText('Overview Content')).toBeInTheDocument();

    rerender(<Tabs tabs={mockTabs} activeTab="tab-3" />);
    expect(screen.getByText('Reviews Content')).toBeInTheDocument();
  });
});

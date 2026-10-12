import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QRCodeSvg } from '../components/qr-code';

describe('QRCodeSvg Component', () => {
  it('renders generating placeholder initially then loads SVG', async () => {
    const { container } = render(
      <QRCodeSvg value="http://localhost:3001/arena/join?pin=123456" />
    );

    // Initial check
    expect(screen.queryByText('Generating...')).toBeInTheDocument();

    // Wait for async SVG resolution
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('renders SVG QR code content asynchronously with custom size', async () => {
    const { container } = render(
      <QRCodeSvg value="http://localhost:3001/arena/join?pin=123456" size={160} />
    );

    await waitFor(() => {
      const svgEl = container.querySelector('svg');
      expect(svgEl).toBeInTheDocument();
    });
  });
});

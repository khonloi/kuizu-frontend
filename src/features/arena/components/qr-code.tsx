'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
}

export function QRCodeSvg({
  value,
  size = 140,
  className,
  darkColor = '#000000',
  lightColor = '#ffffff',
}: QRCodeProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    let isCancelled = false;

    QRCode.toString(value, {
      type: 'svg',
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor,
      },
    })
      .then((svg) => {
        if (!isCancelled) {
          setSvgContent(svg);
        }
      })
      .catch((err) => {
        console.error('Failed to generate QR code SVG:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [value, darkColor, lightColor]);

  if (!svgContent) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: '#888888' }}>Generating...</span>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: lightColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

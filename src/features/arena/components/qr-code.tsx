'use client';

import React, { useEffect, useState } from 'react';

import styles from './qr-code.module.css';

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

    // Dynamically load qrcode to avoid bloating initial shared bundle
    import('qrcode')
      .then((mod) => {
        const QRCode = mod.default || mod;
        return QRCode.toString(value, {
          type: 'svg',
          margin: 1,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        });
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

  const customStyle = {
    '--qr-size': `${size}px`,
    '--qr-bg': lightColor,
  } as React.CSSProperties;

  if (!svgContent) {
    return (
      <div
        className={`${styles.qrPlaceholder} ${className || ''}`}
        style={{ '--qr-size': `${size}px` } as React.CSSProperties}
      >
        <span className={styles.qrPlaceholderText}>Generating...</span>
      </div>
    );
  }

  return (
    <div
      className={`${styles.qrContainer} ${className || ''}`}
      style={customStyle}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

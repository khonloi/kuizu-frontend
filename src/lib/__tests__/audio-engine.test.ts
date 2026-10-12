import { describe, it, expect } from 'vitest';
import { audioEngine } from '../audio-engine';

describe('Web Audio Synthesizer Engine', () => {
  it('instantiates and provides synthesizers for gamification tones', () => {
    expect(audioEngine).toBeDefined();
    expect(typeof audioEngine.playSuccess).toBe('function');
    expect(typeof audioEngine.playError).toBe('function');
    expect(typeof audioEngine.playTick).toBe('function');
    expect(typeof audioEngine.playPop).toBe('function');
    expect(typeof audioEngine.playFanfare).toBe('function');
  });

  it('safely plays tones without throwing exceptions', () => {
    expect(() => audioEngine.playPop()).not.toThrow();
    expect(() => audioEngine.playSuccess()).not.toThrow();
    expect(() => audioEngine.playError()).not.toThrow();
    expect(() => audioEngine.playTick()).not.toThrow();
    expect(() => audioEngine.playFanfare()).not.toThrow();
  });
});

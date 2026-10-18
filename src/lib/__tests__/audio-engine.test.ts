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
    expect(() => audioEngine.playTick(false)).not.toThrow();
    expect(() => audioEngine.playTick(true)).not.toThrow();
    expect(() => audioEngine.playFanfare()).not.toThrow();
  });

  it('manages volume level within [0, 1] range', () => {
    audioEngine.setVolume(0.8);
    expect(audioEngine.getVolume()).toBe(0.8);

    // Clamps below 0 to 0
    audioEngine.setVolume(-0.5);
    expect(audioEngine.getVolume()).toBe(0);

    // Clamps above 1 to 1
    audioEngine.setVolume(1.5);
    expect(audioEngine.getVolume()).toBe(1);

    // Restore comfortable volume
    audioEngine.setVolume(0.6);
    expect(audioEngine.getVolume()).toBe(0.6);
  });

  it('toggles muted state safely', () => {
    audioEngine.setMuted(true);
    expect(audioEngine.getMuted()).toBe(true);
    expect(() => audioEngine.playPop()).not.toThrow();

    audioEngine.setMuted(false);
    expect(audioEngine.getMuted()).toBe(false);
    expect(() => audioEngine.playPop()).not.toThrow();
  });
});

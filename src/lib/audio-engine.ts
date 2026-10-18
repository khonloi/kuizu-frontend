'use client';

export interface ToneOptions {
  type?: OscillatorType;
  frequency: number;
  endFrequency?: number;
  duration?: number;
  volumeMultiplier?: number;
  delay?: number;
  envelope?: 'decay' | 'attack-decay';
}

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Unified low-level tone generator that configures Oscillator and Gain envelopes.
   */
  private playTone({
    type = 'sine',
    frequency,
    endFrequency,
    duration = 0.05,
    volumeMultiplier = 0.35,
    delay = 0,
    envelope = 'decay',
  }: ToneOptions): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + delay;
      const endTime = startTime + duration;
      const targetGain = this.volume * volumeMultiplier;

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, startTime);
      if (endFrequency !== undefined) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), endTime);
      }

      if (envelope === 'attack-decay') {
        const attackTime = Math.min(0.04, duration * 0.2);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(targetGain, startTime + attackTime);
        gain.gain.exponentialRampToValueAtTime(0.001, endTime);
      } else {
        gain.gain.setValueAtTime(targetGain, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, endTime);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(endTime + 0.02);
    } catch {
      // Audio autoplay policy or device fallback
    }
  }

  /**
   * Pop click sound when clicking tactile 3D buttons
   */
  public playPop() {
    this.playTone({
      type: 'sine',
      frequency: 600,
      endFrequency: 300,
      duration: 0.05,
      volumeMultiplier: 0.35,
    });
  }

  /**
   * Harmonious ascending chord for correct lesson answer
   */
  public playSuccess() {
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      this.playTone({
        type: 'triangle',
        frequency: freq,
        duration: 0.45,
        volumeMultiplier: 0.4,
        delay: idx * 0.08,
        envelope: 'attack-decay',
      });
    });
  }

  /**
   * Soft descending tone for incorrect answer
   */
  public playError() {
    this.playTone({
      type: 'sawtooth',
      frequency: 220,
      endFrequency: 140,
      duration: 0.35,
      volumeMultiplier: 0.3,
    });
  }

  /**
   * Timer tick for multiplayer arena countdown
   */
  public playTick(urgent: boolean = false) {
    this.playTone({
      type: 'sine',
      frequency: urgent ? 1200 : 800,
      duration: urgent ? 0.06 : 0.04,
      volumeMultiplier: urgent ? 0.45 : 0.25,
    });
  }

  /**
   * Victory fanfare for lesson completion or arena podium
   */
  public playFanfare() {
    const melody = [
      { freq: 523.25, time: 0, dur: 0.12 },
      { freq: 523.25, time: 0.14, dur: 0.12 },
      { freq: 523.25, time: 0.28, dur: 0.12 },
      { freq: 659.25, time: 0.42, dur: 0.15 },
      { freq: 783.99, time: 0.58, dur: 0.2 },
      { freq: 1046.5, time: 0.8, dur: 0.5 },
    ];

    melody.forEach(({ freq, time, dur }) => {
      this.playTone({
        type: 'triangle',
        frequency: freq,
        duration: dur,
        volumeMultiplier: 0.45,
        delay: time,
        envelope: 'attack-decay',
      });
    });
  }
}

export const audioEngine = new AudioEngine();

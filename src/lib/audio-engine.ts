'use client';

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

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  /**
   * Pop click sound when clicking tactile 3D buttons
   */
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio autoplay policy or device fallback
    }
  }

  /**
   * Harmonious ascending chord for correct lesson answer
   */
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // C5, E5, G5 triad notes
      const notes = [523.25, 659.25, 783.99];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        const startTime = ctx.currentTime + idx * 0.08;
        const endTime = startTime + 0.45;

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, endTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(endTime + 0.05);
      });
    } catch {
      // Audio fallback
    }
  }

  /**
   * Soft descending tone for incorrect answer
   */
  public playError() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.36);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Timer tick for multiplayer arena countdown
   */
  public playTick(urgent: boolean = false) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(urgent ? 1200 : 800, ctx.currentTime);

      gain.gain.setValueAtTime(this.volume * (urgent ? 0.45 : 0.25), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (urgent ? 0.06 : 0.04));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + (urgent ? 0.07 : 0.05));
    } catch {
      // Audio fallback
    }
  }

  /**
   * Victory fanfare for lesson completion or arena podium
   */
  public playFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Fanfare sequence: C5, C5, C5, G5, A5, C6
      const melody = [
        { freq: 523.25, time: 0, dur: 0.12 },
        { freq: 523.25, time: 0.14, dur: 0.12 },
        { freq: 523.25, time: 0.28, dur: 0.12 },
        { freq: 659.25, time: 0.42, dur: 0.15 },
        { freq: 783.99, time: 0.58, dur: 0.2 },
        { freq: 1046.5, time: 0.8, dur: 0.5 },
      ];

      melody.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

        const startTime = ctx.currentTime + time;
        const endTime = startTime + dur;

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(this.volume * 0.45, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, endTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(endTime + 0.05);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const audioEngine = new AudioEngine();

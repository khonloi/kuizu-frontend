import { create } from 'zustand';
import { audioEngine } from '../lib/audio-engine';

interface AudioState {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  playPop: () => void;
  playSuccess: () => void;
  playError: () => void;
  playTick: (urgent?: boolean) => void;
  playFanfare: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isMuted: false,
  volume: 0.6,

  toggleMute: () => {
    const nextMuted = !get().isMuted;
    audioEngine.setMuted(nextMuted);
    set({ isMuted: nextMuted });
  },

  setVolume: (volume: number) => {
    audioEngine.setVolume(volume);
    set({ volume });
  },

  playPop: () => {
    if (!get().isMuted) audioEngine.playPop();
  },

  playSuccess: () => {
    if (!get().isMuted) audioEngine.playSuccess();
  },

  playError: () => {
    if (!get().isMuted) audioEngine.playError();
  },

  playTick: (urgent = false) => {
    if (!get().isMuted) audioEngine.playTick(urgent);
  },

  playFanfare: () => {
    if (!get().isMuted) audioEngine.playFanfare();
  },
}));

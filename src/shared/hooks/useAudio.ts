import { useState, useRef, useCallback, useEffect } from 'react';

const SCALE = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 698.46];
const MELODY = [0, 1, 2, 4, 3, 2, 1, 0, 4, 5, 4, 2, 3, 4, 1, 2];

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

/**
 * Traditional pentatonic audio synthesizer class.
 * Provided for backward compatibility with vanilla JS implementation.
 */
export class HeritageAudioPlayer {
  audioCtx: AudioContext | null = null;
  isPlaying: boolean = false;
  timerId: ReturnType<typeof setInterval> | null = null;
  scale = SCALE;
  melody = MELODY;
  step = 0;

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as WebkitWindow).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playPluck(freq: number) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  }

  toggle(onStateChange?: (isPlaying: boolean) => void) {
    this.init();
    if (this.isPlaying) {
      if (this.timerId) clearInterval(this.timerId);
      this.isPlaying = false;
    } else {
      this.isPlaying = true;
      this.timerId = setInterval(() => {
        const noteIdx = this.melody[this.step % this.melody.length];
        const freq = this.scale[noteIdx];
        this.playPluck(freq);
        this.step++;
      }, 480);
    }
    if (onStateChange) onStateChange(this.isPlaying);
    return this.isPlaying;
  }
}

/**
 * Singleton instance of the audio player for vanilla JS compatibility.
 */
export const heritageAudio = new HeritageAudioPlayer();

/**
 * React hook for playing the traditional pentatonic ambient melody.
 * @returns Object containing isPlaying state and a toggle function.
 */
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);

  const init = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as WebkitWindow).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playPluck = useCallback((freq: number) => {
    if (!audioCtxRef.current) return;
    const now = audioCtxRef.current.currentTime;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  }, []);

  const toggle = useCallback(() => {
    init();
    if (isPlaying) {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      timerIdRef.current = setInterval(() => {
        const noteIdx = MELODY[stepRef.current % MELODY.length];
        const freq = SCALE[noteIdx];
        playPluck(freq);
        stepRef.current++;
      }, 480);
    }
  }, [isPlaying, init, playPluck]);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggle };
}

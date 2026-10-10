import { useState, useCallback, useEffect } from 'react';

let sharedAudioElement: HTMLAudioElement | null = null;
let listenersInitialized = false;

function getSharedAudio(): HTMLAudioElement {
  if (!sharedAudioElement && typeof window !== 'undefined') {
    sharedAudioElement = new Audio('/hello_vietnam.mp3');
    sharedAudioElement.loop = true;
    sharedAudioElement.volume = 0.45;
  }
  return sharedAudioElement!;
}

/**
 * Audio player helper class maintained for backward compatibility.
 */
export class HeritageAudioPlayer {
  isPlaying: boolean = false;

  toggle(onStateChange?: (isPlaying: boolean) => void) {
    const audio = getSharedAudio();
    if (audio.paused) {
      audio.play().then(() => {
        this.isPlaying = true;
        if (onStateChange) onStateChange(true);
      }).catch(() => {
        this.isPlaying = false;
        if (onStateChange) onStateChange(false);
      });
    } else {
      audio.pause();
      this.isPlaying = false;
      if (onStateChange) onStateChange(false);
    }
    return this.isPlaying;
  }
}

/**
 * Singleton instance of the audio player for backward compatibility.
 */
export const heritageAudio = new HeritageAudioPlayer();

/**
 * React hook for playing the Hello Vietnam background music.
 * Features:
 * - Autoplay on website load
 * - Fallback to play on first user interaction (click/touch/keypress) to satisfy browser autoplay policies
 * - Full synchronization with Navbar play/pause toggle button
 */
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = getSharedAudio();

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Initial sync
    setIsPlaying(!audio.paused);

    // Try auto-play immediately on load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser prevented autoplay without prior gesture; register one-time user interaction listener
          if (!listenersInitialized) {
            listenersInitialized = true;
            const startAudioOnGesture = () => {
              const currentAudio = getSharedAudio();
              if (currentAudio.paused) {
                currentAudio.play().then(() => {
                  setIsPlaying(true);
                }).catch(() => {});
              }
              window.removeEventListener('click', startAudioOnGesture);
              window.removeEventListener('touchstart', startAudioOnGesture);
              window.removeEventListener('keydown', startAudioOnGesture);
              window.removeEventListener('scroll', startAudioOnGesture);
            };

            window.addEventListener('click', startAudioOnGesture, { once: true });
            window.addEventListener('touchstart', startAudioOnGesture, { once: true });
            window.addEventListener('keydown', startAudioOnGesture, { once: true });
            window.addEventListener('scroll', startAudioOnGesture, { once: true });
          }
        });
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = getSharedAudio();
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  return { isPlaying, toggle };
}

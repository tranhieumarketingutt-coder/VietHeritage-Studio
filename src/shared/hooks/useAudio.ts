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

    // Immediate autoplay attempt
    const tryPlay = () => {
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Blocked by browser autoplay policy - wait for user interaction
        });
      }
    };

    tryPlay();

    if (!listenersInitialized) {
      listenersInitialized = true;

      const triggerPlayback = () => {
        const currentAudio = getSharedAudio();
        if (currentAudio.paused) {
          const p = currentAudio.play();
          if (p !== undefined) {
            p.then(() => {
              setIsPlaying(true);
              removeGestureListeners();
            }).catch(() => {});
          }
        } else {
          setIsPlaying(true);
          removeGestureListeners();
        }
      };

      const interactionEvents = [
        'pointerdown',
        'mousedown',
        'touchstart',
        'click',
        'keydown',
        'wheel',
        'scroll'
      ];

      const removeGestureListeners = () => {
        interactionEvents.forEach((evt) => {
          window.removeEventListener(evt, triggerPlayback, { capture: true } as EventListenerOptions);
          document.removeEventListener(evt, triggerPlayback, { capture: true } as EventListenerOptions);
        });
      };

      interactionEvents.forEach((evt) => {
        window.addEventListener(evt, triggerPlayback, { once: true, capture: true, passive: true });
        document.addEventListener(evt, triggerPlayback, { once: true, capture: true, passive: true });
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

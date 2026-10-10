import { useEffect, useRef, useCallback } from 'react';

export interface UseFocusTrapOptions {
  isOpen: boolean;
  onClose?: () => void;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])'
].join(', ');

let nextTrapId = 0;
const activeTrapStack: number[] = [];

/**
 * Resets active trap stack (used for testing isolation).
 */
export function _resetActiveTrapStackForTesting() {
  activeTrapStack.length = 0;
}

/**
 * Custom hook implementing W3C WAI-ARIA APG Modal Dialog pattern:
 * - Focus trapping (cycles Tab and Shift+Tab inside the container)
 * - Escape key dismissal with LIFO stack for nested modals
 * - Initial focus on open
 * - Focus restoration to opener element on close
 * - Body scroll lock management
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>({
  isOpen,
  onClose,
  initialFocusRef,
  closeOnEscape = true,
  lockScroll = true
}: UseFocusTrapOptions) {
  const containerRef = useRef<T | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const trapIdRef = useRef<number>(0);
  if (trapIdRef.current === 0) {
    trapIdRef.current = ++nextTrapId;
  }
  const trapId = trapIdRef.current;

  // Track active trap in LIFO stack
  useEffect(() => {
    if (isOpen) {
      activeTrapStack.push(trapId);
      return () => {
        const idx = activeTrapStack.indexOf(trapId);
        if (idx !== -1) {
          activeTrapStack.splice(idx, 1);
        }
      };
    }
  }, [isOpen, trapId]);

  // 1. Initial focus & Focus restoration & Scroll lock
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;

      const timer = setTimeout(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else if (containerRef.current) {
          const focusables = Array.from(
            containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
          ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0);

          if (focusables.length > 0) {
            focusables[0].focus();
          } else {
            containerRef.current.focus();
          }
        }
      }, 30);

      let originalOverflow = '';
      if (lockScroll) {
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }

      return () => {
        clearTimeout(timer);
        if (lockScroll) {
          document.body.style.overflow = originalOverflow;
        }
        if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, lockScroll, initialFocusRef]);

  // 2. Keyboard event handling: Tab wrap & Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !containerRef.current) return;

      // Only topmost trap in LIFO stack responds to Escape and Tab
      if (activeTrapStack.length > 0 && activeTrapStack[activeTrapStack.length - 1] !== trapId) {
        return;
      }

      if (e.key === 'Escape' && closeOnEscape && onClose) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0);

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !containerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !containerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isOpen, closeOnEscape, onClose, trapId]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return containerRef;
}

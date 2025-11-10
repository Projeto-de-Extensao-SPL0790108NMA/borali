import { useEffect, useRef } from 'react';

interface UseClickOutsideProps {
  isOpen: boolean;
  onClose: () => void;
  ignoreSelectPortal?: boolean;
}

export function useClickOutside({
  isOpen,
  onClose,
  ignoreSelectPortal = true,
}: UseClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      // ignore interactions on Select portal to prevent accidental close
      if (ignoreSelectPortal && target?.closest('[data-slot^="select-"]'))
        return;

      // ignore clicks on Select content and triggers
      if (
        target?.closest('[role="combobox"]') ||
        target?.closest('[data-radix-select-content]')
      )
        return;

      if (ref.current && target && !ref.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, ignoreSelectPortal]);

  return ref;
}

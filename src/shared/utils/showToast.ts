import { CSSProperties } from 'react';
import { toast } from 'sonner';

enum TOAST_COLORS {
  success = 'var(--background-toast-success)',
  error = 'var(--background-toast-error)',
  info = 'var(--background-toast-info)',
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info', styles?: CSSProperties): void {
  toast[type](message, {
    style: {
      color: 'white',
      border: 'none',
      background: TOAST_COLORS[type],
      ...styles,
    },
  });
}

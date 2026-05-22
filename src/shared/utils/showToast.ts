import { CSSProperties } from 'react';
import { toast } from 'sonner';

enum TOAST_COLORS {
  success = 'var(--color-toast-success)',
  error = 'var(--color-toast-error)',
  info = 'var(--color-toast-info)',
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

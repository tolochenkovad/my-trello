import { CSSProperties } from 'react';
import { toast } from 'sonner';

enum ToastColors {
  success = 'var(--color-toast-success)',
  error = 'var(--color-error)',
  info = 'var(--color-toast-info)',
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info', styles?: CSSProperties): void {
  toast[type](message, {
    style: {
      color: 'white',
      border: 'none',
      background: ToastColors[type],
      ...styles,
    },
  });
}

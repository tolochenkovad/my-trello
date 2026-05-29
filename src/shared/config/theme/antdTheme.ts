import { theme } from 'antd';
import { componentTokens } from '.';

export const antdTheme = {
  algorithm: theme.defaultAlgorithm,

  token: {
    colorBorder: 'var(--color-antd-border)',
  },

  components: componentTokens,
};
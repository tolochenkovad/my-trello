import { PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { antdTheme } from '@/shared/config/theme/antdTheme';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};

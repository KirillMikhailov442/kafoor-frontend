'use client';

import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Provider } from '../ui/provider';

const queryClient = new QueryClient();
const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Provider>{children}</Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;

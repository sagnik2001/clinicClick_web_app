import React from 'react';

import { AppShell, useMantineTheme } from '@mantine/core';



const AuthLayout = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? 'var(--grey-600)' : 'var(--grey-100)',
          backgroundImage:
            'radial-gradient(205.8% 374.81% at -12.22% 266.79%, #6601E8 18.91%, #00002C 74.8%)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
      }}
      fixed
    >
      {children}
    </AppShell>
  );
};

export default AuthLayout;

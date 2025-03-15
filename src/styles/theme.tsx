'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ptBR } from '@mui/material/locale';
import { ReactNode } from 'react';

// Create a modern theme instance
const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#3a36e0',
        light: '#6b67ff',
        dark: '#2420c0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0cd1e8',
        light: '#62efff',
        dark: '#00a1b6',
        contrastText: '#000000',
      },
      error: {
        main: '#f04141',
        light: '#f47777',
        dark: '#d32f2f',
      },
      warning: {
        main: '#ffce00',
        light: '#ffeb80',
        dark: '#b8a200',
      },
      info: {
        main: '#0cd1e8',
        light: '#71e8f7',
        dark: '#0098a6',
      },
      success: {
        main: '#10dc60',
        light: '#67e290',
        dark: '#069e45',
      },
      background: {
        default: '#cfcfcf',
        paper: '#ffffff',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
      },
      divider: 'rgba(0, 0, 0, 0.06)',
    },
    typography: {
      fontFamily: 'var(--font-geist-sans)',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.1rem',
        lineHeight: 1.2,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.2,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 10,
    },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.05)',
      '0px 3px 3px -2px rgba(0,0,0,0.05),0px 2px 6px 0px rgba(0,0,0,0.03),0px 1px 8px 0px rgba(0,0,0,0.05)',
      '0px 3px 4px -2px rgba(0,0,0,0.05),0px 3px 8px -1px rgba(0,0,0,0.03),0px 1px 12px 0px rgba(0,0,0,0.05)',
      '0px 2px 5px -1px rgba(0,0,0,0.05),0px 4px 10px -2px rgba(0,0,0,0.03),0px 1px 14px -1px rgba(0,0,0,0.05)',
      '0px 3px 6px -1px rgba(0,0,0,0.05),0px 5px 12px -2px rgba(0,0,0,0.03),0px 1px 18px -1px rgba(0,0,0,0.05)',
      '0px 3px 7px -2px rgba(0,0,0,0.05),0px 6px 14px -3px rgba(0,0,0,0.03),0px 1px 20px -1px rgba(0,0,0,0.05)',
      '0px 4px 8px -2px rgba(0,0,0,0.05),0px 7px 16px -3px rgba(0,0,0,0.03),0px 2px 22px -1px rgba(0,0,0,0.05)',
      '0px 5px 9px -2px rgba(0,0,0,0.05),0px 8px 18px -3px rgba(0,0,0,0.03),0px 2px 24px -1px rgba(0,0,0,0.05)',
      '0px 5px 10px -2px rgba(0,0,0,0.05),0px 9px 20px -3px rgba(0,0,0,0.03),0px 3px 26px -2px rgba(0,0,0,0.05)',
      '0px 6px 11px -3px rgba(0,0,0,0.05),0px 10px 22px -3px rgba(0,0,0,0.03),0px 3px 28px -2px rgba(0,0,0,0.05)',
      '0px 6px 12px -3px rgba(0,0,0,0.05),0px 11px 24px -3px rgba(0,0,0,0.03),0px 3px 30px -2px rgba(0,0,0,0.05)',
      '0px 7px 13px -3px rgba(0,0,0,0.05),0px 12px 26px -3px rgba(0,0,0,0.03),0px 4px 32px -2px rgba(0,0,0,0.05)',
      '0px 7px 14px -3px rgba(0,0,0,0.05),0px 13px 28px -3px rgba(0,0,0,0.03),0px 4px 34px -2px rgba(0,0,0,0.05)',
      '0px 8px 15px -4px rgba(0,0,0,0.05),0px 14px 30px -4px rgba(0,0,0,0.03),0px 4px 36px -2px rgba(0,0,0,0.05)',
      '0px 8px 16px -4px rgba(0,0,0,0.05),0px 15px 32px -4px rgba(0,0,0,0.03),0px 5px 38px -3px rgba(0,0,0,0.05)',
      '0px 8px 17px -4px rgba(0,0,0,0.05),0px 16px 34px -4px rgba(0,0,0,0.03),0px 5px 40px -3px rgba(0,0,0,0.05)',
      '0px 9px 18px -4px rgba(0,0,0,0.05),0px 17px 36px -4px rgba(0,0,0,0.03),0px 5px 42px -3px rgba(0,0,0,0.05)',
      '0px 9px 19px -4px rgba(0,0,0,0.05),0px 18px 38px -4px rgba(0,0,0,0.03),0px 6px 44px -3px rgba(0,0,0,0.05)',
      '0px 10px 20px -5px rgba(0,0,0,0.05),0px 19px 40px -5px rgba(0,0,0,0.03),0px 6px 46px -3px rgba(0,0,0,0.05)',
      '0px 10px 21px -5px rgba(0,0,0,0.05),0px 20px 42px -5px rgba(0,0,0,0.03),0px 6px 48px -3px rgba(0,0,0,0.05)',
      '0px 10px 22px -5px rgba(0,0,0,0.05),0px 21px 44px -5px rgba(0,0,0,0.03),0px 7px 50px -4px rgba(0,0,0,0.05)',
      '0px 11px 23px -5px rgba(0,0,0,0.05),0px 22px 46px -5px rgba(0,0,0,0.03),0px 7px 52px -4px rgba(0,0,0,0.05)',
      '0px 11px 24px -5px rgba(0,0,0,0.05),0px 23px 48px -5px rgba(0,0,0,0.03),0px 7px 54px -4px rgba(0,0,0,0.05)',
      '0px 11px 25px -5px rgba(0,0,0,0.05),0px 24px 50px -5px rgba(0,0,0,0.03),0px 8px 56px -4px rgba(0,0,0,0.05)',
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#a8a8a8',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          },
          elevation2: {
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)',
          },
          elevation3: {
            boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
            },
          },
          contained: {
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          },
          head: {
            fontWeight: 600,
            color: '#1e293b',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:last-child td': {
              borderBottom: 0,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '4px 8px',
            '&.Mui-selected': {
              backgroundColor: 'rgba(58, 54, 224, 0.1)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.12)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
              },
            },
          },
        },
      },
    },
  },
  ptBR, // Provide the Portuguese (Brazil) locale
);

export function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 
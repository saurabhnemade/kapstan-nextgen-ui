'use client';

import { createTheme, CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
    // colors: {
    //     'light-purple': ['#37146B'],
    // },
    other: {
        primaryColor: '#37146B',
    },
});

export const mantineCssVariablesResolver: CSSVariablesResolver = (th) => ({
    variables: {
        '--mantine-primary-color-filled': th.other.primaryColor,
    },
    light: {
        '--mantine-primary-color-filled': th.other.primaryColor,
    },
    dark: {
        '--mantine-primary-color-filled': th.other.primaryColor,
    },
});

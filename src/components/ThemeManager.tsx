import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../themes/defaultTheme';
import JsonObject from 'types/JsonObject';

interface ThemeManagerProps {
  theme?: JsonObject;
  children: React.ReactNode;
}

export default function ThemeManager(props: ThemeManagerProps) {
  return <ThemeProvider theme={props.theme ?? defaultTheme}>{props.children}</ThemeProvider>;
}

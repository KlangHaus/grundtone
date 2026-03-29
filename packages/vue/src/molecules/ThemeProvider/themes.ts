import type { Theme } from '@grundtone/core';
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({});
export const lightTheme: Theme = light;
export const darkTheme: Theme = dark;
export const defaultTheme = lightTheme;

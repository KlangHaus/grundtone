/**
 * Debug script to investigate contrast issues found by automated testing
 */

import { describe, it } from 'vitest';
import { testColorContrast } from './accessibility';
import { logger } from '../utils/error-handling';

// Design token color values (from themes.ts)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lightThemeColors = {
  primary: '#0059b3',
  secondary: '#6c757d',
  tertiary: '#17a2b8',
  error: '#d32f2f',
  warning: '#f57c00',
  success: '#388e3c',
  info: '#0288d1',
  neutral: '#757575',
  background: '#ffffff',
  surface: '#f5f5f5',
  text: '#212529',
  textSecondary: '#6c757d',
  border: '#dee2e6',
  divider: '#e0e0e0',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const darkThemeColors = {
  primary: '#1976d2',
  secondary: '#adb5bd',
  tertiary: '#26c6da',
  error: '#f44336',
  warning: '#ff9800',
  success: '#4caf50',
  info: '#03a9f4',
  neutral: '#9e9e9e',
  background: '#121212',
  surface: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#adb5bd',
  border: '#495057',
  divider: '#424242',
};

describe('Color Contrast Debug Analysis', () => {
  it('analyzes failing light theme colors', () => {
    const warningResult = testColorContrast('#e65100', '#ffffff');
    logger.info('Fixed Light Warning vs Background:', {
      colors: `#e65100 on #ffffff`,
      ratio: warningResult.ratio,
      passes: warningResult.passes,
      level: warningResult.level,
    });

    const borderResult = testColorContrast('#9e9e9e', '#ffffff', true);
    logger.info('Fixed Light Border vs Background (large text):', {
      colors: `#9e9e9e on #ffffff`,
      ratio: borderResult.ratio,
      passes: borderResult.passes,
      level: borderResult.level,
    });

    const dividerResult = testColorContrast('#bdbdbd', '#ffffff', true);
    logger.info('Fixed Light Divider vs Background (large text):', {
      colors: `#bdbdbd on #ffffff`,
      ratio: dividerResult.ratio,
      passes: dividerResult.passes,
      level: dividerResult.level,
    });

    // Test better colors
    const betterWarning = testColorContrast('#d84315', '#ffffff');
    logger.info('Better Light Warning (#d84315):', {
      ratio: betterWarning.ratio,
      passes: betterWarning.passes,
      level: betterWarning.level,
    });

    const betterBorder = testColorContrast('#757575', '#ffffff', true);
    logger.info('Better Light Border (#757575):', {
      ratio: betterBorder.ratio,
      passes: betterBorder.passes,
      level: betterBorder.level,
    });

    const betterDivider = testColorContrast('#9e9e9e', '#ffffff', true);
    logger.info('Better Light Divider (#9e9e9e):', {
      ratio: betterDivider.ratio,
      passes: betterDivider.passes,
      level: betterDivider.level,
    });
  });

  it('analyzes failing dark theme colors', () => {
    // Test white on dark primary for buttons
    const darkPrimaryButton = testColorContrast('#ffffff', '#42a5f5');
    logger.info('White on Dark Primary Button:', {
      colors: `#ffffff on #42a5f5`,
      ratio: darkPrimaryButton.ratio,
      passes: darkPrimaryButton.passes,
      level: darkPrimaryButton.level,
    });

    // Test better dark primary
    const betterDarkPrimary = testColorContrast('#ffffff', '#1976d2');
    logger.info('White on Better Dark Primary (#1976d2):', {
      ratio: betterDarkPrimary.ratio,
      passes: betterDarkPrimary.passes,
      level: betterDarkPrimary.level,
    });

    const evenBetterDarkPrimary = testColorContrast('#ffffff', '#1565c0');
    logger.info('White on Even Better Dark Primary (#1565c0):', {
      ratio: evenBetterDarkPrimary.ratio,
      passes: evenBetterDarkPrimary.passes,
      level: evenBetterDarkPrimary.level,
    });
  });
});

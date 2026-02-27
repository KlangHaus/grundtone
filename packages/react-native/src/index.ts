/**
 * @grundtone/react-native
 *
 * React Native theme provider and hooks for Grundtone design system.
 * Use tokens from @grundtone/core in your RN app.
 *
 * @example
 * import { GrundtoneThemeProvider, useGrundtoneTheme } from '@grundtone/react-native';
 * import { createTheme } from '@grundtone/core';
 *
 * const { light, dark } = createTheme({
 *   light: { colors: { primary: '#007aff' } },
 *   dark: { colors: { primary: '#0a84ff' } }
 * });
 *
 * function App() {
 *   return (
 *     <GrundtoneThemeProvider light={light} dark={dark}>
 *       <MyScreen />
 *     </GrundtoneThemeProvider>
 *   );
 * }
 *
 * function MyScreen() {
 *   const { theme } = useGrundtoneTheme();
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background }}>
 *       <Text style={{ color: theme.colors.text }}>Hello</Text>
 *     </View>
 *   );
 * }
 */

export { GrundtoneThemeProvider, GrundtoneThemeContext } from './ThemeContext';
export type { GrundtoneThemeContextValue, ThemeMode } from './ThemeContext';
export { useGrundtoneTheme } from './useGrundtoneTheme';
export type { Theme } from '@grundtone/core';

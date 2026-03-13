import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  GrundtoneThemeProvider,
  useGrundtoneTheme,
} from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';
import 'react-native-reanimated';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function InnerLayout() {
  const { theme } = useGrundtoneTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <InnerLayout />
    </GrundtoneThemeProvider>
  );
}

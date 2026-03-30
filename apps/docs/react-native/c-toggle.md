# Toggle

Interactive preview of `GTToggle` on iOS, Android, and Web.

<SnackEmbed
  name="GTToggle — Grundtone"
  :height="500"
  :code="code"
/>

<script setup>
const code = `import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { GrundtoneThemeProvider, IconRegistryProvider, useGrundtoneTheme, createTheme, GTToggle } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function ToggleDemo() {
  const { theme, isDark, setMode } = useGrundtoneTheme();
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const rem = (v) => parseFloat(v) * 16;

  const heading = {
    fontSize: rem(theme.typography.fontSize.lg),
    fontWeight: '600',
    marginTop: rem(theme.spacing.lg),
    marginBottom: rem(theme.spacing.sm),
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
  };

  const group = { gap: rem(theme.spacing.sm) };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: rem(theme.spacing.md) }}
    >
      <Text style={heading}>Basic</Text>
      <View style={group}>
        <GTToggle
          value={isDark}
          onValueChange={(v) => setMode(v ? 'dark' : 'light')}
          label="Dark mode"
        />
        <GTToggle value={notifications} onValueChange={setNotifications} label="Notifications" />
        <GTToggle value={marketing} onValueChange={setMarketing} label="Marketing emails" />
      </View>

      <Text style={heading}>Sizes</Text>
      <View style={group}>
        <GTToggle value={notifications} onValueChange={setNotifications} size="sm" label="Small" />
        <GTToggle value={notifications} onValueChange={setNotifications} size="md" label="Medium" />
        <GTToggle value={notifications} onValueChange={setNotifications} size="lg" label="Large" />
      </View>

      <Text style={heading}>States</Text>
      <View style={group}>
        <GTToggle value={true} disabled label="Disabled (on)" />
        <GTToggle value={false} disabled label="Disabled (off)" />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <IconRegistryProvider registry={iconRegistry}>
        <ToggleDemo />
      </IconRegistryProvider>
    </GrundtoneThemeProvider>
  );
}`;
</script>

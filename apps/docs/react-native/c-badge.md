# Badge

Interactive preview of `GTBadge` on iOS, Android, and Web.

<SnackEmbed
  name="GTBadge — Grundtone"
  :height="600"
  :code="code"
/>

<script setup>
const code = `import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { GrundtoneThemeProvider, IconRegistryProvider, useGrundtoneTheme, createTheme, GTBadge } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function BadgeDemo() {
  const { theme } = useGrundtoneTheme();
  const heading = { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginTop: 24, marginBottom: 8 };
  const row = { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }}>
      <Text style={heading}>Variants</Text>
      <View style={row}>
        <GTBadge variant="neutral">Neutral</GTBadge>
        <GTBadge variant="info">Info</GTBadge>
        <GTBadge variant="success">Success</GTBadge>
        <GTBadge variant="warning">Warning</GTBadge>
        <GTBadge variant="error">Error</GTBadge>
      </View>

      <Text style={heading}>With dot</Text>
      <View style={row}>
        <GTBadge variant="success" dot>Active</GTBadge>
        <GTBadge variant="warning" dot>Pending</GTBadge>
        <GTBadge variant="error" dot>Offline</GTBadge>
        <GTBadge variant="neutral" dot>Draft</GTBadge>
      </View>

      <Text style={heading}>Sizes</Text>
      <View style={row}>
        <GTBadge size="sm">Small</GTBadge>
        <GTBadge size="md">Medium</GTBadge>
        <GTBadge size="sm" variant="success" dot>Small dot</GTBadge>
        <GTBadge size="md" variant="success" dot>Medium dot</GTBadge>
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <IconRegistryProvider registry={iconRegistry}>
        <BadgeDemo />
      </IconRegistryProvider>
    </GrundtoneThemeProvider>
  );
}`;
</script>

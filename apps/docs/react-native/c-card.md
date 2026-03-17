# Card

Interactive preview of `GTCard` on iOS, Android, and Web. For guidelines, best practices, and references, see the [Design System — Card](/web/c-card) documentation.

<SnackEmbed
  name="GTCard — Grundtone"
  :height="700"
  :code="code"
/>

<script setup>
const code = `import { useState } from 'react';
import { ScrollView, View, Text, Linking } from 'react-native';
import { GrundtoneThemeProvider, IconRegistryProvider, useGrundtoneTheme, createTheme, GTCard } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function CardDemo() {
  const { theme } = useGrundtoneTheme();
  const rem = (v) => parseFloat(v) * 16;

  const textStyle = {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
    fontSize: rem(theme.typography.fontSize.sm),
  };

  const heading = {
    fontSize: rem(theme.typography.fontSize.lg),
    fontWeight: '600',
    marginTop: rem(theme.spacing.lg),
    marginBottom: rem(theme.spacing.sm),
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: rem(theme.spacing.md) }}
    >
      <Text style={heading}>Standard (raised)</Text>
      <GTCard title="Design Tokens" subheading="Guide">
        <Text style={textStyle}>Learn how design tokens power the system.</Text>
      </GTCard>

      <Text style={heading}>Navigation card</Text>
      <GTCard
        nav
        onPress={() => Linking.openURL('https://example.com')}
        title="Getting Started"
        subheading="Docs"
      >
        <Text style={textStyle}>Tap to navigate.</Text>
      </GTCard>

      <Text style={heading}>Bordered</Text>
      <GTCard variant="bordered" title="Bordered Card">
        <Text style={textStyle}>A card with a subtle border.</Text>
      </GTCard>

      <Text style={heading}>Flat</Text>
      <GTCard variant="flat" title="Flat Card">
        <Text style={textStyle}>No background, no border.</Text>
      </GTCard>

      <Text style={heading}>Horizontal</Text>
      <GTCard
        horizontal
        title="Horizontal Layout"
        subheading="Feature"
      >
        <Text style={textStyle}>Image on the left, content on the right.</Text>
      </GTCard>

      <Text style={heading}>With footer</Text>
      <GTCard
        title="Card with Footer"
        footer={<Text style={{ color: theme.colors.primary, fontFamily: theme.typography.fontFamily.base }}>Read more</Text>}
      >
        <Text style={textStyle}>Footer is pushed to the bottom via flex.</Text>
      </GTCard>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <IconRegistryProvider registry={iconRegistry}>
        <CardDemo />
      </IconRegistryProvider>
    </GrundtoneThemeProvider>
  );
}`;
</script>

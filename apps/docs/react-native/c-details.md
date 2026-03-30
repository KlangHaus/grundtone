# Details

Interactive preview of `GTDetails` on iOS, Android, and Web.

<SnackEmbed
  name="GTDetails — Grundtone"
  :height="650"
  :code="code"
/>

<script setup>
const code = `import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { GrundtoneThemeProvider, useGrundtoneTheme, createTheme, GTDetails } from '@grundtone/react-native';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function DetailsDemo() {
  const { theme } = useGrundtoneTheme();
  const heading = { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginTop: 24, marginBottom: 8 };
  const body = { fontSize: 14, color: theme.colors.text, lineHeight: 20 };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }}>
      <Text style={heading}>Default</Text>
      <GTDetails summary="What are design tokens?">
        <Text style={body}>Design tokens are named values for colors, spacing, typography, and more.</Text>
      </GTDetails>

      <Text style={heading}>Subtle</Text>
      <GTDetails variant="subtle" summary="Read more about theming">
        <Text style={body}>Theme switching happens via CSS custom properties on web and theme context on native.</Text>
      </GTDetails>

      <Text style={heading}>Card</Text>
      <View style={{ gap: 8 }}>
        <GTDetails variant="card" summary="Do I need @grundtone/core?">
          <Text style={body}>Yes — core contains TypeScript types, theme presets, and the icon registry.</Text>
        </GTDetails>
        <GTDetails variant="card" summary="Can I use Grundtone with Expo?">
          <Text style={body}>Yes. Install @grundtone/react-native and wrap your app with the theme provider.</Text>
        </GTDetails>
      </View>

      <Text style={heading}>Open by default</Text>
      <GTDetails summary="Installation" open>
        <Text style={body}>Run: pnpm add @grundtone/react-native</Text>
      </GTDetails>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <DetailsDemo />
    </GrundtoneThemeProvider>
  );
}`;
</script>

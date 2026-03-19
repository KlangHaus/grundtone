# Accordion

Interactive preview of `GTAccordion` on iOS, Android, and Web.

<SnackEmbed
  name="GTAccordion — Grundtone"
  :height="700"
  :code="code"
/>

<script setup>
const code = `import React from 'react';
import { ScrollView, Text } from 'react-native';
import { GrundtoneThemeProvider, useGrundtoneTheme, createTheme, GTAccordion, GTAccordionItem } from '@grundtone/react-native';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function AccordionDemo() {
  const { theme } = useGrundtoneTheme();
  const heading = { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginTop: 24, marginBottom: 8 };
  const body = { fontSize: 14, color: theme.colors.text, lineHeight: 20 };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }}>
      <Text style={heading}>Default</Text>
      <GTAccordion>
        <GTAccordionItem heading="What are design tokens?">
          <Text style={body}>Named values for colors, spacing, typography, and more.</Text>
        </GTAccordionItem>
        <GTAccordionItem heading="How do I install?" summary="Quick guide">
          <Text style={body}>Run: pnpm add @grundtone/react-native</Text>
        </GTAccordionItem>
        <GTAccordionItem heading="Dark mode support?" open>
          <Text style={body}>Yes — theme switching via context provider.</Text>
        </GTAccordionItem>
      </GTAccordion>

      <Text style={heading}>Bordered</Text>
      <GTAccordion variant="bordered">
        <GTAccordionItem heading="Configuration">
          <Text style={body}>Configure via createTheme() in core.</Text>
        </GTAccordionItem>
        <GTAccordionItem heading="Icon system">
          <Text style={body}>SVG icons registered in core, used via GTIcon.</Text>
        </GTAccordionItem>
      </GTAccordion>

      <Text style={heading}>Card</Text>
      <GTAccordion variant="card">
        <GTAccordionItem heading="Vue 3">
          <Text style={body}>Full component library with Composition API.</Text>
        </GTAccordionItem>
        <GTAccordionItem heading="React Native">
          <Text style={body}>Native components with theme provider.</Text>
        </GTAccordionItem>
      </GTAccordion>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <AccordionDemo />
    </GrundtoneThemeProvider>
  );
}`;
</script>

# Tabs

Interactive preview of `GTTabs` on iOS, Android, and Web.

<SnackEmbed
  name="GTTabs — Grundtone"
  :height="650"
  :code="code"
/>

<script setup>
const code = `import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { GrundtoneThemeProvider, IconRegistryProvider, useGrundtoneTheme, createTheme, GTTabs, GTTabPanel } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function TabsDemo() {
  const { theme } = useGrundtoneTheme();
  const heading = { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginTop: 24, marginBottom: 8 };
  const body = { fontSize: 14, color: theme.colors.text, lineHeight: 20 };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }}>
      <Text style={heading}>Underline</Text>
      <GTTabs tabs={[{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Details' }, { id: 'c', label: 'History' }]}>
        <GTTabPanel id="a"><Text style={body}>Overview content here.</Text></GTTabPanel>
        <GTTabPanel id="b"><Text style={body}>Details content here.</Text></GTTabPanel>
        <GTTabPanel id="c"><Text style={body}>History content here.</Text></GTTabPanel>
      </GTTabs>

      <Text style={heading}>Segment</Text>
      <GTTabs variant="segment" tabs={[{ id: 'vue', label: 'Vue' }, { id: 'rn', label: 'React Native' }]}>
        <GTTabPanel id="vue"><Text style={body}>Vue component library.</Text></GTTabPanel>
        <GTTabPanel id="rn"><Text style={body}>Native components.</Text></GTTabPanel>
      </GTTabs>

      <Text style={heading}>Pill</Text>
      <GTTabs variant="pill" tabs={[{ id: 'all', label: 'All' }, { id: 'atoms', label: 'Atoms' }, { id: 'mols', label: 'Molecules' }]}>
        <GTTabPanel id="all"><Text style={body}>All components.</Text></GTTabPanel>
        <GTTabPanel id="atoms"><Text style={body}>Badge, Button, Input...</Text></GTTabPanel>
        <GTTabPanel id="mols"><Text style={body}>Accordion, Tabs, Card...</Text></GTTabPanel>
      </GTTabs>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <IconRegistryProvider registry={iconRegistry}>
        <TabsDemo />
      </IconRegistryProvider>
    </GrundtoneThemeProvider>
  );
}`;
</script>

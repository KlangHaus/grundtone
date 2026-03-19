# Autocomplete & Address Input

Interactive preview of `GTAutocomplete` and `GTAddressInput` on iOS, Android, and Web.

<SnackEmbed
  name="GTAutocomplete — Grundtone"
  :height="650"
  :code="code"
/>

<script setup>
const code = `import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { GrundtoneThemeProvider, useGrundtoneTheme, createTheme, GTAddressInput } from '@grundtone/react-native';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function AutocompleteDemo() {
  const { theme } = useGrundtoneTheme();
  const heading = { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginTop: 24, marginBottom: 8 };
  const [address, setAddress] = useState('');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }} keyboardShouldPersistTaps="handled">
      <Text style={heading}>Address Input (DAWA)</Text>
      <View style={{ zIndex: 20 }}>
        <GTAddressInput
          value={address}
          label="Adresse"
          placeholder="Indtast adresse..."
          onChangeText={setAddress}
          onSelect={(result) => console.log('Selected:', result.forslagstekst)}
        />
      </View>

      <Text style={heading}>Road name only</Text>
      <View style={{ zIndex: 10 }}>
        <GTAddressInput
          label="Vejnavn"
          type="vejnavn"
          placeholder="Søg vejnavn..."
        />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <AutocompleteDemo />
    </GrundtoneThemeProvider>
  );
}`;
</script>

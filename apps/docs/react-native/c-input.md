# Input

Interactive preview of `GTInput` on iOS, Android, and Web.

<SnackEmbed
  name="GTInput — Grundtone"
  :height="700"
  :code="code"
/>

<script setup>
const code = `import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { GrundtoneThemeProvider, IconRegistryProvider, useGrundtoneTheme, createTheme, GTInput } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function InputDemo() {
  const { theme } = useGrundtoneTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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
      <Text style={heading}>Sizes</Text>
      <View style={group}>
        <GTInput value={name} onChangeText={setName} size="sm" placeholder="Small input" />
        <GTInput value={name} onChangeText={setName} size="md" placeholder="Medium input" />
        <GTInput value={name} onChangeText={setName} size="lg" placeholder="Large input" />
      </View>

      <Text style={heading}>With label &amp; help</Text>
      <View style={group}>
        <GTInput
          value={name}
          onChangeText={setName}
          label="Full name"
          placeholder="John Doe"
          helpText="Enter your full legal name"
          required
        />
        <GTInput
          value={email}
          onChangeText={setEmail}
          type="email"
          label="Email"
          placeholder="john@example.com"
        />
      </View>

      <Text style={heading}>States</Text>
      <View style={group}>
        <GTInput label="Disabled" disabled value="Cannot edit" />
        <GTInput label="Readonly" readonly value="Read only value" />
        <GTInput
          value={error}
          onChangeText={setError}
          label="With error"
          errorText="This field is required"
          placeholder="Type something..."
        />
      </View>

      <Text style={heading}>Prefix &amp; suffix</Text>
      <View style={group}>
        <GTInput label="Amount" prefix="kr." placeholder="0,00" helpText="Enter amount in DKK" />
        <GTInput label="Weight" suffix="kg" placeholder="0" type="number" />
      </View>

      <Text style={heading}>Input types</Text>
      <View style={group}>
        <GTInput type="password" label="Password" placeholder="Enter password" />
        <GTInput type="search" label="Search" placeholder="Search..." />
        <GTInput type="number" label="Amount" placeholder="0" />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <IconRegistryProvider registry={iconRegistry}>
        <InputDemo />
      </IconRegistryProvider>
    </GrundtoneThemeProvider>
  );
}`;
</script>

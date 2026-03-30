# Alert

Interactive preview of `GTAlert` on iOS, Android, and Web.

<SnackEmbed
  name="GTAlert — Grundtone"
  :height="700"
  :code="code"
/>

<script setup>
const code = `import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { GrundtoneThemeProvider, IconRegistryProvider, useGrundtoneTheme, createTheme, GTAlert, GTButton } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function AlertDemo() {
  const { theme } = useGrundtoneTheme();
  const [show, setShow] = useState(true);
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
      <Text style={heading}>Info</Text>
      <GTAlert variant="info" icon="info-circle">
        <Text style={textStyle}>This is an informational message.</Text>
      </GTAlert>

      <Text style={heading}>Success</Text>
      <GTAlert variant="success" icon="check-circle">
        <Text style={textStyle}>Your changes have been saved.</Text>
      </GTAlert>

      <Text style={heading}>Warning with heading</Text>
      <GTAlert variant="warning" icon="alert-triangle" heading="Attention">
        <Text style={textStyle}>Your session will expire in 5 minutes.</Text>
      </GTAlert>

      <Text style={heading}>Error with heading</Text>
      <GTAlert variant="error" icon="alert-circle" heading="Form errors">
        <Text style={textStyle}>Please fix the errors before submitting.</Text>
      </GTAlert>

      <Text style={heading}>With footer</Text>
      <GTAlert
        variant="error"
        icon="alert-circle"
        heading="2 errors"
        footer={<Text style={textStyle}>Fix the errors and try again.</Text>}
      >
        <Text style={textStyle}>Name is required. Email is not valid.</Text>
      </GTAlert>

      <Text style={heading}>Dismissible</Text>
      {show ? (
        <GTAlert variant="info" icon="info-circle" dismissible onDismiss={() => setShow(false)}>
          <Text style={textStyle}>This alert can be dismissed.</Text>
        </GTAlert>
      ) : (
        <GTButton variant="outlined" onPress={() => setShow(true)}>Show again</GTButton>
      )}
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <IconRegistryProvider registry={iconRegistry}>
        <AlertDemo />
      </IconRegistryProvider>
    </GrundtoneThemeProvider>
  );
}`;
</script>

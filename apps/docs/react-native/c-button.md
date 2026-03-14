# Button

Interactive preview of `GTButton` on iOS, Android, and Web.

<SnackEmbed
  name="GTButton — Grundtone"
  :height="700"
  :code="code"
/>

<script setup>
const code = `import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { GrundtoneThemeProvider, IconRegistryProvider, useGrundtoneTheme, createTheme, GTButton, GTIcon } from '@grundtone/react-native';
import { iconRegistry } from '@grundtone/icons';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

function ButtonDemo() {
  const { theme } = useGrundtoneTheme();
  const [isLoading, setIsLoading] = useState(false);
  const rem = (v) => parseFloat(v) * 16;

  const heading = {
    fontSize: rem(theme.typography.fontSize.lg),
    fontWeight: '600',
    marginTop: rem(theme.spacing.lg),
    marginBottom: rem(theme.spacing.sm),
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
  };

  const row = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rem(theme.spacing.xs),
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: rem(theme.spacing.md) }}
    >
      <Text style={heading}>Variants</Text>
      <View style={row}>
        <GTButton variant="primary" onPress={() => {}}>Primary</GTButton>
        <GTButton variant="secondary" onPress={() => {}}>Secondary</GTButton>
        <GTButton variant="outlined" onPress={() => {}}>Outlined</GTButton>
        <GTButton variant="negative" onPress={() => {}}>Negative</GTButton>
        <GTButton variant="unstyled" onPress={() => {}}>Unstyled</GTButton>
      </View>

      <Text style={heading}>Sizes</Text>
      <View style={row}>
        <GTButton size="sm" onPress={() => {}}>Small</GTButton>
        <GTButton size="md" onPress={() => {}}>Medium</GTButton>
        <GTButton size="lg" onPress={() => {}}>Large</GTButton>
      </View>

      <Text style={heading}>Rounded</Text>
      <View style={row}>
        <GTButton rounded="none" onPress={() => {}}>none</GTButton>
        <GTButton rounded="sm" onPress={() => {}}>sm</GTButton>
        <GTButton onPress={() => {}}>md</GTButton>
        <GTButton rounded="lg" onPress={() => {}}>lg</GTButton>
        <GTButton rounded="full" onPress={() => {}}>full</GTButton>
      </View>

      <Text style={heading}>States</Text>
      <View style={{ gap: rem(theme.spacing.xs) }}>
        <GTButton disabled onPress={() => {}}>Disabled</GTButton>
        <GTButton
          loading={isLoading}
          onPress={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 2000);
          }}
        >
          {isLoading ? 'Saving...' : 'Click to load'}
        </GTButton>
        <GTButton block onPress={() => {}}>Block (full width)</GTButton>
      </View>

      <Text style={heading}>With icon</Text>
      <View style={row}>
        <GTButton variant="primary" onPress={() => {}}>
          <GTIcon name="check" size="sm" color={theme.colors.onPrimary} />
          <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.typography.fontFamily.base }}>
            Confirm
          </Text>
        </GTButton>
        <GTButton variant="negative" onPress={() => {}}>
          <GTIcon name="close" size="sm" color={theme.colors.onPrimary} />
          <Text style={{ color: theme.colors.onPrimary, fontFamily: theme.typography.fontFamily.base }}>
            Delete
          </Text>
        </GTButton>
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <IconRegistryProvider registry={iconRegistry}>
        <ButtonDemo />
      </IconRegistryProvider>
    </GrundtoneThemeProvider>
  );
}`;
</script>

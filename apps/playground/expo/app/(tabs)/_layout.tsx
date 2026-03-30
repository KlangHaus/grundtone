import { Tabs } from 'expo-router';
import { GTIcon, useGrundtoneTheme } from '@grundtone/react-native';

export default function TabLayout() {
  const { theme } = useGrundtoneTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Components',
          tabBarIcon: ({ color }) => (
            <GTIcon name="check" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="icons"
        options={{
          title: 'Icons',
          tabBarIcon: ({ color }) => (
            <GTIcon name="search" size="md" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

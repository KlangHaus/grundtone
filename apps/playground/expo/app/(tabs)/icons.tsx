import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { GTIcon, useGrundtoneTheme } from '@grundtone/react-native';
import { iconRegistry, iconCategories } from '@grundtone/core';

type IconName = keyof typeof iconRegistry;

export default function IconsScreen() {
  const { theme } = useGrundtoneTheme();
  const allIcons = Object.keys(iconRegistry) as IconName[];

  const grouped = iconCategories.reduce<Record<string, IconName[]>>(
    (acc, cat) => {
      acc[cat] = allIcons.filter(name => iconRegistry[name].category === cat);
      return acc;
    },
    {},
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Icons
      </Text>

      {Object.entries(grouped).map(([category, icons]) => (
        <View key={category}>
          <Text
            style={[
              styles.heading,
              {
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.base,
              },
            ]}
          >
            {category} ({icons.length})
          </Text>
          <View style={styles.iconGrid}>
            {icons.map(name => (
              <View key={name} style={styles.iconCard}>
                <GTIcon name={name} size="lg" color={theme.colors.text} />
                <Text
                  style={[
                    styles.iconLabel,
                    {
                      color: theme.colors.textSecondary,
                      fontFamily: theme.typography.fontFamily.mono,
                    },
                  ]}
                >
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Icon colors
      </Text>
      <View style={styles.row}>
        <GTIcon name="check" size="lg" color={theme.colors.primary} />
        <GTIcon name="close" size="lg" color={theme.colors.error} />
        <GTIcon name="search" size="lg" color={theme.colors.success} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconCard: {
    alignItems: 'center',
    gap: 4,
    padding: 12,
    minWidth: 80,
  },
  iconLabel: {
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});

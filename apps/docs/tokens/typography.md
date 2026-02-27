<script setup>
const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
};

const fontWeights = {
  thin: '100',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

const lineHeights = {
  none: '1',
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.75',
  loose: '2',
};

const fontFamilies = {
  sans: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, monospace',
};
</script>

# Typography

Typography tokens define the font families, sizes, weights, and line heights used throughout the
design system.

## Font Families

<div style="margin-top: 1.5rem;">
  <div style="margin-bottom: 2rem;">
    <div style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
      <div style="margin-bottom: 0.5rem; font-weight: 600; color: #666; font-size: 0.875rem;">Sans-serif (Default)</div>
      <div :style="{ fontFamily: fontFamilies.sans, fontSize: '1.5rem' }">
        The quick brown fox jumps over the lazy dog
      </div>
      <div style="margin-top: 0.5rem; font-family: monospace; color: #666; font-size: 0.875rem;">
        {{ fontFamilies.sans }}
      </div>
    </div>
  </div>

  <div>
    <div style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
      <div style="margin-bottom: 0.5rem; font-weight: 600; color: #666; font-size: 0.875rem;">Monospace</div>
      <div :style="{ fontFamily: fontFamilies.mono, fontSize: '1.5rem' }">
        The quick brown fox jumps over the lazy dog
      </div>
      <div style="margin-top: 0.5rem; font-family: monospace; color: #666; font-size: 0.875rem;">
        {{ fontFamilies.mono }}
      </div>
    </div>
  </div>
</div>

## Font Sizes

Typography scale from extra small to extra large.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(size, name) in fontSizes"
    :key="name"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 80px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ size }}</div>
    </div>
    <div :style="{ fontSize: size, flex: 1 }">
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
</div>

## Font Weights

Available font weights for emphasis and hierarchy.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(weight, name) in fontWeights"
    :key="name"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 120px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ weight }}</div>
    </div>
    <div :style="{ fontWeight: weight, fontSize: '1.25rem', flex: 1 }">
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
</div>

## Line Heights

Line height tokens for controlling text spacing.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(height, name) in lineHeights"
    :key="name"
    style="padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="margin-bottom: 0.5rem;">
      <strong>{{ name }}</strong>
      <span style="margin-left: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #666;">{{ height }}</span>
    </div>
    <div :style="{ lineHeight: height, fontSize: '1rem' }">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </div>
  </div>
</div>

## Typography Scale Preview

Complete typography scale with different combinations.

<div style="margin-top: 1.5rem; padding: 2rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.25;">
    Heading 1
  </h1>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 5xl (3rem) · Weight: bold (700) · Line height: tight (1.25)</p>

  <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.25;">
    Heading 2
  </h2>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 4xl (2.25rem) · Weight: bold (700) · Line height: tight (1.25)</p>

  <h3 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.25;">
    Heading 3
  </h3>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 3xl (1.875rem) · Weight: semibold (600) · Line height: tight (1.25)</p>

  <h4 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.5;">
    Heading 4
  </h4>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 2xl (1.5rem) · Weight: semibold (600) · Line height: normal (1.5)</p>

  <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 1rem;">
    Body text: This is standard body text using the base font size with normal line height. It's designed for optimal readability across different devices and screen sizes.
  </p>
  <p style="color: #666; margin-bottom: 2rem;">Font size: base (1rem) · Weight: normal (400) · Line height: normal (1.5)</p>

  <p style="font-size: 0.875rem; color: #666; line-height: 1.5;">
    Small text: This is smaller text typically used for captions, labels, or supplementary information.
  </p>
  <p style="color: #999; margin-bottom: 2rem; font-size: 0.75rem;">Font size: sm (0.875rem) · Weight: normal (400) · Line height: normal (1.5)</p>
</div>

## Platform-Specifik Usage

**Typography tokens er platform-uafhængige** - font sizes, weights, line heights kan bruges i web,
iOS, Android og React Native.

### Web (HTML/CSS/SCSS)

```scss
@use '@grundtone/design-tokens' as tokens;

// Headings
h1,
.h1 {
  font-size: tokens.font-size('5xl'); // 3rem (48px)
  font-weight: tokens.font-weight('bold'); // 700
  line-height: tokens.line-height('tight'); // 1.25
  letter-spacing: tokens.letter-spacing('tight'); // -0.025em
}

h2,
.h2 {
  font-size: tokens.font-size('4xl'); // 2.25rem (36px)
  font-weight: tokens.font-weight('bold');
  line-height: tokens.line-height('tight');
}

// Body text
p,
.body {
  font-size: tokens.font-size('base'); // 1rem (16px)
  line-height: tokens.line-height('relaxed'); // 1.625
  font-weight: tokens.font-weight('normal'); // 400
}

// Small text
.text-sm {
  font-size: tokens.font-size('sm'); // 0.875rem (14px)
  line-height: tokens.line-height('normal');
}
```

```html
<!-- HTML med utility klasser (KUN web) -->
<h1 class="text-5xl font-bold leading-tight">Main Heading</h1>
<p class="text-base leading-relaxed font-normal">Body text</p>
<span class="text-sm text-gray-600">Small metadata text</span>
```

### iOS (Swift/SwiftUI)

```swift
// Typography.swift - Design token constants
import SwiftUI

struct Typography {
    // Font sizes (in points)
    struct FontSize {
        static let xs: CGFloat = 12       // 0.75rem
        static let sm: CGFloat = 14       // 0.875rem
        static let base: CGFloat = 16     // 1rem
        static let lg: CGFloat = 18       // 1.125rem
        static let xl: CGFloat = 20       // 1.25rem
        static let xl2: CGFloat = 24      // 1.5rem
        static let xl3: CGFloat = 30      // 1.875rem
        static let xl4: CGFloat = 36      // 2.25rem
        static let xl5: CGFloat = 48      // 3rem
    }

    // Font weights
    struct FontWeight {
        static let light: Font.Weight = .light        // 300
        static let normal: Font.Weight = .regular     // 400
        static let medium: Font.Weight = .medium      // 500
        static let semibold: Font.Weight = .semibold  // 600
        static let bold: Font.Weight = .bold          // 700
        static let black: Font.Weight = .black        // 900
    }

    // Line heights (as multipliers)
    struct LineSpacing {
        static let tight: CGFloat = 0.25      // 1.25 (tight)
        static let normal: CGFloat = 0.5      // 1.5 (normal)
        static let relaxed: CGFloat = 0.625   // 1.625 (relaxed)
        static let loose: CGFloat = 0.75      // 1.75 (loose)
    }
}

// Typography helpers
extension Font {
    static func heading1() -> Font {
        .system(size: Typography.FontSize.xl5, weight: Typography.FontWeight.bold)
    }

    static func heading2() -> Font {
        .system(size: Typography.FontSize.xl4, weight: Typography.FontWeight.bold)
    }

    static func heading3() -> Font {
        .system(size: Typography.FontSize.xl3, weight: Typography.FontWeight.semibold)
    }

    static func body() -> Font {
        .system(size: Typography.FontSize.base, weight: Typography.FontWeight.normal)
    }

    static func bodySmall() -> Font {
        .system(size: Typography.FontSize.sm, weight: Typography.FontWeight.normal)
    }
}
```

**Brug i SwiftUI:**

```swift
// Headings
struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Main Heading")
                .font(.heading1())
                .lineSpacing(Typography.LineSpacing.tight)

            Text("Subheading")
                .font(.heading2())
                .lineSpacing(Typography.LineSpacing.tight)

            Text("This is body text with relaxed line height for better readability.")
                .font(.body())
                .lineSpacing(Typography.LineSpacing.relaxed)

            Text("Small metadata text")
                .font(.bodySmall())
                .foregroundColor(.gray600)
        }
        .padding()
    }
}

// Custom text styles
extension Text {
    func headingStyle() -> some View {
        self
            .font(.system(size: Typography.FontSize.xl3))
            .fontWeight(Typography.FontWeight.bold)
            .lineSpacing(Typography.LineSpacing.tight)
    }

    func captionStyle() -> some View {
        self
            .font(.system(size: Typography.FontSize.xs))
            .fontWeight(Typography.FontWeight.normal)
            .foregroundColor(.gray600)
    }
}
```

### Android (Kotlin/Jetpack Compose)

```kotlin
// Typography.kt - Design token constants
package com.grundtone.ui.theme

import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

object Typography {
    // Font sizes
    object FontSize {
        val xs = 12.sp        // 0.75rem
        val sm = 14.sp        // 0.875rem
        val base = 16.sp      // 1rem
        val lg = 18.sp        // 1.125rem
        val xl = 20.sp        // 1.25rem
        val xl2 = 24.sp       // 1.5rem
        val xl3 = 30.sp       // 1.875rem
        val xl4 = 36.sp       // 2.25rem
        val xl5 = 48.sp       // 3rem
    }

    // Font weights
    object Weight {
        val light = FontWeight.Light        // 300
        val normal = FontWeight.Normal      // 400
        val medium = FontWeight.Medium      // 500
        val semibold = FontWeight.SemiBold  // 600
        val bold = FontWeight.Bold          // 700
        val black = FontWeight.Black        // 900
    }

    // Line heights (as multipliers)
    object LineHeight {
        const val tight = 1.25f
        const val normal = 1.5f
        const val relaxed = 1.625f
        const val loose = 1.75f
    }
}
```

**Brug i Jetpack Compose:**

```kotlin
import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.em

// Define Material 3 typography
val AppTypography = Typography(
    displayLarge = TextStyle(
        fontSize = Typography.FontSize.xl5,
        fontWeight = Typography.Weight.bold,
        lineHeight = Typography.FontSize.xl5 * Typography.LineHeight.tight
    ),
    displayMedium = TextStyle(
        fontSize = Typography.FontSize.xl4,
        fontWeight = Typography.Weight.bold,
        lineHeight = Typography.FontSize.xl4 * Typography.LineHeight.tight
    ),
    headlineLarge = TextStyle(
        fontSize = Typography.FontSize.xl3,
        fontWeight = Typography.Weight.semibold,
        lineHeight = Typography.FontSize.xl3 * Typography.LineHeight.tight
    ),
    bodyLarge = TextStyle(
        fontSize = Typography.FontSize.base,
        fontWeight = Typography.Weight.normal,
        lineHeight = Typography.FontSize.base * Typography.LineHeight.relaxed
    ),
    bodyMedium = TextStyle(
        fontSize = Typography.FontSize.sm,
        fontWeight = Typography.Weight.normal,
        lineHeight = Typography.FontSize.sm * Typography.LineHeight.normal
    ),
    labelSmall = TextStyle(
        fontSize = Typography.FontSize.xs,
        fontWeight = Typography.Weight.normal,
        lineHeight = Typography.FontSize.xs * Typography.LineHeight.normal
    )
)

// Usage in composables
@Composable
fun ContentScreen() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "Main Heading",
            style = MaterialTheme.typography.displayLarge
        )

        Text(
            text = "Subheading",
            style = MaterialTheme.typography.displayMedium
        )

        Text(
            text = "This is body text with relaxed line height for better readability.",
            style = MaterialTheme.typography.bodyLarge
        )

        Text(
            text = "Small metadata text",
            style = MaterialTheme.typography.bodyMedium,
            color = Colors.gray600
        )
    }
}

// Custom text styles
@Composable
fun CustomTextStyles() {
    Text(
        text = "Custom heading",
        fontSize = Typography.FontSize.xl3,
        fontWeight = Typography.Weight.bold,
        lineHeight = Typography.FontSize.xl3 * Typography.LineHeight.tight
    )

    Text(
        text = "Caption text",
        fontSize = Typography.FontSize.xs,
        fontWeight = Typography.Weight.normal,
        color = Colors.gray600
    )
}
```

### React Native (TypeScript)

```typescript
// typography.ts - Design token constants
import { TextStyle } from 'react-native';

export const typography = {
  fontSize: {
    xs: 12, // 0.75rem
    sm: 14, // 0.875rem
    base: 16, // 1rem
    lg: 18, // 1.125rem
    xl: 20, // 1.25rem
    xl2: 24, // 1.5rem
    xl3: 30, // 1.875rem
    xl4: 36, // 2.25rem
    xl5: 48, // 3rem
  },
  fontWeight: {
    light: '300' as TextStyle['fontWeight'],
    normal: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
    black: '900' as TextStyle['fontWeight'],
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },
} as const;
```

**Brug i React Native:**

```typescript
import { Text, StyleSheet } from 'react-native';
import { typography } from './tokens/typography';
import { colors } from './tokens/colors';

// Heading components
const Heading1 = ({ children }) => (
  <Text style={styles.h1}>{children}</Text>
);

const Heading2 = ({ children }) => (
  <Text style={styles.h2}>{children}</Text>
);

const BodyText = ({ children }) => (
  <Text style={styles.body}>{children}</Text>
);

const CaptionText = ({ children }) => (
  <Text style={styles.caption}>{children}</Text>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize.xl5,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize.xl5 * typography.lineHeight.tight,
    color: colors.gray[900],
  },
  h2: {
    fontSize: typography.fontSize.xl4,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize.xl4 * typography.lineHeight.tight,
    color: colors.gray[900],
  },
  h3: {
    fontSize: typography.fontSize.xl3,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.xl3 * typography.lineHeight.tight,
    color: colors.gray[900],
  },
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    color: colors.gray[700],
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.gray[700],
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    color: colors.gray[600],
  },
});

// Usage example
const ContentScreen = () => (
  <View style={{ padding: 16 }}>
    <Heading1>Main Heading</Heading1>
    <Heading2>Subheading</Heading2>
    <BodyText>
      This is body text with relaxed line height for better readability.
    </BodyText>
    <CaptionText>Small metadata text</CaptionText>
  </View>
);
```

### Platform Sammenligning

| Feature                | Web (SCSS/CSS)                   | iOS (SwiftUI)            | Android (Compose)        | React Native                 |
| ---------------------- | -------------------------------- | ------------------------ | ------------------------ | ---------------------------- |
| **Font size format**   | `rem` / `px`                     | `CGFloat` (points)       | `sp` (scale pixels)      | `number` (points)            |
| **Font weight format** | `300-900` number                 | `Font.Weight`            | `FontWeight`             | `'300'-'900'` string         |
| **Line height format** | Multiplier (1.5)                 | Spacing (points)         | Multiplier (1.5f)        | Multiplier (1.5)             |
| **Import**             | `@use 'tokens'`                  | `import Typography`      | `import Typography`      | `import { typography }`      |
| **Font size brug**     | `tokens.font-size('xl')`         | `Typography.FontSize.xl` | `Typography.FontSize.xl` | `typography.fontSize.xl`     |
| **Utility klasser**    | ✅ Ja (`.text-xl`, `.font-bold`) | ❌ Nej                   | ❌ Nej                   | ❌ Nej                       |
| **Custom fonts**       | ✅ @font-face                    | ✅ Font assets           | ✅ Font resources        | ✅ react-native-vector-icons |

::: tip Vigtig Note **Typography tokens** (sizes, weights, line heights) kan bruges på alle
platforme, men **utility klasser** som `.text-xl` eller `.font-bold` kan kun bruges i web
(HTML/CSS).

Native apps skal definere deres egne TextStyle/Font systemer med typography token værdierne. :::

## Hvordan Bruger Man Typography

### Heading Hierarki

**Complete Heading System**

```scss
@use '@grundtone/design-tokens' as tokens;

h1,
.h1 {
  font-size: tokens.font-size('5xl'); // 3rem
  font-weight: tokens.font-weight('bold'); // 700
  line-height: tokens.line-height('tight'); // 1.25
  color: tokens.getColor('gray', 900);
  margin-bottom: tokens.spacing(6);

  @include tokens.respond-to('md') {
    font-size: tokens.font-size('6xl'); // Even larger on desktop
  }
}

h2,
.h2 {
  font-size: tokens.font-size('4xl'); // 2.25rem
  font-weight: tokens.font-weight('bold');
  line-height: tokens.line-height('tight');
  color: tokens.getColor('gray', 900);
  margin-bottom: tokens.spacing(4);
}

h3,
.h3 {
  font-size: tokens.font-size('3xl'); // 1.875rem
  font-weight: tokens.font-weight('semibold'); // 600
  line-height: tokens.line-height('tight');
  color: tokens.getColor('gray', 800);
  margin-bottom: tokens.spacing(3);
}

h4,
.h4 {
  font-size: tokens.font-size('2xl'); // 1.5rem
  font-weight: tokens.font-weight('semibold');
  line-height: tokens.line-height('normal'); // 1.5
  color: tokens.getColor('gray', 800);
  margin-bottom: tokens.spacing(3);
}

h5,
.h5 {
  font-size: tokens.font-size('xl'); // 1.25rem
  font-weight: tokens.font-weight('semibold');
  line-height: tokens.line-height('normal');
  color: tokens.getColor('gray', 700);
  margin-bottom: tokens.spacing(2);
}

h6,
.h6 {
  font-size: tokens.font-size('lg'); // 1.125rem
  font-weight: tokens.font-weight('semibold');
  line-height: tokens.line-height('normal');
  color: tokens.getColor('gray', 700);
  margin-bottom: tokens.spacing(2);
}
```

### Body Text & Paragraphs

```scss
// Base body text
body {
  font-family: tokens.font-family('sans');
  font-size: tokens.font-size('base'); // 1rem
  font-weight: tokens.font-weight('normal'); // 400
  line-height: tokens.line-height('normal'); // 1.5
  color: tokens.getColor('gray', 900);
}

// Paragraphs
p {
  margin-bottom: tokens.spacing(4); // 1rem between paragraphs

  &:last-child {
    margin-bottom: 0;
  }

  // Lead paragraph (introductory text)
  &.lead {
    font-size: tokens.font-size('lg'); // 1.125rem
    line-height: tokens.line-height('relaxed'); // 1.75
    color: tokens.getColor('gray', 700);
  }

  // Small text
  &.small {
    font-size: tokens.font-size('sm'); // 0.875rem
    color: tokens.getColor('gray', 600);
  }
}
```

### Text Styles & Utilities

```scss
// Text sizes
.text-xs {
  font-size: tokens.font-size('xs');
} // 0.75rem
.text-sm {
  font-size: tokens.font-size('sm');
} // 0.875rem
.text-base {
  font-size: tokens.font-size('base');
} // 1rem
.text-lg {
  font-size: tokens.font-size('lg');
} // 1.125rem
.text-xl {
  font-size: tokens.font-size('xl');
} // 1.25rem
.text-2xl {
  font-size: tokens.font-size('2xl');
} // 1.5rem

// Font weights
.font-light {
  font-weight: tokens.font-weight('light');
} // 300
.font-normal {
  font-weight: tokens.font-weight('normal');
} // 400
.font-medium {
  font-weight: tokens.font-weight('medium');
} // 500
.font-semibold {
  font-weight: tokens.font-weight('semibold');
} // 600
.font-bold {
  font-weight: tokens.font-weight('bold');
} // 700

// Line heights
.leading-tight {
  line-height: tokens.line-height('tight');
} // 1.25
.leading-normal {
  line-height: tokens.line-height('normal');
} // 1.5
.leading-relaxed {
  line-height: tokens.line-height('relaxed');
} // 1.75
.leading-loose {
  line-height: tokens.line-height('loose');
} // 2

// Text colors
.text-primary {
  color: tokens.getColor('gray', 900);
}
.text-secondary {
  color: tokens.getColor('gray', 700);
}
.text-muted {
  color: tokens.getColor('gray', 600);
}
.text-disabled {
  color: tokens.getColor('gray', 400);
}
```

### Praktiske Komponenter

**Article/Blog Content**

```scss
.article {
  max-width: 65ch; // Optimal reading width

  h1 {
    font-size: tokens.font-size('4xl');
    font-weight: tokens.font-weight('bold');
    line-height: tokens.line-height('tight');
    margin-bottom: tokens.spacing(4);
  }

  h2 {
    font-size: tokens.font-size('3xl');
    font-weight: tokens.font-weight('semibold');
    margin-top: tokens.spacing(12);
    margin-bottom: tokens.spacing(4);
  }

  h3 {
    font-size: tokens.font-size('2xl');
    font-weight: tokens.font-weight('semibold');
    margin-top: tokens.spacing(8);
    margin-bottom: tokens.spacing(3);
  }

  p {
    font-size: tokens.font-size('lg');
    line-height: tokens.line-height('relaxed'); // 1.75 for readability
    color: tokens.getColor('gray', 700);
    margin-bottom: tokens.spacing(6);
  }

  ul,
  ol {
    margin-bottom: tokens.spacing(6);
    padding-left: tokens.spacing(6);

    li {
      margin-bottom: tokens.spacing(2);
      line-height: tokens.line-height('relaxed');
    }
  }

  code {
    font-family: tokens.font-family('mono');
    font-size: tokens.font-size('sm');
    background-color: tokens.getColor('gray', 100);
    padding: tokens.spacing(1) tokens.spacing(2);
    border-radius: tokens.radius('sm');
  }
}
```

**Form Labels & Helpers**

```scss
.form-label {
  display: block;
  font-size: tokens.font-size('sm'); // 0.875rem
  font-weight: tokens.font-weight('semibold'); // 600
  color: tokens.getColor('gray', 700);
  margin-bottom: tokens.spacing(2);

  // Required indicator
  &.required::after {
    content: ' *';
    color: tokens.getColor('red', 600);
  }
}

.form-helper {
  font-size: tokens.font-size('sm');
  color: tokens.getColor('gray', 600);
  margin-top: tokens.spacing(1);
  line-height: tokens.line-height('normal');
}

.form-error {
  font-size: tokens.font-size('sm');
  font-weight: tokens.font-weight('medium');
  color: tokens.getColor('red', 600);
  margin-top: tokens.spacing(1);
}
```

**Button Typography**

```scss
.button {
  font-family: inherit;
  font-weight: tokens.font-weight('semibold');
  line-height: tokens.line-height('none'); // 1 for buttons

  &.button-sm {
    font-size: tokens.font-size('sm');
  }

  &.button-md {
    font-size: tokens.font-size('base');
  }

  &.button-lg {
    font-size: tokens.font-size('lg');
  }
}
```

**Card Typography**

```scss
.card {
  .card-title {
    font-size: tokens.font-size('xl'); // 1.25rem
    font-weight: tokens.font-weight('semibold');
    color: tokens.getColor('gray', 900);
    line-height: tokens.line-height('tight');
    margin-bottom: tokens.spacing(2);
  }

  .card-subtitle {
    font-size: tokens.font-size('sm');
    font-weight: tokens.font-weight('medium');
    color: tokens.getColor('gray', 600);
    margin-bottom: tokens.spacing(4);
  }

  .card-body {
    font-size: tokens.font-size('base');
    line-height: tokens.line-height('normal');
    color: tokens.getColor('gray', 700);
  }

  .card-meta {
    font-size: tokens.font-size('xs');
    color: tokens.getColor('gray', 500);
    margin-top: tokens.spacing(3);
  }
}
```

### Responsive Typography

```scss
// Fluid typography that scales with viewport
.hero-title {
  // Mobile
  font-size: tokens.font-size('3xl'); // 1.875rem
  font-weight: tokens.font-weight('extrabold');
  line-height: tokens.line-height('tight');

  // Tablet
  @include tokens.respond-to('md') {
    font-size: tokens.font-size('5xl'); // 3rem
  }

  // Desktop
  @include tokens.respond-to('lg') {
    font-size: 4rem; // Custom large size
    letter-spacing: -0.02em; // Tighten for large text
  }
}

// Body text responsive
.article-body {
  font-size: tokens.font-size('base'); // 1rem on mobile

  @include tokens.respond-to('md') {
    font-size: tokens.font-size('lg'); // 1.125rem on tablet+
    line-height: tokens.line-height('relaxed');
  }
}
```

## Grundlæggende Usage

### TypeScript

```typescript
import { typography } from '@grundtone/design-tokens';

// Font families
const baseFont = typography.fontFamily.sans;
// ['Inter', 'system-ui', '-apple-system', 'sans-serif']

// Font sizes
const largeFontSize = typography.fontSize.lg; // '1.125rem'

// Font weights
const boldWeight = typography.fontWeight.bold; // '700'

// Line heights
const normalLineHeight = typography.lineHeight.normal; // 1.5
```

### SCSS

```scss
@use '@grundtone/design-tokens' as tokens;

.heading {
  font-size: tokens.font-size('2xl');
  font-weight: tokens.font-weight('bold');
  line-height: tokens.line-height('tight');
}
```

### CSS Variables

```css
.heading {
  font-family: var(--grundtone-font-family-base);
  font-size: var(--grundtone-font-size-2xl);
  font-weight: var(--grundtone-font-weight-bold);
  line-height: var(--grundtone-line-height-tight);
}
```

## Best Practices

::: tip Do

- Use the typography scale consistently across your application
- Choose line heights based on text length (tight for headings, relaxed for body text)
- Use font weights to create hierarchy (bold for headings, normal for body)
- Pair font sizes with appropriate line heights :::

::: warning Don't

- Mix too many font sizes in a single view
- Use very small font sizes (< 14px) for body text
- Forget to consider line height when changing font size
- Use font weights that aren't part of the scale :::

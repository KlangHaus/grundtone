<script setup>
const shadows = {
  none: 'none',
  subtle: '0 1px 3px rgba(0, 0, 0, 0.1)',
  light: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
  large: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
  'extra-large': '0 16px 32px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
};

const componentShadows = {
  card: { shadow: '0 2px 4px rgba(0, 0, 0, 0.1)', description: 'Cards, panels, containers' },
  modal: { shadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)', description: 'Modal dialogs, overlays' },
  dropdown: { shadow: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)', description: 'Dropdown menus, popovers' },
  tooltip: { shadow: '0 2px 4px rgba(0, 0, 0, 0.1)', description: 'Tooltips, hints' },
};
</script>

# Shadows

Shadow tokens provide depth and elevation to UI elements. The shadow system helps establish visual
hierarchy and improve usability by making interactive elements more prominent.

## Shadow Levels

<div style="display: grid; gap: 2rem; margin-top: 1.5rem;">
  <div
    v-for="(shadow, name) in shadows"
    :key="name"
    style="background: white; border-radius: 8px; overflow: hidden;"
  >
    <div style="padding: 1rem; border-bottom: 1px solid #e5e7eb;">
      <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ shadow }}</div>
    </div>
    <div style="padding: 2rem; background: #f9fafb; display: flex; justify-content: center; align-items: center; min-height: 200px;">
      <div
        :style="{
          width: '200px',
          height: '120px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          color: '#666'
        }"
      >
        {{ name }}
      </div>
    </div>
  </div>
</div>

## Component-Specific Shadows

Pre-defined shadow combinations optimized for common UI components.

<div style="display: grid; gap: 1.5rem; margin-top: 1.5rem;">
  <div
    v-for="(config, name) in componentShadows"
    :key="name"
    style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;"
  >
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
      <div>
        <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
        <div style="color: #666; font-size: 0.875rem;">{{ config.description }}</div>
      </div>
    </div>
    <div style="padding: 2rem; background: #f9fafb; border-radius: 8px; display: flex; justify-content: center; align-items: center;">
      <div
        :style="{
          width: '180px',
          height: '100px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: config.shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          color: '#666'
        }"
      >
        {{ name }}
      </div>
    </div>
    <div style="margin-top: 1rem; font-family: monospace; font-size: 0.875rem; color: #666; padding: 0.75rem; background: #f9fafb; border-radius: 4px; overflow-x: auto;">
      {{ config.shadow }}
    </div>
  </div>
</div>

## Interactive Comparison

Hover over cards to see shadow transitions.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 8px;">
  <div
    v-for="(shadow, name) in { light: shadows.light, medium: shadows.medium, large: shadows.large }"
    :key="name"
    :style="{
      background: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: shadows.light,
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center'
    }"
    @mouseenter="(e) => {
      e.currentTarget.style.boxShadow = shadow;
      e.currentTarget.style.transform = 'translateY(-4px)';
    }"
    @mouseleave="(e) => {
      e.currentTarget.style.boxShadow = shadows.light;
      e.currentTarget.style.transform = 'translateY(0)';
    }"
  >
    <div style="font-weight: 600; margin-bottom: 0.5rem; text-transform: capitalize;">{{ name }}</div>
    <div style="color: #666; font-size: 0.875rem;">Hover me</div>
  </div>
</div>

## Elevation Levels

Visual guide showing how different shadow levels create depth perception.

<div style="margin-top: 1.5rem; padding: 2rem; background: linear-gradient(to bottom, #f9fafb, #e5e7eb); border-radius: 8px;">
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
    <div
      v-for="(shadow, name) in { subtle: shadows.subtle, light: shadows.light, medium: shadows.medium, large: shadows.large, 'extra-large': shadows['extra-large'] }"
      :key="name"
      :style="{
        width: '250px',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: shadow,
        textAlign: 'center',
        transform: name === 'extra-large' ? 'scale(1.05)' : name === 'large' ? 'scale(1.03)' : name === 'medium' ? 'scale(1.02)' : 'scale(1)'
      }"
    >
      <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
      <div style="color: #666; font-size: 0.875rem;">Elevation level</div>
    </div>
  </div>
</div>

## Usage Guidelines

### When to Use Each Shadow

::: tip Shadow Selection

- **None**: Flush elements, inline components
- **Subtle**: Slight elevation, hover states on flat elements
- **Light**: Cards, panels, default containers
- **Medium**: Dropdown menus, tooltips, popovers
- **Large**: Modal dialogs, important overlays
- **Extra Large**: High-priority modals, critical alerts
- **Inner**: Pressed/active states, inset elements :::

## Platform-Specifik Usage

**Shadow tokens er platform-uafhængige** - kan bruges i web, iOS og Android, men implementeres
forskelligt på hver platform.

### Web (HTML/CSS/SCSS)

```scss
@use '@grundtone/design-tokens' as tokens;

// Card med shadow
.card {
  box-shadow: tokens.shadow('light');
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: tokens.shadow('medium');
  }
}

// Button med shadow
.button {
  box-shadow: tokens.shadow('light');

  &:hover {
    box-shadow: tokens.shadow('medium');
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: tokens.shadow('inner');
    transform: translateY(0);
  }
}

// Modal/Dialog
.modal {
  box-shadow: tokens.shadow('extra-large');
}
```

```html
<!-- HTML med inline style (hvis nødvendigt) -->
<div style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)">
  Card content
</div>
```

### iOS (SwiftUI)

**Shadows i SwiftUI er baseret på radius, x/y offset og opacity:**

```swift
// ShadowStyles.swift - Design token constants
import SwiftUI

struct ShadowStyle {
    let radius: CGFloat
    let x: CGFloat
    let y: CGFloat
    let opacity: Double

    static let light = ShadowStyle(
        radius: 3,
        x: 0,
        y: 1,
        opacity: 0.1
    )

    static let medium = ShadowStyle(
        radius: 6,
        x: 0,
        y: 4,
        opacity: 0.1
    )

    static let large = ShadowStyle(
        radius: 15,
        x: 0,
        y: 10,
        opacity: 0.1
    )

    static let extraLarge = ShadowStyle(
        radius: 25,
        x: 0,
        y: 20,
        opacity: 0.15
    )
}

// Shadow modifier extension
extension View {
    func shadowStyle(_ style: ShadowStyle) -> some View {
        self.shadow(
            color: Color.black.opacity(style.opacity),
            radius: style.radius,
            x: style.x,
            y: style.y
        )
    }

    func lightShadow() -> some View {
        shadowStyle(.light)
    }

    func mediumShadow() -> some View {
        shadowStyle(.medium)
    }

    func largeShadow() -> some View {
        shadowStyle(.large)
    }
}
```

**Brug i SwiftUI:**

```swift
// Card med shadow
struct CardView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Card Title")
                .font(.headline)

            Text("Card content")
                .font(.body)
        }
        .padding(16)
        .background(Color.white)
        .cornerRadius(8)
        .lightShadow()  // Anvend shadow
    }
}

// Button med hover effect (bruger @State for interaction)
struct ElevatedButton: View {
    @State private var isPressed = false

    var body: some View {
        Button(action: {}) {
            Text("Button")
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
        }
        .background(Color.blue)
        .foregroundColor(.white)
        .cornerRadius(6)
        .shadowStyle(isPressed ? .light : .medium)
        .scaleEffect(isPressed ? 0.98 : 1.0)
        .onLongPressGesture(minimumDuration: .infinity, maximumDistance: .infinity,
                           pressing: { pressing in
            withAnimation(.easeInOut(duration: 0.1)) {
                isPressed = pressing
            }
        }, perform: {})
    }
}

// Modal/Dialog med stor shadow
struct ModalView: View {
    var body: some View {
        VStack {
            // Modal content
        }
        .padding(24)
        .background(Color.white)
        .cornerRadius(12)
        .shadowStyle(.extraLarge)
    }
}
```

**Note:** SwiftUI shadows kan påvirke performance ved mange views. Overvej at bruge `background` med
`Material` for bedre performance:

```swift
.background(.ultraThinMaterial)  // Native blur effect i stedet for shadow
```

### Android (Jetpack Compose)

**Shadows i Compose bruger elevation (Material Design):**

```kotlin
// ShadowStyles.kt - Design token constants
package com.grundtone.ui.theme

import androidx.compose.ui.unit.dp

object Elevation {
    val none = 0.dp
    val light = 2.dp      // Small shadow
    val medium = 4.dp     // Medium shadow
    val large = 8.dp      // Large shadow
    val extraLarge = 16.dp // Extra large shadow
}
```

**Brug i Jetpack Compose:**

```kotlin
// Card med shadow (via elevation)
@Composable
fun CardView(
    title: String,
    content: String
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(8.dp),
        elevation = CardDefaults.cardElevation(
            defaultElevation = Elevation.light
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(text = title, style = MaterialTheme.typography.titleMedium)
            Text(text = content, style = MaterialTheme.typography.bodyMedium)
        }
    }
}

// Button med hover/press effect
@Composable
fun ElevatedButton(
    text: String,
    onClick: () -> Unit
) {
    var isPressed by remember { mutableStateOf(false) }

    Button(
        onClick = onClick,
        modifier = Modifier
            .pointerInput(Unit) {
                detectTapGestures(
                    onPress = {
                        isPressed = true
                        tryAwaitRelease()
                        isPressed = false
                    }
                )
            },
        elevation = ButtonDefaults.buttonElevation(
            defaultElevation = if (isPressed) Elevation.light else Elevation.medium,
            pressedElevation = Elevation.light,
            hoveredElevation = Elevation.large
        )
    ) {
        Text(text)
    }
}

// Surface med custom elevation
@Composable
fun ElevatedSurface(content: @Composable () -> Unit) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(8.dp),
        shadowElevation = Elevation.medium,  // Shadow via elevation
        tonalElevation = 2.dp                // Surface tint
    ) {
        content()
    }
}

// Modal/Dialog med stor shadow
@Composable
fun ModalDialog(
    onDismiss: () -> Unit,
    content: @Composable () -> Unit
) {
    Dialog(onDismissRequest = onDismiss) {
        Surface(
            shape = RoundedCornerShape(12.dp),
            shadowElevation = Elevation.extraLarge,
            modifier = Modifier.padding(16.dp)
        ) {
            Box(modifier = Modifier.padding(24.dp)) {
                content()
            }
        }
    }
}
```

**Material 3 Elevation System:**

```kotlin
// Compose bruger Material Design elevation levels
object MaterialElevation {
    val level0 = 0.dp    // Surface
    val level1 = 1.dp    // Elevated surface
    val level2 = 3.dp    // Cards, buttons
    val level3 = 6.dp    // FAB
    val level4 = 8.dp    // Navigation drawer
    val level5 = 12.dp   // Modal dialogs
}
```

### React Native ⚠️

**React Native har BEGRÆNSET shadow support:**

**iOS support ✅:**

```typescript
// shadows.ts
export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  extraLarge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
  },
} as const;
```

**Android support via elevation:**

```typescript
import { Platform, View, StyleSheet } from 'react-native';

const Card = ({ children }) => (
  <View style={[styles.card, Platform.select({
    ios: shadows.light,
    android: { elevation: 4 }  // Android bruger elevation
  })]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
});
```

**Cross-platform shadow library (anbefalet):**

```bash
npm install react-native-shadow-2
```

```typescript
import { Shadow } from 'react-native-shadow-2';

const Card = ({ children }) => (
  <Shadow distance={4} startColor={'rgba(0,0,0,0.1)'}>
    <View style={styles.card}>
      {children}
    </View>
  </Shadow>
);
```

### Platform Sammenligning

| Feature              | Web (CSS)               | iOS (SwiftUI)           | Android (Compose)       | React Native             |
| -------------------- | ----------------------- | ----------------------- | ----------------------- | ------------------------ |
| **Implementation**   | `box-shadow`            | `.shadow()` modifier    | Elevation (Material)    | Platform-specific props  |
| **Shadow format**    | CSS box-shadow          | radius/x/y/opacity      | `dp` elevation          | shadowOffset/Radius      |
| **Multiple shadows** | ✅ Ja (comma separated) | ✅ Ja (flere modifiers) | ❌ Kun én elevation     | ❌ Nej                   |
| **Color support**    | ✅ Any color            | ✅ Any color + opacity  | ⚠️ Automatic (Material) | ✅ shadowColor prop      |
| **Performance**      | ✅ God                  | ⚠️ Kan være tungt       | ✅ God (native)         | ⚠️ iOS god, Android okay |
| **Blur radius**      | ✅ Ja                   | ✅ Ja (radius)          | ✅ Ja (via elevation)   | ✅ shadowRadius          |
| **Inner shadows**    | ✅ Ja (`inset`)         | ❌ Nej                  | ❌ Nej                  | ❌ Nej                   |

::: warning Platform Begrænsninger

**React Native:**

- iOS: Fuld shadow support via `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
- Android: Kun `elevation` (ingen farve control)
- Shadows virker KUN på View komponenter med baggrundfarve
- Inner shadows ikke supporteret

**SwiftUI:**

- Multiple shadows kan påvirke performance
- Overvej `.background(.ultraThinMaterial)` for bedre performance

**Jetpack Compose:**

- Shadows følger Material Design elevation system
- Shadow farve kan ikke customizes direkte (følger tema)
- Inner shadows ikke supporteret :::

::: tip Anbefalinger

**Web:**

- Brug `box-shadow` direkte via tokens
- Kombiner med `transition` for smooth effekter

**iOS:**

- Brug SwiftUI `.shadow()` modifier
- Overvej Material blur effects for performance

**Android:**

- Brug Material elevation system
- Følg Material Design guidelines

**React Native:**

- Brug platform-specific styling eller shadow bibliotek
- Test på begge platforme :::

## Hvordan Bruger Man Shadows

### Praktiske Komponent Eksempler

**Card med Hover Effect**

```scss
@use '@grundtone/design-tokens' as tokens;

.card {
  background: white;
  border-radius: tokens.radius('lg');
  padding: tokens.spacing(6);
  box-shadow: tokens.shadow('light');
  transition: all 0.3s ease;

  // Hover state
  &:hover {
    box-shadow: tokens.shadow('medium');
    transform: translateY(-2px); // Subtle lift effect
  }

  // Active/pressed state
  &:active {
    box-shadow: tokens.shadow('subtle');
    transform: translateY(0);
  }
}

// Interactive card (clickable)
.card-interactive {
  @extend .card;
  cursor: pointer;

  &:hover {
    box-shadow: tokens.shadow('large');
    border-color: tokens.getColor('primary', 500);
  }
}
```

**Button Shadows**

```scss
.button {
  padding: tokens.spacing(3) tokens.spacing(6);
  border-radius: tokens.radius('default');
  transition: all 0.2s ease;

  // Primary button med shadow
  &.button-primary {
    background-color: tokens.getColor('primary', 600);
    color: white;
    box-shadow: tokens.shadow('subtle');

    &:hover {
      background-color: tokens.getColor('primary', 700);
      box-shadow: tokens.shadow('light');
      transform: translateY(-1px);
    }

    &:active {
      box-shadow: tokens.shadow('inner'); // Inset shadow when pressed
      transform: translateY(0);
    }
  }

  // Flat button (no shadow by default)
  &.button-flat {
    box-shadow: none;

    &:hover {
      box-shadow: tokens.shadow('subtle');
    }
  }

  // Floating action button (FAB)
  &.button-fab {
    border-radius: tokens.radius('round');
    width: 56px;
    height: 56px;
    box-shadow: tokens.shadow('medium');

    &:hover {
      box-shadow: tokens.shadow('large');
    }
  }
}
```

**Modal Dialogs**

```scss
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: tokens.radius('lg');
  padding: tokens.spacing(8);
  box-shadow: tokens.shadow('large');
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1000;

  // Critical/important modal
  &.modal-critical {
    box-shadow: tokens.shadow('extra-large');
    border: 2px solid tokens.getColor('red', 500);
  }
}

// Modal overlay
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
```

**Dropdown Menus**

```scss
.dropdown {
  position: relative;
  display: inline-block;

  .dropdown-trigger {
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: tokens.spacing(2);
    background: white;
    border-radius: tokens.radius('md');
    box-shadow: tokens.shadow('medium');
    min-width: 200px;
    padding: tokens.spacing(2);
    z-index: 100;

    // Animation
    opacity: 0;
    transform: translateY(-8px);
    transition: all 0.2s ease;
    pointer-events: none;

    &.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
  }

  .dropdown-item {
    padding: tokens.spacing(2) tokens.spacing(3);
    border-radius: tokens.radius('sm');
    cursor: pointer;

    &:hover {
      background-color: tokens.getColor('gray', 100);
    }
  }
}
```

**Navigation Bar**

```scss
.navbar {
  background: white;
  padding: tokens.spacing(4) tokens.spacing(6);
  box-shadow: tokens.shadow('subtle');
  position: sticky;
  top: 0;
  z-index: 100;

  // Elevated navbar (scrolled state)
  &.elevated {
    box-shadow: tokens.shadow('medium');
  }

  // Transparent navbar
  &.transparent {
    background: transparent;
    box-shadow: none;

    &.elevated {
      background: white;
      box-shadow: tokens.shadow('light');
    }
  }
}
```

**Tooltips**

```scss
.tooltip {
  position: absolute;
  background: tokens.getColor('gray', 900);
  color: white;
  padding: tokens.spacing(2) tokens.spacing(3);
  border-radius: tokens.radius('sm');
  box-shadow: tokens.shadow('light');
  font-size: tokens.font-size('sm');
  white-space: nowrap;
  z-index: 1000;

  // Arrow
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid tokens.getColor('gray', 900);
  }
}
```

**Image Cards**

```scss
.image-card {
  position: relative;
  overflow: hidden;
  border-radius: tokens.radius('lg');
  box-shadow: tokens.shadow('light');
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover {
    box-shadow: tokens.shadow('extra-large');

    img {
      transform: scale(1.05); // Subtle zoom
    }
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    padding: tokens.spacing(6);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
```

**Focus States**

```scss
// Focus shadow for accessibility
.input,
.button,
.link {
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px tokens.getColor('primary', 100);
  }

  // Error focus state
  &.error:focus-visible {
    box-shadow: 0 0 0 3px tokens.getColor('red', 100);
  }
}
```

### Layering & Z-Index with Shadows

```scss
// Create depth hierarchy with shadows
.layer-1 {
  box-shadow: tokens.shadow('light');
  z-index: 1;
}

.layer-2 {
  box-shadow: tokens.shadow('medium');
  z-index: 2;
}

.layer-3 {
  box-shadow: tokens.shadow('large');
  z-index: 3;
}

.layer-4 {
  box-shadow: tokens.shadow('extra-large');
  z-index: 4;
}

// Exempel: Stacked cards
.card-stack {
  .card {
    box-shadow: tokens.shadow('light');

    &.active {
      box-shadow: tokens.shadow('large');
      z-index: 2;
    }

    &.hover:not(.active) {
      box-shadow: tokens.shadow('medium');
      z-index: 1;
    }
  }
}
```

### Animations med Shadows

```scss
// Smooth shadow transitions
.card {
  box-shadow: tokens.shadow('light');
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: tokens.shadow('large');
    transform: translateY(-4px);
  }
}

// Pulse effect
@keyframes pulse-shadow {
  0%,
  100% {
    box-shadow: tokens.shadow('medium');
  }
  50% {
    box-shadow: tokens.shadow('large');
  }
}

.pulse {
  animation: pulse-shadow 2s ease-in-out infinite;
}

// Loading skeleton
.skeleton {
  background: linear-gradient(
    90deg,
    tokens.getColor('gray', 100) 25%,
    tokens.getColor('gray', 50) 50%,
    tokens.getColor('gray', 100) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: tokens.radius('default');
  box-shadow: tokens.shadow('subtle');
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

### Dark Mode Shadows

```scss
// Adjust shadows for dark mode
:root {
  --shadow-overlay: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --shadow-overlay: rgba(0, 0, 0, 0.5);

  .card {
    // Stronger shadows in dark mode for better definition
    box-shadow: 0 4px 12px var(--shadow-overlay);
  }

  .modal {
    box-shadow: 0 8px 24px var(--shadow-overlay);
  }
}
```

## Grundlæggende Usage

### SCSS

```scss
@use '@grundtone/design-tokens' as tokens;

.card {
  box-shadow: tokens.shadow('light');

  &:hover {
    box-shadow: tokens.shadow('medium');
  }
}

// Component-specific shadows
.modal {
  box-shadow: $shadow-modal;
}

.dropdown {
  box-shadow: $shadow-dropdown;
}
```

### CSS Variables

```css
.card {
  box-shadow: var(--shadow-light);
}

.modal {
  box-shadow: var(--shadow-modal);
}

/* Transition shadows smoothly */
.card {
  box-shadow: var(--shadow-light);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-medium);
}
```

### CSS Custom Properties Available

```css
--shadow-none
--shadow-subtle
--shadow-light
--shadow-medium
--shadow-large
--shadow-extra-large
--shadow-inner
--shadow-focus
--shadow-card
--shadow-modal
--shadow-dropdown
--shadow-tooltip
```

## Best Practices

::: tip Do

- Use shadows to indicate interactivity and elevation
- Transition shadows smoothly on hover/active states
- Use lighter shadows for small elements
- Use larger shadows for important, high-priority elements
- Combine shadows with subtle borders for better definition :::

::: warning Don't

- Overuse large shadows - they can be visually heavy
- Use shadows on every element - reserve for elevated content
- Mix shadow styles inconsistently across similar components
- Forget to consider dark mode (shadows may need adjustment)
- Use shadows on elements that should appear flat :::

## Accessibility

Shadows should enhance usability, not replace other accessibility features:

- Don't rely solely on shadows to indicate focus states
- Combine shadows with borders or outlines for better visibility
- Ensure sufficient contrast between shadowed elements and backgrounds
- Test shadow visibility in different lighting conditions

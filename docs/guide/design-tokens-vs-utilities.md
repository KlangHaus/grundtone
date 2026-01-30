# Design Tokens vs Utilities

## Hvad er Design Tokens?

**Design tokens** er grundlæggende designværdier, der repræsenterer dit visuelle designsystem -
farver, typografi, mellemrum, skygger osv. De er **platform-uafhængige** og kan bruges i alle
platforme:

- **Web** (HTML/CSS)
- **iOS** (Swift/SwiftUI)
- **Android** (Kotlin/Jetpack Compose)
- **React Native**
- **Flutter**

Design tokens er dine "sandheds-kilden" for design-beslutninger og sikrer konsistens på tværs af
alle platforme.

### Eksempel: Farve Token

```scss
// Design Token (platform-uafhængig værdi)
$color-primary-600: #2563eb;
```

**Brug i forskellige platforme:**

#### Web (CSS/SCSS)

```scss
.button {
  background-color: $color-primary-600;
}
```

#### iOS (SwiftUI)

```swift
Color(hex: "2563eb") // eller Color("primary600")
```

#### Android (Jetpack Compose)

```kotlin
Color(0xFF2563EB)
```

#### React Native

```javascript
const colors = {
  primary600: '#2563eb',
};
```

## Hvad er Utilities?

**Utilities** er CSS hjælpeklasser, der gør det nemt at anvende design tokens i HTML. De er **kun
til web** (HTML/CSS) og kan ikke bruges i native apps.

Utilities er færdiglavede CSS klasser som:

- `.d-flex` (flexbox layout)
- `.mt-4` (margin-top)
- `.text-center` (tekst centrering)
- `.w-50` (50% bredde)

### Eksempel: Spacing Utility

```html
<!-- Utility klasse (KUN web/HTML) -->
<div class="mt-4 px-6">Content med margin-top og horizontal padding</div>
```

Dette kan **ikke** bruges i iOS eller Android - native apps bruger deres egne layout systemer.

## Nøgleforskelle

| Aspekt           | Design Tokens                                    | Utilities                       |
| ---------------- | ------------------------------------------------ | ------------------------------- |
| **Platform**     | Alle platforme (web, iOS, Android, React Native) | Kun web (HTML/CSS)              |
| **Hvad er det?** | Rå designværdier (farver, størrelser, osv.)      | Færdiglavede CSS klasser        |
| **Formål**       | Konsistens på tværs af platforme                 | Hurtig HTML udvikling           |
| **Eksempel**     | `$spacing-4: 1rem`                               | `.mt-4 { margin-top: 1rem; }`   |
| **Brug**         | Bruges direkte i din platform-specifikke kode    | Tilføjes som CSS klasser i HTML |

## Workflow: Fra Token til Implementation

```
Design Token (platform-uafhængig)
    ↓
    ├─→ Web: Bruges direkte i SCSS eller via utility klasser
    ├─→ iOS: Konverteres til Swift constants/Color assets
    ├─→ Android: Konverteres til Kotlin constants/XML colors
    └─→ React Native: Konverteres til JavaScript/TypeScript constants
```

### Eksempel Workflow: Spacing

**1. Design Token (kilde):**

```scss
$spacing-4: 1rem; // 16px
```

**2. Web Implementation:**

**Direkte brug i SCSS:**

```scss
.card {
  padding: $spacing-4;
}
```

**Eller via utility klasse:**

```html
<div class="p-4">Card content</div>
```

**3. iOS Implementation:**

```swift
// Constants.swift
struct Spacing {
  static let spacing4: CGFloat = 16
}

// Usage
VStack(spacing: Spacing.spacing4) {
  Text("Content")
}
```

**4. Android Implementation:**

```kotlin
// Spacing.kt
object Spacing {
  val spacing4 = 16.dp
}

// Usage
Column(
  verticalArrangement = Arrangement.spacedBy(Spacing.spacing4)
) {
  Text("Content")
}
```

## Best Practices

### ✅ Do

- **Brug design tokens** til platform-uafhængige værdier
- **Dokumenter tokens** med eksempler for alle platforme
- **Brug utilities** til hurtig web udvikling
- **Hold tokens synkroniseret** på tværs af platforme
- **Skriv custom CSS** når utilities ikke er nok

### ❌ Don't

- **Brug ikke utility klasser** i native apps (de virker ikke)
- **Hardcode ikke værdier** - brug altid tokens
- **Bland ikke tokens og magic numbers** i din kode
- **Opfind ikke tokens** - følg design systemet
- **Antag ikke** at tokens automatisk synkroniseres - du skal selv konvertere dem

## Hvordan Bruger Man Dette System?

### For Web Udviklere

1. **Små komponenter/hurtigt prototyping:**

   - Brug utility klasser: `<div class="d-flex gap-4 p-6">`

2. **Komplekse komponenter:**
   - Skriv custom SCSS med design tokens:
   ```scss
   .custom-component {
     padding: tokens.spacing(6);
     color: tokens.getColor('primary', 600);
   }
   ```

### For Native Udviklere (iOS/Android)

1. **Konverter design tokens** til din platforms format
2. **Opret constants/themes** i din kodebase
3. **Brug tokens konsekvent** i din UI kode
4. **Ignorer utilities** - de er ikke relevante for native

### For Design Teams

1. **Design med tokens** i Figma/design værktøj
2. **Dokumenter beslutninger** i token beskrivelser
3. **Synkroniser ændringer** med udviklingsteams
4. **Test på alle platforme** for konsistens

## Eksempel: Komplet Button Implementation

### Design Token Definition

```scss
// _colors.scss
$color-primary-600: #2563eb;
$color-primary-700: #1d4ed8;

// _spacing.scss
$spacing-3: 0.75rem; // 12px
$spacing-4: 1rem; // 16px

// _radius.scss
$radius-default: 6px;
```

### Web Implementation

**Med utility klasser:**

```html
<button class="d-inline-flex align-items-center gap-2 px-4 py-3">
  <span>Button Text</span>
</button>
```

**Med custom SCSS:**

```scss
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: tokens.spacing(2);
  padding: tokens.spacing(3) tokens.spacing(4);
  background-color: tokens.getColor('primary', 600);
  border-radius: tokens.radius('default');

  &:hover {
    background-color: tokens.getColor('primary', 700);
  }
}
```

### iOS Implementation

```swift
struct PrimaryButton: View {
  var body: some View {
    Button(action: {}) {
      HStack(spacing: Spacing.spacing2) {
        Text("Button Text")
      }
      .padding(.horizontal, Spacing.spacing4)
      .padding(.vertical, Spacing.spacing3)
      .background(Colors.primary600)
      .cornerRadius(BorderRadius.default)
    }
  }
}
```

### Android Implementation

```kotlin
@Composable
fun PrimaryButton() {
  Button(
    onClick = {},
    colors = ButtonDefaults.buttonColors(
      containerColor = Colors.primary600
    ),
    shape = RoundedCornerShape(BorderRadius.default),
    contentPadding = PaddingValues(
      horizontal = Spacing.spacing4,
      vertical = Spacing.spacing3
    )
  ) {
    Row(
      horizontalArrangement = Arrangement.spacedBy(Spacing.spacing2)
    ) {
      Text("Button Text")
    }
  }
}
```

## Konklusion

- **Design Tokens** = Platform-uafhængige designværdier (brug overalt)
- **Utilities** = HTML/CSS hjælpeklasser (kun web)
- **Workflow** = Design tokens → konverter til hver platform → brug konsekvent
- **Mål** = Konsistent design på tværs af alle platforme

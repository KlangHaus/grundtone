# Z-Index

Z-index tokens provide a consistent layering system for stacking UI elements. The z-index system
prevents conflicts and ensures proper visual hierarchy across your application.

## Z-Index Scale

The z-index system uses predefined layers to organize elements by their stacking context.

### Layer Hierarchy

| Layer              | Value | Usage                               |
| ------------------ | ----- | ----------------------------------- |
| **negative**       | -1    | Behind content, decorative elements |
| **default**        | 0     | Normal document flow                |
| **above**          | 100   | Slightly elevated content           |
| **dropdown**       | 1000  | Dropdown menus                      |
| **header**         | 1010  | Sticky headers, navigation bars     |
| **sidebar**        | 1020  | Sidebar panels                      |
| **sticky**         | 1020  | Sticky elements                     |
| **fixed**          | 1030  | Fixed positioned elements           |
| **overlay**        | 1030  | Overlays, backdrops                 |
| **modal-backdrop** | 1040  | Modal backdrop/overlay              |
| **modal**          | 1050  | Modal dialogs                       |
| **popover**        | 1060  | Popovers, floating elements         |
| **tooltip**        | 1070  | Tooltips                            |
| **notification**   | 1080  | Toast notifications, alerts         |
| **top**            | 9999  | Highest priority elements           |

## Platform-Specifik Usage

**Z-index / layering er primært et web koncept.** Native platforme (iOS, Android) bruger forskellige
systemer til at styre view hierarki og lagdeling.

### Web (HTML/CSS/SCSS)

**Z-index virker kun med positioned elements** (`position: relative`, `absolute`, `fixed`, eller
`sticky`).

```scss
@use '@haspen/design-tokens' as tokens;

// Dropdown menu
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: $z-index-dropdown; // 1000
  background: white;
  box-shadow: tokens.shadow('large');
}

// Modal dialog
.modal-backdrop {
  position: fixed;
  inset: 0; // top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: $z-index-modal-backdrop; // 1040
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: $z-index-modal; // 1050
  background: white;
  border-radius: tokens.radius('lg');
  box-shadow: tokens.shadow('extra-large');
}

// Fixed header
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-sticky; // 1020
  background: white;
  box-shadow: tokens.shadow('light');
}

// Tooltip
.tooltip {
  position: absolute;
  z-index: $z-index-tooltip; // 1060
  pointer-events: none;
}

// Popover
.popover {
  position: absolute;
  z-index: $z-index-popover; // 1030
}
```

```html
<!-- HTML eksempel -->
<div style="position: relative; z-index: 1">
  Base content
  <div style="position: absolute; z-index: 10">Layered content</div>
</div>
```

**Stacking Context:**

```scss
// Nye stacking contexts oprettes af:
// - position + z-index
// - opacity < 1
// - transform
// - filter
// - isolation: isolate

.isolated-context {
  isolation: isolate; // Opretter ny stacking context
  position: relative;
}
```

### iOS (SwiftUI) - Z-Order via View Hierarchy

**SwiftUI bruger IKKE z-index.** I stedet styres layering via view hierarki - views der deklareres
senere vises ovenpå.

```swift
// LayerOrder.swift - Conceptual mapping
struct ZOrder {
    // SwiftUI bruger ikke numeriske z-index værdier
    // Men du kan bruge .zIndex() modifier hvis nødvendigt

    static let background = 0.0
    static let content = 1.0
    static let overlay = 2.0
    static let popup = 3.0
    static let modal = 4.0
    static let topmost = 5.0
}
```

**Brug i SwiftUI:**

```swift
// Views er layered i den rækkefølge de erklæres
struct ContentView: View {
    @State private var showModal = false
    @State private var showDropdown = false

    var body: some View {
        ZStack {  // ZStack lægger views ovenpå hinanden
            // Base content (bund)
            mainContent
                .zIndex(0)

            // Dropdown (over content)
            if showDropdown {
                dropdownMenu
                    .zIndex(10)
            }

            // Modal (over alt)
            if showModal {
                modalView
                    .zIndex(100)
            }
        }
    }

    var mainContent: some View {
        VStack {
            Text("Main Content")
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.white)
    }

    var dropdownMenu: some View {
        VStack {
            Text("Dropdown Item 1")
            Text("Dropdown Item 2")
        }
        .padding()
        .background(Color.white)
        .cornerRadius(8)
        .shadow(radius: 8)
        .position(x: 100, y: 100)  // Absolute positioning
    }

    var modalView: some View {
        ZStack {
            // Backdrop
            Color.black.opacity(0.5)
                .edgesIgnoringSafeArea(.all)
                .onTapGesture {
                    showModal = false
                }

            // Modal content
            VStack(spacing: 16) {
                Text("Modal Title")
                    .font(.headline)

                Text("Modal content goes here")

                Button("Close") {
                    showModal = false
                }
            }
            .padding(24)
            .background(Color.white)
            .cornerRadius(12)
            .shadow(radius: 20)
        }
    }
}

// Alternative: .overlay() og .background() for layering
struct LayeredView: View {
    var body: some View {
        content
            .background(backgroundLayer)  // Bag content
            .overlay(overlayLayer)        // Over content
    }

    var content: some View {
        Text("Main Content")
            .padding()
    }

    var backgroundLayer: some View {
        RoundedRectangle(cornerRadius: 8)
            .fill(Color.blue.opacity(0.1))
    }

    var overlayLayer: some View {
        Circle()
            .fill(Color.red)
            .frame(width: 20, height: 20)
            .offset(x: 50, y: -10)
    }
}

// Sheet og fullScreenCover for modal presentation
struct ModalExamples: View {
    @State private var showSheet = false
    @State private var showFullScreen = false

    var body: some View {
        VStack {
            Button("Show Sheet") {
                showSheet = true
            }
            .sheet(isPresented: $showSheet) {
                SheetContent()
            }

            Button("Show Full Screen") {
                showFullScreen = true
            }
            .fullScreenCover(isPresented: $showFullScreen) {
                FullScreenContent()
            }
        }
    }
}
```

### Android (Jetpack Compose) - Z-Order via Composable Order

**Jetpack Compose bruger heller ikke z-index.** Layering styres via composable order og `Box`
layout.

```kotlin
// LayerOrder.kt - Conceptual mapping (ikke nødvendigt i Compose)
// Compose bruger ikke numeriske z-index værdier
// Men du kan bruge Modifier.zIndex() hvis nødvendigt
```

**Brug i Jetpack Compose:**

```kotlin
// Box layout lægger composables ovenpå hinanden
@Composable
fun ContentScreen() {
    var showModal by remember { mutableStateOf(false) }
    var showDropdown by remember { mutableStateOf(false) }

    Box(modifier = Modifier.fillMaxSize()) {
        // Base content (bund) - første composable
        MainContent(
            modifier = Modifier
                .fillMaxSize()
                .zIndex(0f)  // Explicit z-order (optional)
        )

        // Dropdown (over content) - anden composable
        if (showDropdown) {
            DropdownMenu(
                modifier = Modifier
                    .align(Alignment.TopStart)
                    .offset(x = 16.dp, y = 100.dp)
                    .zIndex(10f)
            ) {
                showDropdown = false
            }
        }

        // Modal (over alt) - sidste composable = højest
        if (showModal) {
            ModalView(
                modifier = Modifier
                    .fillMaxSize()
                    .zIndex(100f),
                onDismiss = { showModal = false }
            )
        }
    }
}

@Composable
fun MainContent(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .background(Color.White)
            .padding(16.dp)
    ) {
        Text("Main Content")
    }
}

@Composable
fun DropdownMenu(
    modifier: Modifier = Modifier,
    onDismiss: () -> Unit
) {
    Card(
        modifier = modifier,
        elevation = CardDefaults.cardElevation(8.dp),
        shape = RoundedCornerShape(8.dp)
    ) {
        Column(modifier = Modifier.padding(8.dp)) {
            Text("Dropdown Item 1", modifier = Modifier
                .fillMaxWidth()
                .clickable { onDismiss() }
                .padding(12.dp)
            )
            Text("Dropdown Item 2", modifier = Modifier
                .fillMaxWidth()
                .clickable { onDismiss() }
                .padding(12.dp)
            )
        }
    }
}

@Composable
fun ModalView(
    modifier: Modifier = Modifier,
    onDismiss: () -> Unit
) {
    Box(modifier = modifier) {
        // Backdrop
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.5f))
                .clickable { onDismiss() }
        )

        // Modal content
        Card(
            modifier = Modifier
                .align(Alignment.Center)
                .padding(32.dp),
            shape = RoundedCornerShape(12.dp),
            elevation = CardDefaults.cardElevation(20.dp)
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text("Modal Title", style = MaterialTheme.typography.titleLarge)
                Text("Modal content goes here")
                Button(onClick = onDismiss) {
                    Text("Close")
                }
            }
        }
    }
}

// Alternative: Dialog composable for modals
@Composable
fun DialogExample() {
    var showDialog by remember { mutableStateOf(false) }

    Button(onClick = { showDialog = true }) {
        Text("Show Dialog")
    }

    if (showDialog) {
        Dialog(onDismissRequest = { showDialog = false }) {
            Card(shape = RoundedCornerShape(12.dp)) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text("Dialog Content")
                    Button(onClick = { showDialog = false }) {
                        Text("Close")
                    }
                }
            }
        }
    }
}
```

### React Native - Limited Z-Index Support

**React Native HAR z-index, men det virker anderledes end web:**

```typescript
// React Native z-index virker KUN inden for samme parent
// og påvirkes af view order

import { View, Text, Modal, StyleSheet } from 'react-native';

// Z-index i React Native
const LayeredViews = () => (
  <View style={{ flex: 1 }}>
    {/* Base content */}
    <View style={[styles.box, { zIndex: 1, backgroundColor: 'blue' }]}>
      <Text>Bottom Layer (z-index: 1)</Text>
    </View>

    {/* Overlapping content */}
    <View style={[styles.box, { zIndex: 10, backgroundColor: 'red', position: 'absolute', top: 50, left: 50 }]}>
      <Text>Top Layer (z-index: 10)</Text>
    </View>
  </View>
);

// VIGTIGT: View order påvirker også layering
// Senere views vises ovenpå tidligere views (når z-index er ens)
const ViewOrderExample = () => (
  <View style={{ flex: 1 }}>
    <View style={styles.box1}>
      <Text>First (bag)</Text>
    </View>

    <View style={[styles.box2, { position: 'absolute' }]}>
      <Text>Second (foran - fordi det kommer senere)</Text>
    </View>
  </View>
);

// Modal for highest z-level (over alt andet)
const ModalExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="Show Modal" onPress={() => setVisible(true)} />

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal Title</Text>
            <Text>Modal content goes here</Text>
            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    margin: 10,
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    top: 50,
    left: 50,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
});
```

### Platform Sammenligning

| Feature                | Web (CSS)                | iOS (SwiftUI)                     | Android (Compose)      | React Native         |
| ---------------------- | ------------------------ | --------------------------------- | ---------------------- | -------------------- |
| **Z-index support**    | ✅ Ja (numerisk)         | ⚠️ Via `.zIndex()`                | ⚠️ Via `.zIndex()`     | ⚠️ Begrænset support |
| **Layering metode**    | `z-index` property       | View order + ZStack               | Composable order + Box | View order + zIndex  |
| **Stacking context**   | ✅ Ja                    | ❌ Nej (anderledes)               | ❌ Nej (anderledes)    | ⚠️ Begrænset         |
| **Modal/Dialog**       | Custom z-index           | `.sheet()` / `.fullScreenCover()` | `Dialog()` composable  | `<Modal>` component  |
| **View order matters** | ⚠️ Kun med samme z-index | ✅ Ja (primary)                   | ✅ Ja (primary)        | ✅ Ja                |
| **Negative z-index**   | ✅ Ja                    | ✅ Ja                             | ✅ Ja                  | ❌ Nej               |

::: warning Platform Forskelle

**Web (CSS):**

- Z-index virker kun med positioned elements
- Stacking contexts er vigtige at forstå
- Negative værdier flytter elementer bagved parent

**iOS (SwiftUI):**

- Primært styret af view declaration order
- `.zIndex()` modifier kan bruges, men er ikke standard
- Brug ZStack for layering
- `.sheet()` og `.fullScreenCover()` for modals (anbefalet)

**Android (Compose):**

- Primært styret af composable order
- `Modifier.zIndex()` kan bruges, men er ikke standard
- Brug Box for layering
- `Dialog()` composable for modals (anbefalet)

**React Native:**

- Z-index virker KUN inden for samme parent
- View order er meget vigtig
- Brug `<Modal>` component for highest level overlays
- Negative z-index ikke supporteret :::

::: tip Anbefalinger

**Web:**

- Brug design token z-index værdier konsekvent
- Undgå arbitrære z-index værdier
- Forstå stacking contexts

**iOS/Android:**

- Forlad dig primært på view/composable order
- Brug platform-specifikke modal patterns (`.sheet()`, `Dialog()`)
- Brug `.zIndex()` kun når view order ikke er nok

**React Native:**

- Brug `<Modal>` for overlays over alt andet
- Kombiner z-index med view order
- Test på begge platforme - behavior kan variere :::

## Hvordan Bruger Man Z-Index

### Dropdown Menus

```scss
@use '@ipeeon/design-tokens' as tokens;

.dropdown {
  position: relative;

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: $z-index-dropdown; // 1000
    background: white;
    border-radius: tokens.radius('md');
    box-shadow: tokens.shadow('medium');
    margin-top: tokens.spacing(2);
  }
}
```

### Sticky Navigation

```scss
.navbar {
  position: sticky;
  top: 0;
  z-index: $z-index-header; // 1010
  background: white;
  box-shadow: tokens.shadow('subtle');
  padding: tokens.spacing(4) tokens.spacing(6);
}

// Mobile sidebar
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: $z-index-sidebar; // 1020
  background: white;
  transform: translateX(-100%);
  transition: transform 0.3s ease;

  &.open {
    transform: translateX(0);
  }
}
```

### Modal Dialogs

```scss
// Modal backdrop
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: $z-index-modal-backdrop; // 1040
}

// Modal dialog
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: $z-index-modal; // 1050
  background: white;
  border-radius: tokens.radius('xl');
  padding: tokens.spacing(8);
  box-shadow: tokens.shadow('extra-large');
  max-width: 90vw;
  max-height: 90vh;
}
```

### Tooltips & Popovers

```scss
// Popover
.popover {
  position: absolute;
  z-index: $z-index-popover; // 1060
  background: white;
  border: 1px solid tokens.getColor('gray', 200);
  border-radius: tokens.radius('md');
  padding: tokens.spacing(4);
  box-shadow: tokens.shadow('medium');
}

// Tooltip
.tooltip {
  position: absolute;
  z-index: $z-index-tooltip; // 1070
  background: tokens.getColor('gray', 900);
  color: white;
  padding: tokens.spacing(2) tokens.spacing(3);
  border-radius: tokens.radius('sm');
  font-size: tokens.font-size('sm');
  white-space: nowrap;
}
```

### Toast Notifications

```scss
.toast-container {
  position: fixed;
  top: tokens.spacing(4);
  right: tokens.spacing(4);
  z-index: $z-index-notification; // 1080
  display: flex;
  flex-direction: column;
  gap: tokens.spacing(3);
}

.toast {
  min-width: 300px;
  padding: tokens.spacing(4);
  background: white;
  border-radius: tokens.radius('lg');
  box-shadow: tokens.shadow('large');
  border: 1px solid tokens.getColor('gray', 200);
}
```

### Decorative Elements

```scss
// Behind content decorative element
.decorative-shape {
  position: absolute;
  z-index: $z-index-negative; // -1
  opacity: 0.1;
  pointer-events: none;
}

// Floating above content
.floating-badge {
  position: absolute;
  top: tokens.spacing(-2);
  right: tokens.spacing(-2);
  z-index: $z-index-above; // 100
  background: tokens.getColor('red', 500);
  color: white;
  border-radius: tokens.radius('round');
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: tokens.font-size('xs');
}
```

### Complex Stacking Examples

```scss
// Image card with overlay and floating action
.image-card {
  position: relative;

  img {
    position: relative;
    z-index: $z-index-default; // 0
    width: 100%;
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: $z-index-above; // 100
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    padding: tokens.spacing(6);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .floating-action {
    position: absolute;
    top: tokens.spacing(4);
    right: tokens.spacing(4);
    z-index: $z-index-above + 1; // 101
  }
}
```

### Loading Overlay

```scss
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: $z-index-top; // 9999
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    // Loading spinner
  }
}
```

## Usage

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.modal {
  z-index: $z-index-modal;
}

.tooltip {
  z-index: $z-index-tooltip;
}

.header {
  z-index: $z-index-header;
}
```

### CSS Variables

```css
.modal {
  z-index: var(--z-index-modal);
}

.tooltip {
  z-index: var(--z-index-tooltip);
}

.header {
  z-index: var(--z-index-header);
}
```

## Best Practices

::: tip Do

- Use predefined z-index values from the scale
- Keep related elements in adjacent z-index layers
- Document why you need a custom z-index if you deviate from the scale
- Use stacking contexts intentionally (position + z-index together)
- Test z-index layering with multiple elements open simultaneously :::

::: warning Don't

- Use arbitrary z-index values like `z-index: 99999`
- Create z-index wars by incrementing values arbitrarily
- Forget that z-index only works on positioned elements
- Nest positioned elements without considering stacking contexts
- Use z-index to solve layout issues that could be fixed with proper HTML structure :::

## Stacking Context Rules

Understanding stacking contexts is crucial for proper z-index usage:

```scss
// Creates a new stacking context
.stacking-context {
  position: relative; // or absolute, fixed, sticky
  z-index: 1;

  // Children are layered within this context
  .child-1 {
    position: relative;
    z-index: 100; // Only compares to siblings within same stacking context
  }

  .child-2 {
    position: relative;
    z-index: 200; // Will be above child-1
  }
}

// This element with lower z-index but outside the stacking context
// can appear above high z-index children inside the context
.outside-element {
  position: relative;
  z-index: 2; // Higher than .stacking-context, so appears above ALL its children
}
```

## Common Patterns

### Portal Pattern (Modal, Tooltip)

```scss
// Render modals/tooltips at document root to avoid stacking context issues
.portal-root {
  position: fixed;
  inset: 0;
  pointer-events: none; // Allow clicks through

  & > * {
    pointer-events: auto; // Re-enable clicks on children
  }
}
```

### Layered Cards

```scss
.card-stack {
  .card {
    position: relative;
    z-index: $z-index-default;
    transition:
      z-index 0s,
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      z-index: $z-index-above;
      transform: translateY(-8px);
      box-shadow: tokens.shadow('large');
    }
  }
}
```

import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import {
  GTAccordion,
  GTAccordionItem,
  GTAddressInput,
  GTAlert,
  GTBadge,
  GTButton,
  GTCard,
  GTDetails,
  GTIcon,
  GTInput,
  GTTabs,
  GTTabPanel,
  GTToggle,
  GTSpinner,
  GTModal,
  GTRadioGroup,
  GTCheckboxGroup,
  useGrundtoneTheme,
  useField,
  useFormValidation,
  required,
  email,
  minLength,
} from '@grundtone/react-native';

export default function ComponentsScreen() {
  const { theme, isDark, mode, setMode } = useGrundtoneTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPersistent, setShowPersistent] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [toggleSm, setToggleSm] = useState(false);
  const [toggleLg, setToggleLg] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [formResult, setFormResult] = useState('');

  const nameField = useField({
    validators: [
      required('Name is required'),
      minLength(2, 'At least 2 characters'),
    ],
  });
  const emailField = useField({
    validators: [required('Email is required'), email()],
    validateOn: 'blur',
  });
  const form = useFormValidation({ name: nameField, email: emailField });

  function onValidationSubmit() {
    if (!form.validateAll()) {
      setFormResult('Validation failed');
      return;
    }
    setFormResult(
      `Valid! Name: ${nameField.value}, Email: ${emailField.value}`,
    );
  }

  function simulateLoad() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  const rem = (v: string) => parseFloat(v) * 16;

  const titleStyle = {
    fontSize: rem(theme.typography.fontSize['2xl']),
    fontWeight: theme.typography.fontWeight.bold as '700',
    marginBottom: rem(theme.spacing.xl),
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
  };

  const headingStyle = {
    fontSize: rem(theme.typography.fontSize.lg),
    fontWeight: theme.typography.fontWeight.semibold as '600',
    marginTop: rem(theme.spacing.xl),
    marginBottom: rem(theme.spacing.md),
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
  };

  const groupStyle = { gap: rem(theme.spacing.xs) };
  const rowStyle = {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    alignItems: 'center' as const,
    gap: rem(theme.spacing.xs),
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: rem(theme.spacing.md),
        paddingBottom: rem(theme.spacing['4xl']),
      }}
    >
      <Text style={titleStyle}>Grundtone Expo Playground</Text>

      <Text style={headingStyle}>Accordion</Text>
      <GTAccordion>
        <GTAccordionItem heading="Hvad er design tokens?">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Navngivne værdier for farver, spacing, typografi og mere.
          </Text>
        </GTAccordionItem>
        <GTAccordionItem heading="Dark mode?" open>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Ja — via theme context provider.
          </Text>
        </GTAccordionItem>
      </GTAccordion>
      <GTAccordion variant="bordered">
        <GTAccordionItem heading="Bordered variant">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Med border rundt om hele gruppen.
          </Text>
        </GTAccordionItem>
      </GTAccordion>

      <Text style={headingStyle}>Badge</Text>
      <View style={rowStyle}>
        <GTBadge variant="neutral">Neutral</GTBadge>
        <GTBadge variant="info">Info</GTBadge>
        <GTBadge variant="success">Success</GTBadge>
        <GTBadge variant="warning">Warning</GTBadge>
        <GTBadge variant="error">Error</GTBadge>
      </View>
      <View style={{ ...rowStyle, marginTop: rem(theme.spacing.sm) }}>
        <GTBadge variant="success" dot>
          Active
        </GTBadge>
        <GTBadge variant="error" dot>
          Offline
        </GTBadge>
        <GTBadge variant="neutral" dot>
          Draft
        </GTBadge>
      </View>

      <Text style={headingStyle}>Details</Text>
      <View style={groupStyle}>
        <GTDetails summary="What are design tokens?">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Named values for colors, spacing, typography, and more.
          </Text>
        </GTDetails>
        <GTDetails variant="subtle" summary="Read more about theming">
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Theme switching via context provider.
          </Text>
        </GTDetails>
        <GTDetails variant="card" summary="Do I need @grundtone/core?">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Yes — core contains TypeScript types and theme presets.
          </Text>
        </GTDetails>
      </View>

      <Text style={headingStyle}>Tabs</Text>
      <GTTabs
        tabs={[
          { id: 'a', label: 'Overview' },
          { id: 'b', label: 'Details' },
        ]}
      >
        <GTTabPanel id="a">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Overview content.
          </Text>
        </GTTabPanel>
        <GTTabPanel id="b">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Details content.
          </Text>
        </GTTabPanel>
      </GTTabs>
      <GTTabs
        variant="segment"
        tabs={[
          { id: 'vue', label: 'Vue' },
          { id: 'rn', label: 'React Native' },
        ]}
        style={{ marginTop: 16 }}
      >
        <GTTabPanel id="vue">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Vue 3.
          </Text>
        </GTTabPanel>
        <GTTabPanel id="rn">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            React Native.
          </Text>
        </GTTabPanel>
      </GTTabs>
      <GTTabs
        variant="pill"
        tabs={[
          { id: 'all', label: 'All' },
          { id: 'atoms', label: 'Atoms' },
        ]}
        style={{ marginTop: 16 }}
      >
        <GTTabPanel id="all">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            All components.
          </Text>
        </GTTabPanel>
        <GTTabPanel id="atoms">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Badge, Button, Input...
          </Text>
        </GTTabPanel>
      </GTTabs>

      <Text style={headingStyle}>Address Input</Text>
      <View style={{ zIndex: 20 }}>
        <GTAddressInput label="Adresse" placeholder="Indtast adresse..." />
      </View>

      <Text style={headingStyle}>Alert</Text>
      <View style={groupStyle}>
        <GTAlert variant="info" icon="info-circle">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            This is an informational message.
          </Text>
        </GTAlert>
        <GTAlert variant="success" icon="check-circle">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Your changes have been saved.
          </Text>
        </GTAlert>
        <GTAlert variant="warning" icon="alert-triangle" heading="Attention">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Your session will expire in 5 minutes.
          </Text>
        </GTAlert>
        <GTAlert variant="error" icon="alert-circle" heading="Form errors">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Please fix the errors before submitting.
          </Text>
        </GTAlert>
      </View>

      <Text style={headingStyle}>Card</Text>
      <View style={groupStyle}>
        <GTCard title="Standard Card" subheading="Raised">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Default raised variant with surface background.
          </Text>
        </GTCard>
        <GTCard
          nav
          onPress={() => {}}
          title="Navigation Card"
          subheading="Clickable"
        >
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Entire card is pressable.
          </Text>
        </GTCard>
        <GTCard variant="bordered" title="Bordered Card">
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Subtle border instead of elevation.
          </Text>
        </GTCard>
        <GTCard
          horizontal
          title="Horizontal Card"
          subheading="Feature"
          image={require('../../assets/images/placeholder-400x300.png')}
          imageAlt="Placeholder"
        >
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            }}
          >
            Image left, content right.
          </Text>
        </GTCard>
      </View>

      <Text style={headingStyle}>Spinner</Text>
      <View style={rowStyle}>
        <GTSpinner />
        <GTSpinner variant="light" />
      </View>
      <View style={groupStyle}>
        <GTSpinner size="lg" text="Henter data…" />
      </View>

      <Text style={headingStyle}>Radio &amp; Checkbox</Text>
      <GTRadioGroup
        value={radioValue}
        onValueChange={setRadioValue}
        label="Sagen handler om"
        options={[
          { value: 'insurance', label: 'Ulykkesforsikring' },
          { value: 'liability', label: 'Erstatningsansvar' },
          { value: 'company', label: 'Forsikringsselskab' },
        ]}
      />
      <View style={{ marginTop: 12 }}>
        <GTCheckboxGroup
          value={checkboxValues}
          onValueChange={setCheckboxValues}
          label="Nationalitet"
          helpText="Angiv alle der gælder"
          options={[
            { value: 'dk', label: 'Dansk' },
            { value: 'se', label: 'Svensk' },
            { value: 'other', label: 'Anden' },
          ]}
        />
      </View>

      <Text style={headingStyle}>Modal</Text>
      <View style={rowStyle}>
        <GTButton
          size="sm"
          variant="primary"
          onPress={() => setShowModal(true)}
        >
          Standard
        </GTButton>
        <GTButton
          size="sm"
          variant="negative"
          onPress={() => setShowPersistent(true)}
        >
          Persistent
        </GTButton>
      </View>
      <GTModal
        open={showModal}
        title="Bekræft handling"
        onClose={() => setShowModal(false)}
        footer={
          <View style={rowStyle}>
            <GTButton
              size="sm"
              variant="outlined"
              onPress={() => setShowModal(false)}
            >
              Annuller
            </GTButton>
            <GTButton
              size="sm"
              variant="primary"
              onPress={() => setShowModal(false)}
            >
              Bekræft
            </GTButton>
          </View>
        }
      >
        <Text style={{ color: theme.colors.text }}>Er du sikker?</Text>
      </GTModal>
      <GTModal
        open={showPersistent}
        title="Slet konto?"
        persistent
        onClose={() => setShowPersistent(false)}
        footer={
          <View style={rowStyle}>
            <GTButton
              size="sm"
              variant="outlined"
              onPress={() => setShowPersistent(false)}
            >
              Annuller
            </GTButton>
            <GTButton
              size="sm"
              variant="negative"
              onPress={() => setShowPersistent(false)}
            >
              Slet
            </GTButton>
          </View>
        }
      >
        <Text style={{ color: theme.colors.text }}>
          Denne handling kan ikke fortrydes.
        </Text>
      </GTModal>

      <Text style={headingStyle}>Toggle</Text>
      <View style={groupStyle}>
        <GTToggle
          value={isDark}
          onValueChange={v => setMode(v ? 'dark' : 'light')}
          label="Dark mode"
        />
        <GTToggle
          value={toggleSm}
          onValueChange={setToggleSm}
          label="Small"
          size="sm"
        />
        <GTToggle
          value={toggleLg}
          onValueChange={setToggleLg}
          label="Large"
          size="lg"
        />
        <GTToggle value={true} disabled label="Disabled" />
      </View>

      <Text style={headingStyle}>Theme mode</Text>
      <View style={rowStyle}>
        <GTButton
          size="sm"
          variant={mode === 'light' ? 'primary' : 'outlined'}
          onPress={() => setMode('light')}
        >
          Light
        </GTButton>
        <GTButton
          size="sm"
          variant={mode === 'dark' ? 'primary' : 'outlined'}
          onPress={() => setMode('dark')}
        >
          Dark
        </GTButton>
        <GTButton
          size="sm"
          variant={mode === 'auto' ? 'primary' : 'outlined'}
          onPress={() => setMode('auto')}
        >
          Auto
        </GTButton>
      </View>

      <Text style={headingStyle}>Variants</Text>
      <View style={rowStyle}>
        <GTButton variant="primary" onPress={() => {}}>
          Primary
        </GTButton>
        <GTButton variant="secondary" onPress={() => {}}>
          Secondary
        </GTButton>
        <GTButton variant="outlined" onPress={() => {}}>
          Outlined
        </GTButton>
        <GTButton variant="negative" onPress={() => {}}>
          Negative
        </GTButton>
        <GTButton variant="unstyled" onPress={() => {}}>
          Unstyled
        </GTButton>
      </View>

      <Text style={headingStyle}>Sizes</Text>
      <View style={rowStyle}>
        <GTButton size="sm" onPress={() => {}}>
          Small
        </GTButton>
        <GTButton size="md" onPress={() => {}}>
          Medium
        </GTButton>
        <GTButton size="lg" onPress={() => {}}>
          Large
        </GTButton>
      </View>

      <Text style={headingStyle}>Rounded</Text>
      <View style={rowStyle}>
        <GTButton rounded="none" onPress={() => {}}>
          none
        </GTButton>
        <GTButton rounded="sm" onPress={() => {}}>
          sm
        </GTButton>
        <GTButton onPress={() => {}}>md (default)</GTButton>
        <GTButton rounded="lg" onPress={() => {}}>
          lg
        </GTButton>
        <GTButton rounded="full" onPress={() => {}}>
          full
        </GTButton>
      </View>

      <Text style={headingStyle}>States</Text>
      <View style={groupStyle}>
        <GTButton disabled onPress={() => {}}>
          Disabled
        </GTButton>
        <GTButton loading={isLoading} onPress={simulateLoad}>
          {isLoading ? 'Saving...' : 'Click to load'}
        </GTButton>
        <GTButton block onPress={() => {}}>
          Block (full width)
        </GTButton>
      </View>

      <Text style={headingStyle}>Icon sizes</Text>
      <View style={rowStyle}>
        <GTIcon name="check" size="xs" color={theme.colors.text} />
        <GTIcon name="check" size="sm" color={theme.colors.text} />
        <GTIcon name="check" size="md" color={theme.colors.text} />
        <GTIcon name="check" size="lg" color={theme.colors.text} />
        <GTIcon name="check" size="xl" color={theme.colors.text} />
        <GTIcon name="check" size="2xl" color={theme.colors.text} />
      </View>

      <Text style={headingStyle}>Button with icon</Text>
      <View style={rowStyle}>
        <GTButton variant="primary" onPress={() => {}}>
          <GTIcon name="check" size="sm" color={theme.colors.onPrimary} />
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontFamily: theme.typography.fontFamily.base,
            }}
          >
            Confirm
          </Text>
        </GTButton>
        <GTButton variant="negative" onPress={() => {}}>
          <GTIcon name="close" size="sm" color={theme.colors.onPrimary} />
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontFamily: theme.typography.fontFamily.base,
            }}
          >
            Delete
          </Text>
        </GTButton>
        <GTButton variant="outlined" onPress={() => {}}>
          <GTIcon name="search" size="sm" color={theme.colors.primary} />
          <Text
            style={{
              color: theme.colors.primary,
              fontFamily: theme.typography.fontFamily.base,
            }}
          >
            Search
          </Text>
        </GTButton>
      </View>
      <Text style={headingStyle}>Input sizes</Text>
      <View style={groupStyle}>
        <GTInput
          value={inputValue}
          onChangeText={setInputValue}
          size="sm"
          placeholder="Small input"
        />
        <GTInput
          value={inputValue}
          onChangeText={setInputValue}
          size="md"
          placeholder="Medium input"
        />
        <GTInput
          value={inputValue}
          onChangeText={setInputValue}
          size="lg"
          placeholder="Large input"
        />
      </View>

      <Text style={headingStyle}>Input with label &amp; help</Text>
      <View style={groupStyle}>
        <GTInput
          value={inputValue}
          onChangeText={setInputValue}
          label="Full name"
          placeholder="John Doe"
          helpText="Enter your full legal name"
          required
        />
        <GTInput
          value={emailValue}
          onChangeText={setEmailValue}
          type="email"
          label="Email"
          placeholder="john@example.com"
        />
      </View>

      <Text style={headingStyle}>Input states</Text>
      <View style={groupStyle}>
        <GTInput label="Disabled" disabled value="Cannot edit" />
        <GTInput label="Readonly" readonly value="Read only value" />
        <GTInput
          value={errorValue}
          onChangeText={setErrorValue}
          label="With error"
          errorText="This field is required"
          placeholder="Type something..."
        />
      </View>

      <Text style={headingStyle}>Prefix &amp; suffix</Text>
      <View style={groupStyle}>
        <GTInput
          label="Amount"
          prefix="kr."
          placeholder="0,00"
          helpText="Enter amount in DKK"
        />
        <GTInput label="Weight" suffix="kg" placeholder="0" type="number" />
      </View>

      <Text style={headingStyle}>Optional fields</Text>
      <View style={groupStyle}>
        <GTInput label="Name" placeholder="John Doe" required />
        <GTInput
          label="Phone"
          optionalLabel="(valgfrit)"
          placeholder="12345678"
          type="tel"
        />
      </View>

      <Text style={headingStyle}>Input types</Text>
      <View style={groupStyle}>
        <GTInput
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        <GTInput type="search" label="Search" placeholder="Search..." />
        <GTInput type="number" label="Amount" placeholder="0" />
      </View>

      <Text style={headingStyle}>
        Validation (useField + useFormValidation)
      </Text>
      <View style={groupStyle}>
        <GTInput
          {...nameField.fieldProps}
          errorText={nameField.errorText}
          label="Name"
          placeholder="Enter your name"
          required
        />
        <GTInput
          {...emailField.fieldProps}
          errorText={emailField.errorText}
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <View style={rowStyle}>
          <GTButton variant="primary" onPress={onValidationSubmit}>
            Submit
          </GTButton>
          <GTButton
            variant="outlined"
            onPress={() => {
              form.resetAll();
              setFormResult('');
            }}
          >
            Reset
          </GTButton>
        </View>
        {formResult ? (
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
            }}
          >
            {formResult}
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

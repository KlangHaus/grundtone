import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import {
  GTButton,
  GTIcon,
  GTInput,
  useGrundtoneTheme,
  useField,
  useFormValidation,
  required,
  email,
  minLength,
} from '@grundtone/react-native';

export default function ComponentsScreen() {
  const { theme } = useGrundtoneTheme();
  const [isLoading, setIsLoading] = useState(false);
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

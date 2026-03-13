import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {
  GTButton,
  GTIcon,
  GTInput,
  useGrundtoneTheme,
  useField,
  useFormValidation,
} from '@grundtone/react-native';
import { required, email, minLength } from '@grundtone/utils';

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
        Grundtone Expo Playground
      </Text>

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Variants
      </Text>
      <View style={styles.row}>
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

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Sizes
      </Text>
      <View style={styles.row}>
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

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Rounded
      </Text>
      <View style={styles.row}>
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

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        States
      </Text>
      <View style={styles.group}>
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

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Icon sizes
      </Text>
      <View style={styles.row}>
        <GTIcon name="check" size="xs" color={theme.colors.text} />
        <GTIcon name="check" size="sm" color={theme.colors.text} />
        <GTIcon name="check" size="md" color={theme.colors.text} />
        <GTIcon name="check" size="lg" color={theme.colors.text} />
        <GTIcon name="check" size="xl" color={theme.colors.text} />
        <GTIcon name="check" size="2xl" color={theme.colors.text} />
      </View>

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Button with icon
      </Text>
      <View style={styles.row}>
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
      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Input sizes
      </Text>
      <View style={styles.group}>
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

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Input with label &amp; help
      </Text>
      <View style={styles.group}>
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

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Input states
      </Text>
      <View style={styles.group}>
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

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Input types
      </Text>
      <View style={styles.group}>
        <GTInput
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        <GTInput type="search" label="Search" placeholder="Search..." />
        <GTInput type="number" label="Amount" placeholder="0" />
      </View>

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
          },
        ]}
      >
        Validation (useField + useFormValidation)
      </Text>
      <View style={styles.group}>
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
        <View style={styles.row}>
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
  },
  group: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
});

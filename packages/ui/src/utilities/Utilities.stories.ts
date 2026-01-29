import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, computed } from 'vue';
import {
  formatCurrency,
  formatDate,
  formatPhoneNumber,
  isValidCPR,
  isValidEmail,
  isValidPhoneNumber,
} from '@ipeeon/shared';
import './Utilities.stories.scss';

// Demo component for utility functions
const UtilitiesDemo = {
  template: `
    <div class="utilities-demo">
      <h2>Danish Utility Functions Demo</h2>
      
      <!-- Currency Formatting -->
      <section class="demo-section">
        <h3>Currency Formatting</h3>
        <div class="input-group">
          <label>Amount:</label>
          <input 
            v-model.number="currencyAmount" 
            type="number" 
            step="0.01"
            placeholder="Enter amount"
          />
        </div>
        <div class="input-group">
          <label>Currency:</label>
          <select v-model="currency">
            <option value="DKK">DKK (Danish Kroner)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="USD">USD (US Dollar)</option>
            <option value="SEK">SEK (Swedish Krona)</option>
            <option value="NOK">NOK (Norwegian Krone)</option>
          </select>
        </div>
        <div class="result">
          <strong>Formatted: {{ formatCurrency(currencyAmount || 0, currency) }}</strong>
        </div>
        <div class="examples">
          <h4>Examples:</h4>
          <ul>
            <li>{{ formatCurrency(1234.56, 'DKK') }}</li>
            <li>{{ formatCurrency(999.99, 'EUR') }}</li>
            <li>{{ formatCurrency(42.50, 'USD') }}</li>
          </ul>
        </div>
      </section>

      <!-- Date Formatting -->
      <section class="demo-section">
        <h3>Danish Date Formatting</h3>
        <div class="input-group">
          <label>Select Date:</label>
          <input 
            v-model="selectedDate" 
            type="date"
          />
        </div>
        <div class="result">
          <strong>Formatted: {{ formatDate(selectedDate || new Date()) }}</strong>
        </div>
        <div class="examples">
          <h4>Examples:</h4>
          <ul>
            <li>{{ formatDate('2024-01-15') }}</li>
            <li>{{ formatDate('2024-12-25') }}</li>
            <li>{{ formatDate(new Date()) }}</li>
          </ul>
        </div>
      </section>

      <!-- Phone Number Formatting -->
      <section class="demo-section">
        <h3>Danish Phone Number</h3>
        <div class="input-group">
          <label>Phone Number:</label>
          <input 
            v-model="phoneNumber" 
            type="text"
            placeholder="Enter Danish phone number (8 digits)"
            maxlength="8"
          />
        </div>
        <div class="result">
          <strong>Formatted: {{ formatPhoneNumber(phoneNumber || '') }}</strong>
        </div>
        <div class="validation-result">
          <span :class="phoneValidationClass">
            {{ phoneNumber ? (isValidPhoneNumber(phoneNumber) ? '✓ Valid' : '✗ Invalid') : 'Enter a phone number' }}
          </span>
        </div>
        <div class="examples">
          <h4>Examples:</h4>
          <ul>
            <li>12345678 → {{ formatPhoneNumber('12345678') }}</li>
            <li>87654321 → {{ formatPhoneNumber('87654321') }}</li>
          </ul>
        </div>
      </section>

      <!-- CPR Number Validation -->
      <section class="demo-section">
        <h3>Danish CPR Number Validation</h3>
        <div class="input-group">
          <label>CPR Number:</label>
          <input 
            v-model="cprNumber" 
            type="text"
            placeholder="Enter CPR number (XXXXXX-XXXX or XXXXXXXXXX)"
            maxlength="11"
          />
        </div>
        <div class="validation-result">
          <span :class="cprValidationClass">
            {{ cprNumber ? (isValidCPR(cprNumber) ? '✓ Valid CPR' : '✗ Invalid CPR') : 'Enter a CPR number' }}
          </span>
        </div>
        <div class="info">
          <p><strong>CPR Format:</strong> 6-digit birthdate + 4-digit sequence number</p>
          <p><strong>Example:</strong> 123456-7890 or 1234567890</p>
          <p><strong>Validation:</strong> Uses modulus 11 check digit algorithm</p>
        </div>
        <div class="examples">
          <h4>Test Examples:</h4>
          <ul>
            <li>123456-7890: {{ isValidCPR('123456-7890') ? 'Valid' : 'Invalid' }}</li>
            <li>1234567890: {{ isValidCPR('1234567890') ? 'Valid' : 'Invalid' }}</li>
            <li>000000-0000: {{ isValidCPR('000000-0000') ? 'Valid' : 'Invalid' }}</li>
          </ul>
        </div>
      </section>

      <!-- Email Validation -->
      <section class="demo-section">
        <h3>Email Validation</h3>
        <div class="input-group">
          <label>Email Address:</label>
          <input 
            v-model="emailAddress" 
            type="email"
            placeholder="Enter email address"
          />
        </div>
        <div class="validation-result">
          <span :class="emailValidationClass">
            {{ emailAddress ? (isValidEmail(emailAddress) ? '✓ Valid Email' : '✗ Invalid Email') : 'Enter an email' }}
          </span>
        </div>
        <div class="examples">
          <h4>Examples:</h4>
          <ul>
            <li>user@example.com: {{ isValidEmail('user@example.com') ? 'Valid' : 'Invalid' }}</li>
            <li>test@domain.dk: {{ isValidEmail('test@domain.dk') ? 'Valid' : 'Invalid' }}</li>
            <li>invalid.email: {{ isValidEmail('invalid.email') ? 'Valid' : 'Invalid' }}</li>
          </ul>
        </div>
      </section>

      <!-- Combined Example -->
      <section class="demo-section">
        <h3>Combined Registration Form</h3>
        <div class="form-grid">
          <div class="input-group">
            <label>Full Name:</label>
            <input v-model="formData.name" type="text" placeholder="Enter full name" />
          </div>
          <div class="input-group">
            <label>Email:</label>
            <input v-model="formData.email" type="email" placeholder="Enter email" />
            <span :class="formData.email ? (isValidEmail(formData.email) ? 'valid' : 'invalid') : ''">
              {{ formData.email ? (isValidEmail(formData.email) ? '✓' : '✗') : '' }}
            </span>
          </div>
          <div class="input-group">
            <label>CPR Number:</label>
            <input v-model="formData.cpr" type="text" placeholder="Enter CPR number" />
            <span :class="formData.cpr ? (isValidCPR(formData.cpr) ? 'valid' : 'invalid') : ''">
              {{ formData.cpr ? (isValidCPR(formData.cpr) ? '✓' : '✗') : '' }}
            </span>
          </div>
          <div class="input-group">
            <label>Phone:</label>
            <input v-model="formData.phone" type="text" placeholder="Enter phone number" />
            <span>{{ formData.phone ? formatPhoneNumber(formData.phone) : '' }}</span>
          </div>
          <div class="input-group">
            <label>Salary:</label>
            <input v-model.number="formData.salary" type="number" placeholder="Enter annual salary" />
            <span>{{ formData.salary ? formatCurrency(formData.salary) : '' }}</span>
          </div>
          <div class="input-group">
            <label>Birth Date:</label>
            <input v-model="formData.birthDate" type="date" />
            <span>{{ formData.birthDate ? formatDate(formData.birthDate) : '' }}</span>
          </div>
        </div>
        <div class="form-summary">
          <h4>Form Validation Summary:</h4>
          <ul>
            <li>Name: {{ formData.name ? '✓ Provided' : '✗ Required' }}</li>
            <li>Email: {{ formData.email ? (isValidEmail(formData.email) ? '✓ Valid' : '✗ Invalid') : '✗ Required' }}</li>
            <li>CPR: {{ formData.cpr ? (isValidCPR(formData.cpr) ? '✓ Valid' : '✗ Invalid') : '✗ Required' }}</li>
            <li>Phone: {{ formData.phone ? (isValidPhoneNumber(formData.phone) ? '✓ Valid' : '✗ Invalid') : '✗ Required' }}</li>
          </ul>
          <p><strong>Form Valid:</strong> {{ isFormValid ? '✓ Yes' : '✗ No' }}</p>
        </div>
      </section>
    </div>
  `,
  setup() {
    // Currency demo
    const currencyAmount = ref(1234.56);
    const currency = ref('DKK');

    // Date demo
    const selectedDate = ref(new Date().toISOString().split('T')[0]);

    // Phone demo
    const phoneNumber = ref('');
    const phoneValidationClass = computed(() =>
      phoneNumber.value
        ? isValidPhoneNumber(phoneNumber.value)
          ? 'valid'
          : 'invalid'
        : '',
    );

    // CPR demo
    const cprNumber = ref('');
    const cprValidationClass = computed(() =>
      cprNumber.value
        ? isValidCPR(cprNumber.value)
          ? 'valid'
          : 'invalid'
        : '',
    );

    // Email demo
    const emailAddress = ref('');
    const emailValidationClass = computed(() =>
      emailAddress.value
        ? isValidEmail(emailAddress.value)
          ? 'valid'
          : 'invalid'
        : '',
    );

    // Combined form
    const formData = ref({
      name: '',
      email: '',
      cpr: '',
      phone: '',
      salary: null as number | null,
      birthDate: '',
    });

    const isFormValid = computed(() => {
      return (
        formData.value.name &&
        isValidEmail(formData.value.email) &&
        isValidCPR(formData.value.cpr) &&
        isValidPhoneNumber(formData.value.phone)
      );
    });

    return {
      // Utility functions
      formatCurrency,
      formatDate,
      formatPhoneNumber,
      isValidCPR,
      isValidEmail,
      isValidPhoneNumber,

      // Reactive data
      currencyAmount,
      currency,
      selectedDate,
      phoneNumber,
      phoneValidationClass,
      cprNumber,
      cprValidationClass,
      emailAddress,
      emailValidationClass,
      formData,
      isFormValid,
    };
  },
};

const meta: Meta = {
  title: 'Utilities/Danish Utils',
  component: UtilitiesDemo,
  parameters: {
    docs: {
      description: {
        component: `
# Danish Utility Functions

This collection provides essential utilities for Danish localization and validation:

## Currency Formatting
- **formatCurrency()** - Formats numbers as Danish currency (DKK) with proper locale
- Supports multiple currencies with Danish locale formatting
- Uses Intl.NumberFormat for proper localization

## Date Formatting  
- **formatDate()** - Formats dates in Danish locale (dd. month yyyy)
- Accepts both Date objects and ISO date strings
- Returns localized Danish date format

## Phone Number Utilities
- **formatPhoneNumber()** - Formats 8-digit Danish phone numbers (XX XX XX XX)
- **isValidPhoneNumber()** - Validates Danish phone number format
- Supports Danish mobile and landline formats

## CPR Number Validation
- **isValidCPR()** - Validates Danish CPR (Central Person Registry) numbers
- Implements modulus 11 check digit validation
- Accepts both hyphenated (XXXXXX-XXXX) and continuous (XXXXXXXXXX) formats

## Email Validation
- **isValidEmail()** - Basic email format validation
- Uses standard email regex pattern
- Suitable for client-side validation

## Performance Notes
- All functions are lightweight and performant
- No external dependencies beyond Intl API
- Suitable for real-time validation in forms

## Usage Examples
See the interactive demos below for comprehensive usage examples and edge cases.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InteractiveDemo: Story = {
  render: () => UtilitiesDemo,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for testing all Danish utility functions with real-time validation and formatting.',
      },
    },
  },
};

export const CurrencyFormatting: Story = {
  render: () => ({
    template: `
      <div class="utility-showcase">
        <h3>Currency Formatting Examples</h3>
        <div class="examples-grid">
          <div class="example">
            <code>formatCurrency(1234.56)</code>
            <div class="result">{{ formatCurrency(1234.56) }}</div>
          </div>
          <div class="example">
            <code>formatCurrency(999.99, 'EUR')</code>
            <div class="result">{{ formatCurrency(999.99, 'EUR') }}</div>
          </div>
          <div class="example">
            <code>formatCurrency(0.50, 'DKK')</code>
            <div class="result">{{ formatCurrency(0.50, 'DKK') }}</div>
          </div>
          <div class="example">
            <code>formatCurrency(1000000, 'DKK')</code>
            <div class="result">{{ formatCurrency(1000000, 'DKK') }}</div>
          </div>
        </div>
      </div>
    `,
    setup() {
      return { formatCurrency };
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates currency formatting with various amounts and currencies using Danish locale.',
      },
    },
  },
};

export const DateFormatting: Story = {
  render: () => ({
    template: `
      <div class="utility-showcase">
        <h3>Danish Date Formatting Examples</h3>
        <div class="examples-grid">
          <div class="example">
            <code>formatDate('2024-01-15')</code>
            <div class="result">{{ formatDate('2024-01-15') }}</div>
          </div>
          <div class="example">
            <code>formatDate('2024-12-25')</code>
            <div class="result">{{ formatDate('2024-12-25') }}</div>
          </div>
          <div class="example">
            <code>formatDate(new Date())</code>
            <div class="result">{{ formatDate(new Date()) }}</div>
          </div>
          <div class="example">
            <code>formatDate('2024-06-05')</code>
            <div class="result">{{ formatDate('2024-06-05') }}</div>
          </div>
        </div>
        <div class="note">
          <p><strong>Note:</strong> Dates are formatted using Danish locale (da-DK) showing full month names in Danish.</p>
        </div>
      </div>
    `,
    setup() {
      return { formatDate };
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Shows Danish date formatting with various date inputs and formats.',
      },
    },
  },
};

export const PhoneNumberValidation: Story = {
  render: () => ({
    template: `
      <div class="utility-showcase">
        <h3>Danish Phone Number Validation</h3>
        <div class="examples-grid">
          <div class="example">
            <code>formatPhoneNumber('12345678')</code>
            <div class="result">{{ formatPhoneNumber('12345678') }} 
              <span class="valid">{{ isValidPhoneNumber('12345678') ? '✓ Valid' : '✗ Invalid' }}</span>
            </div>
          </div>
          <div class="example">
            <code>formatPhoneNumber('87654321')</code>
            <div class="result">{{ formatPhoneNumber('87654321') }} 
              <span class="valid">{{ isValidPhoneNumber('87654321') ? '✓ Valid' : '✗ Invalid' }}</span>
            </div>
          </div>
          <div class="example">
            <code>formatPhoneNumber('123456789')</code>
            <div class="result">{{ formatPhoneNumber('123456789') }} 
              <span class="invalid">{{ isValidPhoneNumber('123456789') ? '✓ Valid' : '✗ Invalid (9 digits)' }}</span>
            </div>
          </div>
          <div class="example">
            <code>formatPhoneNumber('1234567')</code>
            <div class="result">{{ formatPhoneNumber('1234567') }} 
              <span class="invalid">{{ isValidPhoneNumber('1234567') ? '✓ Valid' : '✗ Invalid (7 digits)' }}</span>
            </div>
          </div>
        </div>
        <div class="note">
          <p><strong>Danish phone numbers:</strong> Exactly 8 digits, formatted as XX XX XX XX</p>
        </div>
      </div>
    `,
    setup() {
      return { formatPhoneNumber, isValidPhoneNumber };
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates Danish phone number formatting and validation with valid and invalid examples.',
      },
    },
  },
};

export const CPRValidation: Story = {
  render: () => ({
    template: `
      <div class="utility-showcase">
        <h3>Danish CPR Number Validation</h3>
        <div class="examples-grid">
          <div class="example">
            <code>isValidCPR('123456-7890')</code>
            <div class="result">
              <span :class="isValidCPR('123456-7890') ? 'valid' : 'invalid'">
                {{ isValidCPR('123456-7890') ? '✓ Valid' : '✗ Invalid' }}
              </span>
            </div>
          </div>
          <div class="example">
            <code>isValidCPR('1234567890')</code>
            <div class="result">
              <span :class="isValidCPR('1234567890') ? 'valid' : 'invalid'">
                {{ isValidCPR('1234567890') ? '✓ Valid' : '✗ Invalid' }}
              </span>
            </div>
          </div>
          <div class="example">
            <code>isValidCPR('000000-0000')</code>
            <div class="result">
              <span :class="isValidCPR('000000-0000') ? 'valid' : 'invalid'">
                {{ isValidCPR('000000-0000') ? '✓ Valid' : '✗ Invalid' }}
              </span>
            </div>
          </div>
          <div class="example">
            <code>isValidCPR('123456-789')</code>
            <div class="result">
              <span :class="isValidCPR('123456-789') ? 'valid' : 'invalid'">
                {{ isValidCPR('123456-789') ? '✓ Valid' : '✗ Invalid (wrong length)' }}
              </span>
            </div>
          </div>
        </div>
        <div class="algorithm-explanation">
          <h4>CPR Validation Algorithm</h4>
          <ol>
            <li>Remove all non-digit characters</li>
            <li>Check that exactly 10 digits remain</li>
            <li>Apply modulus 11 check with weights [4,3,2,7,6,5,4,3,2,1]</li>
            <li>Sum of (digit × weight) must be divisible by 11</li>
          </ol>
          <p><strong>Format:</strong> DDMMYY-XXXX where DD=day, MM=month, YY=year, XXXX=sequence</p>
        </div>
      </div>
    `,
    setup() {
      return { isValidCPR };
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates CPR number validation with the modulus 11 algorithm used by Danish authorities.',
      },
    },
  },
};

export const EmailValidation: Story = {
  render: () => ({
    template: `
      <div class="utility-showcase">
        <h3>Email Validation Examples</h3>
        <div class="examples-grid">
          <div class="example">
            <code>isValidEmail('user@example.com')</code>
            <div class="result">
              <span class="valid">{{ isValidEmail('user@example.com') ? '✓ Valid' : '✗ Invalid' }}</span>
            </div>
          </div>
          <div class="example">
            <code>isValidEmail('test@domain.dk')</code>
            <div class="result">
              <span class="valid">{{ isValidEmail('test@domain.dk') ? '✓ Valid' : '✗ Invalid' }}</span>
            </div>
          </div>
          <div class="example">
            <code>isValidEmail('user+tag@gmail.com')</code>
            <div class="result">
              <span class="valid">{{ isValidEmail('user+tag@gmail.com') ? '✓ Valid' : '✗ Invalid' }}</span>
            </div>
          </div>
          <div class="example">
            <code>isValidEmail('invalid.email')</code>
            <div class="result">
              <span class="invalid">{{ isValidEmail('invalid.email') ? '✓ Valid' : '✗ Invalid (no @)' }}</span>
            </div>
          </div>
          <div class="example">
            <code>isValidEmail('user@')</code>
            <div class="result">
              <span class="invalid">{{ isValidEmail('user@') ? '✓ Valid' : '✗ Invalid (no domain)' }}</span>
            </div>
          </div>
          <div class="example">
            <code>isValidEmail('@domain.com')</code>
            <div class="result">
              <span class="invalid">{{ isValidEmail('@domain.com') ? '✓ Valid' : '✗ Invalid (no user)' }}</span>
            </div>
          </div>
        </div>
        <div class="note">
          <p><strong>Pattern:</strong> /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</p>
          <p>Basic email validation suitable for client-side checks.</p>
        </div>
      </div>
    `,
    setup() {
      return { isValidEmail };
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Shows email validation with various valid and invalid email formats.',
      },
    },
  },
};

export const RealTimeFormValidation: Story = {
  render: () => ({
    template: `
      <div class="form-demo">
        <h3>Real-time Danish Form Validation</h3>
        <form @submit.prevent="handleSubmit" class="validation-form">
          <div class="field-group">
            <label for="name">Navn (Name):</label>
            <input 
              id="name"
              v-model="form.name" 
              type="text" 
              :class="{ 'valid': form.name.length > 0 }"
              placeholder="Indtast dit navn"
            />
            <span class="status">{{ form.name ? '✓' : '✗' }}</span>
          </div>

          <div class="field-group">
            <label for="email">Email:</label>
            <input 
              id="email"
              v-model="form.email" 
              type="email" 
              :class="{ 'valid': isValidEmail(form.email), 'invalid': form.email && !isValidEmail(form.email) }"
              placeholder="Indtast din email"
            />
            <span class="status" :class="{ 'valid': isValidEmail(form.email), 'invalid': form.email && !isValidEmail(form.email) }">
              {{ form.email ? (isValidEmail(form.email) ? '✓' : '✗') : '✗' }}
            </span>
          </div>

          <div class="field-group">
            <label for="cpr">CPR nummer:</label>
            <input 
              id="cpr"
              v-model="form.cpr" 
              type="text" 
              :class="{ 'valid': isValidCPR(form.cpr), 'invalid': form.cpr && !isValidCPR(form.cpr) }"
              placeholder="DDMMYY-XXXX eller DDMMYYXXXX"
              maxlength="11"
            />
            <span class="status" :class="{ 'valid': isValidCPR(form.cpr), 'invalid': form.cpr && !isValidCPR(form.cpr) }">
              {{ form.cpr ? (isValidCPR(form.cpr) ? '✓' : '✗') : '✗' }}
            </span>
          </div>

          <div class="field-group">
            <label for="phone">Telefon:</label>
            <input 
              id="phone"
              v-model="form.phone" 
              type="text" 
              :class="{ 'valid': isValidPhoneNumber(form.phone), 'invalid': form.phone && !isValidPhoneNumber(form.phone) }"
              placeholder="8 cifre (f.eks. 12345678)"
              maxlength="8"
            />
            <span class="formatted">{{ form.phone ? formatPhoneNumber(form.phone) : '' }}</span>
            <span class="status" :class="{ 'valid': isValidPhoneNumber(form.phone), 'invalid': form.phone && !isValidPhoneNumber(form.phone) }">
              {{ form.phone ? (isValidPhoneNumber(form.phone) ? '✓' : '✗') : '✗' }}
            </span>
          </div>

          <div class="field-group">
            <label for="salary">Årlig løn:</label>
            <input 
              id="salary"
              v-model.number="form.salary" 
              type="number" 
              :class="{ 'valid': form.salary > 0 }"
              placeholder="Indtast årlig løn"
              min="0"
            />
            <span class="formatted">{{ form.salary ? formatCurrency(form.salary) : '' }}</span>
            <span class="status">{{ form.salary > 0 ? '✓' : '✗' }}</span>
          </div>

          <div class="validation-summary">
            <h4>Form Status:</h4>
            <div class="summary-grid">
              <div :class="{ 'valid': form.name, 'invalid': !form.name }">
                Navn: {{ form.name ? 'OK' : 'Påkrævet' }}
              </div>
              <div :class="{ 'valid': isValidEmail(form.email), 'invalid': !isValidEmail(form.email) }">
                Email: {{ isValidEmail(form.email) ? 'OK' : 'Ugyldig' }}
              </div>
              <div :class="{ 'valid': isValidCPR(form.cpr), 'invalid': !isValidCPR(form.cpr) }">
                CPR: {{ isValidCPR(form.cpr) ? 'OK' : 'Ugyldig' }}
              </div>
              <div :class="{ 'valid': isValidPhoneNumber(form.phone), 'invalid': !isValidPhoneNumber(form.phone) }">
                Telefon: {{ isValidPhoneNumber(form.phone) ? 'OK' : 'Ugyldig' }}
              </div>
              <div :class="{ 'valid': form.salary > 0, 'invalid': !(form.salary > 0) }">
                Løn: {{ form.salary > 0 ? 'OK' : 'Påkrævet' }}
              </div>
            </div>
            <div class="form-valid-status" :class="{ 'valid': isFormValid, 'invalid': !isFormValid }">
              <strong>Form er {{ isFormValid ? 'gyldig ✓' : 'ugyldig ✗' }}</strong>
            </div>
          </div>

          <button type="submit" :disabled="!isFormValid" class="submit-btn">
            {{ isFormValid ? 'Send formular' : 'Udfyld alle felter korrekt' }}
          </button>
        </form>
      </div>
    `,
    setup() {
      const form = ref({
        name: '',
        email: '',
        cpr: '',
        phone: '',
        salary: 0,
      });

      const isFormValid = computed(() => {
        return (
          form.value.name &&
          isValidEmail(form.value.email) &&
          isValidCPR(form.value.cpr) &&
          isValidPhoneNumber(form.value.phone) &&
          form.value.salary > 0
        );
      });

      const handleSubmit = () => {
        if (isFormValid.value) {
          alert('Formular sendt! (Demo)');
        }
      };

      return {
        form,
        isFormValid,
        handleSubmit,
        formatCurrency,
        formatPhoneNumber,
        isValidCPR,
        isValidEmail,
        isValidPhoneNumber,
      };
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Complete Danish form with real-time validation using all utility functions together.',
      },
    },
  },
};

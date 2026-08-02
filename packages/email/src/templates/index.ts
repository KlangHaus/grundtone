import type { EmailTemplate } from '../template';
import { magicLink } from './magic-link';
import { verifyEmail } from './verify-email';
import { orgInvite } from './org-invite';
import { invoice } from './invoice';
import { viesVerificationFailed } from './vies-verification-failed';

export { magicLink, verifyEmail, orgInvite, invoice, viesVerificationFailed };

/** Locales every built-in template ships. */
export type BuiltinLocale = 'da' | 'en';
export const BUILTIN_LOCALES: BuiltinLocale[] = ['da', 'en'];

/** All built-in grundtone templates, for iteration (e.g. the publish step). */
export const templates: EmailTemplate<BuiltinLocale>[] = [
  magicLink,
  verifyEmail,
  orgInvite,
  invoice,
  viesVerificationFailed,
];

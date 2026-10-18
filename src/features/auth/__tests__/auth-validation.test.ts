import { describe, it, expect } from 'vitest';
import {
  validateLoginForm,
  validateRegistrationForm,
  AUTH_CONSTANTS,
} from '../utils/auth-validation';

describe('Auth Validation Utilities', () => {
  describe('validateLoginForm', () => {
    it('returns error when emailOrUsername is empty', () => {
      expect(validateLoginForm('', 'password123')).toBe(
        'Please enter both your email/username and password.',
      );
    });

    it('returns error when password is empty', () => {
      expect(validateLoginForm('user@test.com', '')).toBe(
        'Please enter both your email/username and password.',
      );
    });

    it('returns null when valid credentials provided', () => {
      expect(validateLoginForm('user@test.com', 'password123')).toBeNull();
    });
  });

  describe('validateRegistrationForm', () => {
    const validForm = {
      username: 'kuizu_hero',
      email: 'hero@kuizu.app',
      password: 'validPassword123',
    };

    it('returns null for valid registration data', () => {
      expect(validateRegistrationForm(validForm)).toBeNull();
    });

    it('enforces minimum username length', () => {
      expect(validateRegistrationForm({ ...validForm, username: 'ab' })).toBe(
        `Username must be at least ${AUTH_CONSTANTS.MIN_USERNAME_LENGTH} characters long.`,
      );
    });

    it('enforces maximum username length', () => {
      expect(
        validateRegistrationForm({
          ...validForm,
          username: 'a'.repeat(AUTH_CONSTANTS.MAX_USERNAME_LENGTH + 1),
        }),
      ).toBe(`Username cannot exceed ${AUTH_CONSTANTS.MAX_USERNAME_LENGTH} characters.`);
    });

    it('validates allowed username characters', () => {
      expect(
        validateRegistrationForm({ ...validForm, username: 'hero@invalid!' }),
      ).toBe('Username can only contain letters, numbers, and underscores.');
    });

    it('validates email format', () => {
      expect(
        validateRegistrationForm({ ...validForm, email: 'notanemail' }),
      ).toBe('Please enter a valid email address.');
    });

    it('enforces minimum password length', () => {
      expect(
        validateRegistrationForm({ ...validForm, password: 'short' }),
      ).toBe(`Password must be at least ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} characters long.`);
    });

    it('enforces maximum password length', () => {
      expect(
        validateRegistrationForm({
          ...validForm,
          password: 'p'.repeat(AUTH_CONSTANTS.MAX_PASSWORD_LENGTH + 1),
        }),
      ).toBe(`Password cannot exceed ${AUTH_CONSTANTS.MAX_PASSWORD_LENGTH} characters.`);
    });
  });
});

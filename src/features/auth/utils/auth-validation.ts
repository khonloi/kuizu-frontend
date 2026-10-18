export const AUTH_CONSTANTS = {
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 24,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 72,
  USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,
} as const;

export interface RegistrationInput {
  username: string;
  email: string;
  password: string;
}

export function validateLoginForm(
  emailOrUsername: string,
  password: string,
): string | null {
  if (!emailOrUsername.trim() || !password) {
    return 'Please enter both your email/username and password.';
  }
  return null;
}

export function validateRegistrationForm(input: RegistrationInput): string | null {
  const cleanUsername = input.username.trim();

  if (cleanUsername.length < AUTH_CONSTANTS.MIN_USERNAME_LENGTH) {
    return `Username must be at least ${AUTH_CONSTANTS.MIN_USERNAME_LENGTH} characters long.`;
  }

  if (cleanUsername.length > AUTH_CONSTANTS.MAX_USERNAME_LENGTH) {
    return `Username cannot exceed ${AUTH_CONSTANTS.MAX_USERNAME_LENGTH} characters.`;
  }

  if (!AUTH_CONSTANTS.USERNAME_REGEX.test(cleanUsername)) {
    return 'Username can only contain letters, numbers, and underscores.';
  }

  if (!input.email.includes('@')) {
    return 'Please enter a valid email address.';
  }

  if (input.password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} characters long.`;
  }

  if (input.password.length > AUTH_CONSTANTS.MAX_PASSWORD_LENGTH) {
    return `Password cannot exceed ${AUTH_CONSTANTS.MAX_PASSWORD_LENGTH} characters.`;
  }

  return null;
}

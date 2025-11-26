/**
 * Password validation utility
 * 
 * Validates passwords according to security requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 number
 * - At least 1 special character
 */

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a password against complexity requirements
 * @param password - The password to validate
 * @returns Validation result with errors array
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  // Minimum length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Number check
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Special character check
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Gets a user-friendly error message for password validation
 * @param result - Password validation result
 * @returns Combined error message or empty string if valid
 */
export function getPasswordErrorMessage(result: PasswordValidationResult): string {
  if (result.valid) {
    return '';
  }
  return result.errors.join('. ');
}


/**
 * @jest-environment jsdom
 */
import { validatePassword, getPasswordErrorMessage } from '@/lib/auth/password-validation';

/**
 * Unit tests for password validation utility
 * 
 * Tests password complexity requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 number
 * - At least 1 special character
 */

describe('Password Validation', () => {
  describe('validatePassword', () => {
    it('should accept a valid password', () => {
      const result = validatePassword('Password123!');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject password shorter than 8 characters', () => {
      const result = validatePassword('Pass1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });

    it('should reject password without uppercase letter', () => {
      const result = validatePassword('password123!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject password without number', () => {
      const result = validatePassword('Password!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should reject password without special character', () => {
      const result = validatePassword('Password123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character');
    });

    it('should reject password missing multiple requirements', () => {
      const result = validatePassword('pass');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });

    it('should accept password with various special characters', () => {
      const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '='];
      specialChars.forEach((char) => {
        const password = `Password1${char}`;
        const result = validatePassword(password);
        expect(result.valid).toBe(true);
      });
    });

    it('should handle empty password', () => {
      const result = validatePassword('');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('getPasswordErrorMessage', () => {
    it('should return empty string for valid password', () => {
      const result = validatePassword('Password123!');
      const message = getPasswordErrorMessage(result);
      expect(message).toBe('');
    });

    it('should return combined error messages for invalid password', () => {
      const result = validatePassword('pass');
      const message = getPasswordErrorMessage(result);
      expect(message).toBeTruthy();
      expect(message.length).toBeGreaterThan(0);
    });

    it('should join multiple errors with period and space', () => {
      const result = validatePassword('pass');
      const message = getPasswordErrorMessage(result);
      expect(message).toContain('. ');
    });
  });
});


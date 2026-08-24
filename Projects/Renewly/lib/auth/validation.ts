const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AUTH_PASSWORD_MIN_LENGTH = 8;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function validateEmail(value: string): string | undefined {
  const email = value.trim();
  if (!email) return "Enter your email.";
  if (!isValidEmail(email)) return "Enter a valid email address.";
  return undefined;
}

export function validatePassword(value: string, label = "Password"): string | undefined {
  if (!value) return `Enter your ${label.toLowerCase()}.`;
  if (value.length < AUTH_PASSWORD_MIN_LENGTH) {
    return `${label} must be at least ${AUTH_PASSWORD_MIN_LENGTH} characters.`;
  }
  return undefined;
}

export function validateName(value: string): string | undefined {
  if (!value.trim()) return "Enter your first name.";
  return undefined;
}

export function validatePasswordMatch(password: string, confirmPassword: string): string | undefined {
  if (!confirmPassword) return "Confirm your password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return undefined;
}

export function validateCode(value: string): string | undefined {
  const code = value.trim();
  if (!code) return "Enter the verification code.";
  if (!/^\d{6}$/.test(code)) return "Enter the 6-digit code from your email.";
  return undefined;
}

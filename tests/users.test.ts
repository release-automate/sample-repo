import { describe, it, expect } from 'vitest';

// Simple unit tests for user validation logic
// (In a real service these would use supertest against the Express app)

function validateUser(input: { name?: string; email?: string }) {
  const errors: string[] = [];
  if (!input.name?.trim())  errors.push('name is required');
  if (!input.email?.trim()) errors.push('email is required');
  if (input.email && !input.email.includes('@')) errors.push('email is invalid');
  return errors;
}

describe('User validation', () => {
  it('passes for valid input', () => {
    expect(validateUser({ name: 'Alice', email: 'alice@test.com' })).toHaveLength(0);
  });

  it('fails when name is missing', () => {
    expect(validateUser({ email: 'alice@test.com' })).toContain('name is required');
  });

  it('fails when email is missing', () => {
    expect(validateUser({ name: 'Alice' })).toContain('email is required');
  });

  it('fails for invalid email', () => {
    expect(validateUser({ name: 'Alice', email: 'not-an-email' })).toContain('email is invalid');
  });
});

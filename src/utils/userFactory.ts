import { randomUUID } from 'crypto';

export interface UserData {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

/**
 * Builds a unique test user. ParaBank is a shared public demo, so usernames
 * must be unique per test to keep tests independent and parallel-safe.
 */
export function buildUser(overrides: Partial<UserData> = {}): UserData {
  const suffix = randomUUID().replace(/-/g, '').slice(0, 10);
  return {
    firstName: 'Test',
    lastName: 'Automation',
    street: '12 Demo Street',
    city: 'Pune',
    state: 'MH',
    zipCode: '411001',
    phone: '9000000000',
    ssn: '123-45-6789', // dummy value for the demo app only
    username: `qe_${suffix}`,
    password: 'Passw0rd!123',
    ...overrides,
  };
}

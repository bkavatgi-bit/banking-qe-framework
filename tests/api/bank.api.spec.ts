import { test, expect } from '../../src/fixtures/test';

test.describe('Bank REST API', () => {
  test('@smoke @api login returns the registered customer', async ({ customer, loggedInUser }) => {
    expect(customer.id).toBeGreaterThan(0);
    expect(customer.firstName).toBe(loggedInUser.firstName);
    expect(customer.lastName).toBe(loggedInUser.lastName);
  });

  test('@regression @api login with a wrong password is rejected', async ({
    bankApi,
    loggedInUser,
  }) => {
    const response = await bankApi.loginRaw(loggedInUser.username, 'wrong-password');

    expect(response.ok()).toBeFalsy();
  });

  test('@smoke @api new customer already has an account with a balance', async ({
    bankApi,
    customer,
  }) => {
    const accounts = await bankApi.getAccounts(customer.id);

    expect(accounts.length).toBeGreaterThanOrEqual(1);
    for (const account of accounts) {
      expect(account.customerId).toBe(customer.id);
      expect(typeof account.balance).toBe('number');
    }
  });

  test('@smoke @api customer can create a savings account', async ({ bankApi, customer }) => {
    const [checking] = await bankApi.getAccounts(customer.id);

    const savings = await bankApi.createAccount(customer.id, 'SAVINGS', checking.id);

    expect(savings.type).toBe('SAVINGS');
    expect(savings.customerId).toBe(customer.id);
    const accountIds = (await bankApi.getAccounts(customer.id)).map((a) => a.id);
    expect(accountIds).toContain(savings.id);
  });

  test('@smoke @api funds transfer moves money between accounts', async ({
    bankApi,
    customer,
  }) => {
    const amount = 25;
    const [checking] = await bankApi.getAccounts(customer.id);
    const savings = await bankApi.createAccount(customer.id, 'SAVINGS', checking.id);
    const checkingBefore = await bankApi.getAccount(checking.id);
    const savingsBefore = await bankApi.getAccount(savings.id);

    await bankApi.transfer(checking.id, savings.id, amount);

    const checkingAfter = await bankApi.getAccount(checking.id);
    const savingsAfter = await bankApi.getAccount(savings.id);
    expect(checkingAfter.balance).toBeCloseTo(checkingBefore.balance - amount, 2);
    expect(savingsAfter.balance).toBeCloseTo(savingsBefore.balance + amount, 2);
  });
});

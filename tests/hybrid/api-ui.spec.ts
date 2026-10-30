import { test, expect } from '../../src/fixtures/test';

// Hybrid test: set up and act through the API (fast), verify through the UI
// (what the customer actually sees).
test.describe('API and UI together', () => {
  test('@smoke @hybrid a transfer made through the API is visible in the UI', async ({
    bankApi,
    customer,
    overviewPage,
  }) => {
    const amount = 25;
    const [checking] = await bankApi.getAccounts(customer.id);
    const savings = await bankApi.createAccount(customer.id, 'SAVINGS', checking.id);
    const checkingId = String(checking.id);
    const savingsId = String(savings.id);

    await overviewPage.open();
    const checkingBefore = await overviewPage.getBalance(checkingId);
    const savingsBefore = await overviewPage.getBalance(savingsId);

    await bankApi.transfer(checking.id, savings.id, amount);

    await overviewPage.open();
    expect(await overviewPage.getBalance(checkingId)).toBeCloseTo(checkingBefore - amount, 2);
    expect(await overviewPage.getBalance(savingsId)).toBeCloseTo(savingsBefore + amount, 2);
  });
});

import { test, expect } from '../../src/fixtures/test';

test.describe('Accounts and transfers', () => {
  test('@smoke customer can open a new savings account', async ({
    loggedInUser,
    openAccountPage,
    overviewPage,
  }) => {
    await openAccountPage.open();
    const savingsId = await openAccountPage.openAccount('SAVINGS');

    await overviewPage.open();
    expect(await overviewPage.getAccountIds()).toContain(savingsId);
  });

  test('@smoke funds transfer updates both account balances', async ({
    loggedInUser,
    openAccountPage,
    transferPage,
    overviewPage,
  }) => {
    const transferAmount = 50;

    await openAccountPage.open();
    const savingsId = await openAccountPage.openAccount('SAVINGS');

    await overviewPage.open();
    const checkingId = (await overviewPage.getAccountIds()).find((id) => id !== savingsId)!;
    const checkingBefore = await overviewPage.getBalance(checkingId);
    const savingsBefore = await overviewPage.getBalance(savingsId);

    await transferPage.open();
    await transferPage.transfer(transferAmount, checkingId, savingsId);
    await expect(transferPage.successHeading).toBeVisible();

    await overviewPage.open();
    expect(await overviewPage.getBalance(checkingId)).toBeCloseTo(checkingBefore - transferAmount, 2);
    expect(await overviewPage.getBalance(savingsId)).toBeCloseTo(savingsBefore + transferAmount, 2);
  });
});

import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { TransferPage } from '../pages/TransferPage';
import { BankApiClient } from '../api/BankApiClient';
import { buildUser, UserData } from '../utils/userFactory';
import { Customer } from '../types/bank';

type Fixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  overviewPage: AccountsOverviewPage;
  openAccountPage: OpenAccountPage;
  transferPage: TransferPage;
  bankApi: BankApiClient;
  newUser: UserData;
  /** A freshly registered customer who is already logged in (UI session). */
  loggedInUser: UserData;
  /** The same customer as returned by the REST API (gives us the customer id). */
  customer: Customer;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  overviewPage: async ({ page }, use) => use(new AccountsOverviewPage(page)),
  openAccountPage: async ({ page }, use) => use(new OpenAccountPage(page)),
  transferPage: async ({ page }, use) => use(new TransferPage(page)),
  bankApi: async ({ request }, use) => use(new BankApiClient(request)),
  newUser: async ({}, use) => use(buildUser()),
  loggedInUser: async ({ registerPage, newUser }, use) => {
    await registerPage.open();
    await registerPage.register(newUser);
    await expect(registerPage.successMessage).toBeVisible({ timeout: 15_000 });
    await use(newUser);
  },
  // ParaBank has no registration API, so the customer is created through the
  // UI form and then looked up through the REST login endpoint.
  customer: async ({ loggedInUser, bankApi }, use) => {
    await use(await bankApi.login(loggedInUser.username, loggedInUser.password));
  },
});

export { expect };

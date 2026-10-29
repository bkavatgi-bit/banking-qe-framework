import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { TransferPage } from '../pages/TransferPage';
import { buildUser, UserData } from '../utils/userFactory';

type Fixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  overviewPage: AccountsOverviewPage;
  openAccountPage: OpenAccountPage;
  transferPage: TransferPage;
  newUser: UserData;
  /** A freshly registered customer who is already logged in. */
  loggedInUser: UserData;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  overviewPage: async ({ page }, use) => use(new AccountsOverviewPage(page)),
  openAccountPage: async ({ page }, use) => use(new OpenAccountPage(page)),
  transferPage: async ({ page }, use) => use(new TransferPage(page)),
  newUser: async ({}, use) => use(buildUser()),
  loggedInUser: async ({ registerPage, newUser }, use) => {
    await registerPage.open();
    await registerPage.register(newUser);
        await expect(registerPage.successMessage).toBeVisible({ timeout: 15_000 });
    await use(newUser);
  },
});

export { expect };

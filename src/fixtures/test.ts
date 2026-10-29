import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { buildUser, UserData } from '../utils/userFactory';

type Fixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  overviewPage: AccountsOverviewPage;
  newUser: UserData;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  overviewPage: async ({ page }, use) => use(new AccountsOverviewPage(page)),
  newUser: async ({}, use) => use(buildUser()),
});

export { expect };

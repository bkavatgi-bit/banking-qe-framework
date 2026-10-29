import { test, expect } from '../../src/fixtures/test';

test.describe('Authentication', () => {
  test('@smoke new customer can register', async ({ registerPage, newUser }) => {
    await registerPage.open();
    await registerPage.register(newUser);

    await expect(registerPage.successMessage).toBeVisible();
  });

  test('@smoke registered customer can log out and log back in', async ({
    registerPage,
    loginPage,
    overviewPage,
    newUser,
  }) => {
    await registerPage.open();
    await registerPage.register(newUser);
    await expect(registerPage.successMessage).toBeVisible();

    await registerPage.logOut();
    await loginPage.login(newUser.username, newUser.password);

    await expect(overviewPage.heading).toBeVisible();
    await expect(overviewPage.accountsTable).toBeVisible();
  });

  test('@regression login fails with invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('no_such_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
  });
});

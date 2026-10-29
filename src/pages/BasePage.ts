import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  get logOutLink(): Locator {
    return this.page.getByRole('link', { name: 'Log Out' });
  }

  async logOut(): Promise<void> {
    await this.logOutLink.click();
  }
}

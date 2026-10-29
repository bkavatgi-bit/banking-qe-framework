import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type AccountType = 'CHECKING' | 'SAVINGS';

export class OpenAccountPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('openaccount.htm');
  }

  get successHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Account Opened!' });
  }

  get newAccountLink(): Locator {
    return this.page.locator('#newAccountId');
  }

  /** Opens a new account and returns its account number. */
  async openAccount(type: AccountType): Promise<string> {
    await this.page.locator('#type').selectOption(type);
    // "From account" options are loaded by JavaScript; wait until one exists.
    await this.page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await this.page.getByRole('button', { name: 'Open New Account' }).click();
    await this.successHeading.waitFor();
    return (await this.newAccountLink.innerText()).trim();
  }
}

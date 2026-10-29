import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { parseMoney } from '../utils/money';

export class AccountsOverviewPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('overview.htm');
    // The table is filled by an AJAX call, so wait for the first account link.
    await this.accountLinks.first().waitFor();
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Accounts Overview' });
  }

  get accountsTable(): Locator {
    return this.page.locator('#accountTable');
  }

  private get accountLinks(): Locator {
    return this.page.locator('#accountTable tbody tr td:first-child a');
  }

  async getAccountIds(): Promise<string[]> {
    const ids = await this.accountLinks.allTextContents();
    return ids.map((id) => id.trim());
  }

  async getBalance(accountId: string): Promise<number> {
    const row = this.page
      .locator('#accountTable tbody tr')
      .filter({ has: this.page.getByRole('link', { name: accountId, exact: true }) });
    const balanceText = await row.locator('td').nth(1).innerText();
    return parseMoney(balanceText);
  }
}

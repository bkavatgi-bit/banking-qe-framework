import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('transfer.htm');
  }

  get successHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Transfer Complete!' });
  }

  async transfer(amount: number, fromAccountId: string, toAccountId: string): Promise<void> {
    await this.page.locator('#amount').fill(amount.toString());
    // Account dropdowns are populated by JavaScript; wait for options first.
    await this.page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await this.page.locator('#fromAccountId').selectOption(fromAccountId);
    await this.page.locator('#toAccountId').selectOption(toAccountId);
    await this.page.getByRole('button', { name: 'Transfer' }).click();
  }
}

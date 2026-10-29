import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Accounts Overview' });
  }

  get accountsTable(): Locator {
    return this.page.locator('#accountTable');
  }
}

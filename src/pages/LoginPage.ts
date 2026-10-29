import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('index.htm');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  get errorMessage(): Locator {
    return this.page.getByText(/could not be verified/i);
  }
}

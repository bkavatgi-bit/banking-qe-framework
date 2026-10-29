import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../utils/userFactory';

export class RegisterPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('register.htm');
  }

  async register(user: UserData): Promise<void> {
    await this.page.locator('[id="customer.firstName"]').fill(user.firstName);
    await this.page.locator('[id="customer.lastName"]').fill(user.lastName);
    await this.page.locator('[id="customer.address.street"]').fill(user.street);
    await this.page.locator('[id="customer.address.city"]').fill(user.city);
    await this.page.locator('[id="customer.address.state"]').fill(user.state);
    await this.page.locator('[id="customer.address.zipCode"]').fill(user.zipCode);
    await this.page.locator('[id="customer.phoneNumber"]').fill(user.phone);
    await this.page.locator('[id="customer.ssn"]').fill(user.ssn);
    await this.page.locator('[id="customer.username"]').fill(user.username);
    await this.page.locator('[id="customer.password"]').fill(user.password);
    await this.page.locator('#repeatedPassword').fill(user.password);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  get successMessage(): Locator {
    return this.page.getByText(/Your account was created successfully/i);
  }
}

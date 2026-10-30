import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Account, AccountType, Customer } from '../types/bank';

const BASE = 'services/bank';
const JSON_HEADERS = { Accept: 'application/json' };

/**
 * Thin client over ParaBank's REST API. Methods ending in "Raw" return the
 * response untouched so tests can assert on status codes (negative tests).
 * The other methods assert success and return parsed data.
 */
export class BankApiClient {
  constructor(private readonly request: APIRequestContext) {}

  loginRaw(username: string, password: string): Promise<APIResponse> {
    return this.request.get(
      `${BASE}/login/${encodeURIComponent(username)}/${encodeURIComponent(password)}`,
      { headers: JSON_HEADERS },
    );
  }

  async login(username: string, password: string): Promise<Customer> {
    const response = await this.loginRaw(username, password);
    expect(response.ok(), `login failed with status ${response.status()}`).toBeTruthy();
    return (await response.json()) as Customer;
  }

  async getAccounts(customerId: number): Promise<Account[]> {
    const response = await this.request.get(`${BASE}/customers/${customerId}/accounts`, {
      headers: JSON_HEADERS,
    });
    expect(response.ok(), `getAccounts failed with status ${response.status()}`).toBeTruthy();
    return (await response.json()) as Account[];
  }

  async getAccount(accountId: number): Promise<Account> {
    const response = await this.request.get(`${BASE}/accounts/${accountId}`, {
      headers: JSON_HEADERS,
    });
    expect(response.ok(), `getAccount failed with status ${response.status()}`).toBeTruthy();
    return (await response.json()) as Account;
  }

  createAccountRaw(
    customerId: number,
    type: AccountType,
    fromAccountId: number,
  ): Promise<APIResponse> {
    return this.request.post(`${BASE}/createAccount`, {
      headers: JSON_HEADERS,
      params: {
        customerId,
        newAccountType: type === 'CHECKING' ? 0 : 1,
        fromAccountId,
      },
    });
  }

  async createAccount(
    customerId: number,
    type: AccountType,
    fromAccountId: number,
  ): Promise<Account> {
    const response = await this.createAccountRaw(customerId, type, fromAccountId);
    expect(response.ok(), `createAccount failed with status ${response.status()}`).toBeTruthy();
    return (await response.json()) as Account;
  }

  transferRaw(fromAccountId: number, toAccountId: number, amount: number): Promise<APIResponse> {
    return this.request.post(`${BASE}/transfer`, {
      headers: JSON_HEADERS,
      params: { fromAccountId, toAccountId, amount },
    });
  }

  async transfer(fromAccountId: number, toAccountId: number, amount: number): Promise<void> {
    const response = await this.transferRaw(fromAccountId, toAccountId, amount);
    expect(response.ok(), `transfer failed with status ${response.status()}`).toBeTruthy();
  }
}

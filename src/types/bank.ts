export type AccountType = 'CHECKING' | 'SAVINGS';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Account {
  id: number;
  customerId: number;
  type: string;
  balance: number;
}

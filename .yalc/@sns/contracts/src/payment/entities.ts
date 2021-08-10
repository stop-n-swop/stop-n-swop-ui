export interface Transaction {
  id: string;
  listingId?: string;
  date: Date;
  type: string;
  amount: number;
  fees: number;
  currency: string;
}

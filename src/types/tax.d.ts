export interface Tax {
  rateType: string;
  value: number;
  name: string;
}

export interface TaxDetail {
  tax: string;
  taxId: string;
}

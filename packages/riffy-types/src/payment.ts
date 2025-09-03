export interface Payment {
  id: string;
  buyerName: string;
  phone: string;
  state: string;
  paymentDate: string;
  proofUrl?: string | null;
  status?: string | null;
}

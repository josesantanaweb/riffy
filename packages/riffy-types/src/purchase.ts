export interface Purchase {
  id: string;
  buyerName: string;
  phone: string;
  state: string;
  purchaseDate: string;
  proofUrl?: string | null;
  status?: string | null;
}

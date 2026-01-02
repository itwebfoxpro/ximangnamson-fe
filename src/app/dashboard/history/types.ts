export type HistoryItem = {
  id: number;
  user: string;
  quantity: number;
  price: number;
  paid: boolean;
  address: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  Category?: {
    id: number;
    name: string;
  };
};

export type Category = {
  id: number;
  name: string;
};

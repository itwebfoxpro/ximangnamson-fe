export type HistoryItem = {
  id: number;
  user: string;
  quantity: number;
  ori_price: number;
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
  price: number;
};

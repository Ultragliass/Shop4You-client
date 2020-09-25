interface category {
  _id: string;
  name: string;
}

interface item {
  _id: string;
  name: string;
  price: number;
  URLPath: string;
  categoryId: string;
}

export interface IStore {
  categories: category[];
  items: item[];
  numOfOrders: number;
}

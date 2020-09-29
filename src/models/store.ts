export interface ICategory {
  _id: string;
  name: string;
}

export interface IItem {
  _id: string;
  name: string;
  price: number;
  URLPath: string;
  categoryId: string;
}

export interface IStore {
  categories: ICategory[];
  items: IItem[];
  numOfOrders: number;
}

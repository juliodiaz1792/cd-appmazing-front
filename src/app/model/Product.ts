import { Category } from "./Category";

export class Product {
  name: string;
  stock: number;
  price: number;
  active: string;
  date_added: Date;
  category: Category;
}
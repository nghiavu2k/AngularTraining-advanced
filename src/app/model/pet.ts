import { Category } from './category';

export interface Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: Array<any>;
  status: Array<any>;
}

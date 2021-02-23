import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { CateInit } from './category-init';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CateInit {
  constructor() {
    super();
    this.load();
  }

  getCategories() {
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories;
  }

  addCate(newCate: Category) {
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');
    if (newCate.id === null) newCate.id = categories.length + 1;
    categories.push(newCate);
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  deleteCate(id: number) {
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id == id) {
        categories.splice(i, 1);
        console.log(categories);
      }
    }
    localStorage.setItem('categories', JSON.stringify(categories));
  }
}

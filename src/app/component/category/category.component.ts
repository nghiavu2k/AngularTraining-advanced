import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Pet } from 'src/app/model/pet';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  categoryForm: any;
  list: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }



  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
    });
    this.list = this.categoryService.getCategories();
  }

  save() {
    let newCate: Category = {
      id: this.categoryForm.value.id,
      name: this.categoryForm.value.name,
    };
    if (this.list.find(cate => cate.id == newCate.id)) {
      alert('ID already have');
      return;
    }
    else {
      this.list.push(newCate);
      this.categoryService.addCate(newCate);
    }
  }

  delete(id: number) {
    for (let [index, item] of this.list.entries()) {
      if (item.id == id) {
        this.list.splice(index, 1);
        this.categoryService.deleteCate(index + 1);
        break;
      }
    }
  }
}

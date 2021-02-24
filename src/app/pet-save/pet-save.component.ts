import { Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-pet-save',
  templateUrl: './pet-save.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PetSaveComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PetSaveComponent),
      multi: true
    }
  ]
})
export class PetSaveComponent implements OnInit, ControlValueAccessor {
  petForm: any;
  statuses = ['available', 'pending', 'sold'];
  srcResult: any;
  listUrl: any = [];
  categories = this.categoryService.getCategories();
  cateData: Category | undefined;
  onChange!: ((cateData: any) => void);
  onTouched!: () => void;
  isDisabled: boolean = false;

  constructor(private petService: PetService, private fb: FormBuilder, private route: Router, private categoryService: CategoryService) { }

  writeValue(obj: any): void {
    this.cateData = obj;
  }
  registerOnChange(fn: (cateData: Category) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  handleOnCateChange(e: any) {
    debugger;
    const cateId = parseInt(e.target.value);
    const cateSelect = this.categories.find((cate: Category) => cate.id === cateId);
    this.writeValue(cateSelect);
    this.onChange(cateSelect);
  }

  getControl(key: string): AbstractControl {
    return this.petForm.get(key);
  }

  ngOnInit(): void {
    this.petForm = this.fb.group({
      id: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      photoUrls: new FormControl(''),
      status: new FormControl('', Validators.required),
    });
  }

  save() {
    this.listUrl.push(this.petForm.value.photoUrls);
    this.petForm.value.photoUrls = this.listUrl;
    let pet = this.petForm.value;
    this.petService.create(pet).subscribe(
      (data) => {
        this.route.navigateByUrl('pet');
        console.log(data);
      },
      (err) => console.log(err)
    );
  }
}

import { Component, forwardRef, HostListener, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentLeave } from '../guards/un-saved-changes.guard';
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
export class PetSaveComponent implements OnInit, CanComponentLeave {

  petForm: any;
  statuses = ['available', 'pending', 'sold'];
  srcResult: any;
  listUrl: any = [];
  categories = this.categoryService.getCategories();
  cateData: Category | undefined;
  onChange!: ((cateData: any) => void);
  onTouched!: () => void;
  isDisabled: boolean = false;
  min = 0;
  max = 100;
  hasChanges!: boolean;

  constructor(private petService: PetService, private fb: FormBuilder, private route: Router, private categoryService: CategoryService) {
   }
  canLeave(): boolean{
    if(this.petForm.dirty) return window.confirm("Are you sure about that?");
    return true;
  }

  ngOnInit(): void {
    this.petForm = this.fb.group({
      id: new FormControl('', this.idRangeValidator(this.min, this.max)),
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
  
  idRangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { 'idRange': true };
        }
        return null;
    };
}
}

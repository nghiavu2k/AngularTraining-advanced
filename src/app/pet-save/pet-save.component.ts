import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-pet-save',
  templateUrl: './pet-save.component.html',
})
export class PetSaveComponent implements OnInit {
  petForm: any;
  statuses = ['available', 'pending', 'sold'];
  srcResult: any;
  listUrl:any = [];

  constructor(private petService: PetService, private fb: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.petForm = this.fb.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      photoUrls: new FormControl('', Validators.required),
      status: new FormControl(''),
    });
  }

  save() {
    debugger;
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

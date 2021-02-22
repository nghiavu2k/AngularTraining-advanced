import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-pet-update',
  templateUrl: './pet-update.component.html'
})
export class PetUpdateComponent implements OnInit {
  petForm: any;
  statuses = ['available', 'pending', 'sold'];
  srcResult: any;
  listUrl: any = [];
  id: any;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.petForm = this.fb.group({
      name: new FormControl('', Validators.required),
      photoUrls: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
    this.getPet(this.id);
  }

  getPet(id: number) {
    this.petService.getPetById(id).subscribe(
      (data) => {
        this.petForm.patchValue(data);
      },
      (err) => console.log(err)
    );
    
  }

  update() {
    this.listUrl.push(this.petForm.value.photoUrls);
    this.petForm.value.photoUrls = this.listUrl;
    this.petForm.value.id = this.id;
    let pet = this.petForm.value;
    this.petService.update(this.id, pet).subscribe(
      (data) => {
        this.petForm = data;
        this.router.navigateByUrl('pet');
      },
      (error) => console.log(error)
    );
  }
}

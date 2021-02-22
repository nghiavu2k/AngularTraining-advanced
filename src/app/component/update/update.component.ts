import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from 'src/app/model/hero';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from 'src/app/service/hero.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  hero: Hero | any;
  constrainted: boolean | undefined;
  isShown: boolean = false;
  careers = ['fresher', 'middle', 'cto'];
  hobbies = ['soccer', 'football', 'basketball'];
  formGroup = this.fb.group({
    id: null,
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    dob: new FormControl('', [Validators.required]),
    career: new FormControl(''),
    hobby: new FormControl(''),
  });
  constructor(
    private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
  ) {}
  id: any;
  ngOnInit(): void {
    this.constraintValidate();
    this.id = this._Activatedroute.snapshot.params['id'];
    let heroes = this.heroService.getHeros();
    this.hero = heroes.find((p: Hero | any) => p.id == this.id);
    this.formGroup.patchValue(this.hero);
  }

  save() {
    if (this.formGroup.value) {
      this.formGroup.value.id = this.hero.id;
      this.heroService.updateHero(this.formGroup.value);
      setTimeout(() => {
        this.router.navigateByUrl('');
      }, 3000);
    }
  }

  constraintValidate() {
    const address = this.formGroup.get('address');
    this.formGroup.get('age')!.valueChanges.subscribe((age: number) => {
      if (age > 15) {
        address!.setValidators([Validators.required, Validators.minLength(20)]);
        this.constrainted = true;
      } else this.constrainted = false;
    });
  }

  toogleShow() {
    let name = this.formGroup.value.name;
    let age = this.formGroup.value.age;
    let address = this.formGroup.value.address;
    let dob = this.formGroup.value.dob;
    let career = this.formGroup.value.career;
    let hobby = this.formGroup.value.hobby;
    this.isShown = !this.isShown;
    if (this.isShown) {
      this.formGroup = this.fb.group({
        id: null,
        name: new FormControl(name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]),
        age: new FormControl(age, [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]),
        address: new FormControl(address, [
          Validators.required,
          Validators.minLength(10),
        ]),
        dob: new FormControl(dob, [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        career: new FormControl(career),
        hobby: new FormControl(hobby),
      });
    } else {
      this.formGroup = this.fb.group({
        id: null,
        name: new FormControl(name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]),
        age: new FormControl(age, [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]),
        address: new FormControl(address, [
          Validators.required,
          Validators.minLength(10),
        ]),
        dob: new FormControl(dob, [Validators.required]),
        career: new FormControl(career),
        hobby: new FormControl(hobby),
      });
    }
  }
}

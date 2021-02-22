import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/service/hero.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  list: Hero[] = [];
  constrainted: boolean | undefined;
  isShown: boolean = false;
  careers = ['fresher', 'middle', 'cto'];
  hobbies = ['soccer', 'football', 'basketball'];
  formGroup: any;
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
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
    this.constraintValidate();
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

  save() {
    let newHero = {
      id: null,
      name: this.formGroup.value.name,
      age: this.formGroup.value.age,
      address: this.formGroup.value.address,
      dob: this.formGroup.value.dob,
      email: this.formGroup.value.email,
      career: this.formGroup.value.career,
      hobby: this.formGroup.value.hobby,
    };
    this.list.push(newHero);
    this.heroService.addHero(newHero);
    this.spinner = true;
    document.getElementById('general')!.style.filter = 'blur(2px)';
    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 3000);
  }
}

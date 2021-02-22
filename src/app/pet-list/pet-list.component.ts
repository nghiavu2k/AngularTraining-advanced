import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pet } from '../model/pet';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
})
export class PetListComponent implements OnInit, HttpInterceptor {
  list: Array<Pet> = [];
  statuses = ['available', 'pending', 'sold'];
  stt: any;

  constructor(
    private petService: PetService,
    private fb: FormBuilder,
    private route: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modified = req.clone({
      setHeaders: { method: 'delete' },
    });
    return next.handle(modified);
  }

  ngOnInit(): void {
    this.stt = this.fb.group({ status: new FormControl('') });
  }

  getPetsByStatus() {
    let status = this.stt.value.status;
    console.log(status);
    this.petService.getPetsByStatus(status).subscribe(
      (data) => {
        this.list = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  delete(id: any) {
    this.petService.deleteById(id).subscribe(
      (data) => {
        this.getPetsByStatus();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

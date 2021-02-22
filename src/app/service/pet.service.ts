import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../model/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getPetsByStatus(status: string): Observable<any> {
    return this.http.get(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
    );
  }

  getPetById(id : number) : Observable<any> {
    return this.http.get(`https://petstore.swagger.io/v2/pet/${id}`)
  }

  create(data: Pet): Observable<any> {
    return this.http.post('https://petstore.swagger.io/v2/pet', data);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`https://petstore.swagger.io/v2/pet/${id}`);
  }

  update(id: number, data: Pet): Observable<any> {
    return this.http.put(`https://petstore.swagger.io/v2/pet/${id}`, data);
  }
}

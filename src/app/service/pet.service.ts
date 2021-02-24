import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../model/pet';

const url = 'https://petstore.swagger.io/v2/pet';

@Injectable({
  providedIn: 'root',
})


export class PetService {
  constructor(private http: HttpClient) { }

  getPetsByStatus(status: string): Observable<any> {
    return this.http.get(
      `${url}/findByStatus?status=${status}`
    );
  }

  getPetById(id: number): Observable<any> {
    return this.http.get(url + `/${id}`)
  }

  create(data: Pet): Observable<any> {
    return this.http.post(url, data);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }

  update(data: Pet): Observable<any> {
    return this.http.put(`${url}`, data);
  }
}

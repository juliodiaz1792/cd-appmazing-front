import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    const url = "http://localhost:30030/category/getAll";
    const headers = new HttpHeaders();
    return this.http.get(url, { headers });
  }
}

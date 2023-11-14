import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, concat } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  getContacts(): Observable<any> {
    const url = "http://localhost:30030/contact/getAll";
    const headers = new HttpHeaders();
    return this.http.get<any>(url, { headers });
  }

  getContact(c_id: number): Observable<any> {
    //Cuando hacemos una petición a back, siempre Observable
    const url = "http://localhost:30030/contact/get";
    const headers = new HttpHeaders().set("Content-Type", "application/json"); //Se coge de Postman (por ser petición Post)
    const body = JSON.stringify({ id: c_id }); //Clave-valor
    return this.http.post(url, body, { headers });
  }

  newContact(contact: any): void {
    const url = "http://localhost:30030/contact/add";
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const body = contact;
    this.http.post(url, body, { headers }).subscribe(); //podría pasarse directamente el contact
  }

  updateContact(contact: any): void {
    const url = "http://localhost:30030/contact/put";
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const body = contact;
    this.http.put(url, body, {headers}).subscribe();
  }
}

import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-home",
  styleUrls: ["./contact-home.component.css"],
  templateUrl: "./contact-home.component.html",
})
export class ContactHomeComponent implements OnInit {
  contacts: any = [];

  constructor(private contactsService: ContactsService, private router: Router) {}

  //El onInit sirve para establecer qué métodos se van a cargar antes que el HTML
  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  openDetailForm(row: any) {
    this.router.navigate(['/contact', row.id])
  }

  displayedColumns: string[] = [
    "id",
    "name",
    "first_surname",
    "second_surname",
    "phone",
    "mail",
  ];
}

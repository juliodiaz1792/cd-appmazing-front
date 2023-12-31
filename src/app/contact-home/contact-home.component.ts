import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ContactDeleteComponent } from "../contact-delete/contact-delete.component";

@Component({
  selector: "app-contact-home",
  styleUrls: ["./contact-home.component.css"],
  templateUrl: "./contact-home.component.html",
})
export class ContactHomeComponent implements OnInit {
  contacts: any = [];

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  //El onInit sirve para establecer qué métodos se van a cargar antes que el HTML
  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  openDetailForm(row: any) {
    this.router.navigate(["/contact", row.id]);
  }

  updateContactDetail(contact: any) {
    this.router.navigate(["/contact/update", contact]);
  }

  openDeleteDialog(contactId: number): void {
    this.dialog.open(ContactDeleteComponent, {
      data: { contactId: contactId },
    });
  }

  displayedColumns: string[] = [
    "id",
    "name",
    "first_surname",
    "second_surname",
    "phone",
    "mail",
    "actions",
  ];
}

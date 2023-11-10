import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ContactsService } from "../contacts.service";

@Component({
  selector: "app-contact-new",
  templateUrl: "./contact-new.component.html",
  styleUrls: ["./contact-new.component.css"],
})
export class ContactNewComponent implements OnInit {
  name: string;
  first_surname: string;
  second_surname: string;
  phone: number;
  mail: string;

  constructor(private router: Router, private contactsService: ContactsService) {}

  ngOnInit() {}

  newContact() {
    const contact = {
      name: this.name,
      first_surname: this.first_surname,
      second_surname: this.second_surname,
      phone: this.phone,
      mail: this.mail,
    };
    this.contactsService.newContact(contact)
    this.navigateToHome();
  }

  cancelInsert() {
    this.navigateToHome();
  }

  navigateToHome() {
    this.router.navigate(["/contacts"]);
  }
}

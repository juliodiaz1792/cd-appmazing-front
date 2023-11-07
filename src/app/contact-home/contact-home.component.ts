import { Component } from "@angular/core";

export interface Contact {
  id: number;
  name: string;
  first_surname: string;
  second_surname: string;
  phone: number;
  mail: string;
}

const ELEMENT_DATA: Contact[] = [
  {
    id: 1,
    name: "Zaira",
    first_surname: "López",
    second_surname: "Zaira",
    phone: 674897432,
    mail: "zaira.lopez@imatia.com",
  },
  {
    id: 2,
    name: "Manuel",
    first_surname: "Rodríguez",
    second_surname: "López",
    phone: 638252312,
    mail: "manuel.lopez@imatia.com",
  },
  {
    id: 3,
    name: "Ramiro",
    first_surname: "Pérez",
    second_surname: "López",
    phone: 673123456,
    mail: "ramiro.lopez@imatia.com",
  },
  {
    id: 4,
    name: "Julio",
    first_surname: "Diéguez",
    second_surname: "Arias",
    phone: 783123455,
    mail: "julio.lopez@imatia.com",
  },
  {
    id: 5,
    name: "Alba",
    first_surname: "Redondo",
    second_surname: "Rodríguez",
    phone: 763112233,
    mail: "alba.lopez@imatia.com",
  },
  {
    id: 6,
    name: "Manuela",
    first_surname: "Iglesias",
    second_surname: "Arias",
    phone: 683114455,
    mail: "manuela.lopez@imatia.com",
  },
  {
    id: 7,
    name: "Guillermo",
    first_surname: "Díaz",
    second_surname: "Rodríguez",
    phone: 653998877,
    mail: "guillermo.lopez@imatia.com",
  },
  {
    id: 8,
    name: "Diego",
    first_surname: "Domínguez",
    second_surname: "Pérez",
    phone: 645665544,
    mail: "diego.lopez@imatia.com",
  },
  {
    id: 9,
    name: "Carlos",
    first_surname: "Arias",
    second_surname: "Juárez",
    phone: 672525236,
    mail: "carlos.lopez@imatia.com",
  },
  {
    id: 10,
    name: "Ana",
    first_surname: "López",
    second_surname: "López",
    phone: 672352383,
    mail: "ana.lopez@imatia.com",
  },
];

@Component({
  selector: "app-contact-home",
  templateUrl: "./contact-home.component.html",
  styleUrls: ["./contact-home.component.css"],
})

export class ContactHomeComponent {
  displayedColumns: string[] = [
    "id",
    "name",
    "first_surname",
    "second_surname",
    "phone",
    "mail",
  ];
  contacts = ELEMENT_DATA;
}

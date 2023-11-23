import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { ProductsService } from "../products.service";
import { CategoryService } from "../category.service";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit {
  initialLetter: [];
  contactsByFullName: [];
  emailExtensions: [];
  phonePrefixData: [];

  stockMap: [];
  productsList: [];
  productsStockPrice: [];
  productsYear: [];

  constructor(
    private contactsService: ContactsService,
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe((data) => {
      this.initialLetter = this.calculateInitialLettersData(data);
      this.contactsByFullName = this.calculateContactsByFullNameData(data);
      this.emailExtensions = this.calculateEmailExtensionsData(data);
      this.phonePrefixData = this.generatePhonePrefixData(data);
    });
    this.productsService.getProducts().subscribe((data) => {
      this.categoryService.getAllCategory().subscribe((data2) => {
        this.stockMap = this.countProductsStock(data);
        this.productsList = this.productsPrices(data);
        this.productsStockPrice = this.showStockAndPrice(data, data2);
        this.productsYear = this.calculateProductPerYears(data);
      });
    });
  }

  calculateInitialLettersData(contacts: any[]): any {
    return contacts.reduce((result, contact) => {
      const initial = contact.first_surname.charAt(0).toUpperCase();
      if (result.find((item) => item.name === initial)) {
        result.find((item) => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result;
    }, []);
  }

  calculateContactsByFullNameData(contacts: any[]): any {
    let tempContactsByFullName = [
      {
        name: "Contacts",
        series: [],
      },
    ];
    contacts.forEach((contact) => {
      let fullName = contact.name + contact.first_surname;
      if (contact.second_surname) {
        fullName = fullName + contact.second_surname;
      }
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5) + 4} ch.`;
      let existingRange = tempContactsByFullName[0].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempContactsByFullName[0].series.push({ name: range, value: 1 });
      }
    });

    return tempContactsByFullName.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort(
          (a, b) => Number(a.name.split("-")[0]) - Number(b.name.split("-")[0])
        ),
      };
    });
  }

  calculateEmailExtensionsData(contacts: any[]): any {
    let emailExtensionsMap = new Map<string, number>();
    contacts.forEach((contact) => {
      let emailParts = contact.mail.split("@");
      if (emailParts.length == 2) {
        const domain = emailParts[1];
        const firstDotIndex = domain.indexOf(".");
        if (firstDotIndex != -1) {
          const extension = domain.substring(firstDotIndex);
          if (emailExtensionsMap.has(extension)) {
            emailExtensionsMap.set(
              extension,
              emailExtensionsMap.get(extension) + 1
            );
          } else {
            emailExtensionsMap.set(extension, 1);
          }
        }
      }
    });

    let emailExtensions = [];
    emailExtensionsMap.forEach((value, key) => {
      emailExtensions.push({ name: key, value: value });
    });

    return emailExtensions;
  }

  generatePhonePrefixData(contacts: any): any {
    let phonePrefixData = [];
    let prefixCounts = {};

    contacts.forEach((contact) => {
      const phonePrefix = String(contact.phone).substring(0, 1);
      if (prefixCounts[phonePrefix]) {
        prefixCounts[phonePrefix]++;
      } else {
        prefixCounts[phonePrefix] = 1;
      }
    });

    for (let prefix in prefixCounts) {
      if (prefixCounts.hasOwnProperty(prefix)) {
        phonePrefixData.push({ name: prefix, value: prefixCounts[prefix] });
      }
    }

    return phonePrefixData;
  }

  countProductsStock(products: any[]): any {
    let stockMap = new Map<string, number>();
    products.forEach((product) => {
      let pName = product.name;
      let pStock = product.stock;
      if (stockMap.has(pName)) {
        stockMap.set(pName, stockMap.get(pName) + pStock);
      } else {
        stockMap.set(pName, pStock);
      }
    });
    let productsStock = [];
    stockMap.forEach((value, key) => {
      productsStock.push({ name: key, value: value });
    });

    return productsStock;
  }

  productsPrices(products: any[]): any {
    let productMap = new Map<string, number>();
    products.forEach((product) => {
      let productName = product.name;
      let productPrice = product.price;
      productMap.set(productName, productPrice);
    });
    let productList = [];
    productMap.forEach((value, key) => {
      productList.push({ name: key, value: value });
    });
    return productList;
  }

  showStockAndPrice(products: any[], category: any[]): any {
    const total = [];
    const total2 = [];
    var categoryData = []; 
    var newCategory = {};
    
      for(let i=0;i<category.length;i++){
        total[i]=0;
        total2[i]=0;
        for(let j=0;j<products.length;j++){
          if(products[j].category.name == category[i].name){
            total[i]+=(products[j].stock * products[j].price);
            total2[i]+=products[j].stock
          }
        }
        total.push(total[i]);
        addCategory(category[i].name,"stock",total[i],"price",total2[i]);
      }
    
    function addCategory(name,stock, value,price, value2){
      newCategory = {
        "name": name,
        "series": [{
          "name": stock,
          "value": value
        },
        {
          "name": price,
          "value": value2
        }]
     
      } 
      categoryData.push(newCategory);
    }
    return categoryData;
  }

  calculateProductPerYears(products: any[]): any{
    products.sort((a, b) => b.price - a.price);
    var expensivestProducts = [];
    var newProduct = {};

    let x = 10;
    for (let i = 0; i < x; i++) {
      var expresionRegular = /\d{4}/;

      addProduct(
        products[i].name,
        products[i].price,
        products[i].date_added.match(expresionRegular)[0]
      );
    }

    function addProduct(name, price, date) {
      newProduct = {
        "name": name,
        "series": [{
            "name": date,
            "value": price,
          }]
      };
      expensivestProducts.push(newProduct);
    }
    return expensivestProducts;
  }
}

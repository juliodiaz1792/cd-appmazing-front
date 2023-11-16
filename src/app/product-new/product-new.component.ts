import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { Product } from "../model/Product";
import { Category } from "../model/Category";
import { Router } from "@angular/router";
import { CategoryService } from "../category.service";

@Component({
  selector: "app-product-new",
  templateUrl: "./product-new.component.html",
  styleUrls: ["./product-new.component.css"],
})
export class ProductNewComponent implements OnInit {
  product: Product = new Product();
  category: Category = new Category();
  categories: []
  active: string;

  constructor(
    private router: Router,
    private productsService: ProductsService, 
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categories = data;
    }
  )}

  newProduct() {
    if (this.active=='true'){
      this.product.active= true;
    }else{
      this.product.active= false;
    }

    const product = {
      name: this.product.name,
      stock: this.product.stock,
      price: this.product.price,
      active: this.product.active,
      date_added: this.product.date_added,
      category: this.category,
    };
    this.productsService.newProduct(product);
    this.navigateToHome();
  }

  cancelInsert() {
    this.navigateToHome();
  }

  navigateToHome() {
    this.router.navigate(["/products"]);
  }
}

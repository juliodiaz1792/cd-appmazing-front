import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "../category.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product: any;
  active: string;
  categories: [];

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService
      .getProductDetail(this.route.snapshot.params["id"])
      .subscribe((data) => {
        this.product = data;
      });

    this.categoryService.getAllCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  updateProduct() {
    this.productsService.updateProduct(this.product);
    this.navigateDetail();
  }

  cancelUpdate() {
    this.navigateDetail();
  }

  navigateDetail() {
    this.router.navigate(["/product", this.route.snapshot.params["id"]]);
  }
}

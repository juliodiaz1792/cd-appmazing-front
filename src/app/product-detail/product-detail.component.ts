import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productsService
      .getProductDetail(this.route.snapshot.params["id"])
      .subscribe((data) => {
        this.product = data;
      });
  }
}

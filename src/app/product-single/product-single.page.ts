import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../services/products.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.page.html',
  styleUrls: ['./product-single.page.scss'],
})
export class ProductSinglePage implements OnInit {

  Products: any = [];
  imgID: any= [];
  imgURL: any= [];

  constructor(private productService: ProductsService, private route: ActivatedRoute,private sanitizer:DomSanitizer,) { }

  ngOnInit() {

    this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgID);  
  }

  ionViewDidEnter() {
    this.productService.getProductID(this.route.snapshot.params.id).subscribe((response) => {
      this.Products = response;
      console.log(this.Products);

    });


}
}

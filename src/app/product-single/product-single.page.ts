import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../services/products.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.page.html',
  styleUrls: ['./product-single.page.scss'],
})
export class ProductSinglePage implements OnInit {

  Products: any = [];
  imgID: any= [];
  imgURL: any= [];

  constructor(private productService: ProductsService,private router: Router, private route: ActivatedRoute,private sanitizer:DomSanitizer,private authService: AuthService) { }

  ngOnInit() {

    this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgID);  
  }

  ionViewDidEnter() {
    this.productService.getProductID(this.route.snapshot.params.id).subscribe((response) => {
      this.Products = response;
      console.log(this.Products);

    });


}

logout() {
  this.authService.logout().subscribe(
    data => {
         
    },
    error => {
      console.log(error);
    },
    () => {
      setTimeout(()=>{
        window.location.reload();
      }, 100);
      this.router.navigate(['/']);
    }
  );
}
}

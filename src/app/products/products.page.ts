import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  Products: any = [];
  user: User;


  constructor(private productService: ProductsService,private router: Router, private route: ActivatedRoute,private authService: AuthService) { }

  
  ngOnInit() {
    

    this.authService.user().subscribe(
      user => {

        this.user = user;
        if (this.user.is_first == 1){
        //alert("TESTING");
        }
      }
    );
  }

  ionViewWillEnter() {
    console.log('Begin async operation');
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

  ionViewDidEnter() {
    this.productService.getProducts().subscribe((response) => {
      this.Products = response;
    })

  }
  


}

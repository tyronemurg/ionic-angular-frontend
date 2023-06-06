import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  results = false;
  Products: any = [];
  searchdata: any[];
  filterKeys = ['name', 'price', 'img'];
  baseUrl="http://127.0.0.1:8000/storage/"
  user: User;
  @ViewChild('searchbar') searchbar: ElementRef;
  search = '';


  constructor(private productService: ProductsService, private elem: ElementRef, private router: Router, private route: ActivatedRoute,private authService: AuthService) { }

  
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

  showresults(){
    this.results = true;

        
  }
  hideresults(){
    this.results = false;

 
    
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
      //this.Products = response;
      this.searchdata=response;
    })

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

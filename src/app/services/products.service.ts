import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



export class Products {
  id: number;
  name: string;
  body: string;
  image: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Direct enpoints for testing
  // Should be removed for prod or used in a service
  products_endpoint = 'http://127.0.0.1:8000/api/products';
  product_endpoint = 'http://127.0.0.1:8000/api/product';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  pd: any;


  constructor(private httpClient: HttpClient) { }

//Get Products Service
  getProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.products_endpoint)
      .pipe(
        tap(products => console.log(products)),
        catchError(this.handleError<Products[]>('Get Products', []))
      );
  }
  //Get Single Products with ID Service
  getProductID(id): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.product_endpoint + '/' + id )
      .pipe(
        tap(products => console.log(products)),
        catchError(this.handleError<Products[]>(`Get Products ID id=${id}`))
      );
  }

//Get Single Product with ID Service
  getProduct(id): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.products_endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Product ID fetched: ${id}`)),
        catchError(this.handleError<Products[]>(`Get Product ID id=${id}`))
      );
  }

//Handelling the error and return error message
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  
}

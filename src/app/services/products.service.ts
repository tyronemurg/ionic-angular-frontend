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

 

  products_endpoint = 'http://127.0.0.1:8000/api/products';
  product_endpoint = 'http://127.0.0.1:8000/api/product';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  pd: any;


  constructor(private httpClient: HttpClient) { }


  getProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.products_endpoint)
      .pipe(
        tap(products => console.log(products)),
        catchError(this.handleError<Products[]>('Get Products', []))
      );
  }

  getProductID(id): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.product_endpoint + '/' + id )
      .pipe(
        tap(products => console.log(products)),
        catchError(this.handleError<Products[]>(`Get Products ID id=${id}`))
      );
  }


  getProduct(id): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.products_endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Product ID fetched: ${id}`)),
        catchError(this.handleError<Products[]>(`Get Product ID id=${id}`))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  
}

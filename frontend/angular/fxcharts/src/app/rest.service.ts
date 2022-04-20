import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { map } from 'rxjs/operators';

export interface Product {
  _id: string;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
  updated_at: Date;
}

const endpoint = 'http://192.168.1.103:8080/api/data/';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }
  /*
  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'products').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getProduct(id: string): Observable<any> {
    return this.http.get(endpoint + 'products/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  } 
  */       
  getProducts(): Observable<any> {
    //return this.http.get<Product>(endpoint + 'products').pipe(catchError(this.handleError));
    //return this.http.get<Product>(endpoint + 'getItem').pipe(catchError(this.handleError));
    return this.http.get<Product>(endpoint + 'getItem.php').pipe(catchError(this.handleError));
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<Product>(endpoint + 'products/' + id).pipe(
      catchError(this.handleError)
    );
  }  
  addProduct(product: any): Observable<any> {
    return this.http.post(endpoint + 'products', product).pipe(
      catchError(this.handleError)
    );
  }
  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put<Product>(endpoint + 'products/' + id, product).pipe(
      catchError(this.handleError)
    );
  }
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<Product>(endpoint + 'products/' + id).pipe(
      catchError(this.handleError)
    );
  }      
}




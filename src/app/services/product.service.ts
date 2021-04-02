import { Injectable } from '@angular/core';
import {Service} from '../api/service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Service {


  constructor(private https: HttpClient) {
    super(https, environment.api + '/product/');
  }

  getItemsAllIdCategory(id: string): Observable<any> {
    return this.https.get(this.URL_API + `all-category/${id}`).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }

  getProductWarehouse(idWarehouse: string): Observable<any> {
    return this.https.get(this.URL_API + `all-product-warehouse/${idWarehouse}`).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }
  getAllNoIgnore(idWarehouse: string): Observable<any> {
    return this.https.get(this.URL_API + `all-product-noignore/${idWarehouse}`).pipe(
       map((items: any[]) => {
         this.items = items;
    }));
  }
  getAllNew(idWarehouse: number): Observable<any> {
    return this.https.get(this.URL_API + `all-product-new/${idWarehouse}`).pipe(
      map((items: any[]) => {
        this.items = items;
      }));
  }

}

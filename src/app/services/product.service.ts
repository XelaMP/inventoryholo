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
}

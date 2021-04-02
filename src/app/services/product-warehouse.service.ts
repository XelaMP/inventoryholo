import { Injectable } from '@angular/core';
import {Service} from '../api/service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductWarehouse} from '../interfaces/productwarehouse';

@Injectable({
  providedIn: 'root'
})
export class ProductWarehouseService extends Service {

  constructor(private https: HttpClient) {
    super(https, environment.api + '/product-warehouse');
  }

  changeStatus(item: ProductWarehouse): Observable<any> {
    return this.https.post(this.URL_API + `/change-status/`, item);
  }
  updateIgnore(id: string, item: ProductWarehouse): Observable<any>{
    return this.https.put(this.URL_API + `/change-status/${id}`, item);
  }

}

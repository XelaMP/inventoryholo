import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

export abstract class Service{

  item;
  items: any[];

  protected constructor(private http: HttpClient, readonly URL_API) {}

  getItemsAllId(id: string): Observable<any> {
    return this.http.get(this.URL_API + `all/${id}`).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }

  getItemsAllIdRuta(id: string, ruta: string): Observable<any> {
    return this.http.get(this.URL_API + `${ruta}/${id}`).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }
  getItems(): Observable<any> {
    return this.http.get(this.URL_API).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }

  getItem(id: string): Observable<any> {
    return this.http.get(this.URL_API + `${id}`).pipe(
      map((item: any) => {
        this.item = item;
      })
    );
  }

  createItem(item: any): Observable<any> {
    return this.http.post(this.URL_API, item);
  }

  updateItem(item: any): Observable<any> {
    return this.http.put(this.URL_API + `${item._id}`, item);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(this.URL_API + `${id}`);
  }
}

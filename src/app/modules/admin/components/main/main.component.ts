import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {LoginService} from '../../../../services/login.service';
import * as feather from 'feather-icons';
import {Utils} from '../../../../shared/utils';
import {UserService} from '../../../../services/user.service';
import {SearchAction} from '../../../../store/search/search.reducer';
import {select, Store} from '@ngrx/store';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  anio: number = new Date().getFullYear();
  user: Observable<string>;
  search: Observable<string>;
  private subscription: Subscription;

  constructor(private ls: LoginService, private us: UserService, private store: Store<any>) {
    this.search = store.pipe(select('search'));
  }

  ngOnInit(): void {
   // feather.replace();
    Utils.loadScript();
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  searchEvent(event: any): void {
   const action = new SearchAction(event.target.value.toLowerCase());
   this.store.dispatch(action);
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription = this.us.getItem(id).subscribe(() => {
      console.log(this.us.item);
      this.user = of(this.us.item.name);
    });
  }

  logOut(): void {
    this.ls.logOut();
  }

}

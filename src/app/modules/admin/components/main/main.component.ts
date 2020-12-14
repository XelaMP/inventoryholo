import { Component, OnInit } from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {LoginService} from '../../../../services/login.service';
import {UserService} from '../../../../services/user.service';
import {Utils} from '../../../../shared/utils';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: Observable<string>;
  private subscription: Subscription;

  constructor(private ls: LoginService, private us: UserService) { }

  ngOnInit(): void {

    Utils.loadScript();
    this.getUser();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription = this.us.getItem(id).subscribe(() => {
      this.user = of(this.us.item.name);
    });
  }

  logOut(): void {
    this.ls.logOut();
  }

}

import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {UserLogin} from '../../interfaces/user';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private ls: LoginService, private nts: NotifierService, private title: Title) {
    title.setTitle('Holosalud Inventario | Login');
  }

  ngOnInit(): void {
  }

  login(): void {
    const user: UserLogin = {
      username: this.email,
      password: this.password,
    };


    this.ls.login(user).subscribe(res => {
        const token = res.token;
        const bodyToken = JSON.parse(atob(token.split('.')[1]));
        const userRes = bodyToken.user;
        console.log(token);
        if (userRes) {
          console.log(userRes);
          this.nts.notify('success', 'Ingresando...');
          this.ls.sessionIn(userRes._id, userRes.role, res.token);
        }
      },
      error => {
        console.log(error.error);
        this.nts.notify('error', error.error);
      });


  }
}

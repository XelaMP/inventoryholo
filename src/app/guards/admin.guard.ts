import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (sessionStorage.getItem('rol') === 'Admin') {
      return true;
    }
    this.router.navigate(['/login']).then(r => console.log(r));
    return false;


  }
}

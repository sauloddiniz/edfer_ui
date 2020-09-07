import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../services';

@Injectable()
export class OauthGuard implements CanActivate {

    shared: SharedService;

    constructor(private router: Router) {
        this.shared = SharedService.getInstance();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean  {
            if (this.shared.isLoggedIn()) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
    }
}

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../services';

@Injectable()
export class CompraGuard implements CanActivate {

    shared: SharedService;

    constructor(private router: Router) {
        this.shared = SharedService.getInstance();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean  {
            for (const role of this.shared.payLoad.authorities) {
                if (role === 'COMPRA') {
                    return true;
                }
            }
            return false;
    }
}

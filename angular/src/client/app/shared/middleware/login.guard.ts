import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private service: AuthService, private router: Router) { }

    /**
     * Implemented as part of CanActivate
     * @return {boolean}
     */
    canActivate(next: any): boolean {
        if (this.service.authorized) {
            this.router.navigate(next);
            return false;
        }

        return true;
    }
}

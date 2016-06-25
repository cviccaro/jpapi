import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private service: AuthService, private router: Router) { }

    canActivate(next, state) {
        if (this.service.authorized) {
            this.router.navigate(next);
            return false;
        }

        return true;
    }
}

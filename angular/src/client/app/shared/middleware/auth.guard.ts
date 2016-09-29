import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/index';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private service: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.service.authorized) return true;

        this.router.navigate(['/admin/login']);
        return false;
    }
}

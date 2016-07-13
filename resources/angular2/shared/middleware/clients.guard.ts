import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';

import { ClientService, JpaCache } from '../services/index';

import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class ClientsGuard implements CanActivate, OnDestroy {
    private sub: Subscription;

    constructor(private service: ClientService, private cache: JpaCache) { }

    canActivate() {
        return Observable.create(observer => {
            this.sub = this.service.all().subscribe(res => {
               this.cache.store('clients', res);
               observer.complete(true);
           });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
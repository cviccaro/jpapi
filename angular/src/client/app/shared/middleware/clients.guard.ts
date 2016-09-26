import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ClientService, CacheService } from '../services/index';

@Injectable()
export class ClientsGuard implements CanActivate, OnDestroy {
    private sub: Subscription;

    constructor(private service: ClientService, private cache: CacheService) { }

    /**
     * Implemented as part of CanActivate
     * @return {Observable<any>}
     */
    canActivate(): Observable<any> {
        return Observable.create(observer => {
            this.sub = this.service.all().subscribe(res => {
               this.cache.store('clients', res);
               observer.complete(true);
           });
        });
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';
import { SettingsService, CacheService } from '../services/index';

@Injectable()
export class SettingsGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private service: SettingsService, private cache: CacheService) { }

    /**
     * Implemented as part of CanActivate
     * @return {Observable<any>}
     */
    canActivate(): Observable<any> {
        return Observable.create((observer: Observer<boolean>) => {
            this.sub = this.service.all().subscribe(res => {
               this.cache.store('settings', res);
               observer.complete();
           });
        });
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }
}

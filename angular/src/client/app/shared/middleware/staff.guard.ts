import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';
import { StaffService, CacheService } from '../services/index';

@Injectable()
export class StaffGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private service: StaffService, private cache: CacheService) { }

    /**
     * Implemented as part of CanActivate
     * @return {Observable<any>}
     */
    canActivate(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.sub = this.service.all().subscribe(res => {
               this.cache.store('staff', res);
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

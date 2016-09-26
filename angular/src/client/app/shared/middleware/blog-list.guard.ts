import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';

import { BlogService, CacheService } from '../services/index';

import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class BlogListGuard implements CanActivate, OnDestroy {
    private sub: Subscription;

    constructor(private blogService: BlogService, private cache: CacheService) {}

    /**
     * Implemented as part of CanActivate
     * @return {Observable<any>}
     */
    canActivate() {
        return Observable.create(observer => {
            this.sub = this.blogService.all({
               current_page: 1,
               length: 15,
               order_by: 'updated_at',
               descending: true
           }).subscribe(res => {
               this.cache.store('blogList', res);
               observer.complete(true);
           });
        });
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
    }
}

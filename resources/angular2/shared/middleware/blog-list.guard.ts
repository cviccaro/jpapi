import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';

import { BlogService, JpaCache } from '../services/index';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class BlogListGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private blogService: BlogService, private cache: JpaCache) {}

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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
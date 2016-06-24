import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';

import { BlogService } from '../services/index';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class BlogsGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private blogService: BlogService) {}

    canActivate() {
        console.info('BlogsGuard# getting blogs for the first time.');
        return Observable.create(observer => {
            this.sub = this.blogService.all({
               current_page: 1,
               length: 15,
               order_by: 'updated_at',
               descending: true
           }).subscribe(res => {
               this.blogService.setList(res);
               observer.complete(true);
           });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
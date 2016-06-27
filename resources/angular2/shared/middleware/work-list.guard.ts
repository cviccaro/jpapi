import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';

import { WorkService } from '../services/index';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class WorkListGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private workService: WorkService) {}

    canActivate() {
        return Observable.create(observer => {
            this.sub = this.workService.all({
               current_page: 1,
               length: 15,
               order_by: 'updated_at',
               descending: true
           }).subscribe(res => {
               this.workService.setList(res);
               observer.complete(true);
           });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

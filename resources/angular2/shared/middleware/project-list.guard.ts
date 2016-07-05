import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';

import { ProjectService } from '../services/index';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProjectListGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private projectService: ProjectService) {}

    canActivate() {
        return Observable.create(observer => {
            this.sub = this.projectService.all({
               current_page: 1,
               length: 15,
               order_by: 'updated_at',
               descending: true
           }).subscribe(res => {
               this.projectService.setList(res);
               observer.complete(true);
           });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

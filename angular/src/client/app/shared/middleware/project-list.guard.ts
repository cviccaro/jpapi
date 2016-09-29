import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';

import { ProjectService, CacheService } from '../services/index';

@Injectable()
export class ProjectListGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private projectService: ProjectService, private cache: CacheService) {}

    /**
     * Implemented as part of CanActivate
     * @return {Observable<any>}
     */
    canActivate() : Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.sub = this.projectService.all({
               current_page: 1,
               length: 15,
               order_by: 'updated_at',
               descending: true
           }).subscribe(res => {
               this.cache.store('projectList', res);
               observer.complete();
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

import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';

import { ProjectService, CacheService, StorageService } from '../services/index';

@Injectable()
export class ProjectListGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private projectService: ProjectService, private cache: CacheService, private storage: StorageService) {}

    /**
     * Implemented as part of CanActivate
     * @return {Observable<any>}
     */
    canActivate() : Observable<boolean> {
      let sort = 'updated_at';
      let descending = true;

      if (this.storage.supported) {
          let s = this.storage.getItem('projects_sort');

          if (s !== null) sort = s;

          descending = this.storage.getItem('projects_sort_direction') !== 'ASC';
      }

      return Observable.create((observer: Observer<boolean>) => {
          this.sub = this.projectService.all({
             current_page: 1,
             length: 15,
             order_by: sort,
             descending: descending
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

import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ProjectService, ClientService, CacheService } from '../services/index';
import { RegistersSubscribers } from '../index';


@Injectable()
export class ProjectGuard implements CanActivate, OnDestroy, RegistersSubscribers {
    _subscriptions: Subscription[] = [];

    constructor(
        private projectService: ProjectService,
        private clientService: ClientService,
        private route: ActivatedRoute,
        public cache: CacheService
    ) { }

    /**
     * Implemented as part of CanActivate
     * @return {Observable<any>}
     */
    canActivate(): Observable<any> {
      return Observable.create(observer => {
        let sub = this.clientService.options().subscribe(res => {
            this.cache.store('clients', res);
            observer.complete(true);
        });

        this.registerSubscriber(sub);
      });
    }

    /**
     * Implemented as part of RegistersSubscribers
     * @param {Subscription} sub
     */
    registerSubscriber(sub: Subscription): void {
        this._subscriptions.push(sub);
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
    }
}

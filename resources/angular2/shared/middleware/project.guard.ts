import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRoute, Params } from '@angular/router';

import { ProjectService, ClientService, JpaCache } from '../services/index';

import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class ProjectGuard implements CanActivate, OnDestroy {
    private subs: Subscription[] = [];
    private params: Params;

    constructor(private projectService: ProjectService, private clientService: ClientService, private route: ActivatedRoute, public cache: JpaCache) { }

    ngOnInit() {
        // this.subs.push(this.route.params.subscribe(params => {
        //     console.info('got params; ', params);
        //     this.params = params;
        // }));
    }

    canActivate() {
      console.log('ProjectGuard can activate called', this);
      return Observable.create(observer => {
        let _sub = this.clientService.options().subscribe(res => {
            this.cache.store('clients', res);
            observer.complete(true);
        });

        this.subs.push(_sub);
      });
    }

    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}
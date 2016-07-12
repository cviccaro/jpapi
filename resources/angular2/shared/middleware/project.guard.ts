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
        let gotClients = false;
        let gotProject = false;

        let _sub = this.clientService.options().subscribe(res => {
            this.cache.store('clients', res);
            gotClients = true;
            if (gotProject) observer.complete(true);
        });

        this.subs.push(_sub);

        let _sub2 = this.route.params.subscribe(params => {
          console.log('got sweet ass router params: ', params);
            let id = params['id'];
            if (id === undefined || id === 'new') {
              gotProject = true;
            } else {
              id = +id;
              let _sub = this.projectService.find(id).subscribe(res => {
                  this.cache.store('project', res);
                  gotProject = true;
                  if (gotClients) observer.complete(true);
              });
              this.subs.push(_sub);
            }
        });

        this.subs.push(_sub2);
      });
    }

    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}
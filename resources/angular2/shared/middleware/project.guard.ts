import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRoute, Params } from '@angular/router';

import { ProjectService, ClientService } from '../services/index';

import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class ProjectGuard implements CanActivate, OnDestroy {
    private subs: Subscription[] = [];
    private params: Params;

    constructor(private projectService: ProjectService, private clientService: ClientService, private route: ActivatedRoute) { }

    ngOnInit() {
        // this.subs.push(this.route.params.subscribe(params => {
        //     console.info('got params; ', params);
        //     this.params = params;
        // }));
    }

    canActivate() {
      return Observable.create(observer => {
        let gotClients = false;
        let gotProject = false;

        let _sub = this.clientService.options().subscribe(res => {
            this.clientService.cache(res);
            gotClients = true;
            if (gotProject) observer.complete(true);
        });

        this.subs.push(_sub);

        let _sub2 = this.route.params.subscribe(params => {
            let id = params['id'];
            if (id === undefined || id === 'new') {
              gotProject = true;
            } else {
              id = +id;
              let _sub = this.projectService.find(id).subscribe(res => {
                  this.projectService.cache(res);
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
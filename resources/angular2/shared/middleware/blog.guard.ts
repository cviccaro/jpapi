import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRoute, Params } from '@angular/router';

import { BlogService } from '../services/index';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class BlogGuard implements CanActivate, OnDestroy {
    private sub: any;
    private params: Params;

    constructor(private blogService: BlogService, private route: ActivatedRoute) { }

    ngOnInit() {
        // this.subs.push(this.route.params.subscribe(params => {
        //     console.info('got params; ', params);
        //     this.params = params;
        // }));
    }

    canActivate() {
      return Observable.create(observer => {
          this.route.params.subscribe(params => {
              let id = +params['id'];
              this.sub = this.blogService.find(id).subscribe(res => {
                  this.blogService.cache(res);
                  observer.complete(true);
              });
          });
      });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
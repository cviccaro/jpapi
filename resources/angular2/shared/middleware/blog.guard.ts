import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRoute, Params } from '@angular/router';

import { BlogService, TagService, DivisionService } from '../services/index';

import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class BlogGuard implements CanActivate, OnDestroy {
    private subs: Subscription[] = [];
    private params: Params;

    constructor(
      private blogService: BlogService, 
      private tagService: TagService, 
      private divisionService: DivisionService, 
      private route: ActivatedRoute
    ) { }

    canActivate() {
      return Observable.create(observer => {
        let gotTags = false;
        let gotBlog = false;
        let gotDivisions = false;

        let _sub = this.tagService.options().subscribe(res => {
          console.log('got tag options!', res);
            this.tagService.cache(res);
            gotTags = true;
            if (gotBlog && gotDivisions) observer.complete(true);
        });

        let _sub2 = this.divisionService.options().subscribe(res => {
          this.divisionService.cache(res);
          gotDivisions = true;
          if (gotTags && gotBlog) observer.complete(true);
        })

        this.subs.push(_sub2);

        let _sub3 = this.route.params.subscribe(params => {
            let id = params['id'];
            if (id === undefined || id === 'new') {
              gotBlog = true;
            } else {
              id = +id;
              let _sub3 = this.blogService.find(id).subscribe(res => {
                  this.blogService.cache(res);
                  gotBlog = true;
                  if (gotTags && gotDivisions) observer.complete(true);
              });
              this.subs.push(_sub3);
            }
        });

        this.subs.push(_sub3);
      });
    }

    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}
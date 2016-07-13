import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

import { BlogService, TagService, DivisionService, CacheService } from '../services/index';


@Injectable()
export class BlogGuard implements CanActivate, OnDestroy {
  private divisionsSub: Subscription;
  private tagsSub: Subscription;

  constructor(
    private cache: CacheService,
    private tagService: TagService,
    private divisionService: DivisionService,
    private route: ActivatedRoute
  ) { }

  canActivate() {
    return Observable.create(observer => {
      let gotDivisions = false;
      let gotTags = false;

      this.divisionsSub = this.divisionService.options().subscribe(res => {
        this.cache.store('divisions', res);
        gotDivisions = true;
        if (gotTags) observer.complete(true);
      });

      this.tagsSub = this.tagService.options().subscribe(res => {
        this.cache.store('tags', res);
        gotTags = true;
        if (gotDivisions) observer.complete(true);
      });

    });
  }

  ngOnDestroy() {
    if (this.divisionsSub) this.divisionsSub.unsubscribe();
    if (this.tagsSub) this.tagsSub.unsubscribe();
  }
}
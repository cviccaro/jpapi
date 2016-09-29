import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { TagService, DivisionService, CacheService, StaffService } from '../services/index';
import { RegistersSubscribers } from '../index';

@Injectable()
export class BlogGuard implements CanActivate, OnDestroy, RegistersSubscribers {
  _subscriptions: Subscription[] = [];

  constructor(
    private cache: CacheService,
    private tagService: TagService,
    private divisionService: DivisionService,
    private staffService: StaffService
  ) { }

  /**
   * Implemented as part of CanActivate
   * @return {Observable<any>}
   */
  canActivate(): Observable<any> {
    return Observable.create(observer => {
      let gotDivisions = false;
      let gotTags = false;
      let gotStaff = false;

      let sub = this.divisionService.options().subscribe(res => {
        this.cache.store('divisions', res);
        gotDivisions = true;
        if (gotStaff && gotTags) observer.complete(true);
      });

      this.registerSubscriber(sub);

      let sub2 = this.tagService.options().subscribe(res => {
        this.cache.store('tags', res);
        gotTags = true;
        if (gotStaff && gotDivisions) observer.complete(true);
      });

      this.registerSubscriber(sub2);

      let sub3 = this.staffService.options().subscribe(res => {
        this.cache.store('staff', res);
        gotStaff = true;
        if (gotTags && gotDivisions) observer.complete(true);
      });

      this.registerSubscriber(sub3);
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
  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}

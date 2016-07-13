import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';

import { DivisionService, CacheService } from '../services/index';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class DivisionsGuard implements CanActivate, OnDestroy {
    private sub: any;

    constructor(private service: DivisionService, private cache: CacheService) { }

    canActivate() {
        return Observable.create(observer => {
            this.sub = this.service.all().subscribe(res => {
               this.cache.store('divisions', res);
               observer.complete(true);
           });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
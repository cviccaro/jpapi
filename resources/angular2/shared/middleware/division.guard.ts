import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { DivisionService, JpaCache } from '../services/index';
import { Division } from '../models/index';

import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class DivisionGuard implements CanActivate, OnDestroy {
    private routeParamsSub: Subscription;
    private modelSub: Subscription;

    constructor(private router: Router, private service: DivisionService, private cache: JpaCache) { }

    canActivate() {
        return Observable.create((observer: any) => {
          console.log(this.router.routerState.snapshot);
          observer.complete(false);
            // let routeParamsSub = this.route.params.subscribe((params: any) => {
            //   let id = +params['id'];
            //   console.log('route params: ', {params: params, id: id});
            //     this.modelSub = this.service.find(id).subscribe((res: Division) => {
            //         this.cache.store('division', res);
            //         observer.complete(true);
            //     });
            // });
        });
    }

    ngOnDestroy() {
        if (this.routeParamsSub) this.routeParamsSub.unsubscribe();
        if (this.modelSub) this.modelSub.unsubscribe();
    }
}
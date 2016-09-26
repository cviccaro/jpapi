import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';
export interface CanComponentDeactivate {
    canDeactivate: (component, next?, state?) => boolean | Observable<boolean>;
}
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, next?, state?): Observable<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate(component, next, state) : true;
    }
}
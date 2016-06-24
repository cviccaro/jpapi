import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class ProgressService {
    progress: any;
    progress$: any;
    observer: Observer<any>;
    count: number;

    constructor() {
        this.count = 0;
        console.log('ProgressService constructed.', this);
        this.progress$ = Observable.create(observer => {
            this.observer = observer;
        }).share();
    }

    update(event) {
        console.log('progressService update: ', event);
        this.progress = event.loaded;
        this.observer.next(this.progress);
        console.log(this.progress);
        this.count++;
    }

    complete(response) {
        console.log('progressService complete: ', {
            response: response,
            this: this
        });
    }

    error(response) {
        console.log('progressService error: ', {
            response: response,
            this: this
        });
    }
}
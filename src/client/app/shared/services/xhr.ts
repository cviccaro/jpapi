import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class XhrService {
    requests = [];
    count = 0;

    @Output() start = new EventEmitter();
    @Output() done = new EventEmitter();

    started(config?) {
        //this.requests.push(config);
        this.count++;
        this.start.emit(config);
    }

    finished(config?) {
        if (--this.count === 0) {
            this.done.emit(config);
        }
    }
}

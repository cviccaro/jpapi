import { Injectable, Output, EventEmitter } from '@angular/core';
import { Request } from '@angular/http';

@Injectable()
export class XhrService {
    requests: Request[] = [];
    count = 0;

    @Output() start = new EventEmitter();
    @Output() done = new EventEmitter();

    started(config?: any) {
        //this.requests.push(config);
        this.count++;
        this.start.emit(config);
    }

    finished(config?: any) {
        if (--this.count === 0) {
            this.done.emit(config);
        }
    }
}

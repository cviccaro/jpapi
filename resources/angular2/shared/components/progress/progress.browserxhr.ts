import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';

import { ProgressService } from './index';

@Injectable()
export class ProgressBrowserXhr extends BrowserXhr {
    constructor(public service: ProgressService) {
        super();
        this.build();
        console.log('ProgressBrowserXhr constructed.', this);
    }
    build(): any {
        console.log('ProgressBrowserXhr build called ', this);
        let xhr = super.build();

        xhr.onprogress = (event) => {
            console.log('xhr.onprogress', event);
            this.service.update(event);
        };

        xhr.onreadystatechange = () => {
            console.log('xhr.onreadystatechange', {
                readyState: xhr.readyState,
                status: xhr.status,
                response: xhr.response
            });
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //observer.next(JSON.parse(xhr.response));
                    this.service.complete(xhr.response);
                } else {
                    this.service.error(xhr.response);
                }
            }
        };
    }
}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { XhrService } from './xhr';

@Injectable()
export class MetadataService {
    constructor(public http: Http, public xhr: XhrService) {
        this.http = http;
    }

    /**
     * Fetch metadata about a model
     * @returns {Observable<any>}
     */
    get(url_root: string): Observable<any> {
        this.xhr.started();
        return this.http.get(`/${url_root}/metadata`)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }
}

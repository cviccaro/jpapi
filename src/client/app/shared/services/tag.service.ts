import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import{ Observable } from 'rxjs/Rx';
import { XhrService } from './xhr';

@Injectable()
export class TagService {
	constructor(public http: Http, private xhr: XhrService) {
		this.http = http;
	}

    /**
     * Return options as list consumable by SELECT OPtions
     */
	options() {
        this.xhr.started();

		return this.http.get('/options/tags')
			.map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

    /**
     * Destroy a project by ID
     * @param {number}  id 
     * @return Observable<any>
     */
    destroy(id: number) {
        this.xhr.started();

        return Observable.create(observer => {
            this.http.delete(`/tags/${id}`)
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next();
                    observer.complete();
                });
        });
    }
}

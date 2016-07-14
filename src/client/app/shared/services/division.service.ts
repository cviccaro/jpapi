import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { LoggerService } from './logger.service';
import { XhrService } from './xhr';

@Injectable()
export class DivisionService {
	constructor(public http: Http, public xhr: XhrService, private log: LoggerService) {
		this.http = http;
	}

	all(params: {} = {}) {
	    let query = new URLSearchParams();

	    for (var key in params) {
	        const param: string = params[key];
	        query.set(key, param);
	    }

	    this.xhr.started();

	    return this.http.get('/divisions/paged', {search: query})
	        .map(res => {
	            this.xhr.finished();
	            return res.json();
	        });
	}

	options() {
		this.xhr.started();

		return this.http.get('/options/divisions')
			.map(res => {
			    this.xhr.finished();
			    return res.json();
			});
	}

	find(id: number) {
		this.xhr.started();

        return this.http.get('/divisions/' + id)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

	update(id, attributes) {
	    let form = new FormData();
	    let _form = {};
	    Object.keys(attributes).forEach(key => {
	        let val = attributes[key];
	        switch(key) {
	            case 'image':
	                form.append(key, val);
	                _form[key] = val;
	                break;
	            default:
	                if (val !== undefined && val !== null) {
	                    form.append(key, val);
	                    _form[key] = val;
	                }
	        }
	    });

	    this.log.debug('DivisionService is sending POST update request with form ', _form);

	    this.xhr.started();

	    return this.http.post('/divisions/' + id, form)
	        .map(res => {
	            this.xhr.finished();
	            return res.json();
	        });
	}

	destroy(id: number) {
	    this.xhr.started();

	    return Observable.create(observer => {
	        this.http.delete(`/divisions/${id}`)
	            .subscribe(res => {
	                this.xhr.finished();
	                observer.next();
	                observer.complete();
	            });
	    });
	}
}

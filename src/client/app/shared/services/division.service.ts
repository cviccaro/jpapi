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
	/**
	 * Get all divisions with filters and sorts
	 * @param {params}
	 * @return Observable<any>
	 */
	all(params: {} = {}): Observable<any> {
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

	/**
	 * Return options as list consumable by SELECT OPtions
	 */
	options(): Observable<any> {
		this.xhr.started();

		return this.http.get('/options/divisions')
			.map(res => {
			    this.xhr.finished();
			    return res.json();
			});
	}

	/**
	 * Find a Division by ID
	 * @param {number}  id 
	 * @return Observable<any>
	 */
	find(id: number): Observable<any> {
		this.xhr.started();

        return this.http.get('/divisions/' + id)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

	/**
	 * Update an existing division
	 * @param {[type]} id         [description]
	 * @param {[type]} attributes [description]
	 */
	update(id: number, attributes): Observable<any> {
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

	/**
	 * Destroy a Division by ID
	 * @param {number}  id 
	 * @return Observable<any>
	 */
	destroy(id: number): Observable<any> {
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

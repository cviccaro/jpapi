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
	 * @return Observable<any>
	 */
	update(id: number, attributes: { [key: string] : any }): Observable<any> {
	    let form = this.createFormData(attributes);

	    this.log.debug('DivisionService is sending POST update request with form ', form.toString());

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

	/**
	 * [createFormData description]
	 * @param {[key: string] : any} attributes [description]
	 * @return FormData
	 */
	private createFormData(attributes: { [key: string] : any }): FormData {
	    let form = new FormData();

	    for (let key in attributes) {
	        let val = attributes[key];

	        switch(key) {
	            case 'image':
	                if (val === '') {
	                    form.append(key, val);
	                } else if (!!val && val._file) {
	                    form.append(key, val._file);
	                }
	                break;
	            default:
	                if (val !== undefined && val !== null) form.append(key, val);
	        }
	    }

	    return form;
	}
}

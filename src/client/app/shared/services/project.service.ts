import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { XhrService  } from './xhr';

import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { ManagedImage } from "../models/file";

@Injectable()
export class ProjectService {
	public authToken: string;

	constructor(public http: Http, public authHttp: AuthHttp, public authService: AuthService, public xhr: XhrService) {
		this.http = http;
		this.authToken = authService.getToken();
	}
	/**
	 * Get all projects with filters and sorts
	 * @param {number}  id
	 * @return Observable<any>
	 */
	all(params: {} = {}): Observable<any> {
		let query = new URLSearchParams();

		for (var key in params) {
			const param: string = params[key];
			query.set(key, param);
		}

		this.xhr.started();

	    return this.http.get('/projects/paged', {search: query})
	        .map(res => {
	            this.xhr.finished();
	            return res.json();
	        });
	}

	/**
	 * Find a project by ID
	 * @param {number}  id
	 * @return Observable<any>
	 */
	find(id: number) : Observable<any> {
		this.xhr.started();

        return this.http.get(`/projects/${id}`)
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
    destroy(id: number): Observable<any> {
        this.xhr.started();

        return Observable.create(observer => {
            this.http.delete(`/projects/${id}`)
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next();
                    observer.complete();
                });
        });
    }

	/**
	 * Update an existing project
	 * @param {[type]} id         [description]
	 * @param {[type]} attributes [description]
	 */
	update(id: number, attributes: { [key: string] : any}): Observable<any> {
		let form = this.createFormData(attributes);

		this.xhr.started();

		return this.http.post(`/projects/update/${id}`, form)
		    .map(res => {
		        this.xhr.finished();
		        return res.json();
		    });
	}

	/**
	 * Create a new project
	 * @param {[type]} attributes [description]
	 */
	create(attributes: {[key: string] : any}): Observable<any> {
		let form = this.createFormData(attributes);

		this.xhr.started();

		return this.http.post('/projects', form)
		    .map(res => {
		        this.xhr.finished();
		        return res.json();
		    });
	}

	/**
	 * [createFormData description]
	 * @param {[key: string] : any} attributes [description]
	 * @return FormData
	 */
	private createFormData(attributes: {[key: string] : any}): FormData {
		let form = new FormData();

		for (let key in attributes) {

			let val = attributes[key];

			switch(key) {
				case 'client':
					break;
				case 'images':
					if (val) {
						val.forEach((item, i) => {
                            (<ManagedImage>item).injectIntoForm(`${key}[${i}]`, form);
                        });
					} else {
						form.append(`${key}[0]`, '');
					}
					break;
				case 'divisions':
					if (val) {
						val.forEach((item,i) => {
							for (let k in item) {
								form.append(`${key}[${i}][${k}]`, item[k]);
							}
						});
					} else {
						form.append(`${key}[0]`, '');
					}
					break;
				case 'image':
					if (val === '') {
						// File was deleted
						form.append(key, val);
					} else if (!!val) {
                        (<ManagedImage>val).injectIntoForm(key, form);
					}
					break;
				default:
					if (val !== undefined && val !== null) {
						form.append(key, val);
						console.log('ProjectService appending to form ', {
							key: key,
							val: val
						});
					}
					break;
			}
		}

		return form;
	}
}

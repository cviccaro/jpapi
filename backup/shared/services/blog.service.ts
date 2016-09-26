import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { XhrService } from './xhr';
import {ManagedImage} from "../models/file";
import {AuthHttp} from "./auth.http";

@Injectable()
export class BlogService {
	constructor(
	    public http: Http,
        public authHttp: AuthHttp,
        public xhr: XhrService
    ) {	}

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

	    return this.http.get('/blogs/paged', {search: query})
	        .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

    /**
     * Get some information about the blogs
     * @returns {Observable<R>}
     */
    metadata(): Observable<any> {
        this.xhr.started();
        return this.http.get('/blogs/metadata')
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
	find(id: number): Observable<any> {
        this.xhr.started();

        return this.http.get(`/blogs/${id}`)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}
    /**
     * Destroy a blog by ID
     * @param {number}  id 
     * @return Observable<any>
     */
    destroy(id: number): Observable<any> {
        this.xhr.started();

        return Observable.create(observer => {
            this.authHttp.delete(`/blogs/${id}`)
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next();
                    observer.complete();
                });
        });
    }
    /**
     * Create a new project
     * @param {[type]} attributes [description]
     */
    create(attributes: { [key: string] : any}): Observable<any> {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.authHttp.post('/blogs', form)
            .map(res => {
                this.xhr.finished();
                return res.json();
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

        return this.authHttp.post(`/blogs/update/${id}`, form)
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
                case 'images':
                    if (val) {
                        val.forEach((item, i) => {
                            (<ManagedImage>item).injectIntoForm(`${key}[${i}]`, form);
                        });
                    } else {
                        form.append(`${key}[0]`, '');
                    }
                    break;
                case 'image':
                case 'splash':
                    if (val === '') {
                        // File was deleted
                        form.append(key, val);
                    } else if (!!val) {
                        (<ManagedImage>val).injectIntoForm(key, form);
                    }
                    break;
                case 'divisions':
                case 'tags':
                    val.forEach((item,i) => {
                        for (let k in item) {
                            form.append(`${key}[${i}][${k}]`, item[k]);
                        }
                    });
                    break;
                default:
                    if (val !== undefined && val !== null) form.append(key, val);
                    break;
            }
        }

        return form;
    }
}

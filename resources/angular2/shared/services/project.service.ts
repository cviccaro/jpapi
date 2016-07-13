import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { XhrService  } from './xhr';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ProjectService {
	public authToken: string;

	constructor(public http: Http, public authHttp: AuthHttp, public authService: AuthService, public xhr: XhrService) {
		this.http = http;
		this.authToken = authService.getToken();
	}

	all(params: {} = {}) {
		let query = new URLSearchParams();

		for (var key in params) {
			const param: string = params[key];
			query.set(key, param);
		}

		this.xhr.started();

	    return this.http.get('/projects/paged', {search: query})
	        .map(res => {
	            this.xhr.finished();
	            return res.json()
	        });
	}

	find(id: number, cached?: boolean) {
		this.xhr.started();

        return this.http.get(`/projects/${id}`)
            .map(res => {
                this.xhr.finished();
                return res.json()
            });
	}

	destroy(id: number) {
		this.xhr.started();

	    return this.http.delete(`/projects/${id}`)
		    .map(res => {
		        this.xhr.finished();
		        return res.json()
		    });
	}

	update(id, attributes) {
		let form = this.createFormData(attributes);

		this.xhr.started();

		return this.http.post(`/projects/update/${id}`, form)
		    .map(res => {
		        this.xhr.finished();
		        return res.json()
		    });
	}

	create(attributes) {
		let form = this.createFormData(attributes);

		this.xhr.started();

		return this.http.post('/projects', form)
		    .map(res => {
		        this.xhr.finished();
		        return res.json()
		    });
	}

	private createFormData(attributes) {
		let form = new FormData();

		for (let key in attributes) {

			let val = attributes[key];

			switch(key) {
				case 'client':
					break;
				case 'images':
					val.forEach((item,i) => {
						for (let k in item) {
							form.append(`${key}[${i}][${k}]`, item[k]);
						}
					});
					break;
				case 'image':
					if (val === '') {
						form.append(key, val);
					} else if (!!val && val._file) {
						form.append(key, val._file);
					}
					break;
				default:
					if (val !== undefined && val !== null) {
						form.append(key, val);
					}
			}
		}

		return form;
	}
}

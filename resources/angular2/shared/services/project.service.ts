import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {AuthService} from './auth.service';

import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ProjectService {
	private list: any;
	private byId: any[];

	public authToken: string;

	constructor(public http: Http, public authHttp: AuthHttp, authService: AuthService) {
		this.http = http;
		this.authToken = authService.getToken();
	}

	all(params: {} = {}) {
		let query = new URLSearchParams();

		for (var key in params) {
			const param: string = params[key];
			query.set(key, param);
		}

	    return this.http.get('/projects/paged', {search: query})
	        .map((res) => res.json());
	}

	setList(res) {
	    this.list = res;
	    return this;
	}

	getList() {
	    return this.list;
	}

	find(id: number, cached?: boolean) {
        if (cached && this.byId[id] !== undefined) {
            return this.byId[id];
        }

        return this.http.get('/projects/' + id)
            .map(res => res.json());
	}

	cache(project) {
        this.byId[project.id] = project;
        return this;
	}

	destroy(id: number) {
	    return this.http.delete('/projects/' + id);
	}

	update(id, attributes) {
		let url = window.location.protocol + '//' + window.location.hostname + '/projects/update/' + id;

		let form = new FormData();
		let _form = {};
		Object.keys(attributes).forEach(key => {
			let val = attributes[key];
			switch(key) {
				case 'images':
					val.forEach((item,i) => {
						Object.keys(item).forEach(k => {
							let v = item[k];
							form.append(`${key}[${i}][${k}]`, v);
							_form[`${key}[${i}][${k}]`] = v;
						});
					});
					break;
				case 'image':
					if (val === '') {
						form.append(key, val);
						_form[key] = val;
					} else if (!!val && val._file) {
						form.append(key, val._file);
						_form[key] = val._file;
					}
					break;
				case 'client':
					break;
				default:
					if (val !== undefined && val !== null) {
						console.log('appending to form ', { key: key, val: val });
						form.append(key, val);
						_form[key] = val;
					} else {
						console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
					}
			}
		});

		console.debug('ProjectService is sending POST request to ' + url + ' with form ', _form);
		return this.http.post(url, form)
			.map(res => res.json());
	}

	private getCookie(name: string): any {
	    let value = "; " + document.cookie;
	    let parts = value.split("; " + name + "=");
	    if (parts.length == 2) {
	        return parts.pop().split(";").shift();
	    }

	    return false;
	}

	create(attributes) {
		let url = window.location.protocol + '//' + window.location.hostname + '/projects';

		let form = new FormData();
		let _form = {};
		Object.keys(attributes).forEach(key => {
			let val = attributes[key];
			switch(key) {
				case 'images':
					val.forEach((item,i) => {
						Object.keys(item).forEach(k => {
							let v = item[k];
							form.append(`${key}[${i}][${k}]`, v);
							_form[`${key}[${i}][${k}]`] = v;
						});
					});
					break;
				case 'image':
					if (!!val && val._file) {
						form.append(key, val._file);
						_form[key] = val._file;
					}
					break;
				case 'client':
					break;
				default:
					if (val !== undefined && val !== null) {
						console.log('appending to form ', { key: key, val: val });
						form.append(key, val);
						_form[key] = val;
					} else {
						console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
					}
			}
		});

		console.log("Created a form to upload to project create", _form);

		return this.http.post(url, form)
			.map(res => res.json());
	}
}

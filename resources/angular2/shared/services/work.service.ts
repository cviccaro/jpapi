import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {AuthService} from './auth.service';

import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class WorkService {
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

	    return this.http.get('/work/paged', {search: query})
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

        return this.http.get('/work/' + id)
            .map(res => res.json());
	}

	cache(work) {
        this.byId[work.id] = work;
        return this;
	}

	update(id, attributes) {
		let url = window.location.protocol + '//' + window.location.hostname + '/work/update/' + id;

		let form = new FormData();
		let _form = {};
		Object.keys(attributes).forEach(key => {
			let val = attributes[key];
			switch(key) {
				case 'gallery':
					val.forEach((item,i) => {
						form.append(`${key}[${i}][id]`, item.id);
						form.append(`${key}[${i}][weight]`, item.weight);
						_form[`${key}[${i}][id]`] = item.id;
						_form[`${key}[${i}][weight]`] = item.weight;
					})
					break;
				case 'client':
					form.append(key, val.id);
					_form[key] = val.id;
					break;
				case 'image_new':
					form.append(key + '[]', val);
					_form[key] = val;
					break;
				case 'gallery_new':
					val.forEach(file => {
						form.append(key + '[]', file);
						_form[key + '[]'] = file;
					})
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

		console.debug('WorkService is sending POST request to ' + url + ' with form ', _form);
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
		let url = window.location.protocol + '//' + window.location.hostname + '/work';

		let form = new FormData();
		let _form = {};
		Object.keys(attributes).forEach(key => {
			let val = attributes[key];
			switch(key) {
				case 'gallery':
					val.forEach((item,i) => {
						form.append(`${key}[${i}][id]`, item.id);
						form.append(`${key}[${i}][weight]`, item.weight);
						_form[`${key}[${i}][id]`] = item.id;
						_form[`${key}[${i}][weight]`] = item.weight;
					})
					break;
				case 'client':
					form.append(key, val.id);
					_form[key] = val.id;
					break;
				case 'image_new':
					form.append(key + '[]', val);
					_form[key] = val;
					break;
				case 'gallery_new':
					val.forEach(file => {
						form.append(key + '[]', file);
						_form[key + '[]'] = file;
					})
					break;
				default:
					if (val !== undefined && val !== null) {
						//console.log('appending to form ', { key: key, val: val });
						form.append(key, val);
						_form[key] = val;
					} else {
						console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
					}
			}
		});

		console.log("Created a form to upload to work update", _form);

		return this.http.post(url, form)
			.map(res => res.json());
	}
}

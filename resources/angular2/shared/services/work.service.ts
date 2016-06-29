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
		return Observable.create(observer => {
			let url = window.location.protocol + '//' + window.location.hostname + '/work/update/' + id;

			console.debug('WorkService.update called with arguments: ', { id: id, attributes: attributes });

			let xhr = new XMLHttpRequest();
			let form = new FormData();

			let xsrf = this.getCookie('XSRF-TOKEN');
			if (xsrf) {
			  console.log('appending xsrf', xsrf);
			  form.append('_token', xsrf);
			}
			let _form = {};
			Object.keys(attributes).forEach(key => {
				let val = attributes[key];
				switch(key) {
					case 'gallery':
						val.forEach(item => {
							form.append(key + '[]', item.id);
							form.append('gallery_weights[]', item.weight);
						})
						break;
					case 'client':
						form.append(key, val.id);
						break;
					case 'gallery_new':
						val.forEach(file => {
							form.append(key + '[]', file);
						})
						break;
					default:
						console.log('appending to form ', { key: key, val: val });
						form.append(key, val);
						_form[key] = val;
				}
			});

			console.log("Created a form to upload to work update", _form);

			// image.isUploading = true;

			xhr.upload.onprogress = (event: any) => {
			    let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);

			    console.log('progress!!!!!!', {event: event, progress: progress});
			    // this.onProgressItem(item, progress);
			    // this.onProgressAll(total);
			};
			xhr.onerror = e => { console.log('xhr on error', { e: e, xhr: xhr }); observer.error(e); }
			xhr.onload = e => { console.log('xhr on load ', { e: e, xhr: xhr }); }
			xhr.onabort = e => { console.log('xhr on abort', {e: e, xhr: xhr}); }
			xhr.open('POST', '/work/update/' + id, true);

			// //xhr.withCredentials = true;

			// if (xsrf) {
			//   console.log('Setting Request Header "X-XSRF-TOKEN" to ', xsrf);
			//   xhr.setRequestHeader('X-XSRF-TOKEN', xsrf);
			// }
			if (this.authToken) {
			  console.log('Setting Request Header "Authorization" to ', 'Bearer ' + this.authToken);
			  xhr.setRequestHeader('Authorization', 'Bearer ' + this.authToken);
			}

			xhr.send(form);

			console.log('just sent xhr to url: ' + url, xhr);

			// return this.authHttp.put(url, attributes)
			// 	.map(res => res.json());
		});
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
		
		return this.http.post(url, attributes)
			.map(res => res.json());
	}
}

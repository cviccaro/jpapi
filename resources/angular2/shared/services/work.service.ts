import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WorkService {
	private list: any;
	private byId: any[];

	constructor(public http: Http) {
		this.http = http;
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
		let url = window.location.protocol + '//' + window.location.hostname + '/work/' + id;

		return this.http.put(url, attributes)
			.map(res => res.json());
	}

	create(attributes) {
		let url = window.location.protocol + '//' + window.location.hostname + '/work';

		return this.http.post(url, attributes)
			.map(res => res.json());
	}
}

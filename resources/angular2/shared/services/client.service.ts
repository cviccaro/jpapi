import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { JpClient } from '../models/client';

@Injectable()
export class ClientService {
	private _cached: string[];

	constructor(public http: Http) {
		this.http = http;
	}

    all(params: {} = {}) {
        let query = new URLSearchParams();
        for (var key in params) {
            const param: string = params[key];
            query.set(key, param);
        }

        return this.http.get('/clients/paged', {search: query})
            .map(res => res.json());
    }

	options() {
		return this.http.get('/options/clients')
			.map(res => res.json());
	}

    cache(v: string[]) {
        this._cached = v;
    }

    cached() : string[] {
        return this._cached;
    }
}

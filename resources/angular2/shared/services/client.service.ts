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

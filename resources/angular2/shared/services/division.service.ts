import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { Division } from '../models/division';

@Injectable()
export class DivisionService {
	private _cached: string[];

	constructor(public http: Http) {
		this.http = http;
	}

	options() {
		return this.http.get('/options/divisions')
			.map(res => res.json());
	}

    cache(v: string[]) {
        this._cached = v;
    }

    cached() : string[] {
        return this._cached;
    }
}

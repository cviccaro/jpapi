import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { Tag } from '../models/tag';
import { XhrService } from './xhr';

@Injectable()
export class TagService {
	private _cached: string[];

	constructor(public http: Http, private xhr: XhrService) {
		this.http = http;
	}

	options() {
        this.xhr.started();

		return this.http.get('/options/tags')
			.map(res => {
                this.xhr.finished();
                return res.json()
            });
	}
}

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
	//private list: any;
	//private byId: any[];

	constructor(public http: Http) {
		this.http = http;
	}

	options() {
		return this.http.get('/options/clients')
			.map(res => res.json());
	}
}

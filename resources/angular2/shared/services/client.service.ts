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

    update(id, values: any[]) {
        let form = new FormData();
        let _form = {};

        values.forEach(col => {
            let key = col.name;
            let value = col.value;

            switch(key) {
                case 'image':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value[0]);
                        _form[key] = col.value[0];
                    }
                    break;
                case 'featured':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value ? 1 : 0);
                        _form[key] = col.value ? 1 : 0;
                    }
                    break;
                default:
                    if (value !== undefined && value !== null) {
                        form.append(key, value);
                        _form[key] = value;
                    }
            }
        });

        console.log('update client with data: ', {
            values: values,
            form: form,
            _form: _form
        });

        return this.http.post('/clients/update/' + id, form).map(res => res.json());
    }

    create(values: any[]) {
        let form = new FormData();
        let _form = {};

        values.forEach(col => {
            let key = col.name;
            let value = col.value;

            switch(key) {
                case 'image':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value[0]);
                        _form[key] = col.value[0];
                    }
                    break;
                case 'featured':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value ? 1 : 0);
                        _form[key] = col.value ? 1 : 0;
                    }
                    break;
                default:
                    if (value !== undefined && value !== null) {
                        form.append(key, value);
                        _form[key] = value;
                    }
            }
        });

        console.log('create client with data: ', {
            values: values,
            form: form,
            _form: _form
        });

        return this.http.post('/clients', form).map(res => res.json());
    }

    destroy(id: number) {
        return this.http.delete('/clients/' + id);
    }
}

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { XhrService } from './xhr';

@Injectable()
export class BlogService {

	constructor(public http: Http, public xhr: XhrService) {
		this.http = http;
	}

	all(params: {} = {}) {
		let query = new URLSearchParams();

		for (var key in params) {
			const param: string = params[key];
			query.set(key, param);
		}

        this.xhr.started();

	    return this.http.get('/blogs/paged', {search: query})
	        .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

	find(id: number, cached?: boolean) {
        this.xhr.started();

        return this.http.get(`/blogs/${id}`)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

    destroy(id: number) {
        this.xhr.started();

        return Observable.create(observer => {
            this.http.delete(`/blogs/${id}`)
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next();
                    observer.complete();
                });
        });
    }

    create(attributes) {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.http.post('/blogs', form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    update(id, attributes) {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.http.post(`/blogs/update/${id}`, form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    private createFormData(attributes) {
        let form = new FormData();

        for (let key in attributes) {
            let val = attributes[key];

            switch(key) {
                case 'images':
                    break;
                case 'image':
                    if (val === '') {
                        form.append(key, val);
                    } else if (!!val && val._file) {
                        form.append(key, val._file);
                    }
                    break;
                case 'divisions':
                case 'tags':
                    val.forEach((item,i) => {
                        for (let k in item) {
                            form.append(`${key}[${i}][${k}]`, item[k]);
                        }
                    });
                    break;
                default:
                    if (val !== undefined && val !== null) form.append(key, val);
            }
        }

        return form;
    }
}

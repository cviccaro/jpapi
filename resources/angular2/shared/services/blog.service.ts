import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {
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

	    return this.http.get('/blogs/paged', {search: query})
	        .map(res => res.json());
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

        return this.http.get('/blogs/' + id)
            .map(res => res.json());
	}

	cache(blog) {
        this.byId[blog.id] = blog;
        return this;
	}

    destroy(id: number) {
        return this.http.delete('/blogs/' + id);
    }

    create(attributes) {
        let url = window.location.protocol + '//' + window.location.hostname + '/blogs';

        let form = new FormData();
        let _form = {};
        Object.keys(attributes).forEach(key => {
            let val = attributes[key];
            switch(key) {
                case 'images':
                    break;
                case 'divisions':
                case 'tags':
                    val.forEach((item,i) => {
                        Object.keys(item).forEach(k => {
                            let v = item[k];
                            form.append(`${key}[${i}][${k}]`, v);
                            _form[`${key}[${i}][${k}]`] = v;
                        });
                    });
                    break;
                case 'image':
                    form.append(key, val);
                    _form[key] = val;
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

        console.log("Created a form to upload to blog create", _form);

        return this.http.post(url, form)
            .map(res => res.json());
    }

    update(id, attributes) {
        let url = window.location.protocol + '//' + window.location.hostname + '/blogs/update/' + id;

        let form = new FormData();
        let _form = {};
        Object.keys(attributes).forEach(key => {
            let val = attributes[key];
            switch(key) {
                case 'images':
                    break;
                case 'divisions':
                case 'tags':
                    val.forEach((item,i) => {
                        Object.keys(item).forEach(k => {
                            let v = item[k];
                            form.append(`${key}[${i}][${k}]`, v);
                            _form[`${key}[${i}][${k}]`] = v;
                        });
                    });
                    break;
                case 'image':
                    form.append(key, val);
                    _form[key] = val;
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

        console.debug('BlogService is sending POST request to ' + url + ' with form ', _form);
        return this.http.post(url, form)
            .map(res => res.json());
    }
}

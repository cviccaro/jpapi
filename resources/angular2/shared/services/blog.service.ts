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

        return this.http.get('/blog/' + id)
            .map(res => res.json());
	}

	cache(blog) {
        this.byId[blog.id] = blog;
        return this;
	}
}

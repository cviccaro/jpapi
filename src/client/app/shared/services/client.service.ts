import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { LoggerService } from './logger.service';
import { XhrService } from './xhr';
import {ManagedImage} from "../models/file";

@Injectable()
export class ClientService {
	constructor(public http: Http, private xhr: XhrService, private log: LoggerService) {
		this.http = http;
	}

    /**
     * Get all clients with filters and sorts
     * @param {params}
     * @return Observable<any>
     */
    all(params: {} = {}) {
        let query = new URLSearchParams();

        for (var key in params) {
            const param: string = params[key];
            query.set(key, param);
        }

        this.xhr.started();

        return this.http.get('/clients/paged', {search: query})
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Return options as list consumable by SELECT Options
     */
	options() {
        this.xhr.started();

		return this.http.get('/options/clients')
			.map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

    /**
     * Create new project
     * @param attributes
     * @returns {Observable<R>}
     */
    create(attributes: { [key: string] : any}): Observable<any> {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.http.post('/clients', form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Update existing client
     * @param id
     * @param attributes
     * @returns {Observable<R>}
     */
    update(id: number, attributes: { [key: string] : any}): Observable<any> {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.http.post('/clients/update/' + id, form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Destroy a client
     * @param id
     * @returns {Observable<R>}
     */
    destroy(id: number): Observable<any> {
        this.xhr.started();

        return Observable.create(observer => {
            this.http.delete(`/clients/${id}`)
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next();
                    observer.complete();
                });
        });
    }

    /**
     * Create FormData from attributes
     * @param {[key: string] : any} attributes
     * @returns FormData
     */
    private createFormData(attributes: {[key: string] : any}): FormData {
        let form = new FormData();

        for (let key in attributes) {
            let val = attributes[key];

            switch(key) {
                case 'image':
                    if (val === '') {
                        // File was deleted
                        form.append(key, val);
                    } else if (!!val) {
                        (<ManagedImage>val).injectIntoForm(key, form);
                    }
                    break;
                case 'featured':
                    if (val !== undefined && val !== null) {
                        form.append(key, val ? 1 : 0);
                    }
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        form.append(key, val);
                    }
            }
        }

        return form;
    }
}

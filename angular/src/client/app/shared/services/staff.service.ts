import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { XhrService } from './xhr';
import { AuthHttp } from './auth.http';
import { ManagedImage } from '../models/file';

@Injectable()
export class StaffService {
	constructor(
	    public http: Http,
        public authHttp: AuthHttp,
        private xhr: XhrService
    ) { }


    /**
     * Get all staff
     * @return Observable<any>
     */
    all(): Observable<Response> {
        this.xhr.started();

        return Observable.create((observer:any) => {
            this.authHttp.get('/staff')
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next(res.json());
                    observer.complete();
                });
        });
    }


    /**
     * Return options as list consumable by SELECT Options
     */
    options() {
        this.xhr.started();

        return this.http.get('/options/staff')
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

        return this.authHttp.post('/staff', form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Update existing staff
     * @param id
     * @param attributes
     * @returns {Observable<R>}
     */
    update(id: number, attributes: { [key: string] : any}): Observable<any> {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.authHttp.post('/staff/update/' + id, form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Destroy a project by ID
     * @param {number}  id 
     * @return Observable<any>
     */
    destroy(id: number) {
        this.xhr.started();

        return Observable.create((observer:any) => {
            this.authHttp.delete(`/staff/${id}`)
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
                case 'image_small':
                case 'image':
                    if (val === '') {
                        // File was deleted
                        form.append(key, val);
                    } else if (!!val) {
                        (<ManagedImage>val).injectIntoForm(key, form);
                    }
                    break;
                case 'active':
                    if (val !== undefined && val !== null) {
                        form.append(key, val ? 1 : 0);
                    }
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        form.append(key, val);
                    }
                    break;
            }
        }

        return form;
    }
}

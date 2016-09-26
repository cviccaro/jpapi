import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { XhrService } from './xhr';

import { SettingFormControl } from '../models/index';
import { LoggerService } from './logger.service';
import {ManagedFile} from "../models/file";
import {AuthHttp} from "./auth.http";

@Injectable()
export class SettingsService {
	constructor(
		public http: Http,
		public authHttp: AuthHttp,
		private xhr: XhrService,
		private log: LoggerService
	) { }

    all(): Observable<any> {
    	this.xhr.started();

        return this.http.get('/settings')
        	.map(res => {
        		this.xhr.finished();
        		return res.json()
			});
    }

    updateMany(settings: SettingFormControl[]): Observable<any> {
    	this.log.debug('SettingsService.updateMany() ', settings);

    	let form = new FormData();

    	for (let setting of settings) {
    		switch(setting.control_type) {
    			case 'file':
    				if (setting.value) {
						(<ManagedFile>setting.value).injectIntoForm(setting.name, form);
					}
    				break;
                default:
                    form.append(setting.name, setting.value);
                    break;
    		}
    	}

		this.xhr.started();

    	return this.authHttp.post('settings', form).map(res => {
    		this.xhr.finished();
    		return res.json();
		});
    }
}

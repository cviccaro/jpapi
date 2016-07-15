import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { XhrService } from './xhr';

export interface JpSetting {
	name: string;
	description: string;
	label: string;
	value?: any;
	control_type: string;
	type?: string;
}

@Injectable()
export class SettingsService {
	constructor(public http: Http, private xhr: XhrService) {
		this.http = http;
	}

    all(): Observable<any> {
        return this.http.get('/settings')
        	.map(res => res.json());
    }

    updateMany(settings: JpSetting[]): Observable<any> {
    	console.log('SettingsService.updateMany() ', settings);

    	let form = new FormData();

    	for (let setting of settings) {
    		switch(setting.control_type) {
    			case 'file':
    				if (setting.value && setting.value._file) {
    					form.append(setting.name, setting.value._file);
    				}
    				break;
                default:
                    form.append(setting.name, setting.value);
                    break;
    		}
    	}

    	return this.http.post('settings', form).map(res => res.json());
    }
}

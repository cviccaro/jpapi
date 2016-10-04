import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
	prefix = 'jpapi_';
	supported = false;

	constructor() {
		this.supported = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
	}

	getItem(key: string): any {
		if ( !this.supported ) return false;

		return window.localStorage.getItem(this.prefix + key);
	}

	setItem(key: string, val: any) {
		if ( !this.supported ) return;

		window.localStorage.setItem(this.prefix + key, val);
	}
}

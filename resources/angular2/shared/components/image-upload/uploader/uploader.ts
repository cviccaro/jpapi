import { Injectable } from '@angular/core';
import { ImageItem } from './image-item';
import { Observable } from 'rxjs/Rx';

let nextUniqueId = 0;

@Injectable()
export class FileUploader {
    public queue: any[] = [];
    public isUploading: boolean = false;
    public progress: number = 0;

    private _url: string;
    private _authToken: string;

    constructor() {
        console.log('Wow Im a file uploader');
    }

    get url() {
        return this._url;
    }

    public setUrl(url: string) {
        console.log('ImageUploader set URL to ' + url);
        this._url = url;
    }

    get authToken() {
        return this._authToken;
    }
    public setAuthToken(token: string) {
        console.warn('ImageUploader set authtoken to ' + token);
        this._authToken = token;
    }

    public addToQueue(items: ImageItem[]): void {
        console.debug('Uploader.addToQueue() # ', items);
        let list: any[] = [];
        let count = this.queue.length;

        for (let file of items) {
            this.queue.push(file);
        }

        if (this.queue.length !== count) {
            this.progress = this._getTotalProgress();
        }
        console.debug('ImageUploader added ' + (this.queue.length - count) + ' images.');
    }

    private _getTotalProgress(value: number = 0): number {
        let notUploaded = this.getNotUploadedItems().length;
        let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        let ratio = 100 / this.queue.length;
        let current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    }


    public getNotUploadedItems(): ImageItem[] {
        return this.queue.filter((item: any) => !item.isUploaded);
    }

    public uploadAll(): Observable<any> {
        let items = this.queue;

        console.log('ImageUploader.uploadAll() #', items);

        if (!items.length) {
            return Observable.of(false).delay(5000).do(val => val);
        }

        return Observable.create(observer => {
            let items = this.getNotUploadedItems().filter((item: any) => !item.isUploading);

            items.forEach(item => {
                this.prepareItem(item);
                this.uploadItem(item);
            });
        });
    }

    public uploadItem(image: ImageItem): void {
        console.log('ImageUploader.uploadItem()  # ', image);
        if (this.isUploading) {
            return;
        }

        this.isUploading = true;
        this._upload(image);
    }

    public prepareItem(item: ImageItem): void {
        item.index = item.index || nextUniqueId++;
    }

    public isFile(value: any): boolean {
        return (File && value instanceof File);
    }

    private getCookie(name: string): any {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }

        return false;
    }

    /**
     * Upload internal
     */
    private _upload(image: ImageItem) {
        //let xhr = image._xhr = new XMLHttpRequestUpload()
        console.log('ImageUploader._upload() #', image);

        let xhr = image._xhr = new XMLHttpRequest();
        let form = new FormData();

        // let xsrf = this.getCookie('XSRF-TOKEN');
        // if (xsrf) {
        //   console.log('appending xsrf', xsrf);
        //   form.append('_token', xsrf);
        // }

        image.map((key, val) => {
            console.log('appending to form ', { key: key, val: val });
            form.append(key, val);
        });

        console.log('going to upload this here image: ', {
            image: image,
            form: form,
            xhr: xhr
        });

        image.isUploading = true;

        xhr.upload.onprogress = (event: any) => {
            let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            let total = this._getTotalProgress(progress);
            this.progress = total;

            console.log('progress!!!!!!', {event: event, progress: progress, total: total, xhr: xhr});
            // this.onProgressItem(item, progress);
            // this.onProgressAll(total);
        };
        xhr.onerror = e => { console.log('xhr on error', {e: e, xhr: xhr}); }
        xhr.onload = e => { console.log('xhr on load ', {e: e, xhr: xhr}); }
        xhr.onabort = e => { console.log('xhr on abort', {e: e, xhr: xhr}); }
        xhr.open('POST', this.url, true);

        //xhr.withCredentials = true;

        // if (xsrf) {
        //   console.log('Setting Request Header "X-XSRF-TOKEN" to ', xsrf);
        //   xhr.setRequestHeader('X-XSRF-TOKEN', xsrf);
        // }
        if (this.authToken) {
          console.log('Setting Request Header "Authorization" to ', 'Bearer ' + this.authToken);
          xhr.setRequestHeader('Authorization', 'Bearer ' + this.authToken);
        }

        xhr.send(form);

        console.log('just sent xhr!', xhr);
    }
}

import { JpImage } from '../../../index';

import {Observable} from 'rxjs/Observable';

export class ImageUpload implements JpImage {
    alias: string;
    alt: string;
    created_at: any;
    extension: string;
    filename: string;
    id: any;
    idx: number;
    isNew: boolean;
    last_modified: any;
    mimetype: string;
    path: string;
    size: number;
    updated_at: any;
    title: string;
    url: string;

    _file: File;
    webkitRelativePath: any;

    constructor(file: File) {
        this._file = file;

        this.filename = this.alias = file.name;
        this.mimetype = file.type;
        this.size = file.size;
        this.last_modified = file['lastModified'] || file.lastModifiedDate.getTime();

        if (file['webkitRelativePath']) {
            this.webkitRelativePath = file['webkitRelativePath'];
        }

        console.debug('ImageUpload constructed ...', this);
    }

    map(mapFn: (key: string, val: any) => any) {
        let keys = Object.keys(this);

        keys.forEach(key => mapFn.apply(this, [key, this[key]]));
    }

    load() : Observable<any> {
        let file = this._file;

        console.info('ImageUpload # read file: start', file);
        const filename = file.name;

        return Observable.create(observer => {
            console.debug('ImageUpload # read file: working', file);
            let reader = new FileReader();

            reader.onload = readerEvt => {
                console.debug('ImageUpload # read file: complete');

                observer.next(reader.result);
            };

            setTimeout(() => reader.readAsDataURL(file), 50);
        });
    }
}

import { Observable } from 'rxjs/Rx';

export interface JpFile {
    alias?: string;
    alt?: string;
    created_at?: any;
    extension?: string;
    filename?: string;
    id?: any;
    idx?: number,
    isNew?: boolean;
    last_modified?: any;
    mimetype?: string;
    path?: string;
    size?: number;
    updated_at?: any;
    title?: string;
    url: string;

    _file?: File;
    webkitRelativePath?: any;

    map(mapFn: (key: string, val: any) => any): any;

    load?(imageEl?: HTMLImageElement) : Observable<any>;
}

export class ManagedFile implements JpFile {
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

    constructor(attributes: JpFile, idx: number) {
        Object.assign(this, attributes);

        this.idx = idx;
        console.warn('ManagedFile constructed ...', this);
    }

    map(mapFn: (key: string, val: any) => any) {
        let keys = Object.keys(this);

        keys.forEach(key => mapFn.apply(this, [key, this[key]]));
    }
}

export class ManagedImage extends ManagedFile {
    width: number;
    height: number;

    constructor(attributes: JpFile, idx: number) {
        super(attributes, idx);
        console.warn('ManagedImage constructed ...', this);
    }

    watchForDimensions(imageEl: HTMLImageElement) {
        this.load(imageEl).subscribe(e => {
            this.width = e.width;
            this.height = e.height;
            console.debug('ManagedImage.load subscription done', this);
        })
    }

    load(imageEl: HTMLImageElement) : Observable<any> {
        console.debug('ManagedImage.load start');
        return Observable.create(observer => {
            console.debug('ManagedImage.load subscription start');
            imageEl.onload = (e) => {
                console.debug('ManagedImage.load on load returned ', e);
                observer.next({width: imageEl.naturalWidth, height: imageEl.naturalHeight});
            }
        })
    }
}

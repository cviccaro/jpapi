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
    url?: string;

    _file?: File;
    webkitRelativePath?: any;

    date?(): any;
    load?(imageEl?: HTMLImageElement) : Observable<any>;
    map?(mapFn: (key: string, val: any) => any): any;
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

    _file: File;
    webkitRelativePath: string;

    constructor(attributes: JpFile, idx: number) {
        Object.assign(this, attributes);

        this.idx = idx;

        if (attributes._file) {
            // Fill in managed file from File object
            let f = attributes._file;
            this.filename = f.name;
            this.size = f.size;
            this.mimetype = f.type;
            this.extension = f.name.split('.').pop();
            this.last_modified = f.lastModifiedDate.getTime();
            this.created_at = f.lastModifiedDate;
            if (f['webkitRelativePath']) {
                this.webkitRelativePath = f['webkitRelativePath'];
            }

        }
        console.warn('ManagedFile constructed ...', this);
    }

    date() {
        return this.created_at;
    }

    filesize(units: string = 'kb') {
        let divisor = 10;

        switch(units) {
            case 'mb':
                divisor = 100;
                break;
        }
        
        return Math.round(this.size / divisor) / 100;
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

    watchForDimensions(imageEl: HTMLImageElement) {
        this.load(imageEl).subscribe(e => {
            this.width = e.width;
            this.height = e.height;
            console.debug('ManagedImage.load subscription done', this);
        })
    }

    megapixels() {
        return Math.round((this.width * this.height) / 10000) / 100;
    }
}

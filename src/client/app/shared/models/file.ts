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
            let file = attributes._file;
            this.filename = file.name;
            this.size = file.size;
            this.mimetype = file.type;
            this.extension = file.name.split('.').pop();
            this.created_at = this.last_modified = file.lastModifiedDate;

            if ( file['webkitRelativePath'] ) {
                this.webkitRelativePath = file['webkitRelativePath'];
            }
        }
    }

    date() {
        return this.created_at || this.last_modified;
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
    }

    read() : Observable<any> {
        let file = this._file;

        const filename = file.name;

        return Observable.create(observer => {
            let reader = new FileReader();

            reader.onload = readerEvt => observer.next(reader.result);

            setTimeout(() => reader.readAsDataURL(file), 50);
        });
    }

    load(imageEl: HTMLImageElement) : Observable<any> {
        return Observable.create(observer => {
            imageEl.onload = (e) => observer.next({
                width: imageEl.naturalWidth,
                height: imageEl.naturalHeight
            });
        })
    }

    watchForDimensions(imageEl: HTMLImageElement) {
        this.load(imageEl).subscribe(e => {
            this.width = e.width;
            this.height = e.height;
        })
    }

    megapixels() {
        return Math.round((this.width * this.height) / 10000) / 100;
    }
}

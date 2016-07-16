import { Output, EventEmitter, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';

/**
 * Generic managed file configuration
 */
export interface JpFile {
    alias?: string;
    created_at?: any;
    date?: number;
    description?: string;
    extension?: string;
    filename?: string;
    id?: any;
    idx?: number;
    last_modified?: any;
    mimetype?: string;
    path?: string;
    size?: number;
    updated_at?: any;
    url?: string;
    webkitRelativePath?: string;

    _file?: File;

    load?(imageEl?: HTMLImageElement) : Observable<any>;
    map?(mapFn: (key: string, val: any) => any): any;
}

/**
 * A managed file
 */
export class ManagedFile implements JpFile {
    alias: string;
    created_at: any;
    description: string;
    extension: string;
    filename: string;
    id: any;
    idx: number;
    last_modified: any;
    mimetype: string;
    path: string;
    size: number;
    updated_at: any;
    url: string;
    webkitRelativePath: string;

    _file: File;

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
            this.created_at = this.last_modified = file['lastModified'];

            if (file['webkitRelativePath']) {
                this.webkitRelativePath = file['webkitRelativePath'];
            }
        }
    }

    /**
     * Return the available date property
     */
    get date(): number {
        return this.last_modified || this.created_at;
    }

    /**
     * Calculate and return a formatted filesize
     * @param  {string = 'kb'}
     * @return {number}
     */
    filesize(units: string = 'kb'): number {
        let divisor = 10;

        switch(units) {
            case 'mb':
                divisor = 100;
                break;
        }

        return Math.round(this.size / divisor) / 100;
    }

    /**
     * Run a map function on the internal properties of this class
     * @param {any) => any} mapFn [description]
     */
    map(mapFn: (key: string, val: any) => any): void {
        let keys = Object.keys(this);

        keys.forEach(key => mapFn.apply(this, [key, this[key]]));
    }

    /**
     * Inject into FormData
     */
    injectIntoForm(form_key: string, form: FormData): void {
        let managedFile = Object.assign({}, this);
        let upload: File;

        // File upload?
        if (this._file) {
            upload = this._file;

            delete managedFile._file;
            delete managedFile.url;

            form.append(`${form_key}[_file]`, upload);
        }

        // Attribute update
        for (let k in managedFile) {
            form.append(`${form_key}[${k}]`, managedFile[k]);
        }
    }
}

/**
 * A managed image
 */
export class ManagedImage extends ManagedFile implements OnDestroy {
    width: number;
    height: number;

    @Output() imageLoaded = new EventEmitter();

    private _dimensionSub: Subscription;

    constructor(attributes: JpFile, idx: number) {
        super(attributes, idx);
    }

    /**
     * Read a File
     * @return {Observable<any>} [description]
     */
    read() : Observable<any> {
        let file = this._file;

        return Observable.create(observer => {
            let reader = new FileReader();

            reader.onload = readerEvt => observer.next(reader.result);

            setTimeout(() => reader.readAsDataURL(file), 50);
        });
    }

    /**
     * Track the progress of an HTML Image Load
     * @param  {HTMLImageElement} imageEl
     * @return {Observable<any>}
     */
    load(imageEl: HTMLImageElement) : Observable<any> {
        return Observable.create(observer => {
            imageEl.onload = (e) => observer.next({
                width: imageEl.naturalWidth,
                height: imageEl.naturalHeight
            });
        });
    }

    /**
     * Tell the ManagedImage to watch an image load
     * @param {HTMLImageElement} imageEl [description]
     */
    watchForDimensions(imageEl: HTMLImageElement): void {
        this._dimensionSub = this.load(imageEl).subscribe(e => {
            this.width = e.width;
            this.height = e.height;
            this.imageLoaded.emit(this);
        });
    }

    /**
     * Calculate the megapixels for this image
     * @return {number}
     */
    megapixels(): number {
        return Math.round((this.width * this.height) / 10000) / 100;
    }

    /**
     * Clean up
     */
    ngOnDestroy(): void {
        if (this._dimensionSub) this._dimensionSub.unsubscribe();
    }
}

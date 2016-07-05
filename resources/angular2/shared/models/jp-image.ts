import { Observable } from 'rxjs/Rx';

export interface JpImage {
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

    map(mapFn: (key: string, val: any) => any): any;

    load() : Observable<any>;
}

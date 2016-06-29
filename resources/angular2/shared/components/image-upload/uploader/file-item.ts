import {NgZone} from '@angular/core';

import { FileLikeObject } from './file-like-object.ts';

export class FileItem {
    public file: FileLikeObject;
    public _file: File;
    public alias: string = 'file';
    public url: string = '/';
    public method: string = 'POST';
    public headers: any = [];
    public withCredentials: boolean = true;
    public formData: any = [];
    public isReady: boolean = false;
    public isUploading: boolean = false;
    public isUploaded: boolean = false;
    public isSuccess: boolean = false;
    public isCancel: boolean = false;
    public isError: boolean = false;
    public progress: number = 0;
    public index: number = void 0;
    private _zone: NgZone;
    private _xhr: any;
}

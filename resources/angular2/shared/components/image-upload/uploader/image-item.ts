export class ImageItem {
    id: any;
    path: any;
    name: any;
    alias: any;
    type: any;
    size: any;
    last_modified: any;
    webkitRelativePath: any;

    index: number = void 0;

    progress: number = 0;
    isUploading: boolean = false;
    isUploaded: boolean = false;
    _file: File;
    _xhr: any;

    constructor(file: File) {
        this._file = file;

        this.name = file.name;
        this.type = file.type;
        this.size = file.size;
        this.last_modified = file.lastModifiedDate;

        if (file['webkitRelativePath']) {
            this.webkitRelativePath = file['webkitRelativePath'];
        }

        console.info('ImageItem constructed ...', this);
    }

    map(mapFn: (key: string, val: any) => any) {
        let keys = Object.keys(this);

        keys.forEach(key => {
            switch(key) {
                case 'progress':
                case 'isUploading':
                case 'isUploaded':
                // case '_file':
                case '_xhr':
                    break;
                default:
                    let value = this[key];
                    mapFn.apply(this, [key, value]);
            }
        });
    }
}

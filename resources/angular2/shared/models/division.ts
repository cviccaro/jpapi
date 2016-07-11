import {JpFile} from './jp-file';

export interface Division {
	id: number;
    name: string;
    image_id?: number;
    image: JpFile;
    description?: string;
    created_at?: any;
    updated_at?: any;
}

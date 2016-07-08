import {JpImage} from './jp-image';

export interface Division {
	id: number;
    name: string;
    image_id?: number;
    image: JpImage;
    description?: string;
    created_at?: any;
    updated_at?: any;
}

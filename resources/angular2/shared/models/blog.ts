import {JpImage} from './jp-image';
import {Tag} from './tag';

export class Blog {
	id: any;
	title: string = '';

	author: string = '';
	body: string = '';
	summary: string = '';

	image: JpImage;
	image_id: number;
	images: JpImage[] = [];

	tags: Tag[];

	created_at: any = null;
	updated_at: any = null;
}

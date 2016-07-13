import {JpFile} from './file';
import {Tag} from './tag';
import {Division} from './division';

export class Blog {
	id: any;
	title: string = '';

	divisions: Division[] = [];

	author: string = '';
	body: string = '';
	summary: string = '';

	image: JpFile;
	image_id: number;
	images: JpFile[] = [];

	tags: Tag[] = [];

	created_at: any = null;
	updated_at: any = null;
}

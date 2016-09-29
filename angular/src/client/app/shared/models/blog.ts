import { JpFile } from './file';
import { Tag } from './tag';
import { Division } from './division';
import { Staff } from './staff';

export class Blog {
	id: any;
	title: string = '';

	divisions: Division[] = [];

	author_id: number;
	author: Staff;

	body: string = '';
	summary: string = '';

	image: JpFile;
	image_id: number;
	images: JpFile[] = [];
	splash: JpFile;
	splash_image_id: JpFile;

	tags: Tag[] = [];

	created_at: any = null;
	updated_at: any = null;
}

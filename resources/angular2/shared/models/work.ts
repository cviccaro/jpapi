import { JpClient } from './client';

export class Work {
	id: any = undefined;
	title: string = '';
	body: string = '';
	image: string = undefined;
	image_new: any = undefined;
	client: JpClient = new JpClient();
	created_at: any = undefined;
	updated_at: any = undefined;
	gallery: any[] = [];
	gallery_new: any[] = [];
}

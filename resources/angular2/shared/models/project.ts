import { JpClient } from './client';
import { JpImage } from './jp-image';

export class Project {
	id: any = undefined;
	title: string = '';
	body: string = '';
	image: JpImage = undefined;
    image_id: number = undefined;
    images: JpImage[] = [];
	client: JpClient = new JpClient();
    client_id:number = undefined;
	created_at: any = undefined;
	updated_at: any = undefined;
}

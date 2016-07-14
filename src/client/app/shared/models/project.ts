import { JpClient } from './client';
import { JpFile } from './file';

export class Project {
	id: any = undefined;
	title: string = '';
	body: string = '';
	image: JpFile = undefined;
    image_id: number = undefined;
    images: JpFile[] = [];
	client: JpClient = new JpClient();
    client_id:number = undefined;
	created_at: any = undefined;
	updated_at: any = undefined;
}

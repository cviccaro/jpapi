import { JpClient } from './client';
import { JpFile } from './file';
import { Division } from './division';

export class Project {
	id: any = undefined;
	title: string = '';
	body: string = '';
	image: JpFile = undefined;
    image_id: number = undefined;
    images: JpFile[] = [];
	client: JpClient = new JpClient();
    client_id:number = undefined;
    divisions: Division[] = [];
	created_at: any = undefined;
	updated_at: any = undefined;
}

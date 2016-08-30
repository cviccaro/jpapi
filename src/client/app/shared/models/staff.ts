import { JpFile } from './file';

export interface Staff {
	id: number;
	active: boolean;
	first_name: string;
	last_name: string;
	email: string;
	image: JpFile;
	image_id: number;
	linkedin: string;
	occupation: string;
	title: string;
	phone: string;
	updated_at: string;
	created_at: string;
}

import { JpFile } from './file';

export class Division {
	id: number;
    name: string;
    image_id: number = null;
    image: JpFile;
    description: string;
    site_title: string;
    site_logo: number = null;
    logo: JpFile;
    splash_headline: string;
    splash_body: string;
    created_at: any;
    updated_at: any;
}

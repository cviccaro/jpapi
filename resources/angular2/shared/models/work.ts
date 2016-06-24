export interface Work {
	id?: number;
	title: string;
	body: string;
	image: string;
	client: any;
	created_at?: string;
	updated_at?: string;
	image_new?: {
		name: string;
		base64: string;
	},
	gallery?:[any],
	gallery_new?: any;
}

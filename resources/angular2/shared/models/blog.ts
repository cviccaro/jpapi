import {BlogCategory} from './blog-category';

export class Blog {
	id: number = -1;
	animateIn: boolean = true;
	title: string = '';
	image: string = '';
	text: string = '';
	body: string = '';
	created_at: string = '';
	tag: string = '';
	author: string = '';
	identifier: string = '';
	category: BlogCategory;
}

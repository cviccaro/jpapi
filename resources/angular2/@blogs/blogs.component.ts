import {Component, OnInit} from '@angular/core';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {Blog, BlogService} from '../shared/index';
/**
 * This class represents the lazy loaded BlogsComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-blogs',
    templateUrl: 'blogs.component.html',
    styleUrls: ['blogs.component.css'],
    providers: [MdIconRegistry, BlogService],
    directives: [
		MD_BUTTON_DIRECTIVES,
    	MD_ICON_DIRECTIVES,
    	MD_INPUT_DIRECTIVES,
    	MD_TOOLBAR_DIRECTIVES,
    	MD_LIST_DIRECTIVES,
	]
})
export class BlogsComponent implements OnInit {

	perPage: number = 15;
	descending: boolean = true;
	sort: string = 'created_at';
	blogs: Blog[] = [];
	from: number = 0;
	to: number = 0;
	total: number = 0;
	lastPage: number = 0;
	currentPage: number = 0;

	constructor(public blogService: BlogService) {
		this.blogService = blogService;
	}

	ngOnInit() {
		this.blogService.all()
			.subscribe((blogs) => {
				console.log('got blogs: ', blogs);
				this.blogs = blogs.data;
				this.from = blogs.from;
				this.to = blogs.to;
				this.total = blogs.total;
				this.lastPage = blogs.last_page;
				this.currentPage = blogs.current_page;
				this.perPage = blogs.per_page;
			});
	}

	changePerPage() {
		console.log('changePerPage!', arguments);
	}
	
	order() {
		console.log('order!', arguments, this);
	}
}

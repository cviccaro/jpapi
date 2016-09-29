import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/index';

import { BlogIndexComponent } from './blog-index.component';
import { BlogListComponent } from './blog-list.component';
import { BlogComponent } from './blog.component';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		BlogIndexComponent,
		BlogListComponent,
		BlogComponent
	],
	exports: [
		BlogIndexComponent,
		BlogListComponent,
		BlogComponent
	]
})
export class BlogsModule {}

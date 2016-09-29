import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/index';

import { ProjectIndexComponent } from './project-index.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectComponent } from './project.component';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ProjectIndexComponent,
		ProjectListComponent,
		ProjectComponent
	],
	exports: [
		ProjectIndexComponent,
		ProjectListComponent,
		ProjectComponent
	]
})
export class ProjectsModule {}

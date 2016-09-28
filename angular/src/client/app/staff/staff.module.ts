import { NgModule } from '@angular/core';

import { StaffComponent } from './staff.component';
import { SharedModule } from '../shared/index';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		StaffComponent
	],
	exports: [
		StaffComponent
	]
})
export class StaffModule {}

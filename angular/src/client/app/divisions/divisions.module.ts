import { NgModule } from '@angular/core';

import { DivisionComponent } from './division.component';
import { DivisionsComponent } from './divisions.component';
import { DivisionsIndexComponent } from './index.component';
import { SharedModule } from '../shared/index';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		DivisionsIndexComponent,
		DivisionComponent,
		DivisionsComponent
	],
	exports: [
		DivisionsIndexComponent,
		DivisionComponent,
		DivisionsComponent
	]
})
export class DivisionsModule {}

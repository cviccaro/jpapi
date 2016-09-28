import { NgModule } from '@angular/core';

import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shared/index';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		ClientsComponent,
	],
	exports: [
		ClientsComponent
	]
})
export class ClientsModule {}

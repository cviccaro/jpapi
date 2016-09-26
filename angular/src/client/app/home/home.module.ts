import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [
		HomeComponent,
	],
	exports: [ HomeComponent ]
})
export class HomeModule { }

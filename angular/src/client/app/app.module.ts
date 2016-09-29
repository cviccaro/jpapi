import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from './shared/shared.module';
import { StaffModule } from './staff/staff.module';
import { DivisionsModule } from './divisions/divisions.module';
import { ClientsModule } from './clients/clients.module';
import { BlogsModule } from './blogs/blogs.module';
import { ProjectsModule } from './projects/projects.module';

@NgModule({
  imports: [
  	BrowserModule,
  	HttpModule,
  	RouterModule.forRoot(routes),
  	HomeModule,
  	LoginModule,
  	SettingsModule,
  	StaffModule,
    DivisionsModule,
    ClientsModule,
    BlogsModule,
    ProjectsModule,
  	SharedModule.forRoot()
	],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
})

export class AppModule { }

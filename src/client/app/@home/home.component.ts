import { Component } from '@angular/core';
import { MATERIAL_DIRECTIVES } from "../shared/libs/angular2-material";
import {DivisionService} from "../shared/services/division.service";
import {ClientService} from "../shared/services/client.service";
import {ProjectService} from "../shared/services/project.service";
import {BlogService} from "../shared/services/blog.service";
import {LoggerService} from "../shared/services/logger.service";
import {CalendarPipe, FromUnixPipe} from "angular2-moment/index";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [ MATERIAL_DIRECTIVES ],
    pipes: [ FromUnixPipe, CalendarPipe ]
})
export class HomeComponent {
    blog_data: { [key: string] : any } = {};
    client_data: { [key: string] : any } = {};
    division_data: { [key: string] : any } = {};
    project_data: { [key: string] : any } = {};

    constructor(
        private blogService: BlogService,
        private projectService: ProjectService,
        private clientService: ClientService,
        private divisionService: DivisionService,
        private log: LoggerService
    ) {
        this.blogService.metadata().subscribe(res => {
            this.blog_data = res;
            this.log.log('Fetched blog metadata: ' , res);
        });
    }

    ngOnInit() {
        this.log.debug('HomeComponent Initialized', this);
    }
}

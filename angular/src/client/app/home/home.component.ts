import { Component } from '@angular/core';
import { MetadataService } from '../shared/services/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    blog_data: Object = {};
    client_data: Object = {};
    division_data: Object = {};
    project_data: Object = {};
    staff_data: Object = {};

    constructor(
        private metaService: MetadataService
    ) {
        this.metaService.get('blogs').subscribe(res => this.blog_data = res);
        this.metaService.get('projects').subscribe(res => this.project_data = res);
        this.metaService.get('clients').subscribe(res => this.client_data = res);
        this.metaService.get('divisions').subscribe(res => this.division_data = res);
        this.metaService.get('staff').subscribe(res => this.staff_data = res);
    }
}

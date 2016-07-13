import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

import { ToasterService } from 'angular2-toaster';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import { JpaCache, Division, DivisionService, JpFile } from '../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jpa-division',
	templateUrl: './division.component.html',
	styleUrls: ['./division.component.css'],
	directives: [
		MATERIAL_DIRECTIVES,
		NgSwitch,
		NgSwitchCase,
		NgSwitchDefault
	]
})
export class DivisionComponent implements OnInit, AfterViewInit {
	private _division: Division;
	private _divisionImage: JpFile;

	public ready: boolean = false;
	public isNew: boolean = false;
	public _originalTitle: string;

	public submitted = false;

	get division(): Division { return this._division; }
	set division(v: Division) {
	    this._division = v;
	    if (this._division !== undefined && this._division !== null) {
	    	this.setup();
	    }
	}

	setup() {
		this._originalTitle = this._division.name;
		this._divisionImage = this._division.image;
		this._division.image = null;
		this.isNew = this.division.id === undefined;
	}

	constructor(
		private cache: JpaCache,
		private route: ActivatedRoute,
		private service: DivisionService,
		private toaster: ToasterService
	) {
		this.division = this.cache.get('division');
	}

	ngOnInit() {
		let id = this.route.snapshot.params['id'];

		if (id === 'new') {
		    this.ready = true;
		    this.isNew = true;
		} else {
		    this.service.find(+id).subscribe(res => {
		        this.division = res;
		        console.debug('setting division model to ', res);
		        this.ready = true;
		    });
		}
	}

	ngAfterViewInit() {
		console.log('Division Component View Initialized', this);
	}

	onSubmit() {
	    this.submitted = true;
	    // if (this.isNew) {
	    //     this.service.create(this.blog)
	    //         .subscribe(res => {
	    //             this.toasterService.pop('success', 'Success!', this.blog.title + ' has been created.  Redirecting to its page.');
	    //             setTimeout(() => {
	    //                 this.blog = res;
	    //                 console.log("Navigating to /blogs/" + res.id);
	    //                 this.router.navigate(['/blogs', res.id]);
	    //                 this.reset();
	    //             }, 2000);
	    //         },err => {
	    //             console.log('Error when saving blog: ', err);
	    //             this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
	    //         });
	    // } else {
	        this.service.update(this.division.id, this.division)
	            .subscribe(res => {
	                console.log('response from update: ', res);
	                this.division = res;
	                this.reset();
	                this.toaster.pop('success', 'Success!', this.division.name + ' has been saved.');
	            }, err => {
	                console.log('Error when saving: ', err);
	                this.toaster.pop('error', 'Uh oh.', 'Something went wrong when saving this division.  Sorry.  Try again later and/or alert the developer!');
	            });
	    // }
	}

	private reset(e?:Event) {
	    if (e) {
	        e.preventDefault();
	        e.stopPropagation();
	    }

	    this.ready = false;

	    setTimeout(() => { this.ready = true; },0);
	}
}

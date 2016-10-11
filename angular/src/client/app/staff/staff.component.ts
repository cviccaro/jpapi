import { Component, OnDestroy } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import {
    StaffService,
    CacheService,
    JpaContextMenu,
    JpaModal,
    ModalAction,
    ModalConfig,
    ModalInput,
    LoggerService,
    RegistersSubscribers,
    Staff
} from '../shared/index';

import { Subscription } from 'rxjs/Rx';

import * as _ from 'lodash';

@Component({
	moduleId: module.id,
	selector: 'jp-staff',
	templateUrl: './staff.component.html',
	styleUrls: [ './staff.component.css' ]
})
export class StaffComponent implements RegistersSubscribers, OnDestroy {
	modalConfig: ModalConfig = {
      mode: 'form',
      inputs: [
          { name: 'first_name', required: true, label: 'First Name' },
          { name: 'last_name', required: true, label: 'Last Name' },
          { name: 'bio', required: false, label: 'Bio', type: 'textarea' },
          { name: 'title', required: true},
          { name: 'email', required: true, type: 'email'},
          { name: 'phone', type: 'tel' },
          { name: 'linkedin', label: 'LinkedIn URL' },
          { name: 'active', type: 'checkbox' },
          { name: 'image', type: 'file', label: 'Add Image'},
          { name: 'image_small', type: 'file', label: 'Add Small Image', prefix: '<h4>Image Small</h4>'}
      ],
      minWidth: '50%',
      formClass: 'staff-form',
      okText: 'Save',
      title: ''
  };

	staff: Staff[];
	_subscriptions: Subscription[] = [];

	constructor(
	    public service: StaffService,
	    public cache: CacheService,
	    public toaster: ToasterService,
	    public modal: JpaModal,
	    public menu: JpaContextMenu,
	    public log: LoggerService
	) {
		this.staff = this.cache.get('staff');
		this.log.log('Staff: ', this.staff);
	}

/**
	 * Open a model to add Staff
	 * @param {Staff} person
	 */
	add(person: Staff): void {
	    this.menu.close();

	    let modalConfig = _.extend(_.clone(this.modalConfig), {
	    	formClass: 'staff-form add',
	    	title: 'Add new person',
    	});

	    this.registerSubscriber(
		    this.modal.open(modalConfig).subscribe((action: ModalAction) => {
		        if (action.type === 'submit') {
		            let attributes = action.config.inputs.reduce((carry: any, next: any) => {
		                carry[next.name] = next.value;
		                return carry;
		            }, {});

		            this.log.log('We can now save our NEW person with this data: ', {
		                attributes: attributes
		            });
		            this.registerSubscriber(
		            	this.service.create(attributes)
		                .subscribe(res => {
		                    this.toaster.pop('success', 'Success!', res.first_name + ' ' + res.last_name + ' has been created.');
		                    setTimeout(() => { this.fetch(); },0);
		                })
	            	);
		        }
		    })
	    );
	}

	/**
	 * Open a model to edit Staff
	 * @param {Staff} person
	 */
	edit(person: Staff): void {
	    this.menu.close();

	    let modalConfig: ModalConfig = _.extend(_.cloneDeep(this.modalConfig),
		    {
		    	formClass: 'staff-form update',
		    	title: 'Edit person ' + person.first_name + ' ' + person.last_name
	    	}
    	);

    	modalConfig.inputs.forEach(input => {
    		if (input.type !== 'file') input.value = (<any>person)[input.name];
    	});

    	let hasImage = false;

	    if (person.image_id !== null) {
	    	hasImage = true;

	    	modalConfig.formClass += ' has-image';
		    modalConfig.inputs[modalConfig.inputs.length-2] = {
		    	name: 'image_remove',
		    	type: 'toggle',
		    	label: 'Slide to Delete Image',
		    	prefix: '<h4>Image</h4>'
		    };
		    modalConfig.inputs.push({
		    	name: 'image',
	    		type: 'file',
	    		label: 'Replace Image',
	    		conditions: [{
	          target: 'image_remove',
	          condition: (source, target) => {
	              return target.value;
	          },
	          action: 'hidden'
	        }]
	      });
	    }

	    if (hasImage) {
	    	modalConfig.inputs.splice(modalConfig.inputs.length-2, 1);

	    	let imageSmallConfig: ModalInput = {
		    	name: 'image_small',
	    		type: 'file',
	    		label: 'Add Small Image',
	    		conditions: [{
	          target: 'image_small_remove',
	          condition: (source, target) => {
	              return target.value;
	          },
	          action: 'hidden'
	        }]
	      };

  	    if (person.image_small_id !== null) {
  	    	modalConfig.inputs.push({
  		    	name: 'image_small_remove',
  		    	type: 'toggle',
  		    	label: 'Slide to Delete Small Image',
  		    	prefix: '<h4>Small Image</h4>'
  		    });
  		    imageSmallConfig.label = 'Replace Small Image';
  	    } else {
  	    	imageSmallConfig.prefix = '<h4>Small Image</h4>';
  	    }

		    modalConfig.inputs.push(imageSmallConfig);

	    } else {
  	    if (person.image_small_id !== null) {
  	    	modalConfig.inputs.push({
  		    	name: 'image_small_remove',
  		    	type: 'toggle',
  		    	label: 'Slide to Delete Small Image',
  		    	prefix: '<h4>Small Image</h4>'
  		    });
  	    }
	    }

	    this.registerSubscriber(
		    this.modal.open(modalConfig).subscribe((action: ModalAction) => {
		        if (action.type === 'submit') {
		            let attributes = action.config.inputs.reduce((carry: any, next: any) => {
		                carry[next.name] = next.value;
		                return carry;
		            }, {});

		            if (attributes.image_remove) {
		                attributes.image = '';
		            }

		            if (attributes.image_small_remove) {
		                attributes.image_small = '';
		            }

		            this.log.log('We can now save our person with this data: ', {
		                attributes: attributes
		            });
		            this.registerSubscriber(
		            	this.service.update(person.id, attributes)
		                .subscribe(res => {
		                    this.toaster.pop('success', 'Success!', res.first_name + ' ' + res.last_name + ' has been edited.');
		                    setTimeout(() => { this.fetch(); },0);
		                })
	            	);
		        }
		    })
	    );
	}

	/**
	 * Destroy a JP Client
	 * @param {JpClient} client
	 */
	remove(person: Staff): void {
	    this.menu.close();
	    let name = person.first_name + ' ' + person.last_name;
	    this.registerSubscriber(
	    	this.modal.open({message: `Discard staff member, ${name}?`, okText: 'Discard'})
	        .subscribe((action: ModalAction) => {
	            if (action.type === 'ok') {
	                this.registerSubscriber(
	                	this.service.destroy(person.id)
	                    .subscribe((res:any) => {
	                        this.toaster.pop('success', 'Success!', name + ' has been obliterated.');
	                        setTimeout(() => { this.fetch(); },0);
	                    })
                	);
	            }
	        })
      );
	}

	/**
	 * Fetch from service
	 */
	fetch(): void {
	    this.registerSubscriber(
	    	this.service.all().subscribe((res : any) => {
		        this.staff = res;
		    })
    	);
	}

	/**
	 * Implemented as part of RegisterSubscribers
	 * @param {Subscription} sub
	 */
	registerSubscriber(sub: Subscription): void {
	    this._subscriptions.push(sub);
	}

	/**
	 * Cleanup just before Angular destroys the directive/component. Unsubscribe
	 * observables and detach event handlers to avoid memory leaks.
	 */
	ngOnDestroy(): void {
	    this._subscriptions.forEach(sub => {
	        if (sub) sub.unsubscribe();
	    });
	}
}

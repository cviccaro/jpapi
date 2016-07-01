import { Component, Injectable, ElementRef, ChangeDetectorRef } from '@angular/core';

import { DragDropService } from './dragdrop.service';

@Injectable()
export abstract class DragDropAbstractComponent {
	_elem: HTMLElement;
	_defaultCursor: string;

	constructor(public el: ElementRef, public service: DragDropService, private _cdr: ChangeDetectorRef) {
		this._elem = this.el.nativeElement;

		this._elem.addEventListener('dragover', (e: DragEvent) => {
			this._onDragOver(e);

			if (e.dataTransfer) {
				e.dataTransfer.dropEffect = 'copy';
			}

			return false;
		});

		this._elem.addEventListener('drop', e => this._onDrop(e));

		this._elem.addEventListener('dragstart', (event: DragEvent) => {
			if (event.dataTransfer != null) {
			    event.dataTransfer.setData('text', '');
			    // Change drag effect
			    event.dataTransfer.effectAllowed = 'copy';
			    // Change drag image
			    // if (this._config.dragImage != null) {
			    //     let dragImage: DragImage = this._config.dragImage;
			    //     (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
			    // }
			    // Change drag cursor
			    //if (this._dragEnabled) {
			        this._elem.style.cursor = 'move';
			    // } else {
			    //     this._elem.style.cursor = this._defaultCursor;
			    // }
			}
		})
	}

	private _onDragOver(event: DragEvent): void {
		if (event.preventDefault) {
			event.preventDefault();
		}
	}

	private _onDrop(event: DragEvent): void {
		if (event.preventDefault) {
			// Necessary. Allows us to drop.
			event.preventDefault();
		}

		if (event.stopPropagation) {
			// Necessary. Allows us to drop.
			event.stopPropagation();
		}

		this.detectChanges();
	}


	detectChanges() {
	    // Programmatically run change detection to fix issue in Safari
	    setTimeout(() => {
	        this._cdr.detectChanges();
	    }, 250);
	}
}

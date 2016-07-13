import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
declare var CKEDITOR: any;

@Injectable()
export class CkEditorGuard implements CanDeactivate<any> {
    canDeactivate(component, next, state) {
        if (component['ckEditors']) {
            component['ckEditors'].forEach(ckeditor => {
                console.debug('Destroying CKEditor instance.');
                ckeditor.instance.destroy();
            });
        }
        return true;
    }
}

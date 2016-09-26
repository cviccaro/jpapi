import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class CkEditorGuard implements CanDeactivate<any> {
    canDeactivate(component, next, state) {
        if (component['ckEditors']) {
            component['ckEditors'].forEach(ckeditor => {
                ckeditor.instance.destroy();
            });
        }
        return true;
    }
}

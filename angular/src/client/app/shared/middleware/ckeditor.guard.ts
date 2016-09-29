import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class CkEditorGuard implements CanDeactivate<any> {
    canDeactivate(component: any) {
        if (component['ckEditors']) {
            component['ckEditors'].forEach((ckeditor: any) => {
                ckeditor.instance.destroy();
            });
        }
        return true;
    }
}

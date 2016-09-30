import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { MdCardModule } from '@angular2-material/card';
// import { MdCoreModule, MdRippleModule, OverlayModule, OVERLAY_PROVIDERS } from '@angular2-material/core';
// import { MdCheckboxModule } from '@angular2-material/checkbox';
// import { MdButtonModule } from '@angular2-material/button';
// import { MdGridListModule } from '@angular2-material/grid-list';
// import { MdInputModule } from '@angular2-material/input';
// import { MdListModule } from '@angular2-material/list';
// import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
// import { MdProgressBarModule } from '@angular2-material/progress-bar';
// import { MdSidenavModule } from '@angular2-material/sidenav';
// import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
// import { MdToolbarModule } from '@angular2-material/toolbar';
// import { MdTooltipModule } from '@angular2-material/tooltip';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { CKEditorModule } from 'ng2-ckeditor';
import { DndModule } from 'ng2-dnd';
import { ToasterModule } from 'angular2-toaster';

import {
  ActionDelegateDirective,
  ChipComponent,
  ContextMenuComponent,
  ContextMenuFocusTrapComponent,
  ContextMenuItemComponent,
  DragnDropFormControlComponent,
  FileCardComponent,
  FileIconComponent,
  FileUploadComponent,
  FileUploadToolbarComponent,
  GridImageComponent,
  ListComponent,
  ModalBackdropComponent,
  ModalComponent,
  ModalContainerComponent,
  PagerComponent,
  PANEL2_DIRECTIVES,
  JpaModal,
  JpaContextMenu
} from './components/index';

import {
  AuthGuard,
  BlogGuard,
  BlogListGuard,
  CkEditorGuard,
  ClientsGuard,
  DivisionsGuard,
  LoginGuard,
  ProjectGuard,
  ProjectListGuard,
  SettingsGuard,
  StaffGuard
} from './middleware/index';

import { CapitalizePipe } from './pipes/index';

import { APP_SERVICES } from './services/index';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    CKEditorModule,
    ToasterModule,
    DndModule.forRoot()
  ],
  declarations: [
    ActionDelegateDirective,
    ChipComponent,
    ContextMenuComponent,
    ContextMenuFocusTrapComponent,
    ContextMenuItemComponent,
    DragnDropFormControlComponent,
    FileCardComponent,
    FileIconComponent,
    FileUploadComponent,
    FileUploadToolbarComponent,
    GridImageComponent,
    ListComponent,
    ModalBackdropComponent,
    ModalComponent,
    ModalContainerComponent,
    PagerComponent,
    PANEL2_DIRECTIVES,
    CapitalizePipe
  ],
  entryComponents: [
    ContextMenuFocusTrapComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    CKEditorModule,
    DndModule,
    ToasterModule,
    ActionDelegateDirective,
    ChipComponent,
    ContextMenuComponent,
    ContextMenuFocusTrapComponent,
    ContextMenuItemComponent,
    DragnDropFormControlComponent,
    FileCardComponent,
    FileIconComponent,
    FileUploadComponent,
    FileUploadToolbarComponent,
    GridImageComponent,
    ListComponent,
    ModalBackdropComponent,
    ModalComponent,
    ModalContainerComponent,
    PagerComponent,
    PANEL2_DIRECTIVES,
    CapitalizePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        APP_SERVICES,
        OVERLAY_PROVIDERS,
        MdIconRegistry,
        AuthGuard,
        BlogGuard,
        BlogListGuard,
        CkEditorGuard,
        ClientsGuard,
        DivisionsGuard,
        LoginGuard,
        ProjectGuard,
        ProjectListGuard,
        SettingsGuard,
        StaffGuard,
        JpaModal,
        JpaContextMenu,
      ]
    };
  }
}

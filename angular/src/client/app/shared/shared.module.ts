import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

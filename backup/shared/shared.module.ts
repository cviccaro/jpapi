import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdCoreModule, MdRippleModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import {MdGridListModule} from '@angular2-material/grid-list';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MomentModule } from 'angular2-moment';

import {
  ActionDelegateDirective,
  ChipComponent,
  ContextMenuComponent,
  ContextMenuFocusTrapComponent,
  ContextMenuItemComponent,
  FileCardComponent,
  FileIconComponent,
  FileUploadComponent,
  FileUploadToolbarComponent,
  GenericFormField,
  GridImageComponent,
  JpaContextMenu,
  JpaModal,
  JpaTooltip,
  ListComponent,
  ModalBackdropComponent,
  ModalComponent,
  ModalContainerComponent,
  ModalFormField,
  PagerComponent,
  PanelBarComponent,
  PanelBarSubtitleComponent,
  PanelBarTitleComponent,
  PanelComponent,
  PanelContentComponent,
  PanelFormComponent,
  TooltipComponent,
  TooltipDirective
} from './components/index';

import {
  AuthGuard,
  BlogGuard,
  BlogListGuard,
  CanDeactivateGuard,
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
    MdCoreModule,
    MdGridListModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdRippleModule,
    MdSidenavModule,
    MomentModule
  ],
  declarations: [
    ActionDelegateDirective,
    ChipComponent,
    ContextMenuComponent,
    ContextMenuFocusTrapComponent,
    ContextMenuItemComponent,
    FileCardComponent,
    FileIconComponent,
    FileUploadComponent,
    FileUploadToolbarComponent,
    GenericFormField,
    GridImageComponent,
    JpaContextMenu,
    JpaModal,
    JpaTooltip,
    ListComponent,
    ModalBackdropComponent,
    ModalComponent,
    ModalContainerComponent,
    ModalFormField,
    PagerComponent,
    PanelBarComponent,
    PanelBarSubtitleComponent,
    PanelBarTitleComponent,
    PanelComponent,
    PanelContentComponent,
    PanelFormComponent,
    TooltipComponent,
    TooltipDirective,
    CapitalizePipe,
    AuthGuard,
    BlogGuard,
    BlogListGuard,
    CanDeactivateGuard,
    CkEditorGuard,
    ClientsGuard,
    DivisionsGuard,
    LoginGuard,
    ProjectGuard,
    ProjectListGuard,
    SettingsGuard,
    StaffGuard
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    MdCoreModule,
    MdGridListModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdRippleModule,
    MdSidenavModule,
    ActionDelegateDirective,
    ChipComponent,
    ContextMenuComponent,
    ContextMenuFocusTrapComponent,
    ContextMenuItemComponent,
    FileCardComponent,
    FileIconComponent,
    FileUploadComponent,
    FileUploadToolbarComponent,
    GenericFormField,
    GridImageComponent,
    JpaContextMenu,
    JpaModal,
    JpaTooltip,
    ListComponent,
    ModalBackdropComponent,
    ModalComponent,
    ModalContainerComponent,
    ModalFormField,
    PagerComponent,
    PanelBarComponent,
    PanelBarSubtitleComponent,
    PanelBarTitleComponent,
    PanelComponent,
    PanelContentComponent,
    PanelFormComponent,
    TooltipComponent,
    TooltipDirective,
    CapitalizePipe,
    AuthGuard,
    BlogGuard,
    BlogListGuard,
    CanDeactivateGuard,
    CkEditorGuard,
    ClientsGuard,
    DivisionsGuard,
    LoginGuard,
    ProjectGuard,
    ProjectListGuard,
    SettingsGuard,
    StaffGuard
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        APP_SERVICES,
        AuthGuard,
        BlogGuard,
        BlogListGuard,
        CanDeactivateGuard,
        CkEditorGuard,
        ClientsGuard,
        DivisionsGuard,
        LoginGuard,
        ProjectGuard,
        ProjectListGuard,
        SettingsGuard,
        StaffGuard,
        MdIconRegistry
      ]
    };
  }
}

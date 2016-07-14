export * from './menu-item';
export * from './focus-trap';
export * from './context-menu.component';
export * from './context-menu';

import { ContextMenuItemComponent } from './menu-item';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuFocusTrapComponent } from './focus-trap';

export const CONTEXT_MENU_DIRECTIVES = [ContextMenuItemComponent, ContextMenuComponent, ContextMenuFocusTrapComponent];

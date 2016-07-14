export * from './menu-item';
export * from './focus-trap';
export * from './context-menu.component';
export * from './context-menu';

import { ContextMenuItem } from './menu-item';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuFocusTrap } from './focus-trap';

export const CONTEXT_MENU_DIRECTIVES = [ContextMenuItem, ContextMenuComponent, ContextMenuFocusTrap];

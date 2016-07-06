export * from './modal';
export * from './backdrop';
export * from './provider';
export * from './container';

import { ModalBackdropComponent } from './backdrop';
import { ModalContainerComponent } from './container';
import { ModalComponent } from './modal';

export const MODAL_DIRECTIVES = [ModalBackdropComponent, ModalContainerComponent, ModalComponent];

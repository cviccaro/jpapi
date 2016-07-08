export * from './panel.component';
export * from './content/panel-content.component';
export * from './group/index';
export * from './summary/index';

import { JpaPanel } from './panel.component';
import { JpaPanelContent } from './content/index';
import { JpaPanelGroup } from './group/index';
import { PanelSummaryComponent, PanelSummaryImage, PanelSummaryImages } from './summary/index';

export const PANEL_DIRECTIVES = [ JpaPanel, JpaPanelContent, JpaPanelGroup, PanelSummaryComponent, PanelSummaryImage, PanelSummaryImages ];

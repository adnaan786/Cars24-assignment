/**
 * Cars24 Server-Driven UI (SDUI) TypeScript Types & Interfaces
 */

export type SDUIActionType =
  | 'UPDATE_STATE'
  | 'OPEN_BOTTOM_SHEET'
  | 'CLOSE_BOTTOM_SHEET'
  | 'NAVIGATE'
  | 'SHOW_TOAST'
  | 'TRACK_EVENT';

export interface SDUIAction {
  type: SDUIActionType;
  targetStateKey?: string;
  value?: any;
  sheetContent?: SDUINode;
  route?: string;
  params?: Record<string, any>;
  message?: string;
  eventName?: string;
}

export interface SDUINode {
  id: string;
  type: string;
  props?: Record<string, any>;
  children?: SDUINode[];
  actions?: Record<string, SDUIAction>; // e.g., onClick, onSelect, onChange
  minAppVersion?: string;
  condition?: {
    stateKey: string;
    equals?: any;
    notEquals?: any;
  };
}

export interface SDUISchema {
  schemaVersion: string;
  minAppVersion: string;
  screenId: string;
  title: string;
  initialState: Record<string, any>;
  root: SDUINode;
}

export interface ComponentRegistryEntry {
  component: React.ComponentType<any>;
  minVersion: string;
  description: string;
}

export type SDUIState = Record<string, any>;

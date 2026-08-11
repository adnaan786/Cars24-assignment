import { SDUIAction, SDUIState } from '../types/sdui';

export interface ActionContext {
  state: SDUIState;
  setState: React.Dispatch<React.SetStateAction<SDUIState>>;
  setBottomSheet: (content: any | null) => void;
  showToast: (msg: string) => void;
  onNavigate?: (route: string, params?: any) => void;
}

export function handleSDUIAction(action: SDUIAction | undefined, ctx: ActionContext) {
  if (!action) return;

  switch (action.type) {
    case 'UPDATE_STATE':
      if (action.targetStateKey) {
        ctx.setState((prev) => ({
          ...prev,
          [action.targetStateKey!]: action.value,
        }));
      }
      break;

    case 'OPEN_BOTTOM_SHEET':
      if (action.sheetContent) {
        ctx.setBottomSheet(action.sheetContent);
      }
      break;

    case 'CLOSE_BOTTOM_SHEET':
      ctx.setBottomSheet(null);
      break;

    case 'NAVIGATE':
      if (action.route) {
        ctx.showToast(`Navigating to ${action.route}`);
        if (ctx.onNavigate) {
          ctx.onNavigate(action.route, action.params);
        }
      }
      break;

    case 'SHOW_TOAST':
      if (action.message) {
        ctx.showToast(action.message);
      }
      break;

    case 'TRACK_EVENT':
      console.log(`[SDUI Analytics] Tracked: ${action.eventName}`, action.params);
      break;

    default:
      console.warn(`[SDUI ActionHandler] Unknown action type: ${(action as any).type}`);
  }
}

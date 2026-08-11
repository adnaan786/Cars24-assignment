import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SDUINode, SDUIState } from '../types/sdui';
import { resolveComponent } from './ComponentRegistry';
import { handleSDUIAction, ActionContext } from './ActionHandler';

interface SDUIRendererProps {
  node: SDUINode;
  state: SDUIState;
  actionContext: ActionContext;
  debugMode?: boolean;
}

export const SDUIRenderer: React.FC<SDUIRendererProps> = ({
  node,
  state,
  actionContext,
  debugMode = true,
}) => {
  if (!node) return null;

  // Condition evaluation check
  if (node.condition) {
    const currentValue = state[node.condition.stateKey];
    if (node.condition.equals !== undefined && currentValue !== node.condition.equals) {
      return null;
    }
    if (node.condition.notEquals !== undefined && currentValue === node.condition.notEquals) {
      return null;
    }
  }

  const Component = resolveComponent(node.type);
  const isUnknown = Component.name === 'UnknownFallbackView' || (Component as any).displayName === 'UnknownFallbackView';

  // Inject props & action bindings
  const boundProps: Record<string, any> = { ...(node.props || {}) };

  // Bind dynamic state values if specified in props (e.g., tenureMonths)
  if (state.tenureMonths !== undefined && node.type === 'featured_cars_rail') {
    boundProps.tenureMonths = state.tenureMonths;
  }
  if (state.tenureMonths !== undefined && node.type === 'tenure_emi_calculator') {
    boundProps.selectedTenure = state.tenureMonths;
  }
  if (state.activeCategory !== undefined && node.type === 'category_quick_links') {
    boundProps.activeCategory = state.activeCategory;
  }
  if (state.wishlistIds !== undefined && node.type === 'featured_cars_rail') {
    boundProps.wishlistIds = state.wishlistIds;
  }

  // Bind Action handlers
  if (node.actions) {
    if (node.actions.onTenureChange) {
      boundProps.onTenureChange = (actionOverride?: any) => {
        handleSDUIAction(actionOverride || node.actions?.onTenureChange, actionContext);
      };
    }
    if (node.actions.onOpenSheet) {
      boundProps.onOpenSheet = (actionOverride?: any) => {
        handleSDUIAction(actionOverride || node.actions?.onOpenSheet, actionContext);
      };
    }
    if (node.actions.onSelectCategory) {
      boundProps.onSelectCategory = (categoryItem: any) => {
        handleSDUIAction(
          {
            type: 'UPDATE_STATE',
            targetStateKey: 'activeCategory',
            value: categoryItem.id,
          },
          actionContext
        );
      };
    }
    if (node.actions.onCarPress) {
      boundProps.onCarPress = (carItem: any) => {
        handleSDUIAction(
          node.actions?.onCarPress || {
            type: 'OPEN_BOTTOM_SHEET',
            sheetContent: {
              id: 'car_detail_sheet',
              type: 'car_detail_spec_sheet',
              props: {
                carTitle: `${carItem.year} ${carItem.makeModel}`,
                variant: carItem.variant,
                priceFormatted: carItem.priceFormatted,
                heroImageUrl: carItem.imageUrl,
              },
            },
          },
          actionContext
        );
      };
    }
    if (node.actions.onWishlistToggle) {
      boundProps.onWishlistToggle = (carId: string) => {
        const currentList: string[] = actionContext.state.wishlistIds || [];
        const newList = currentList.includes(carId)
          ? currentList.filter((id) => id !== carId)
          : [...currentList, carId];
        
        handleSDUIAction(
          {
            type: 'UPDATE_STATE',
            targetStateKey: 'wishlistIds',
            value: newList,
          },
          actionContext
        );
      };
    }
  }

  // Pass fallback diagnostics if unknown
  if (isUnknown) {
    boundProps.componentType = node.type;
    boundProps.id = node.id;
    boundProps.debugMode = debugMode;
  }

  // Render children recursively if any
  const childrenElements = node.children?.map((child) => (
    <SDUIRenderer
      key={child.id}
      node={child}
      state={state}
      actionContext={actionContext}
      debugMode={debugMode}
    />
  ));

  return (
    <View key={node.id} style={styles.nodeWrapper}>
      <Component {...boundProps}>{childrenElements}</Component>
    </View>
  );
};

const styles = StyleSheet.create({
  nodeWrapper: {
    width: '100%',
  },
});

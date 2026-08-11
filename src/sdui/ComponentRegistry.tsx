import React from 'react';
import { ComponentRegistryEntry } from '../types/sdui';
import { HeaderSearchBar } from '../components/sdui/HeaderSearchBar';
import { HeroBannerCarousel } from '../components/sdui/HeroBannerCarousel';
import { CategoryQuickLinks } from '../components/sdui/CategoryQuickLinks';
import { FeaturedCarsRail } from '../components/sdui/FeaturedCarsRail';
import { TenureEMICalculator } from '../components/sdui/TenureEMICalculator';
import { ValuePropStrip } from '../components/sdui/ValuePropStrip';
import { CustomerReviewsRail } from '../components/sdui/CustomerReviewsRail';
import { StickyFooterCTA } from '../components/sdui/StickyFooterCTA';
import { CarDetailSpecSheet } from '../components/sdui/CarDetailSpecSheet';
import { UnknownFallbackView } from '../components/sdui/UnknownFallbackView';

/**
 * Component Registry mapping JSON type strings to React Native view components.
 */
export const COMPONENT_REGISTRY: Record<string, ComponentRegistryEntry> = {
  header_search_bar: {
    component: HeaderSearchBar,
    minVersion: '1.0.0',
    description: 'Header location bar and main search input box',
  },
  hero_banner_carousel: {
    component: HeroBannerCarousel,
    minVersion: '1.0.0',
    description: 'Horizontal promo banner carousel rail',
  },
  category_quick_links: {
    component: CategoryQuickLinks,
    minVersion: '1.0.0',
    description: '2x4 grid of service quick links and action chips',
  },
  featured_cars_rail: {
    component: FeaturedCarsRail,
    minVersion: '1.0.0',
    description: 'Horizontal scrollable rail of featured car cards with state-bound EMI calculation',
  },
  tenure_emi_calculator: {
    component: TenureEMICalculator,
    minVersion: '1.0.0',
    description: 'Interactive tenure selector updating client state and opening bottom sheet',
  },
  value_prop_strip: {
    component: ValuePropStrip,
    minVersion: '1.0.0',
    description: 'Cars24 7-day return & 1-year warranty promise strip',
  },
  customer_reviews_rail: {
    component: CustomerReviewsRail,
    minVersion: '1.0.0',
    description: 'Horizontal scrollable rail of buyer testimonial quotes',
  },
  sticky_footer_cta: {
    component: StickyFooterCTA,
    minVersion: '1.0.0',
    description: 'Sticky bottom CTA action bar and bottom navigation bar',
  },
  car_detail_spec_sheet: {
    component: CarDetailSpecSheet,
    minVersion: '1.1.0',
    description: 'Vehicle specifications grid for car details / buy page',
  },
};

/**
 * Resolve component from registry, or return UnknownFallbackView if not found.
 */
export function resolveComponent(type: string): React.ComponentType<any> {
  const entry = COMPONENT_REGISTRY[type];
  if (entry) {
    return entry.component;
  }
  return UnknownFallbackView;
}

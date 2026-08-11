import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { HeaderSearchBar } from '../sdui/HeaderSearchBar';
import { HeroBannerCarousel } from '../sdui/HeroBannerCarousel';
import { CategoryQuickLinks } from '../sdui/CategoryQuickLinks';
import { FeaturedCarsRail } from '../sdui/FeaturedCarsRail';
import { TenureEMICalculator } from '../sdui/TenureEMICalculator';
import { ValuePropStrip } from '../sdui/ValuePropStrip';
import { CustomerReviewsRail } from '../sdui/CustomerReviewsRail';
import { StickyFooterCTA } from '../sdui/StickyFooterCTA';
import { STATIC_CARS24_DATA } from '../../data/static_data';

interface StaticCars24HomeProps {
  onOpenSheet?: (content: any) => void;
  onShowToast?: (msg: string) => void;
}

export const StaticCars24Home: React.FC<StaticCars24HomeProps> = ({
  onOpenSheet,
  onShowToast,
}) => {
  const [tenureMonths, setTenureMonths] = useState(36);
  const [activeCategory, setActiveCategory] = useState('buy');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['car_1']);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <HeaderSearchBar
          location={STATIC_CARS24_DATA.header.location}
          searchPlaceholder={STATIC_CARS24_DATA.header.searchPlaceholder}
          unreadNotifications={true}
          onSearchPress={() => onShowToast?.('Static Search Pressed')}
          onLocationPress={() => onShowToast?.('Static Location Picker Pressed')}
        />

        <HeroBannerCarousel
          banners={STATIC_CARS24_DATA.banners}
          onBannerPress={(b) => onShowToast?.(`Clicked banner: ${b.title}`)}
        />

        <CategoryQuickLinks
          categories={STATIC_CARS24_DATA.categories}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat.id)}
        />

        <FeaturedCarsRail
          cars={STATIC_CARS24_DATA.cars}
          tenureMonths={tenureMonths}
          wishlistIds={wishlistIds}
          onWishlistToggle={(carId) => {
            setWishlistIds((prev) =>
              prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
            );
          }}
          onCarPress={(car) => {
            onOpenSheet?.({
              id: 'static_car_sheet',
              type: 'car_detail_spec_sheet',
              props: {
                carTitle: `${car.year} ${car.makeModel}`,
                variant: car.variant,
                priceFormatted: car.priceFormatted,
                heroImageUrl: car.imageUrl,
              },
            });
          }}
        />

        <TenureEMICalculator
          tenureOptions={[12, 24, 36, 48, 60]}
          selectedTenure={tenureMonths}
          onTenureChange={(act) => {
            if (act?.value) setTenureMonths(act.value);
          }}
          onOpenSheet={(act) => {
            onOpenSheet?.(act?.sheetContent);
          }}
        />

        <ValuePropStrip propsList={STATIC_CARS24_DATA.valueProps} />

        <CustomerReviewsRail reviews={STATIC_CARS24_DATA.reviews} />
      </ScrollView>

      <StickyFooterCTA
        primaryCtaText="Sell Your Car in 1 hr"
        secondaryCtaText="Call Expert"
        onCtaPress={() => onShowToast?.('Static Footer CTA Clicked')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    paddingBottom: 24,
  },
});

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
  bgGradient: string[]; // hex codes
  imageUrl: string;
  ctaText: string;
  actionKey?: string;
}

interface HeroBannerCarouselProps {
  banners: BannerItem[];
  autoPlay?: boolean;
  onBannerPress?: (banner: BannerItem) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 48, 340);

export const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({
  banners = [],
  onBannerPress,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 12}
        contentContainerStyle={styles.scrollContent}
        onScroll={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const idx = Math.round(offsetX / (CARD_WIDTH + 12));
          if (idx !== activeIndex && idx >= 0 && idx < banners.length) {
            setActiveIndex(idx);
          }
        }}
        scrollEventThrottle={16}
      >
        {banners.map((banner, idx) => (
          <TouchableOpacity
            key={banner.id || idx}
            activeOpacity={0.9}
            style={[
              styles.card,
              { backgroundColor: banner.bgGradient?.[0] || '#1E1B4B' },
            ]}
            onPress={() => onBannerPress?.(banner)}
          >
            <View style={styles.cardTextContent}>
              {banner.tag && (
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{banner.tag}</Text>
                </View>
              )}
              <Text style={styles.title}>{banner.title}</Text>
              <Text style={styles.subtitle}>{banner.subtitle}</Text>
              
              <View style={styles.ctaButton}>
                <Text style={styles.ctaText}>{banner.ctaText || 'Explore Now'}</Text>
              </View>
            </View>

            {banner.imageUrl ? (
              <Image source={{ uri: banner.imageUrl }} style={styles.bannerImage} resizeMode="contain" />
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationRow}>
        {banners.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              idx === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: 150,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTextContent: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  tagBadge: {
    backgroundColor: '#FF6D00',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '700',
  },
  bannerImage: {
    width: 110,
    height: 110,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#FF6D00',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: '#CBD5E1',
  },
});

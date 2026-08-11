import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart, Star, Gauge, Fuel } from 'lucide-react';

export interface CarItem {
  id: string;
  makeModel: string;
  variant: string;
  year: number;
  kmsDriven: string;
  fuelType: string;
  transmission: string;
  priceFormatted: string;
  rawPrice: number; // in INR
  baseEmiMonthly: number;
  imageUrl: string;
  rating: number;
  badge?: string;
  location: string;
}

interface FeaturedCarsRailProps {
  title?: string;
  subtitle?: string;
  cars: CarItem[];
  tenureMonths?: number; // state-bound tenure selector value
  wishlistIds?: string[];
  onCarPress?: (car: CarItem) => void;
  onWishlistToggle?: (carId: string) => void;
}

const CARD_WIDTH = 240;

export const FeaturedCarsRail: React.FC<FeaturedCarsRailProps> = ({
  title = 'Handpicked Cars for You',
  subtitle = 'Inspected with 140+ quality checks',
  cars = [],
  tenureMonths = 36,
  wishlistIds = [],
  onCarPress,
  onWishlistToggle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAllText}>View All ({cars.length})</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cars.map((car) => {
          const isWishlisted = wishlistIds.includes(car.id);
          
          // Calculate dynamic EMI based on selected tenureMonths state
          // Formula: EMI = (P * r * (1+r)^n) / ((1+r)^n - 1)
          const annualInterestRate = 0.105; // 10.5%
          const monthlyRate = annualInterestRate / 12;
          const principal = car.rawPrice * 0.8; // 80% loan amount
          const n = tenureMonths || 36;
          const calculatedEmi = Math.round(
            (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
              (Math.pow(1 + monthlyRate, n) - 1)
          );

          return (
            <TouchableOpacity
              key={car.id}
              style={styles.carCard}
              activeOpacity={0.88}
              onPress={() => onCarPress?.(car)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: car.imageUrl }} style={styles.carImage} resizeMode="cover" />
                
                {car.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{car.badge}</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.wishlistBtn}
                  onPress={() => onWishlistToggle?.(car.id)}
                  activeOpacity={0.8}
                >
                  <Heart
                    size={16}
                    color={isWishlisted ? '#EF4444' : '#64748B'}
                    fill={isWishlisted ? '#EF4444' : 'transparent'}
                  />
                </TouchableOpacity>

                <View style={styles.ratingBadge}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{car.rating}</Text>
                </View>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.yearModel} numberOfLines={1}>
                  {car.year} {car.makeModel}
                </Text>
                <Text style={styles.variant} numberOfLines={1}>
                  {car.variant}
                </Text>

                {/* Specs Row */}
                <View style={styles.specsRow}>
                  <View style={styles.specChip}>
                    <Gauge size={11} color="#64748B" />
                    <Text style={styles.specText}>{car.kmsDriven}</Text>
                  </View>
                  <View style={styles.specChip}>
                    <Fuel size={11} color="#64748B" />
                    <Text style={styles.specText}>{car.fuelType}</Text>
                  </View>
                  <Text style={styles.transText}>{car.transmission}</Text>
                </View>

                {/* Pricing & Dynamic EMI */}
                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.priceValue}>{car.priceFormatted}</Text>
                  </View>

                  <View style={styles.emiBox}>
                    <Text style={styles.emiLabel}>EMI ({n}m)</Text>
                    <Text style={styles.emiValue}>₹{calculatedEmi.toLocaleString('en-IN')}/mo</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6D00',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  carCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    height: 130,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6D00',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  detailsContainer: {
    padding: 12,
  },
  yearModel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  variant: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  specText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '500',
  },
  transText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  priceLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  emiBox: {
    alignItems: 'flex-end',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  emiLabel: {
    fontSize: 9,
    color: '#C2410C',
    fontWeight: '600',
  },
  emiValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EA580C',
  },
});

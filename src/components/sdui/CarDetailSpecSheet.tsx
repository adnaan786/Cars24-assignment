import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle2, Shield, Calendar, MapPin, Gauge } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string;
  iconName?: string;
}

interface CarDetailSpecSheetProps {
  carTitle: string;
  variant: string;
  priceFormatted: string;
  heroImageUrl: string;
  specs: SpecItem[];
  inspectionPassedCount: number;
}

export const CarDetailSpecSheet: React.FC<CarDetailSpecSheetProps> = ({
  carTitle = '2021 Hyundai Creta SX (O)',
  variant = '1.5 Petrol Automatic',
  priceFormatted = '₹ 11,45,000',
  heroImageUrl = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
  specs = [
    { label: 'Registration Year', value: '2021' },
    { label: 'KMs Driven', value: '34,200 km' },
    { label: 'Fuel Type', value: 'Petrol' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Owner', value: '1st Owner' },
    { label: 'Location', value: 'Bangalore' },
  ],
  inspectionPassedCount = 140,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: heroImageUrl }} style={styles.heroImage} resizeMode="cover" />

      <View style={styles.contentBox}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.carTitle}>{carTitle}</Text>
            <Text style={styles.variant}>{variant}</Text>
          </View>
          <Text style={styles.price}>{priceFormatted}</Text>
        </View>

        {/* Quality Inspection Banner */}
        <View style={styles.inspectionBanner}>
          <CheckCircle2 size={18} color="#16A34A" />
          <Text style={styles.inspectionText}>
            Inspected & Verified ({inspectionPassedCount}+ Checkpoints Passed)
          </Text>
        </View>

        {/* Specifications Grid */}
        <Text style={styles.specSectionTitle}>Key Specifications</Text>
        <View style={styles.specsGrid}>
          {specs.map((item, idx) => (
            <View key={idx} style={styles.specTile}>
              <Text style={styles.specLabel}>{item.label}</Text>
              <Text style={styles.specValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  contentBox: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  variant: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF6D00',
  },
  inspectionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginBottom: 16,
  },
  inspectionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  specSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specTile: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  specLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});

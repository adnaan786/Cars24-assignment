import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Star, Quote } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  carBought: string;
  comment: string;
}

interface CustomerReviewsRailProps {
  title?: string;
  reviews?: ReviewItem[];
}

export const CustomerReviewsRail: React.FC<CustomerReviewsRailProps> = ({
  title = 'What Our Buyers Say',
  reviews = [],
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {reviews.map((rev) => (
          <View key={rev.id} style={styles.reviewCard}>
            <View style={styles.topRow}>
              <View style={styles.starsRow}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    color="#F59E0B"
                    fill={i < rev.rating ? '#F59E0B' : 'transparent'}
                  />
                ))}
              </View>
              <Quote size={16} color="#CBD5E1" />
            </View>

            <Text style={styles.comment} numberOfLines={3}>
              "{rev.comment}"
            </Text>

            <View style={styles.footerRow}>
              <View>
                <Text style={styles.name}>{rev.name}</Text>
                <Text style={styles.location}>{rev.location}</Text>
              </View>
              <View style={styles.carChip}>
                <Text style={styles.carChipText}>{rev.carBought}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  reviewCard: {
    width: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  comment: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  location: {
    fontSize: 10,
    color: '#64748B',
  },
  carChip: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  carChipText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FF6D00',
  },
});

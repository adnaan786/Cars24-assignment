import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Car, DollarSign, Shield, CreditCard, Tag, Sparkles, FileText, Gauge } from 'lucide-react';

interface CategoryItem {
  id: string;
  label: string;
  iconName: string;
  badge?: string;
  badgeColor?: string;
  actionKey?: string;
}

interface CategoryQuickLinksProps {
  categories: CategoryItem[];
  title?: string;
  activeCategory?: string;
  onSelectCategory?: (item: CategoryItem) => void;
}

const ICON_MAP: Record<string, any> = {
  Car,
  DollarSign,
  Shield,
  CreditCard,
  Tag,
  Sparkles,
  FileText,
  Gauge,
};

export const CategoryQuickLinks: React.FC<CategoryQuickLinksProps> = ({
  categories = [],
  title = 'Services & Options',
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <View style={styles.gridContainer}>
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || Car;
          const isSelected = activeCategory === cat.id;

          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.gridItem,
                isSelected && styles.selectedGridItem,
              ]}
              onPress={() => onSelectCategory?.(cat)}
              activeOpacity={0.75}
            >
              {cat.badge && (
                <View style={[styles.badge, { backgroundColor: cat.badgeColor || '#EF4444' }]}>
                  <Text style={styles.badgeText}>{cat.badge}</Text>
                </View>
              )}
              <View style={[styles.iconCircle, isSelected && styles.selectedIconCircle]}>
                <IconComponent size={22} color={isSelected ? '#FFFFFF' : '#FF6D00'} />
              </View>
              <Text style={styles.label} numberOfLines={1}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  gridItem: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedGridItem: {
    borderColor: '#FF6D00',
    backgroundColor: '#FFF7ED',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedIconCircle: {
    backgroundColor: '#FF6D00',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PhoneCall, Car, Heart, User } from 'lucide-react';
import { SDUIAction } from '../../types/sdui';

interface StickyFooterCTAProps {
  primaryCtaText?: string;
  secondaryCtaText?: string;
  activeTab?: string;
  onCtaPress?: (action?: SDUIAction) => void;
}

export const StickyFooterCTA: React.FC<StickyFooterCTAProps> = ({
  primaryCtaText = 'Sell Your Car in 1 hr',
  secondaryCtaText = 'Call Expert',
  activeTab = 'home',
  onCtaPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ctaRow}>
        <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8} onPress={() => onCtaPress?.()}>
          <PhoneCall size={16} color="#0F172A" />
          <Text style={styles.secondaryBtnText}>{secondaryCtaText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={() => onCtaPress?.()}>
          <Text style={styles.primaryBtnText}>{primaryCtaText}</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Car size={20} color={activeTab === 'home' ? '#FF6D00' : '#64748B'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={{ fontSize: 18, color: activeTab === 'sell' ? '#FF6D00' : '#64748B' }}>₹</Text>
          <Text style={[styles.navText, activeTab === 'sell' && styles.activeNavText]}>Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Heart size={20} color={activeTab === 'wishlist' ? '#FF6D00' : '#64748B'} />
          <Text style={[styles.navText, activeTab === 'wishlist' && styles.activeNavText]}>Shortlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <User size={20} color={activeTab === 'account' ? '#FF6D00' : '#64748B'} />
          <Text style={[styles.navText, activeTab === 'account' && styles.activeNavText]}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#FF6D00',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 6,
  },
  navItem: {
    alignItems: 'center',
    gap: 2,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  activeNavText: {
    color: '#FF6D00',
    fontWeight: '800',
  },
});

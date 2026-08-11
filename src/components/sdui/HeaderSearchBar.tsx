import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderSearchBarProps {
  location: string;
  searchPlaceholder: string;
  unreadNotifications?: boolean;
  onSearchPress?: () => void;
  onLocationPress?: () => void;
}

export const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  location,
  searchPlaceholder,
  unreadNotifications = true,
  onSearchPress,
  onLocationPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Top Location Bar */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.locationSelector} onPress={onLocationPress} activeOpacity={0.7}>
          <MapPin size={18} color="#FF6D00" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Location</Text>
            <View style={styles.cityRow}>
              <Text style={styles.cityName}>{location}</Text>
              <ChevronDown size={14} color="#1E293B" />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Bell size={20} color="#1E293B" />
          {unreadNotifications && <View style={styles.notificationDot} />}
        </TouchableOpacity>
      </View>

      {/* Search Input Box */}
      <TouchableOpacity style={styles.searchBar} onPress={onSearchPress} activeOpacity={0.9}>
        <Search size={18} color="#64748B" />
        <TextInput
          style={styles.searchInput}
          placeholder={searchPlaceholder}
          placeholderTextColor="#94A3B8"
          editable={false}
        />
        <View style={styles.searchBadge}>
          <Text style={styles.searchBadgeText}>Search</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationTextContainer: {
    flexDirection: 'column',
  },
  locationLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    padding: 0,
  },
  searchBadge: {
    backgroundColor: '#FF6D00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  searchBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

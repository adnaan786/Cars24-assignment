import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldCheck, RotateCcw, Award } from 'lucide-react';

interface ValuePropItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

interface ValuePropStripProps {
  propsList?: ValuePropItem[];
}

const ICON_MAP: Record<string, any> = {
  ShieldCheck,
  RotateCcw,
  Award,
};

export const ValuePropStrip: React.FC<ValuePropStripProps> = ({
  propsList = [
    {
      id: '1',
      title: '7-Day Return',
      subtitle: '100% money back guarantee',
      iconName: 'RotateCcw',
    },
    {
      id: '2',
      title: '140+ Points Check',
      subtitle: 'Rigorous quality inspection',
      iconName: 'ShieldCheck',
    },
    {
      id: '3',
      title: '1 Year Warranty',
      subtitle: 'Comprehensive coverage',
      iconName: 'Award',
    },
  ],
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>The Cars24 Promise</Text>
      <View style={styles.row}>
        {propsList.map((item) => {
          const IconComp = ICON_MAP[item.iconName] || ShieldCheck;
          return (
            <View key={item.id} style={styles.col}>
              <View style={styles.iconBox}>
                <IconComp size={20} color="#1E293B" />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  col: {
    flex: 1,
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 13,
  },
});

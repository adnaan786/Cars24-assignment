import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calculator, ChevronRight, Info } from 'lucide-react';
import { SDUIAction } from '../../types/sdui';

interface TenureEMICalculatorProps {
  title?: string;
  subtitle?: string;
  tenureOptions: number[]; // e.g. [12, 24, 36, 48, 60]
  selectedTenure: number;
  samplePrice?: number;
  onTenureChange?: (action: SDUIAction) => void;
  onOpenSheet?: (action: SDUIAction) => void;
}

export const TenureEMICalculator: React.FC<TenureEMICalculatorProps> = ({
  title = 'Zero Down Payment EMI Calculator',
  subtitle = 'Select your tenure to update monthly installments live',
  tenureOptions = [12, 24, 36, 48, 60],
  selectedTenure = 36,
  samplePrice = 650000,
  onTenureChange,
  onOpenSheet,
}) => {
  // Compute sample EMI for display strip
  const annualRate = 0.105;
  const r = annualRate / 12;
  const n = selectedTenure || 36;
  const sampleEmi = Math.round(
    (samplePrice * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Calculator size={18} color="#FF6D00" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Interactive Tenure Chips Driven by SDUI Actions */}
      <View style={styles.chipsContainer}>
        <Text style={styles.chipLabel}>Tenure (Months):</Text>
        <View style={styles.chipsRow}>
          {tenureOptions.map((months) => {
            const isSelected = selectedTenure === months;

            return (
              <TouchableOpacity
                key={months}
                style={[styles.chip, isSelected && styles.selectedChip]}
                activeOpacity={0.7}
                onPress={() => {
                  // Dispatch SDUI Action to update client state
                  onTenureChange?.({
                    type: 'UPDATE_STATE',
                    targetStateKey: 'tenureMonths',
                    value: months,
                  });
                }}
              >
                <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
                  {months}m
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Live Computed EMI Strip & Bottom Sheet Action Trigger */}
      <TouchableOpacity
        style={styles.summaryBar}
        activeOpacity={0.85}
        onPress={() => {
          // Dispatch SDUI Action to open bottom sheet modal with dynamic breakdown
          onOpenSheet?.({
            type: 'OPEN_BOTTOM_SHEET',
            sheetContent: {
              id: 'emi_breakdown_sheet',
              type: 'emi_breakdown_content',
              props: {
                tenure: selectedTenure,
                samplePrice: samplePrice,
                monthlyEmi: sampleEmi,
                interestRate: '10.5% p.a.',
                processingFee: '₹0 (Zero Processing Fee Promo)',
              },
            },
          });
        }}
      >
        <View style={styles.summaryLeft}>
          <Info size={16} color="#475569" />
          <View>
            <Text style={styles.summaryTitle}>Est. Monthly Payment</Text>
            <Text style={styles.summarySubtitle}>@ 10.5% p.a. for {selectedTenure} months</Text>
          </View>
        </View>

        <View style={styles.summaryRight}>
          <Text style={styles.emiAmount}>₹{sampleEmi.toLocaleString('en-IN')}/mo</Text>
          <View style={styles.sheetTriggerBadge}>
            <Text style={styles.sheetTriggerText}>Breakdown</Text>
            <ChevronRight size={12} color="#FF6D00" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  chipsContainer: {
    marginBottom: 14,
  },
  chipLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  chip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: '#FF6D00',
    borderColor: '#FF6D00',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  summarySubtitle: {
    fontSize: 10,
    color: '#64748B',
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  emiAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EA580C',
  },
  sheetTriggerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sheetTriggerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF6D00',
  },
});

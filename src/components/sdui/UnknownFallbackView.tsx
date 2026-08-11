import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UnknownFallbackProps {
  componentType: string;
  id: string;
  debugMode?: boolean;
}

export const UnknownFallbackView: React.FC<UnknownFallbackProps> = ({
  componentType,
  id,
  debugMode = true,
}) => {
  if (!debugMode) {
    // Production mode: degrade silently with subtle placeholder or skip
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>SDUI Fallback</Text>
      </View>
      <Text style={styles.title}>Unsupported Component Type</Text>
      <Text style={styles.subtitle}>
        Type: <Text style={styles.code}>"{componentType}"</Text> (ID: {id})
      </Text>
      <Text style={styles.info}>
        Client version does not support this component. Page rendered safely without crashing.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    backgroundColor: '#FFF1F2',
    borderColor: '#FECDD3',
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  badge: {
    backgroundColor: '#E11D48',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9F1239',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#BE123C',
    marginBottom: 4,
  },
  code: {
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  info: {
    fontSize: 11,
    color: '#881337',
  },
});

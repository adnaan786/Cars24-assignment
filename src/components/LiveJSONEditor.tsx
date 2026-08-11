import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Code, Play, AlertTriangle, Layers, FileJson, Sparkles } from 'lucide-react';
import { SDUISchema } from '../types/sdui';
import homeSchema from '../data/cars24_home_schema.json';
import carDetailsSchema from '../data/cars24_car_details_schema.json';

interface LiveJSONEditorProps {
  currentSchema: SDUISchema;
  onUpdateSchema: (newSchema: SDUISchema) => void;
  onInjectUnknownComponent: () => void;
}

export const LiveJSONEditor: React.FC<LiveJSONEditorProps> = ({
  currentSchema,
  onUpdateSchema,
  onInjectUnknownComponent,
}) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(currentSchema, null, 2));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed.root || !parsed.schemaVersion) {
        throw new Error('Invalid SDUI Schema: missing root node or schemaVersion');
      }
      setErrorMsg(null);
      onUpdateSchema(parsed as SDUISchema);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid JSON syntax');
    }
  };

  const loadPreset = (preset: 'home' | 'details') => {
    const target = preset === 'home' ? homeSchema : carDetailsSchema;
    setJsonText(JSON.stringify(target, null, 2));
    setErrorMsg(null);
    onUpdateSchema(target as SDUISchema);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <FileJson size={18} color="#FF6D00" />
          <Text style={styles.title}>Live SDUI JSON Schema Editor</Text>
        </View>

        <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.8}>
          <Play size={13} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.applyBtnText}>Apply JSON Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Preset Switcher & Action Bar */}
      <View style={styles.presetRow}>
        <Text style={styles.presetLabel}>Quick Payloads:</Text>
        
        <TouchableOpacity
          style={styles.presetChip}
          onPress={() => loadPreset('home')}
          activeOpacity={0.7}
        >
          <Layers size={12} color="#0F172A" />
          <Text style={styles.presetChipText}>Cars24 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.presetChip}
          onPress={() => loadPreset('details')}
          activeOpacity={0.7}
        >
          <Sparkles size={12} color="#0F172A" />
          <Text style={styles.presetChipText}>Surprise Screen (Buy)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fallbackChip}
          onPress={onInjectUnknownComponent}
          activeOpacity={0.7}
        >
          <AlertTriangle size={12} color="#E11D48" />
          <Text style={styles.fallbackChipText}>Inject Unknown Node</Text>
        </TouchableOpacity>
      </View>

      {/* Error Bar */}
      {errorMsg && (
        <View style={styles.errorBox}>
          <AlertTriangle size={14} color="#DC2626" />
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}

      {/* Text Area Code Editor */}
      <View style={styles.editorWrapper}>
        <TextInput
          style={styles.codeArea}
          multiline
          value={jsonText}
          onChangeText={(txt) => {
            setJsonText(txt);
            if (errorMsg) setErrorMsg(null);
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FF6D00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  presetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  presetLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  presetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  presetChipText: {
    fontSize: 11,
    color: '#F1F5F9',
    fontWeight: '600',
  },
  fallbackChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#4C0519',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#9F1239',
  },
  fallbackChipText: {
    fontSize: 11,
    color: '#FDA4AF',
    fontWeight: '700',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '600',
  },
  editorWrapper: {
    backgroundColor: '#020617',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  codeArea: {
    color: '#38BDF8',
    fontFamily: 'monospace',
    fontSize: 11,
    minHeight: 220,
    maxHeight: 340,
    textAlignVertical: 'top',
  },
});

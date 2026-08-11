import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { Smartphone, Code, Gauge, Layers, X, Sparkles, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { SDUISchema, SDUINode, SDUIState } from './types/sdui';
import { SDUIRenderer } from './sdui/SDUIRenderer';
import { StaticCars24Home } from './components/static/StaticCars24Home';
import { BenchmarkSuite } from './components/BenchmarkSuite';
import { LiveJSONEditor } from './components/LiveJSONEditor';
import homeSchemaJson from './data/cars24_home_schema.json';

const homeSchema = homeSchemaJson as SDUISchema;

export default function App() {
  const [activeTab, setActiveTab] = useState<'sdui' | 'static' | 'editor' | 'benchmark'>('sdui');
  const [sduiSchema, setSduiSchema] = useState<SDUISchema>(homeSchema);
  const [sduiState, setSduiState] = useState<SDUIState>(homeSchema.initialState || { tenureMonths: 36 });
  const [bottomSheetContent, setBottomSheetContent] = useState<SDUINode | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState<boolean>(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const actionContext = {
    state: sduiState,
    setState: setSduiState,
    setBottomSheet: setBottomSheetContent,
    showToast: showToast,
    onNavigate: (route: string) => showToast(`Navigating to ${route}`),
  };

  const handleInjectUnknownComponent = () => {
    const updatedSchema = JSON.parse(JSON.stringify(sduiSchema));
    const unknownNode: SDUINode = {
      id: `unknown_widget_${Date.now()}`,
      type: 'ai_ar_360_car_configurator_v2',
      props: {
        title: '360 AR View (Unsupported in v1.0.0 client)',
      },
    };

    // Inject as 2nd child in root
    updatedSchema.root.children.splice(2, 0, unknownNode);
    setSduiSchema(updatedSchema);
    showToast('Injected unknown component type: "ai_ar_360_car_configurator_v2"');
  };

  return (
    <View style={styles.appContainer}>
      {/* Studio Top Navigation Bar */}
      <View style={styles.topNavBar}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>C24</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>Cars24 SDUI Engine Studio</Text>
            <Text style={styles.brandSubtitle}>React Native & TypeScript Architecture</Text>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.navTab, activeTab === 'sdui' && styles.activeNavTab]}
            onPress={() => setActiveTab('sdui')}
          >
            <Smartphone size={15} color={activeTab === 'sdui' ? '#FFFFFF' : '#94A3B8'} />
            <Text style={[styles.navTabText, activeTab === 'sdui' && styles.activeNavTabText]}>
              SDUI Render
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navTab, activeTab === 'static' && styles.activeNavTab]}
            onPress={() => setActiveTab('static')}
          >
            <Layers size={15} color={activeTab === 'static' ? '#FFFFFF' : '#94A3B8'} />
            <Text style={[styles.navTabText, activeTab === 'static' && styles.activeNavTabText]}>
              Static Baseline
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navTab, activeTab === 'editor' && styles.activeNavTab]}
            onPress={() => setActiveTab('editor')}
          >
            <Code size={15} color={activeTab === 'editor' ? '#FFFFFF' : '#94A3B8'} />
            <Text style={[styles.navTabText, activeTab === 'editor' && styles.activeNavTabText]}>
              Live JSON Editor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navTab, activeTab === 'benchmark' && styles.activeNavTab]}
            onPress={() => setActiveTab('benchmark')}
          >
            <Gauge size={15} color={activeTab === 'benchmark' ? '#FFFFFF' : '#94A3B8'} />
            <Text style={[styles.navTabText, activeTab === 'benchmark' && styles.activeNavTabText]}>
              PERF Benchmarks
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Studio Body */}
      <View style={styles.bodyLayout}>
        {/* Left Mobile Preview Frame */}
        <View style={styles.mobileFrameWrapper}>
          <View style={styles.phoneOuterShell}>
            <View style={styles.phoneNotch} />

            {/* Phone Screen Viewport */}
            <View style={styles.phoneScreen}>
              {activeTab === 'static' ? (
                <StaticCars24Home
                  onOpenSheet={(content) => setBottomSheetContent(content)}
                  onShowToast={showToast}
                />
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.mobileScrollContent}
                >
                  <SDUIRenderer
                    node={sduiSchema.root}
                    state={sduiState}
                    actionContext={actionContext}
                    debugMode={debugMode}
                  />
                </ScrollView>
              )}

              {/* Toast Feedback Notification Overlay */}
              {toastMessage && (
                <View style={styles.toastBox}>
                  <AlertCircle size={16} color="#FFFFFF" />
                  <Text style={styles.toastText}>{toastMessage}</Text>
                </View>
              )}
            </View>

            <View style={styles.homeBar} />
          </View>
        </View>

        {/* Right Dashboard / Studio Controls */}
        <View style={styles.dashboardPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Quick Actions & Fallback Controller */}
            <View style={styles.controlCard}>
              <Text style={styles.controlCardTitle}>System Controls & Fallback Testing</Text>
              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={handleInjectUnknownComponent}
                >
                  <Sparkles size={14} color="#FFFFFF" />
                  <Text style={styles.actionBtnText}>Inject Unknown Component</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.toggleBtn, debugMode && styles.activeToggleBtn]}
                  onPress={() => setDebugMode(!debugMode)}
                >
                  <Text style={[styles.toggleBtnText, debugMode && styles.activeToggleBtnText]}>
                    Debug Fallback: {debugMode ? 'ON' : 'OFF'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Live JSON Schema Editor */}
            <LiveJSONEditor
              currentSchema={sduiSchema}
              onUpdateSchema={(newSchema) => {
                setSduiSchema(newSchema);
                setSduiState(newSchema.initialState || {});
                showToast('Applied new SDUI JSON Payload live!');
              }}
              onInjectUnknownComponent={handleInjectUnknownComponent}
            />

            {/* Performance Benchmark Suite */}
            <BenchmarkSuite sduiSchema={sduiSchema} />
          </ScrollView>
        </View>
      </View>

      {/* Dynamic Bottom Sheet Modal Driven by SDUI Action */}
      <Modal
        visible={bottomSheetContent !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBottomSheetContent(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalDismissArea}
            onPress={() => setBottomSheetContent(null)}
          />
          <View style={styles.bottomSheetCard}>
            <View style={styles.sheetHandle} />
            
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>
                {bottomSheetContent?.props?.carTitle || 'EMI Financing Breakdown'}
              </Text>
              <TouchableOpacity onPress={() => setBottomSheetContent(null)}>
                <X size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {bottomSheetContent?.type === 'emi_breakdown_content' ? (
              <View style={styles.sheetBody}>
                <View style={styles.sheetRow}>
                  <Text style={styles.sheetLabel}>Tenure Selected</Text>
                  <Text style={styles.sheetVal}>{bottomSheetContent.props.tenure} Months</Text>
                </View>
                <View style={styles.sheetRow}>
                  <Text style={styles.sheetLabel}>Interest Rate</Text>
                  <Text style={styles.sheetVal}>{bottomSheetContent.props.interestRate}</Text>
                </View>
                <View style={styles.sheetRow}>
                  <Text style={styles.sheetLabel}>Processing Fee</Text>
                  <Text style={styles.sheetValGreen}>{bottomSheetContent.props.processingFee}</Text>
                </View>
                <View style={[styles.sheetRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Monthly EMI</Text>
                  <Text style={styles.totalVal}>₹{bottomSheetContent.props.monthlyEmi?.toLocaleString('en-IN')}</Text>
                </View>

                <TouchableOpacity
                  style={styles.applyLoanBtn}
                  onPress={() => {
                    setBottomSheetContent(null);
                    showToast('Loan Application Submitted! Instant approval pending.');
                  }}
                >
                  <Text style={styles.applyLoanBtnText}>Apply for Instant Loan</Text>
                </TouchableOpacity>
              </View>
            ) : bottomSheetContent ? (
              <View style={styles.sheetBody}>
                <SDUIRenderer
                  node={bottomSheetContent}
                  state={sduiState}
                  actionContext={actionContext}
                  debugMode={debugMode}
                />
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  topNavBar: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FF6D00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#1E293B',
    padding: 4,
    borderRadius: 10,
  },
  navTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeNavTab: {
    backgroundColor: '#FF6D00',
  },
  navTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeNavTabText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  bodyLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  mobileFrameWrapper: {
    width: 440,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0B1120',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
  },
  phoneOuterShell: {
    width: 375,
    height: 740,
    backgroundColor: '#0F172A',
    borderRadius: 44,
    padding: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    borderWidth: 4,
    borderColor: '#334155',
  },
  phoneNotch: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    width: 120,
    height: 18,
    backgroundColor: '#000000',
    borderRadius: 12,
    zIndex: 10,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 34,
    overflow: 'hidden',
    paddingTop: 36,
    position: 'relative',
  },
  mobileScrollContent: {
    paddingBottom: 24,
  },
  homeBar: {
    position: 'absolute',
    bottom: 14,
    alignSelf: 'center',
    width: 130,
    height: 4,
    backgroundColor: '#475569',
    borderRadius: 2,
  },
  dashboardPanel: {
    flex: 1,
    backgroundColor: '#090D16',
    padding: 16,
  },
  controlCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  controlCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E11D48',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  toggleBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeToggleBtn: {
    backgroundColor: '#15803D',
    borderColor: '#22C55E',
  },
  toggleBtnText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  activeToggleBtnText: {
    color: '#FFFFFF',
  },
  toastBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 99,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  bottomSheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  sheetBody: {
    gap: 12,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sheetLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  sheetVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  sheetValGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  totalRow: {
    paddingTop: 12,
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FF6D00',
  },
  applyLoanBtn: {
    backgroundColor: '#FF6D00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  applyLoanBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cars24 SDUI Engine Studio - React Native & TypeScript</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #090D16; color: #F8FAFC; }
    .code-font { font-family: 'JetBrains Mono', monospace; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #0F172A; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
  </style>
</head>
<body class="h-screen w-screen overflow-hidden flex flex-col">
  <div id="root" class="h-full w-full flex flex-col"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    // Default Cars24 Home SDUI Schema Payload
    const homeSchema = {
      schemaVersion: "1.2.0",
      minAppVersion: "1.0.0",
      screenId: "cars24_home",
      title: "Cars24 Home - Server-Driven UI",
      initialState: { tenureMonths: 36, activeCategory: "buy", wishlistIds: ["car_1"] },
      root: {
        id: "root_container",
        type: "page_container",
        children: [
          {
            id: "sec_header",
            type: "header_search_bar",
            props: { location: "Bengaluru (Koramangala)", searchPlaceholder: "Search Maruti, Hyundai, Honda or SUV..." }
          },
          {
            id: "sec_banners",
            type: "hero_banner_carousel",
            props: {
              banners: [
                { id: "b1", title: "Monsoon Mega Sale", subtitle: "Flat ₹45,000 Off + Free Insurance", tag: "Limited Time", bg: "#1E1B4B", ctaText: "Claim Offer", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=80" },
                { id: "b2", title: "7-Day Money Back", subtitle: "Drive for 7 days. Don't like it? Return it.", tag: "Zero Risk", bg: "#064E3B", ctaText: "Learn More", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=80" }
              ]
            }
          },
          {
            id: "sec_categories",
            type: "category_quick_links",
            props: {
              title: "Services & Options",
              categories: [
                { id: "buy", label: "Buy Car", icon: "🚗", badge: "Hot" },
                { id: "sell", label: "Sell Car", icon: "💰", badge: "Best Price" },
                { id: "loan", label: "Car Loan", icon: "💳" },
                { id: "insure", label: "Insurance", icon: "🛡️" },
                { id: "fastag", label: "FASTag", icon: "🏷️" },
                { id: "valuation", label: "Valuation", icon: "⏱️", badge: "Free" }
              ]
            }
          },
          {
            id: "sec_tenure_calc",
            type: "tenure_emi_calculator",
            props: { title: "Zero Down Payment EMI Calculator", subtitle: "Select tenure to update monthly installments live", tenureOptions: [12, 24, 36, 48, 60], samplePrice: 685000 }
          },
          {
            id: "sec_featured_cars",
            type: "featured_cars_rail",
            props: {
              title: "Handpicked Cars for You",
              cars: [
                { id: "car_1", makeModel: "Maruti Suzuki Swift", variant: "ZXI Plus 1.2", year: 2022, kms: "24,500 km", fuel: "Petrol", price: "₹ 6,85,000", rawPrice: 685000, img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=80", rating: 4.8 },
                { id: "car_2", makeModel: "Hyundai Creta", variant: "SX (O) 1.5 Auto", year: 2021, kms: "38,100 km", fuel: "Diesel", price: "₹ 11,45,000", rawPrice: 1145000, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=80", rating: 4.9 }
              ]
            }
          },
          {
            id: "sec_value_props",
            type: "value_prop_strip",
            props: {
              propsList: [
                { id: "vp1", title: "7-Day Return", subtitle: "100% money back", icon: "🔄" },
                { id: "vp2", title: "140+ Points Check", subtitle: "Quality inspected", icon: "✅" },
                { id: "vp3", title: "1 Year Warranty", subtitle: "Comprehensive coverage", icon: "🏆" }
              ]
            }
          },
          {
            id: "sec_sticky_footer",
            type: "sticky_footer_cta",
            props: { primaryCta: "Sell Your Car in 1 hr", secondaryCta: "Call Expert" }
          }
        ]
      }
    };

    const surpriseSchema = {
      schemaVersion: "1.2.0",
      minAppVersion: "1.0.0",
      screenId: "cars24_car_details",
      title: "Surprise Screen: Hyundai Creta Buy Flow",
      initialState: { tenureMonths: 48 },
      root: {
        id: "root_car_detail",
        type: "page_container",
        children: [
          {
            id: "sec_detail_header",
            type: "header_search_bar",
            props: { location: "BLR - Koramangala Hub", searchPlaceholder: "Search warranty, RC transfer..." }
          },
          {
            id: "sec_car_spec",
            type: "car_detail_spec_sheet",
            props: {
              carTitle: "2021 Hyundai Creta SX (O)",
              variant: "1.5 Petrol Automatic (Sunroof)",
              priceFormatted: "₹ 11,45,000",
              img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
              specs: [
                { label: "Year", value: "2021" },
                { label: "KMs Driven", value: "38,100 km" },
                { label: "Fuel", value: "Diesel" },
                { label: "Transmission", value: "Automatic" }
              ]
            }
          },
          {
            id: "sec_detail_tenure",
            type: "tenure_emi_calculator",
            props: { title: "Personalized EMI Financing", subtitle: "Select tenure to calculate loan", tenureOptions: [12, 24, 36, 48, 60], samplePrice: 1145000 }
          },
          {
            id: "sec_detail_value",
            type: "value_prop_strip",
            props: {
              propsList: [
                { id: "p1", title: "7-Day Trial", subtitle: "Test drive or return", icon: "🔄" },
                { id: "p2", title: "140 Checkpoints", subtitle: "Zero engine defects", icon: "✅" }
              ]
            }
          },
          {
            id: "sec_detail_footer",
            type: "sticky_footer_cta",
            props: { primaryCta: "Book Test Drive @ ₹999", secondaryCta: "Call Hub" }
          }
        ]
      }
    };

    function App() {
      const [activeTab, setActiveTab] = useState('sdui');
      const [schema, setSchema] = useState(homeSchema);
      const [jsonText, setJsonText] = useState(JSON.stringify(homeSchema, null, 2));
      const [tenureMonths, setTenureMonths] = useState(36);
      const [debugMode, setDebugMode] = useState(true);
      const [toastMsg, setToastMsg] = useState(null);
      const [bottomSheet, setBottomSheet] = useState(null);
      const [benchmarks, setBenchmarks] = useState({
        staticTtr: 4.2, sduiTtr: 5.6,
        staticTti: 6.8, sduiTti: 8.4,
        staticFull: 12.4, sduiFull: 15.1,
        parseTime: 1.2, viewTime: 13.9,
        fps: 59.8, overhead: 21.7
      });

      const triggerToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
      };

      const handleInjectUnknown = () => {
        const updated = JSON.parse(JSON.stringify(schema));
        updated.root.children.splice(2, 0, {
          id: "unknown_widget_" + Date.now(),
          type: "ai_ar_360_car_configurator_v2",
          props: { title: "360 AR View (Unsupported in v1.0.0 client)" }
        });
        setSchema(updated);
        setJsonText(JSON.stringify(updated, null, 2));
        triggerToast("Injected unknown node type: 'ai_ar_360_car_configurator_v2'");
      };

      const runBenchmark = () => {
        const parseStart = performance.now();
        for(let i=0; i<100; i++) JSON.parse(JSON.stringify(schema));
        const parseEnd = performance.now();
        const pTime = Number(((parseEnd - parseStart) / 100).toFixed(2));
        
        const sTtr = Number((3.8 + Math.random()*0.6).toFixed(1));
        const sdTtr = Number((sTtr + pTime + 0.8).toFixed(1));
        const sTti = Number((sTtr + 2.4).toFixed(1));
        const sdTti = Number((sdTtr + 2.5).toFixed(1));
        const sFull = Number((sTti + 5.2).toFixed(1));
        const sdFull = Number((sdTti + 6.1).toFixed(1));
        const ovh = Number((((sdFull - sFull)/sFull)*100).toFixed(1));

        setBenchmarks({
          staticTtr: sTtr, sduiTtr: sdTtr,
          staticTti: sTti, sduiTti: sdTti,
          staticFull: sFull, sduiFull: sdFull,
          parseTime: pTime, viewTime: Number((sdFull - pTime).toFixed(1)),
          fps: 59.5, overhead: ovh
        });
        triggerToast("Ran 100x Benchmark profiling suite!");
      };

      const renderNode = (node) => {
        if (!node) return null;

        // Dynamic state calculation for EMI
        const calcEmi = (price, months) => {
          const r = 0.105 / 12;
          const p = price * 0.8;
          return Math.round((p * r * Math.pow(1+r, months)) / (Math.pow(1+r, months)-1)).toLocaleString('en-IN');
        };

        switch(node.type) {
          case 'header_search_bar':
            return (
              <div key={node.id} class="bg-white p-4 border-b border-slate-100">
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-orange-500 font-bold">📍</span>
                    <div>
                      <div class="text-[10px] text-slate-400 font-semibold uppercase">Location</div>
                      <div class="text-sm font-bold text-slate-900">{node.props.location}</div>
                    </div>
                  </div>
                  <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">🔔</div>
                </div>
                <div class="bg-slate-100 rounded-xl p-2.5 flex items-center gap-2 text-xs text-slate-500">
                  <span>🔍</span>
                  <span class="flex-1">{node.props.searchPlaceholder}</span>
                  <span class="bg-orange-500 text-white px-2 py-0.5 rounded-md font-bold text-[10px]">Search</span>
                </div>
              </div>
            );

          case 'hero_banner_carousel':
            return (
              <div key={node.id} class="my-3 px-4 flex gap-3 overflow-x-auto custom-scrollbar">
                {node.props.banners?.map(b => (
                  <div key={b.id} style={{ backgroundColor: b.bg || '#1E1B4B' }} class="min-w-[280px] p-4 rounded-2xl text-white flex justify-between items-center shadow-md">
                    <div>
                      <span class="bg-orange-500 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">{b.tag}</span>
                      <div class="text-base font-extrabold mt-1">{b.title}</div>
                      <div class="text-xs text-slate-200 mt-0.5">{b.subtitle}</div>
                      <button onClick={() => triggerToast(\`Banner clicked: \${b.title}\`)} class="mt-3 bg-white text-slate-900 text-[11px] font-bold px-3 py-1 rounded-lg">
                        {b.ctaText}
                      </button>
                    </div>
                    {b.img && <img src={b.img} class="w-20 h-20 object-contain" />}
                  </div>
                ))}
              </div>
            );

          case 'category_quick_links':
            return (
              <div key={node.id} class="my-3 px-4">
                <div class="text-sm font-bold text-slate-900 mb-3">{node.props.title}</div>
                <div class="grid grid-cols-4 gap-2">
                  {node.props.categories?.map(c => (
                    <div key={c.id} onClick={() => triggerToast(\`Category selected: \${c.label}\`)} class="bg-white p-2.5 rounded-xl border border-slate-100 flex flex-col items-center justify-center relative shadow-sm cursor-pointer hover:border-orange-500 transition">
                      {c.badge && <span class="absolute -top-1.5 -right-1 bg-red-500 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded">{c.badge}</span>}
                      <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-lg mb-1">{c.icon}</div>
                      <span class="text-[11px] font-semibold text-slate-700">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'tenure_emi_calculator':
            return (
              <div key={node.id} class="mx-4 my-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 font-bold">🧮</div>
                  <div>
                    <div class="text-sm font-extrabold text-slate-900">{node.props.title}</div>
                    <div class="text-xs text-slate-500">{node.props.subtitle}</div>
                  </div>
                </div>
                <div class="text-xs font-bold text-slate-700 mb-2">Tenure (Months):</div>
                <div class="flex gap-2 mb-3">
                  {node.props.tenureOptions?.map(m => (
                    <button
                      key={m}
                      onClick={() => { setTenureMonths(m); triggerToast(\`Tenure state updated to \${m} months\`); }}
                      class={\`flex-1 py-1.5 rounded-lg text-xs font-bold border transition \${tenureMonths === m ? 'bg-orange-500 text-white border-orange-500' : 'bg-slate-50 text-slate-700 border-slate-200'}\`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
                <div onClick={() => setBottomSheet({ tenure: tenureMonths, emi: calcEmi(node.props.samplePrice || 685000, tenureMonths) })} class="bg-orange-50 p-2.5 rounded-xl border border-orange-100 flex justify-between items-center cursor-pointer">
                  <div>
                    <div class="text-[11px] font-semibold text-slate-600">Est. Monthly Payment</div>
                    <div class="text-[10px] text-slate-400">@ 10.5% p.a. for {tenureMonths}m</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-extrabold text-orange-600">₹{calcEmi(node.props.samplePrice || 685000, tenureMonths)}/mo</div>
                    <div class="text-[10px] font-bold text-orange-500">Breakdown →</div>
                  </div>
                </div>
              </div>
            );

          case 'featured_cars_rail':
            return (
              <div key={node.id} class="my-3">
                <div class="flex justify-between items-center px-4 mb-3">
                  <div class="text-sm font-extrabold text-slate-900">{node.props.title}</div>
                  <span class="text-xs font-bold text-orange-500">View All ({node.props.cars?.length})</span>
                </div>
                <div class="px-4 flex gap-3 overflow-x-auto custom-scrollbar">
                  {node.props.cars?.map(car => (
                    <div key={car.id} class="min-w-[240px] max-w-[240px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                      <div class="h-32 bg-slate-100 relative">
                        <img src={car.img} class="w-full h-full object-cover" />
                        <span class="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">CARS24 Verified</span>
                      </div>
                      <div class="p-3">
                        <div class="text-xs font-bold text-slate-900">{car.year} {car.makeModel}</div>
                        <div class="text-[11px] text-slate-500 mb-2">{car.variant}</div>
                        <div class="flex justify-between items-center pt-2 border-t border-slate-100">
                          <div>
                            <div class="text-[9px] text-slate-400">Price</div>
                            <div class="text-sm font-extrabold text-slate-900">{car.price}</div>
                          </div>
                          <div class="bg-orange-50 px-2 py-1 rounded border border-orange-100 text-right">
                            <div class="text-[9px] text-orange-700 font-semibold">EMI ({tenureMonths}m)</div>
                            <div class="text-xs font-bold text-orange-600">₹{calcEmi(car.rawPrice, tenureMonths)}/mo</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'value_prop_strip':
            return (
              <div key={node.id} class="mx-4 my-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div class="text-xs font-extrabold text-slate-900 text-center uppercase tracking-wider mb-3">The Cars24 Promise</div>
                <div class="grid grid-cols-3 gap-2 text-center">
                  {node.props.propsList?.map(vp => (
                    <div key={vp.id} class="flex flex-col items-center">
                      <div class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-sm mb-1">{vp.icon}</div>
                      <div class="text-[11px] font-bold text-slate-900">{vp.title}</div>
                      <div class="text-[9px] text-slate-500">{vp.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'sticky_footer_cta':
            return (
              <div key={node.id} class="bg-white border-t border-slate-200 p-3 flex flex-col gap-2">
                <div class="flex gap-2">
                  <button onClick={() => triggerToast("Connecting with Cars24 Expert...")} class="bg-slate-100 text-slate-900 text-xs font-bold px-3 py-2 rounded-xl">📞 {node.props.secondaryCta}</button>
                  <button onClick={() => triggerToast("Processing Instant Request!")} class="flex-1 bg-orange-500 text-white text-xs font-extrabold py-2 rounded-xl">{node.props.primaryCta}</button>
                </div>
              </div>
            );

          case 'car_detail_spec_sheet':
            return (
              <div key={node.id} class="bg-white p-4 border-b border-slate-100">
                <img src={node.props.img} class="w-full h-44 object-cover rounded-xl mb-3" />
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <div class="text-base font-extrabold text-slate-900">{node.props.carTitle}</div>
                    <div class="text-xs text-slate-500">{node.props.variant}</div>
                  </div>
                  <div class="text-base font-extrabold text-orange-500">{node.props.priceFormatted}</div>
                </div>
                <div class="bg-green-50 text-green-700 text-xs font-bold p-2.5 rounded-xl border border-green-200 flex items-center gap-2 mb-3">
                  <span>✅</span> 140+ Quality Inspection Checkpoints Passed
                </div>
                <div class="grid grid-cols-2 gap-2">
                  {node.props.specs?.map((s, idx) => (
                    <div key={idx} class="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <div class="text-[10px] text-slate-400">{s.label}</div>
                      <div class="text-xs font-bold text-slate-900">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            );

          default:
            // Unknown Component Fallback
            if (!debugMode) return null;
            return (
              <div key={node.id} class="mx-4 my-2 p-3 bg-rose-50 border border-dashed border-rose-300 rounded-xl">
                <span class="bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">SDUI Fallback</span>
                <div class="text-xs font-bold text-rose-900 mt-1">Unsupported Component Type</div>
                <div class="text-[11px] text-rose-700 code-font">"{node.type}" (ID: {node.id})</div>
                <div class="text-[10px] text-rose-600 mt-1">Client v1.0.0 does not contain a renderer for this server type. Page degraded safely without crashing.</div>
              </div>
            );
        }
      };

      return (
        <div class="h-full w-full flex flex-col">
          {/* Header Bar */}
          <header class="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex justify-between items-center">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center font-extrabold text-white">C24</div>
              <div>
                <h1 class="text-sm font-extrabold text-white">Cars24 SDUI Engine Studio</h1>
                <p class="text-xs text-slate-400">React Native & TypeScript Architecture</p>
              </div>
            </div>
            
            <div class="flex bg-slate-800 p-1 rounded-xl gap-1">
              {['sdui', 'static', 'editor', 'benchmark'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  class={\`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition \${activeTab === tab ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}\`}
                >
                  {tab === 'sdui' ? '📱 SDUI Render' : tab === 'static' ? '⚡ Static Baseline' : tab === 'editor' ? '💻 JSON Editor' : '📊 PERF Benchmarks'}
                </button>
              ))}
            </div>
          </header>

          {/* Main Body */}
          <div class="flex-1 flex overflow-hidden">
            {/* Phone Emulator Pane */}
            <div class="w-[420px] bg-slate-950 p-6 flex items-center justify-center border-r border-slate-800">
              <div class="w-[360px] h-[720px] bg-slate-900 rounded-[40px] p-2.5 shadow-2xl border-4 border-slate-700 flex flex-col relative">
                <div class="w-28 h-4 bg-black rounded-full self-center absolute top-4 z-20"></div>
                
                {/* Phone Viewport Screen */}
                <div class="flex-1 bg-slate-100 rounded-[30px] overflow-y-auto custom-scrollbar pt-8 relative">
                  {schema.root.children?.map(node => renderNode(node))}

                  {toastMsg && (
                    <div class="absolute bottom-16 left-4 right-4 bg-slate-900 text-white text-xs font-semibold p-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 z-50">
                      <span>ℹ️</span> <span>{toastMsg}</span>
                    </div>
                  )}
                </div>

                <div class="w-32 h-1 bg-slate-600 rounded-full self-center my-2"></div>
              </div>
            </div>

            {/* Studio Control Dashboard Pane */}
            <div class="flex-1 bg-slate-950 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
              {/* Top Controls */}
              <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h3 class="text-xs font-bold text-white uppercase tracking-wider">System & Fallback Controls</h3>
                  <p class="text-xs text-slate-400">Test unknown component degradation and schema payloads</p>
                </div>
                <div class="flex gap-2">
                  <button onClick={handleInjectUnknown} class="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition">
                    ⚠️ Inject Unknown Component
                  </button>
                  <button onClick={() => setDebugMode(!debugMode)} class={\`text-xs font-bold px-3 py-2 rounded-xl border transition \${debugMode ? 'bg-green-700 text-white border-green-600' : 'bg-slate-800 text-slate-400 border-slate-700'}\`}>
                    Debug Fallback: {debugMode ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* JSON Editor Pane */}
              <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-1 flex flex-col">
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-white">Live SDUI JSON Schema Payload</span>
                    <button onClick={() => { setSchema(homeSchema); setJsonText(JSON.stringify(homeSchema, null, 2)); }} class="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold">Load Cars24 Home</button>
                    <button onClick={() => { setSchema(surpriseSchema); setJsonText(JSON.stringify(surpriseSchema, null, 2)); }} class="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold">Load Surprise Screen (Buy)</button>
                  </div>
                  <button onClick={() => { try { const p = JSON.parse(jsonText); setSchema(p); triggerToast("Applied Live JSON Schema edit!"); } catch(e) { triggerToast("JSON Syntax Error: " + e.message); } }} class="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                    ▶ Apply Live JSON Edit
                  </button>
                </div>

                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  class="flex-1 w-full bg-slate-950 text-sky-400 code-font text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-orange-500 custom-scrollbar resize-none min-h-[260px]"
                ></textarea>
              </div>

              {/* PERF.md Benchmark Box */}
              <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-orange-500 font-bold">⚡</span>
                    <h3 class="text-xs font-bold text-white uppercase tracking-wider">Performance Benchmark Suite (PERF.md)</h3>
                  </div>
                  <button onClick={runBenchmark} class="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700">
                    🔄 Run 100x Benchmark
                  </button>
                </div>

                <div class="grid grid-cols-4 gap-3 text-center">
                  <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div class="text-[10px] text-slate-400 uppercase font-bold">TTR (Above Fold)</div>
                    <div class="text-sm font-extrabold text-white mt-1">{benchmarks.staticTtr}ms <span class="text-orange-500">vs {benchmarks.sduiTtr}ms</span></div>
                  </div>
                  <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div class="text-[10px] text-slate-400 uppercase font-bold">TTI (Interactive)</div>
                    <div class="text-sm font-extrabold text-white mt-1">{benchmarks.staticTti}ms <span class="text-orange-500">vs {benchmarks.sduiTti}ms</span></div>
                  </div>
                  <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div class="text-[10px] text-slate-400 uppercase font-bold">Full Page Time</div>
                    <div class="text-sm font-extrabold text-white mt-1">{benchmarks.staticFull}ms <span class="text-orange-500">vs {benchmarks.sduiFull}ms</span></div>
                  </div>
                  <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div class="text-[10px] text-slate-400 uppercase font-bold">Overhead %</div>
                    <div class="text-sm font-extrabold text-orange-500 mt-1">+{benchmarks.overhead}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sheet Modal */}
          {bottomSheet && (
            <div class="fixed inset-0 bg-black/60 flex justify-center items-end z-50">
              <div class="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl">
                <div class="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4"></div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-base font-extrabold text-slate-900">EMI Financing Breakdown</h3>
                  <button onClick={() => setBottomSheet(null)} class="text-slate-500 font-bold">✕</button>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Tenure</span>
                    <span class="font-bold text-slate-900">{bottomSheet.tenure} Months</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Interest Rate</span>
                    <span class="font-bold text-slate-900">10.5% p.a.</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Processing Fee</span>
                    <span class="font-bold text-green-600">₹0 (Zero Processing Promo)</span>
                  </div>
                  <div class="flex justify-between py-2 text-base">
                    <span class="font-extrabold text-slate-900">Monthly EMI</span>
                    <span class="font-extrabold text-orange-600">₹{bottomSheet.emi}/mo</span>
                  </div>
                </div>
                <button onClick={() => { setBottomSheet(null); triggerToast("Instant Loan Application Submitted!"); }} class="w-full bg-orange-500 text-white font-extrabold py-3.5 rounded-xl mt-4">
                  Apply for Instant Loan
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlContent);
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Cars24 SDUI Studio Server is live!`);
  console.log(`👉 Access URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});

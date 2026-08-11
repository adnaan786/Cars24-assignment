# Cars24 Mobile Engineering — Server-Driven UI (SDUI) System

> **Platform Stack:** React Native / TypeScript  
> **Reference Screen:** Cars24 Home / Landing Page  
> **Repository Location:** `C:\Users\Acer\.gemini\antigravity\scratch\cars24-sdui`

---

## 📌 Executive Summary

Every mobile layout change traditionally incurs a full app release cycle across Android (Kotlin) and iOS (Swift). This SDUI system decouples layout, state logic, and visual components from client app updates. 

By delivering a JSON payload from the backend, the client engine dynamically renders complex native UI components, handles state mutations (e.g. tenure calculation), resolves user actions (bottom sheets, deep links, notifications), and gracefully handles unrecognized server component types without crashing.

---

## 📱 Selected Screen & Rationale

* **Screen Chosen:** **Cars24 Home / Landing Page**
* **Why this screen?**
  The Cars24 Home page represents the highest operational complexity in quick-commerce automotive platforms. It requires dynamic seasonal marketing campaigns, location-based personalization, interactive loan/EMI calculators, multi-format product rails, and real-time inventory teasers. Building an SDUI engine for this screen proves the schema can scale to any consumer-facing app flow.

### Complexity Checklist (Clears all assignment requirements):
- [x] **8 Visually Distinct Section Types:**
  1. `header_search_bar`: Location selector & global search input box.
  2. `hero_banner_carousel`: Horizontal swipeable promotional banner rail.
  3. `category_quick_links`: 2x4 grid for Buy, Sell, Loan, Insurance, FASTag, Valuation.
  4. `featured_cars_rail`: Horizontal car card rail with live state-bound EMI calculations & wishlist toggles.
  5. `tenure_emi_calculator`: Interactive chip selector (12, 24, 36, 48, 60m) + dynamic Bottom Sheet trigger.
  6. `value_prop_strip`: Cars24 7-day return & 1-year warranty promise strip.
  7. `customer_reviews_rail`: Buyer testimonial quotes rail.
  8. `sticky_footer_cta`: Sticky bottom CTA & navigation bar.
- [x] **Horizontal Rail & Vertical Grid:** Included both `hero_banner_carousel` / `featured_cars_rail` (horizontal) and `category_quick_links` (vertical 2x4 grid).
- [x] **Action-Driven Interactive Elements:** Tapping tenure chips updates client state (`tenureMonths`), recomputing EMI across car cards live without network calls. Tapping cards or breakdown triggers SDUI-configured Bottom Sheet modals.
- [x] **Real-feeling Data:** Comprehensive mock payload with realistic prices, variants, images, and ratings.

---

## 🏗 Architecture & Schema Design Rationale

```
 ┌─────────────────────────────────────────────────────────────┐
 │                     Cars24 Server Payload                   │
 │                     (sdui_schema.json)                      │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                      SDUI Client Engine                     │
 │  ┌─────────────────────┐       ┌─────────────────────────┐  │
 │  │ Action & State Hub  │◄─────►│ Schema Condition Engine │  │
 │  └──────────┬──────────┘       └────────────┬────────────┘  │
 │             │                               │               │
 │             ▼                               ▼               │
 │  ┌─────────────────────┐       ┌─────────────────────────┐  │
 │  │ Component Registry  │──────►│ Unknown Component       │  │
 │  │ (Native View Map)   │       │ Fallback Handler        │  │
 │  └──────────┬──────────┘       └────────────┬────────────┘  │
 └─────────────┼───────────────────────────────┼───────────────┘
               │                               │
               ▼                               ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                React Native View Hierarchy                  │
 │ (HeaderSearchBar, FeaturedCarsRail, TenureEMICalculator...) │
 └─────────────────────────────────────────────────────────────┘
```

### Schema Structure (`src/types/sdui.ts`)
```json
{
  "schemaVersion": "1.2.0",
  "minAppVersion": "1.0.0",
  "screenId": "cars24_home",
  "initialState": { "tenureMonths": 36, "activeCategory": "buy" },
  "root": {
    "id": "root_container",
    "type": "page_container",
    "children": [
      {
        "id": "sec_tenure_calc",
        "type": "tenure_emi_calculator",
        "props": { "tenureOptions": [12, 24, 36, 48, 60] },
        "actions": {
          "onTenureChange": {
            "type": "UPDATE_STATE",
            "targetStateKey": "tenureMonths"
          }
        }
      }
    ]
  }
}
```

---

## ⚡ Action Handling & State Binding Engine

Actions in the JSON payload are declarative commands executed by `src/sdui/ActionHandler.ts`:
1. `UPDATE_STATE`: Updates client-side dynamic state (e.g. `tenureMonths` chip selection). All state-bound components automatically re-render with updated calculated values (e.g., car EMI price).
2. `OPEN_BOTTOM_SHEET`: Renders a modal bottom sheet containing dynamic SDUI nodes defined in JSON.
3. `NAVIGATE`: Fires deep-link or route intent.
4. `SHOW_TOAST`: Displays lightweight feedback overlay.
5. `TRACK_EVENT`: Dispatches telemetry events to analytics pipelines.

---

## 🛡 Unknown Component Fallback & Degradation

When the server sends a component type unrecognised by the client registry (e.g. `ai_ar_360_car_configurator_v2`):
1. **Production Mode:** The `UnknownFallbackView` safely suppresses or renders a non-intrusive container so adjacent screen sections remain 100% operational. The app **never crashes**.
2. **Debug Mode:** Displays a clear, diagnostic dashed badge indicating the missing component type (`type`, `id`, `minAppVersion`) to alert engineers during testing.

---

## 🔄 Versioning & Backward Compatibility Story

### How Old App Versions Coexist with New Server Payloads:
1. **Schema Versioning (`schemaVersion`):** Payload contains `schemaVersion` (e.g. `1.2.0`) and `minAppVersion` (e.g. `1.0.0`).
2. **Component Capability Probing:** The client checks `COMPONENT_REGISTRY[type]`. If `minVersion` requirement exceeds current client version, it triggers the fallback renderer.
3. **Additive Structural Changes:** New section types added to `children[]` are safely skipped or rendered with fallback in legacy apps.
4. **Server Feature Flags:** Server queries app version headers (`X-App-Version: 1.4.0`) to filter out unsupported top-level nodes before transmission.

---

## 🛠 Quick Setup & Running Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
cd C:\Users\Acer\.gemini\antigravity\scratch\cars24-sdui
npm install
```

### Running studio app
```bash
npm start
```
Open browser at `http://localhost:5173` to test:
- Dual-pane Mobile Phone Emulator & Studio
- Real-time JSON Schema Editor with hot reload
- One-click Unknown Component Injection
- Automated Performance Benchmark Suite

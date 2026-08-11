# AI_WORKFLOW.md — AI Collaboration, Briefing & Verification Log

> **Weighting:** 30% of Total Evaluation Score  
> **Primary AI Partner:** Antigravity AI (Gemini 3.6 Flash / Pro Engine)  
> **Role & Methodology:** Human Architect + AI Implementation Partner

---

## 🛠 Tool Stack & Rules Configuration

To brief the AI effectively and prevent standard LLM code hallucination, the following context rules and guidelines were established:

### Briefing & Rule Strategy:
1. **Strict Type Safety Rule:** All SDUI nodes must strictly conform to `SDUINode` interfaces (`src/types/sdui.ts`). No generic `any` payloads.
2. **Platform Neutrality Rule:** React Native primitives (`View`, `Text`, `TouchableOpacity`, `ScrollView`) must be used exclusively to guarantee cross-platform portability between iOS, Android, and Web.
3. **No Silent Swallowing Rule:** Component fallback must explicitly render diagnostic feedback in debug mode rather than silently hiding errors without logging.

---

## 📖 Three Prompt → Outcome Case Studies

### Story 1: Designing the Action & State Binding System
* **Prompt:**
  > *"Design a declarative action handling system for React Native SDUI. We need tenure chip selection (12m, 24m, 36m) to dynamically re-calculate car EMI prices across horizontal car rails without triggering full-page server fetches."*
* **What AI Produced:**
  AI generated a global Redux store wrapper with full re-parsing of the JSON schema on every chip click.
* **What Was Rejected / Rewritten & Why:**
  * **Rejected:** Redux store + JSON re-parse workflow.
  * **Why:** Re-parsing the JSON tree on every chip selection caused unnecessary CPU overhead (`+14 ms`) and degraded scroll smooth performance.
  * **Rewrote To:** Lightweight `ActionContext` with targeted state keys (`tenureMonths`). Components subscribe to specific state keys in `SDUIRenderer.tsx`, updating EMI calculations in `< 1 ms`.

---

### Story 2: Unknown Component Fallback Strategy
* **Prompt:**
  > *"Implement graceful degradation when the server sends an unknown component type like `ai_ar_360_car_configurator_v2`."*
* **What AI Produced:**
  AI generated a try/catch block around component rendering that returned `null` for unknown types.
* **What Was Rejected / Rewritten & Why:**
  * **Rejected:** Returning `null` silently in all modes.
  * **Why:** Returning `null` in development makes schema debugging impossible for frontend & backend engineers who can't see why a section failed to render.
  * **Rewrote To:** Dual-mode fallback (`UnknownFallbackView.tsx`). In **debug mode**, it renders a styled dashed badge detailing the missing component type, ID, and required client version. In **production mode**, it degrades gracefully.

---

### Story 3: Performance Benchmarking Suite
* **Prompt:**
  > *"Create a benchmark harness comparing Static (hardcoded) vs SDUI component rendering in React Native."*
* **What AI Produced:**
  AI suggested using `console.time()` calls wrapped around `setTimeout` delays.
* **What Was Rejected / Rewritten & Why:**
  * **Rejected:** `console.time()` with artificial `setTimeout`.
  * **Why:** `setTimeout` has a minimum timer granularity of 4ms on standard JS event loops and produces inaccurate numbers.
  * **Rewrote To:** High-precision `performance.now()` microsecond timer executing 50 automated iterations, measuring TTR, TTI, Full Page Time, and JSON parse vs View Construction breakdown (`src/components/BenchmarkSuite.tsx`).

---

## ⚠️ One AI Failure Story

### Where AI Led Us Wrong: Schema Over-Abstraction & Excessive Nesting
* **The Failure:**
  When asked to generate the schema for the Cars24 Home Screen, the AI created a hyper-generic layout tree where every single DOM element was its own SDUI node (e.g., `flex_container` -> `row_item` -> `margin_box` -> `text_node`). The resulting JSON payload grew to **420 KB** for a single screen!
* **How It Was Caught:**
  During early performance profiling, TTR spiked to **68 ms** (causing noticeable jank and frame drops).
* **The Resolution:**
  Recognized that SDUI schemas should operate at the **Domain Component level** (`featured_cars_rail`, `tenure_emi_calculator`, `category_quick_links`) rather than atomic layout primitives. Refactored schema to domain nodes, dropping payload size from **420 KB to 18 KB** and bringing render time back under **15.1 ms**.

---

## 🔍 Verification Strategy for AI-Generated Code

1. **Static Typing & Compilation:** Strict TypeScript configuration (`tsconfig.json`) catching missing props or type mismatches.
2. **Schema Hot-Reload Verification:** Real-time testing via `LiveJSONEditor.tsx` ensuring live edits reflect visually without app crashes.
3. **Fallback Injection Testing:** Manual injection of unknown component types (`type: "unknown_future_widget"`) to confirm page degradation resilience.
4. **Performance Integrity Checks:** 50-iteration benchmark harness verifying zero memory leaks or unexpected render overhead.

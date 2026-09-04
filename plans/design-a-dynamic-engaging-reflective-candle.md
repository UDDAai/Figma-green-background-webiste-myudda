# Plan: AI Voice Coaching Landing Page + Dashboard

## Context
Build a full landing page and modular dashboard for an AI voice-first coaching web app. The tone is empowering, supportive, and playful. The page should encourage immediate action (like Lovable.dev / Google) and transition users into a dashboard where they manage their personal growth journey like a project.

---

## Aesthetic Stance: Editorial Candor + Human Signals Palette

**Commit:** Editorial Candor layout — generous asymmetric composition, large expressive serif display headings, clean neutral body — grounded in the Human Signals palette: warm cream + dark petrol/teal + soft violet + vivid green. Adult and psychologically serious, but kept playful by rounded shapes and vivid green CTAs.

**Fonts (Google Fonts via CSS @import in src/index.css):**
- Display: `Newsreader` (high-contrast editorial serif, weight 400/500, italic for selective emphasis)
- Body/UI: `DM Sans` (clean, slightly human, less startup-SaaS than Inter)
- Mono: `DM Mono` (uppercase section labels, transcript metadata, timestamps)

```css
--font-display: "Newsreader", serif;
--font-body: "DM Sans", sans-serif;
--font-mono: "DM Mono", monospace;
```

**Palette:**
```css
--background: #FAF7F2;
--foreground: #173F3F;        /* dark petrol/teal — main text */
--card: #FDFBF7;
--secondary: #F2EEE8;         /* warm secondary surface */
--primary: #1FDE9D;           /* vivid green — main action */
--primary-foreground: #113B38;
--brand: #8585FF;             /* soft violet */
--brand-strong: #625EF2;      /* darker violet for text/icons */
--brand-soft: #EEECFF;        /* pale violet surface */
--green-soft: #CFF6E7;
--teal: #096E69;
--muted: #EDE9E3;
--muted-foreground: #66716D;
--border: #DDD8D0;
--radius: 1rem;
```

---

## File Changes

### `src/index.css`
- Add Google Fonts `@import` at the top (Fraunces, Outfit, DM Mono)
- Add CSS custom properties for the palette above
- Set `font-family: 'Outfit', sans-serif` on `body`
- Add scrollbar-hiding utility

### `src/App.tsx`
Single-file implementation with React `useState` for tab/view switching. All sections below:

---

## Page Sections

### 1. Hero / Landing
- Full-viewport section, warm cream ground
- Large `Fraunces` italic headline: "Take Control and Grow: Personalized AI Voice Coaching for Your Journey."
- Subtitle in `Outfit` — 1–2 lines, empowering copy
- Prominent CTA button (violet, rounded) → "Start Your Journey" — clicking sets `view = 'dashboard'`
- Secondary link → "See how it works" (smooth scrolls to features)
- Decorative: abstract waveform SVG rings + floating mic icon (pure CSS/SVG, no external images)

### 2. How It Works (3 steps)
- Asymmetric 3-column grid with large step numbers in Fraunces
- Steps: Speak → Reflect → Grow
- Icons: inline SVG (mic, mirror, plant)

### 3. Dashboard (shown after CTA click, replaces hero area OR shown as full screen below nav)
Modular layout with sidebar + main content:

**Sidebar:**
- Avatar + name
- Nav items: Overview, Goals, Progress, Reflections, Coaches

**Main area tabs (via state):**

**Overview tab:**
- "Good morning, [Name]" greeting
- Today's voice prompt card with mic button (animated pulse ring on hover/active)
- Streak counter + next milestone
- 3 quick-stat tiles: Sessions, Goals Active, Reflection entries

**Goals tab:**
- List of goals with status badges (In Progress / Completed / Paused)
- "Add Goal" button → inline form (textarea + category select)
- Each goal has a progress bar and last-updated date

**Progress tab:**
- Weekly session chart using `recharts` BarChart
- Mood trend line chart (LineChart)
- Milestone timeline list

**Reflections tab:**
- Chronological list of past voice session summaries
- Each entry: date, duration, key themes (tags), short transcript excerpt

**Coaches tab (Personalized Recommendations):**
- 3–4 coach cards with: name, specialty, modality (CBT / IFS / Career), CTA "Connect"
- Contextual banner: "Based on your recent sessions about anxiety and goal-setting, we suggest…"

### 4. Features Section (on landing, above fold scroll)
- 4-feature grid: Voice-First, Track Progress, Reflect & Grow, Real Coaches
- Each: icon + title + 2-line description

### 5. Footer
- Minimal: logo wordmark, 3 nav links, copyright

---

## Navigation
- Sticky top nav: Logo left, "Dashboard" link right (sets view)
- Mobile: hamburger menu (simple state toggle)

---

## State Management
```tsx
const [view, setView] = useState<'landing' | 'dashboard'>('landing')
const [dashTab, setDashTab] = useState<'overview' | 'goals' | 'progress' | 'reflections' | 'coaches'>('overview')
const [micActive, setMicActive] = useState(false)
```

No routing library needed — single App.tsx with conditional rendering.

---

## Dependencies
- `recharts` — install before implementing Progress charts
  ```
  pnpm add recharts
  ```

---

## Verification
1. Check hot reload shows landing hero with correct fonts and palette
2. Click "Start Your Journey" → dashboard view renders
3. Tab through all dashboard sections, confirm charts render
4. Resize to ~768px — grid collapses to single column
5. Check contrast on primary button (violet on cream background)

# Design System: CodeStart Academy (V2 - Premium Redesign)

## 1. Visual Theme & Atmosphere
- **Density:** 4 (Balanced)
- **Variance:** 8 (Asymmetric layouts, rotating elements, playful typography)
- **Motion:** 8 (Spring physics, perpetual micro-loops on dashboard widgets)
- **Atmosphere:** A "Tech-forward, high-agency" aesthetic. It should feel like a custom-built engineering cockpit, not a standard educational platform. Use deep OLED blacks, electric blue accents, and subtle glass layers.

## 2. Color Palette & Roles
- **OLED Black** (#050505) — Primary background surface
- **Surface Deep** (#111118) — Card and container fill
- **Zinc-50** (#FAFAFA) — Primary text
- **Zinc-500** (#71717A) — Secondary text, metadata
- **Hairline Border** (rgba(255,255,255,0.08)) — Structural lines (1px)
- **Electric Blue** (#2563EB) — Primary accent (buttons, active states)
- **Action Amber** (#F59E0B) — Gamification/Achievements

## 3. Typography Rules
- **Display:** *Geist* — Tight tracking, weight-based hierarchy. No oversized, gaudy headlines.
- **Body:** *Geist* — Relaxed leading (1.6), 65ch max-width.
- **Mono:** *JetBrains Mono* — For data, code, and gamification metrics.
- **Banned:** Inter, standard sans-serifs, pure white text for body (use Zinc-200), neon glows.

## 4. Component Stylings
- **Buttons:** Nested "Double-Bezel" structure. Pilled shape (`rounded-full`). Pushing motion (`active:scale-[0.98]`).
- **Cards:** Double-Bezel nested shell. Outer border 1px (Hairline), inner border none, background #111118.
- **Motion:** Framer Motion spring physics (`stiffness: 100, damping: 20`). No linear easing.

## 5. Layout Principles
- **Asymmetry:** Grid layouts (`grid-cols-6`) with varying `col-span` (2, 3, 4) to create visual interest.
- **Containment:** 1400px max-width containment. Massive vertical spacing (`py-32`).
- **Mobile-First:** Single-column collapse at 768px.

## 6. Anti-Patterns (BANNED)
- No standard shadow-md/lg/xl classes. Use custom border-light/inner-shadow approach.
- No `bg-zinc-900` without a hairline border to define it.
- No standard list layouts for features—Bento-grids or Masonry-style only.
- No AI filler data (use placeholders like "[Metric]" or real-looking Egyptian student examples).

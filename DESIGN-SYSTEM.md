# Atlantic Bridge Design System

> Reference document for maintaining design consistency across all pages.

---

## 1. Color Palette

### Brand Colors
| Name | Hex | CSS Variable | Tailwind Class |
|------|-----|--------------|----------------|
| Navy | `#1a365d` | `--navy` | `bg-navy`, `text-navy` |
| Navy Dark | `#0f2341` | `--navy-dark` | `bg-navy-dark` |
| Gold | `#d69e2e` | `--gold` | `bg-gold`, `text-gold` |
| Gold Light | `#ecc94b` | `--gold-light` | `bg-gold-light` |
| Gold Dark | `#b7791f` | `--gold-dark` | `bg-gold-dark` |

### Text Colors
| Context | Class |
|---------|-------|
| Primary on white | `text-navy` |
| Secondary on white | `text-gray-600` |
| Primary on navy | `text-white` |
| Secondary on navy | `text-white/70` or `text-white/60` |
| Accent | `text-gold` |

### Background Opacity Patterns
```
bg-navy/90    → Strong overlay (CTA sections)
bg-navy/80    → Image overlays
bg-navy/20    → Subtle darkening
bg-white/10   → Glassmorphic cards
bg-gold/10    → Subtle gold accent
bg-gold/5     → Decorative blurs
```

---

## 2. Typography

### Font Family
**Plus Jakarta Sans** - Weights: 400, 500, 600, 700, 800

### Heading Scales
| Type | Mobile | Desktop |
|------|--------|---------|
| Hero H1 | `text-2xl` | `sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl` |
| Section H2 | `text-3xl` | `sm:text-4xl lg:text-5xl` |
| Card H3 | `text-xl` | `lg:text-2xl` |
| Subheading | `text-lg` | `lg:text-xl` |

### Section Labels
```tsx
<span className="text-gold font-bold tracking-wider uppercase text-base">
  Section Label
</span>
```

### Body Text
```tsx
// On light backgrounds
<p className="text-gray-600 lg:text-lg leading-relaxed">

// On dark backgrounds
<p className="text-white/70 text-lg lg:text-xl">
```

### Font Weights
- **Headings**: `font-bold` (700)
- **Buttons/Nav**: `font-bold` or `font-semibold`
- **Body**: Default (400)

---

## 3. Spacing System

### Horizontal Padding Pattern
```tsx
className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
```

### Section Vertical Padding
```
py-16 lg:py-24      → Standard sections
py-20 lg:py-28      → Featured sections
pt-16 pb-8          → Asymmetric (mobile)
```

### Grid Gaps
```
gap-4               → Small components
gap-6 lg:gap-8      → Cards, lists
gap-12 xl:gap-20    → Two-column layouts
gap-16 xl:gap-24    → Large section grids
```

---

## 4. Layout Patterns

### Two-Column Grid
```tsx
<div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 lg:items-center">
```

### Four-Column Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
```

### The `isMaximized` Hook
```tsx
import { useIsMaximized } from "@/hooks/useIsMaximized";

const isMaximized = useIsMaximized();

// Apply to padding
className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}
```

---

## 5. Component Patterns

### Primary Button (Gold)
```tsx
<button className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 transition-all group">
  Button Text
  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" ...>
</button>
```

### Outline Button (White)
```tsx
<button className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full border-2 border-white text-white hover:bg-white hover:text-navy transition-all">
```

### Outline Button (Navy)
```tsx
<button className="inline-flex items-center px-6 py-3 text-base font-bold rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all">
```

### Glassmorphic Card
```tsx
<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
```

### Trust Pillar Card
```tsx
<div className="p-6 border-l-4 border-gold bg-gray-50 hover:bg-gray-100 transition-colors">
```

### Image Container
```tsx
<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
  <Image src="..." alt="..." fill className="object-cover" />
</div>
```

### Floating Image
```tsx
<div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 w-28 sm:w-40 lg:w-52 aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl">
```

---

## 6. Interactive States

### Hover Effects
```
hover:text-gold                    → Text color change
hover:bg-gold-light                → Button background
hover:-translate-y-0.5             → Lift effect
hover:shadow-lg                    → Shadow enhancement
group-hover:translate-x-1          → Icon animation
```

### Transitions
```
transition-colors                  → Color only
transition-transform               → Position/scale
transition-all duration-200        → Quick interactions
transition-all duration-300        → Standard
transition-all duration-700        → Carousel/cinematic
```

### Active States
```
active:translate-y-0               → Return from lift
active:shadow-md                   → Reduced shadow
active:scale-95                    → Press effect
```

---

## 7. Section Templates

### Navy Section with Background Image
```tsx
<section className="py-20 lg:py-28 bg-navy relative">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-10"
    style={{ backgroundImage: "url('/image.jpg')" }}
  />
  <div className="absolute inset-0 bg-navy/80" />
  <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
    {/* Content */}
  </div>
</section>
```

### White Section
```tsx
<section className="py-16 lg:py-24 bg-white">
  <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
    {/* Content */}
  </div>
</section>
```

### Light Gray Section
```tsx
<section className="py-20 lg:py-28 bg-gray-50">
```

### Section Header (Centered)
```tsx
<div className="text-center max-w-3xl mx-auto">
  <span className="text-gold font-bold tracking-wider uppercase text-base">
    Label
  </span>
  <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
    Section Heading
  </h2>
  <p className="mt-4 text-gray-600 lg:text-lg">
    Description text
  </p>
</div>
```

### Section Header (Left-aligned)
```tsx
<div>
  <span className="text-gold font-bold tracking-wider uppercase text-base">
    Label
  </span>
  <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
    Section Heading
  </h2>
</div>
```

---

## 8. Form Elements

### Input Field
```tsx
<input
  type="email"
  placeholder="Your email"
  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
/>
```

### Input with Button
```tsx
<div className="relative">
  <input className="w-full px-4 py-3 pr-12 ..." />
  <button className="absolute right-1 top-1 bottom-1 px-3 bg-gold hover:bg-gold-light rounded-md transition-colors">
    <svg ...>
  </button>
</div>
```

---

## 9. Responsive Breakpoints

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile first |
| `sm:` | 640px | Large phones, small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small desktops, large tablets |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

### Common Responsive Patterns
```tsx
// Font scaling
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"

// Padding scaling
className="px-6 sm:px-8 lg:px-6 xl:px-[7.5%]"

// Show/hide
className="hidden lg:block"
className="lg:hidden"

// Grid columns
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
```

---

## 10. Special Effects

### Cursor Follower
Gold ring that follows cursor across entire site, expands on interactive elements.

### Glassmorphism
```tsx
className="bg-white/10 backdrop-blur-md border border-white/20"
```

### Decorative Gold Accents
```tsx
// Corner triangle
<div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-gold border-l-[40px] border-l-transparent" />

// Rotated diamond
<div className="absolute -top-3 left-8 w-6 h-6 bg-gold transform rotate-45" />

// Vertical line
<div className="w-1 h-32 bg-gold rounded-full" />

// Blurred circle
<div className="w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
```

### Image Overlays
```tsx
// Gradient overlay (mobile)
<div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

// Gradient overlay (desktop)
<div className="lg:bg-gradient-to-l lg:from-navy/60 lg:via-transparent lg:to-transparent" />
```

---

## 11. Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}
```

### Selection
```css
::selection {
  background-color: var(--gold);
  color: white;
}
```

### ARIA Labels
- All interactive elements need `aria-label` or visible text
- Menu toggles need `aria-expanded`
- Images need meaningful `alt` text

---

## 12. File Structure

```
components/
├── Navigation.tsx      → Fixed header with mobile menu
├── HeroCarousel.tsx    → Hero with image slides
├── AboutIntro.tsx      → Two-column intro section
├── ServicesShowcase.tsx → Interactive service list
├── WhyChooseUs.tsx     → Trust pillars grid
├── HowItWorks.tsx      → Step-by-step timeline
├── FAQPreview.tsx      → Accordion FAQ
├── FinalCTA.tsx        → Call-to-action section
├── Footer.tsx          → Site footer
└── CursorFollower.tsx  → Custom cursor effect

hooks/
└── useIsMaximized.ts   → Window maximized detection
```

---

## Quick Reference

### Standard Section Setup
```tsx
"use client";

import { useIsMaximized } from "@/hooks/useIsMaximized";

export default function SectionName() {
  const isMaximized = useIsMaximized();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
        {/* Content */}
      </div>
    </section>
  );
}
```

### Color Quick Reference
- Navy background + white/gold text
- White background + navy/gray text
- Gold for accents, CTAs, highlights
- Opacity for layering (10-90%)

---
name: Kinetic Heritage
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bfcaba'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8a9485'
  outline-variant: '#40493d'
  surface-tint: '#88d982'
  primary: '#88d982'
  on-primary: '#003909'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#1b6d24'
  secondary: '#90d792'
  on-secondary: '#003911'
  secondary-container: '#0b551f'
  on-secondary-container: '#82c985'
  tertiary: '#ffba38'
  on-tertiary: '#432c00'
  tertiary-container: '#926500'
  on-tertiary-container: '#ffefda'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#abf4ac'
  secondary-fixed-dim: '#90d792'
  on-secondary-fixed: '#002107'
  on-secondary-fixed-variant: '#07521d'
  tertiary-fixed: '#ffdeac'
  tertiary-fixed-dim: '#ffba38'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-tablet: 24px
---

## Brand & Style

The design system is engineered for a high-traffic African hypermarket experience, blending ultra-modern efficiency with a welcoming, community-focused spirit. It prioritizes speed of navigation and high legibility under varying lighting conditions, common in mobile-first markets.

The visual style is **Corporate Modern** with a lean toward **Tonal Minimalism**. It utilizes deep charcoal surfaces to reduce eye strain, punctuated by a high-energy "Growth Green" that signifies freshness and reliability. The aesthetic is "Premium Utility"—it feels expensive and curated but remains deeply functional and accessible for a diverse demographic.

## Colors

The palette is rooted in a "Dark Mode First" philosophy to ensure high contrast and battery efficiency on OLED mobile screens.

- **Primary (#2E7D32):** Used for "Success" states, primary call-to-action buttons, and brand markers.
- **Secondary (#81C784):** A lighter tint used for icons, selection states, and subtle accents to maintain visibility against dark backgrounds.
- **Tertiary (#FFB300):** An amber accent reserved exclusively for promotions, discounts, and "Add to Cart" urgency.
- **Neutral/Background (#121212):** The base canvas.
- **Surface (#1E1E1E):** Used for cards and elevated containers to create a clear visual hierarchy.

## Typography

This design system utilizes **Inter** for its exceptional readability on small screens and its neutral, professional tone. 

The hierarchy is built on a tight scale to maximize content density without sacrificing clarity. All headlines use a bold weight with slightly negative letter spacing to create a high-end editorial feel. Body text uses a generous line height to ensure descriptions and product details are easily scannable. Labels use a medium weight with increased tracking for clear categorization.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for touch-heavy interactions.

- **Mobile:** A 4-column grid with 16px side margins and 16px gutters.
- **Tablet:** An 8-column grid with 24px side margins.
- **Rhythm:** An 8pt linear scaling system is used for all padding and margins to ensure mathematical harmony across components.

Components should touch the edges of the 16px safe zone. Content clusters (like product thumbnails) should use the 8px "sm" spacing, while major section breaks use 32px "xl" spacing to allow the layout to breathe.

## Elevation & Depth

In this dark-themed system, depth is communicated through **Tonal Layering** and **Subtle Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Base):** #121212.
- **Level 1 (Cards/Lists):** #1E1E1E with a 1px border of #2C2C2C to define edges against the background.
- **Level 2 (Modals/Pop-ups):** #252525 with a soft 12% opacity black shadow (0px 8px 16px) and a subtle primary-tinted glow at the top edge.

This approach ensures that surfaces remain distinct even when the user's screen brightness is low.

## Shapes

The shape language is **Rounded**, conveying a sense of modern friendliness and safety.

- **Primary Elements:** Buttons and Input fields use a 16px (1rem) corner radius.
- **Containers:** Product cards and promotional banners use a 16px (1rem) radius.
- **Small Elements:** Tooltips and tags use an 8px (0.5rem) radius.

This consistent 16px radius creates a cohesive, "app-like" feel that distinguishes the hypermarket experience from a standard web-view.

## Components

- **Buttons:** Primary buttons are solid Growth Green (#2E7D32) with white bold text. Secondary buttons use a #2C2C2C surface with a white border.
- **Product Cards:** Feature a #1E1E1E background, 16px rounded corners, and a top-aligned image. Price labels are highlighted in White, with discounts in Tertiary Amber.
- **Chips:** Used for categories (e.g., "Fresh Produce," "Electronics"). Unselected chips use a #2C2C2C fill; selected chips use a Primary Green ghost style (border only).
- **Input Fields:** Darker than the surface (#121212), with a 1px #2C2C2C border that turns Primary Green upon focus.
- **Bottom Navigation:** A persistent frosted-glass bar (#121212 at 90% opacity) with active icons in Primary Green.
- **Quantity Selector:** A specialized component for the cart, featuring large touch targets (+/-) to accommodate fast-paced shopping.
# Nomu-Inspired UI Reconstruction Specification

## Purpose

Recreate the visual language, layout system, spacing, responsive
behavior, components, animation system, and interaction patterns of
https://nomu.store/ for a new brand/site.

**Important:** This is a design/implementation specification, not a
request to copy Nomu's brand assets, logo, proprietary imagery, or text.
Use original brand content/assets while reproducing the same overall UI
system and interaction quality.

Reference pages reviewed: - `https://nomu.store/` -
`https://nomu.store/brand`

------------------------------------------------------------------------

# 1. Overall Design Direction

The site should feel:

-   premium
-   editorial
-   playful but technically polished
-   extremely spacious
-   product-led
-   modern startup / design studio
-   highly visual
-   confident and minimal
-   motion-rich without feeling like a template

The most important principle:

> Large visual moments + short copy + huge whitespace + oversized
> rounded containers + strong contrast + subtle motion.

Do NOT make it look like a conventional SaaS dashboard.

Avoid: - dense grids - excessive borders - tiny cards everywhere -
generic gradients - excessive shadows - excessive text - standard
Bootstrap-style UI - overly sharp corners - generic hero layouts

------------------------------------------------------------------------

# 2. Page Architecture

Build the homepage as a long, scroll-driven visual story.

Recommended structure:

1.  Floating / minimal navigation
2.  Hero
3.  Process / workflow strip
4.  Prompt-to-product interaction/demo
5.  Trust / supported-by logo rail
6.  Large feature showcase
7.  Commerce/product capability grid
8.  Dark conversion section
9.  Metrics / proof
10. Comparison section
11. FAQ
12. Final CTA
13. Footer

The exact business copy should be replaced with the new site's content,
but preserve the visual rhythm.

------------------------------------------------------------------------

# 3. Global Canvas

## Desktop

-   Main page background: warm cream/off-white
-   Content should breathe heavily
-   Large horizontal sections
-   Full-width visual panels mixed with constrained text
-   Avoid a permanently visible boxed container around the entire page

Recommended max content width:

``` text
1280px - 1440px
```

Recommended desktop horizontal padding:

``` text
24px - 48px
```

Use fluid spacing rather than hardcoding every section.

## Mobile

At \<= 767px: - stack content vertically - reduce headline size - reduce
section padding - use smaller corner radii - keep cards visually large -
avoid tiny side-by-side cards - preserve the visual hierarchy

------------------------------------------------------------------------

# 4. Breakpoint System

Use one major breakpoint.

``` css
@media (max-width: 767px) {
  /* compact */
}

@media (min-width: 768px) {
  /* desktop */
}
```

Do not create many arbitrary breakpoints unless a specific component
requires one.

The reference brand system treats 767px and below as compact and 768px+
as desktop.

------------------------------------------------------------------------

# 5. Color System

Nomu's reference brand palette uses a cream + dark navy + orange system.

For an implementation inspired by it, define tokens rather than
scattering hex values throughout components.

Reference palette:

``` css
--foreground: #0F151D;
--background: #FFF9F6;

--primary: #FF7448;
--highlight-1: #FF8D69;
--highlight-2: #FFA88D;
--highlight-3: #FFC8B7;

--secondary: #D3E1FF;
--dark-surface: #1B232E;
```

If building a different brand, preserve the roles but replace the actual
brand colors.

Color roles:

-   cream = default page canvas
-   navy = primary text / dark sections
-   orange = CTA / active / attention
-   lighter orange = hover and decorative accents
-   pale blue = secondary component surfaces
-   dark navy = large contrast sections

Rule:

> Cream first. Dark sections only where the eye needs an anchor. Accent
> color should feel special, not everywhere.

------------------------------------------------------------------------

# 6. Typography

Use a clean geometric/sans-serif family.

The reference uses Inter as its main typeface and a custom display face
for occasional brand moments.

Recommended:

``` css
font-family: Inter, system-ui, sans-serif;
```

Use: - 400 body - 500 supporting/UI - 600 strong labels/headings

Do not use extremely thin text.

## Hero typography

The hero heading should be huge.

Desktop target:

``` text
clamp(56px, 8vw, 128px)
```

Line height:

``` text
0.9 - 1.0
```

Letter spacing:

``` text
-0.04em to -0.07em
```

Hero copy should be short.

Example structure:

``` text
[small eyebrow]

A huge,
confident statement
that explains the product.
```

Mobile:

``` text
clamp(44px, 13vw, 72px)
```

Do not let mobile typography become a tiny desktop version.

------------------------------------------------------------------------

# 7. Typography Hierarchy

Create reusable semantic classes:

``` text
landing-title-hero
landing-title-xl
landing-title-lg
landing-lead
landing-body
landing-caption
landing-eyebrow
```

Suggested sizes:

``` css
hero:
  font-size: clamp(56px, 8vw, 128px);

section-title:
  font-size: clamp(42px, 6vw, 88px);

card-title:
  font-size: clamp(28px, 3vw, 48px);

lead:
  font-size: clamp(20px, 2vw, 30px);

body:
  font-size: 16px - 18px;

caption:
  font-size: 12px - 14px;

eyebrow:
  font-size: 11px - 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
```

Headlines should dominate the page.

------------------------------------------------------------------------

# 8. Border Radius System

This is one of the strongest visual signatures.

Desktop:

``` css
--radius: 50px;
--radius-inset: 48px;
--radius-hero: 58px;
```

Mobile:

``` css
--radius-mobile: 24px;
--radius-mobile-inset: 22px;
--radius-mobile-hero: 32px;
```

Use large rounded rectangles everywhere.

Do not randomly mix: - 4px - 8px - 12px - 16px - 24px - 32px - 48px

The page should feel like one coherent radius system.

------------------------------------------------------------------------

# 9. Navigation

Navigation should be minimal.

Desktop:

``` text
[Logo]                         [Nav links] [Primary CTA]
```

Characteristics: - lots of breathing room - no heavy border - no giant
navigation bar - compact CTA - subtle hover animations -
transparent/cream background when possible

Mobile: - logo left - compact menu/control right - avoid a tall
conventional navbar

If navigation becomes sticky: - use subtle background transition - do
not add a giant shadow - preserve rounded/soft visual language

------------------------------------------------------------------------

# 10. Hero

The hero is the most important component.

Structure:

``` text
small eyebrow
        ↓
massive headline
        ↓
short supporting paragraph
        ↓
primary CTA
        ↓
large visual/product interaction
```

The visual should occupy substantial viewport area.

Recommended hero height:

``` text
min-height: 80vh
```

Potentially use:

``` text
min-height: 90svh
```

Do not vertically center everything mechanically. Allow the composition
to feel editorial.

The hero should immediately communicate: 1. what the product does 2. why
it is interesting 3. where to interact

------------------------------------------------------------------------

# 11. Hero Visual / Product Demo

The reference uses a prompt-to-product concept.

For the new site, create an interactive visual that feels like a product
rather than a static image.

Example:

``` text
┌───────────────────────────────────────────┐
│ Ask / describe what you want              │
│                                           │
│ "Create a custom 3D printed..."           │
│                                           │
│                           [Generate →]     │
├───────────────────────────────────────────┤
│                                           │
│            PRODUCT / 3D VISUAL            │
│                                           │
└───────────────────────────────────────────┘
```

Use: - oversized rounded container - cream or dark surface - floating
labels - subtle entrance animation - hover interaction - visual depth

For Fusion3DLabs specifically, this could become an AI-to-3D-product
concept.

------------------------------------------------------------------------

# 12. Process Section

Use a simple five-step horizontal progression.

Reference structure:

``` text
01 Design
02 Source
03 Sample
04 Produce
05 Deliver
```

Implementation:

``` text
01       02       03       04       05
Design   Source   Sample   Produce  Deliver
```

Desktop: - horizontal - generous spacing - small numeric labels - strong
active state

Mobile: - horizontal scroll or vertical stack - do not compress five
steps into unreadable text

Animate the active step as the user scrolls.

------------------------------------------------------------------------

# 13. Trust / Logo Rail

Use a horizontal logo strip.

Characteristics: - understated - monochrome where appropriate - large
whitespace - continuous/looping motion can be used - no aggressive
carousel controls

Structure:

``` text
Supported by

[logo] [logo] [logo] [logo] [logo] [logo]
```

If actual customer logos are unavailable, use placeholders until real
assets are supplied.

Do not fabricate customer relationships.

------------------------------------------------------------------------

# 14. Feature Showcase

Use large editorial sections rather than standard 3-column cards.

Pattern:

``` text
------------------------------------------------
|                                              |
|  LARGE VISUAL                                |
|                                              |
|                                eyebrow       |
|                                huge heading  |
|                                description   |
|                                CTA           |
------------------------------------------------
```

Alternate visual/text alignment between sections.

Examples:

Section A: - visual left - copy right

Section B: - copy left - visual right

Section C: - full-width visual - text overlay or below

This creates rhythm while scrolling.

------------------------------------------------------------------------

# 15. Large Cards

Cards should feel like mini environments.

Use:

``` css
border-radius: 50px;
overflow: hidden;
```

Avoid: - thin gray borders everywhere - heavy shadows - tiny padding

Prefer: - background color - internal spacing - visual object - short
text - subtle motion

Recommended desktop card padding:

``` text
32px - 56px
```

Large feature cards can use:

``` text
56px - 80px
```

------------------------------------------------------------------------

# 16. Feature Grid

For secondary capabilities, use a grid.

Desktop:

``` text
┌──────────────┬──────────────┐
│ Feature      │ Feature      │
│              │              │
├──────────────┼──────────────┤
│ Feature      │ Feature      │
│              │              │
└──────────────┴──────────────┘
```

Use varying card sizes occasionally so the grid feels designed rather
than generic.

Every card should have: - small label - large title - short
explanation - visual/icon/object

------------------------------------------------------------------------

# 17. Dark Section

Use a major dark section as a visual reset.

Example:

``` text
████████████████████████████████████████████

       HUGE WHITE HEADLINE

       Short explanation

       [Primary CTA]

       LARGE PRODUCT VISUAL

████████████████████████████████████████████
```

Dark background:

``` css
#0F151D
```

Text:

``` css
#FFF9F6
```

Cards inside dark sections can use:

``` css
#1B232E
```

Do not use dark backgrounds for the whole website.

------------------------------------------------------------------------

# 18. Metrics / Social Proof

Use oversized numbers.

Example:

``` text
0+
Products
sold

$0+
GMV

0+
Customers
```

Large number:

``` text
48px - 96px+
```

Small label beneath.

The numbers should visually dominate the labels.

------------------------------------------------------------------------

# 19. Comparison Section

Create an interactive comparison component.

Reference pattern:

``` text
[On your own] [Agent] [In-house] [Our workflow]
```

Then show a comparison table.

Desktop: - large table - generous row height - sticky category controls
if useful

Mobile: - convert to stacked comparison cards - horizontal scroll is
acceptable for true tables

Important: The table should look like a premium editorial comparison,
not an admin spreadsheet.

------------------------------------------------------------------------

# 20. FAQ

FAQ should be extremely clean.

Structure:

``` text
You got questions?
We got answers.

────────────────────────────
What's the minimum order?           +
────────────────────────────
How fast is it?                     +
────────────────────────────
What does it cost?                  +
────────────────────────────
```

Interaction: - smooth accordion - answer fades/slides in - plus icon
rotates into minus - preserve large row spacing

No boxed accordion cards unless necessary.

------------------------------------------------------------------------

# 21. Final CTA

Near the bottom, switch back to a huge visual statement.

Example:

``` text
You're the
creative director.

We're
everything else.

                    [Start creating →]
```

The final CTA should feel like a conclusion, not another generic
section.

Use huge typography and generous vertical spacing.

------------------------------------------------------------------------

# 22. Footer

Footer should be simple but information-rich.

Suggested structure:

``` text
[Large logo / statement]

Explore
Resources
Company
Social

Email input
[Start creating]

© 2026 ...
```

Use columns on desktop.

Stack on mobile.

Do not make the footer visually dense.

------------------------------------------------------------------------

# 23. Buttons

Buttons should feel substantial but simple.

Variants:

``` text
Primary
Secondary
Outline
Ghost
```

Primary: - accent background - dark text - rounded/pill shape -
medium/large padding

Example:

``` css
padding: 14px 22px;
border-radius: 999px;
```

Large CTA:

``` css
padding: 18px 28px;
```

Button hover: - slight translation - color transition - arrow movement -
never exaggerated

Arrow CTA pattern:

``` text
Create your product →
```

On hover:

``` text
Create your product  →→
```

Keep motion subtle.

------------------------------------------------------------------------

# 24. Pills

Use pills for: - status - categories - filters - active states - small
labels

Pills should not replace normal buttons.

------------------------------------------------------------------------

# 25. Motion System

Motion is a major part of the experience.

Reference easing curves:

``` css
--ease-out: cubic-bezier(0.16, 1, 0.30, 1);
--ease-in-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-exit: cubic-bezier(0.70, 0, 0.84, 0);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-pow2: cubic-bezier(0.46, 0.03, 0.52, 0.95);
--ease-hand: cubic-bezier(0.43, 0.13, 0.23, 0.96);
```

Default entrance:

``` css
transition:
  transform 700ms cubic-bezier(0.16, 1, 0.30, 1),
  opacity 500ms cubic-bezier(0.16, 1, 0.30, 1);
```

------------------------------------------------------------------------

# 26. Scroll Reveal

Use IntersectionObserver or Framer Motion.

Default:

``` text
opacity: 0
transform: translateY(30px)
```

to:

``` text
opacity: 1
transform: translateY(0)
```

Duration:

``` text
600ms - 900ms
```

Stagger children:

``` text
60ms - 120ms
```

Do not animate every element individually.

Animate groups.

------------------------------------------------------------------------

# 27. Image / Product Reveal

For large visual cards:

Initial:

``` text
opacity: 0
scale: 0.96
translateY(30px)
```

Final:

``` text
opacity: 1
scale: 1
translateY(0)
```

Use the same easing system.

Images should feel like they settle into place.

------------------------------------------------------------------------

# 28. Hover Behavior

Cards:

``` text
scale: 1.01 - 1.025
```

or move an internal visual slightly.

Do not scale entire cards dramatically.

Images can use:

``` text
scale: 1.03 - 1.06
```

Buttons: - arrow movement - background transition - tiny translate

Avoid: - glowing effects - huge shadows - excessive bounce

------------------------------------------------------------------------

# 29. Reduced Motion

Respect:

``` css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Accessibility is mandatory.

------------------------------------------------------------------------

# 30. Recommended React Architecture

Use reusable components.

``` text
components/
  landing/
    Navbar.tsx
    Hero.tsx
    ProcessSteps.tsx
    PromptDemo.tsx
    LogoRail.tsx
    FeatureShowcase.tsx
    FeatureGrid.tsx
    DarkCTA.tsx
    Metrics.tsx
    Comparison.tsx
    FAQ.tsx
    FinalCTA.tsx
    Footer.tsx

  ui/
    Button.tsx
    Pill.tsx
    Section.tsx
    Reveal.tsx
    Marquee.tsx
    Accordion.tsx
```

Keep content separate from layout where possible.

Example:

``` text
data/
  landing.ts
```

------------------------------------------------------------------------

# 31. Recommended Technology

If using Next.js:

``` text
Next.js
TypeScript
Tailwind CSS
Framer Motion
Lucide React
```

Optional:

``` text
GSAP
Lenis
Three.js / React Three Fiber
```

Use Three.js only when it creates a real product/brand visual benefit.

Do not add libraries simply because the reference has animation.

------------------------------------------------------------------------

# 32. Tailwind Design Tokens

Create tokens for:

``` text
colors
radius
spacing
font sizes
easing
```

Example:

``` ts
theme: {
  extend: {
    colors: {
      foreground: "#0F151D",
      background: "#FFF9F6",
      primary: "#FF7448",
      highlight1: "#FF8D69",
      highlight2: "#FFA88D",
      highlight3: "#FFC8B7",
      secondary: "#D3E1FF",
      darkSurface: "#1B232E",
    },
    borderRadius: {
      landing: "50px",
      "landing-mobile": "24px",
    },
  }
}
```

------------------------------------------------------------------------

# 33. Spacing Rhythm

The site should feel intentionally oversized.

Suggested section spacing:

Desktop:

``` text
120px
160px
200px
```

Large hero/CTA sections:

``` text
180px - 260px
```

Mobile:

``` text
72px
96px
120px
```

Do not make every section exactly the same height.

------------------------------------------------------------------------

# 34. Visual Composition Rules

Every major section should have ONE primary visual idea.

Bad:

``` text
headline
paragraph
4 buttons
7 icons
3 cards
2 badges
image
```

Good:

``` text
huge headline
short explanation
one CTA
one dominant visual
```

Then let secondary information appear lower in the section.

------------------------------------------------------------------------

# 35. Image Treatment

Images should feel integrated into the UI.

Use: - large crop - rounded corners - object-fit cover - subtle zoom on
hover - masked/contained compositions

Avoid: - random stock photos - small image thumbnails - square product
grids everywhere

For a 3D printing company, prioritize: - 3D renders - close-up product
photography - printer/process footage - CAD wireframes - material
textures - exploded views - product-in-environment scenes

------------------------------------------------------------------------

# 36. 3D Product Visuals

For Fusion3DLabs or a similar manufacturing site, the strongest
equivalent to Nomu's product visuals is a large interactive 3D object.

Potential implementation:

``` text
React Three Fiber
      ↓
GLB/GLTF product model
      ↓
slow automatic rotation
      ↓
mouse/parallax response
      ↓
scroll-based camera movement
```

Keep the interaction restrained.

The model should support the page rather than become a tech demo.

------------------------------------------------------------------------

# 37. Loading / Entrance Experience

Avoid a long splash screen.

Instead: - render page quickly - animate the hero in - progressively
reveal visual sections - lazy-load large images/models

The page should feel fast even when heavily animated.

------------------------------------------------------------------------

# 38. Performance Requirements

Target:

``` text
LCP < 2.5s
CLS < 0.1
INP < 200ms
```

Optimize: - WebP/AVIF images - responsive image sizes - lazy-loaded
below-fold media - compressed GLB files - dynamic import for heavy 3D
components - avoid huge video files above the fold

------------------------------------------------------------------------

# 39. Mobile Requirements

At 767px and below:

-   navigation becomes compact
-   hero typography decreases but remains dramatic
-   cards use \~24px radius
-   desktop 2-column layouts become one column
-   comparison table becomes scrollable or stacked
-   process steps become vertical/horizontal-scroll
-   large images remain edge-to-edge inside rounded containers
-   CTA buttons should remain thumb-friendly

Minimum interactive target:

``` text
44px
```

------------------------------------------------------------------------

# 40. Implementation Order

Build in this order:

### Phase 1 --- Foundation

1.  global fonts
2.  colors
3.  radius tokens
4.  spacing
5.  button system
6.  typography classes
7.  responsive container

### Phase 2 --- Above Fold

8.  navbar
9.  hero
10. hero visual
11. process strip

### Phase 3 --- Main Story

12. logo rail
13. feature showcase
14. feature cards
15. dark section
16. metrics

### Phase 4 --- Conversion

17. comparison
18. FAQ
19. final CTA
20. footer

### Phase 5 --- Motion

21. scroll reveal
22. stagger
23. hover states
24. marquee
25. interactive visual
26. reduced-motion handling

### Phase 6 --- Polish

27. responsive QA
28. performance
29. accessibility
30. typography alignment
31. spacing alignment
32. visual regression

------------------------------------------------------------------------

# 41. Coding-Agent Instructions

When implementing this specification:

1.  Do not produce a generic landing page.
2.  Treat the reference as an art-directed website.
3.  Match the visual hierarchy before adding functionality.
4.  Use very large typography.
5.  Use generous whitespace.
6.  Use large rounded containers.
7.  Use cream as the primary canvas.
8.  Use dark sections strategically.
9.  Keep copy short.
10. Make every major section visually distinct.
11. Use consistent easing.
12. Animate section groups rather than every element.
13. Make mobile a first-class layout.
14. Do not use random gradients or excessive shadows.
15. Do not create arbitrary border-radius values.
16. Do not use generic dashboard/card aesthetics.
17. Use real assets where available.
18. Never fabricate customer logos, testimonials, statistics, or
    partnerships.
19. Preserve accessibility and reduced-motion support.
20. Test the implementation at 375px, 768px, 1024px, 1440px and 1920px
    widths.

------------------------------------------------------------------------

# 42. Definition of Done

The implementation is not finished until:

-   Hero visually dominates the first viewport.
-   Typography feels oversized and premium.
-   Section spacing feels generous.
-   Cards have the characteristic large radius.
-   Cream/dark contrast creates visual rhythm.
-   CTA hierarchy is obvious.
-   Scroll reveals feel smooth.
-   Hover interactions feel subtle.
-   Mobile does not look like a shrunken desktop.
-   No section feels like a generic Tailwind template.
-   Large visuals load efficiently.
-   Reduced-motion mode works.
-   Keyboard navigation works.
-   The page remains performant.

------------------------------------------------------------------------

# 43. Reference Analysis

The current Nomu homepage uses a long-form flow centered around:

``` text
From prompt → to product
```

Its visible content flow includes: - hero - five-step process - prompt
interaction - supported-by logo rail - large campaign/product section -
commerce capability sections - dark/end-to-end commerce section -
metrics - comparison - FAQ - final creative-director CTA - footer

The Nomu brand guide explicitly defines: - cream as the default canvas -
dark surfaces as intentional anchors - orange as the primary accent -
Inter as the readable UI typeface - large desktop radii around 50px -
24px mobile card radius - 767px as the compact breakpoint - a small set
of predefined cubic-bezier easing curves

Use those principles as the visual foundation while replacing
Nomu-specific branding and assets with the target brand's own identity.

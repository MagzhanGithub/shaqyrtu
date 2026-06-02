# DESIGN.md — Shaqyrtu: Kazakh Wedding Invitation

## 1. Design Principles

1. **Warmth over grandeur** — intimate, personal feeling; not a luxury brand ad
2. **Culture as texture** — Kazakh ornamental motifs appear as subtle accents, never as decoration for decoration's sake
3. **Information clarity first** — guests need date, venue, RSVP above everything else
4. **One typeface pair** — serif for romance, sans for clarity; nothing else
5. **Motion with restraint** — animations reveal content, never compete with it
6. **Mobile is primary** — guests open invitations on phones at the moment of receiving them

---

## 2. Design Tokens

### Colors
```
--color-bg:          #FAFAF8   warm near-white (page background)
--color-surface:     #F4F0E8   warm ivory (alternating sections)
--color-card:        #FFFFFF   pure white (cards, form)
--color-primary:     #2C3E2D   deep forest green (headings, nav)
--color-primary-dk:  #1E2E1F   darker green (hover)
--color-gold:        #C4A35A   warm gold (accent, dividers, highlights)
--color-gold-lt:     #EAD9A8   light gold (backgrounds, tints)
--color-border:      #E4DDD0   warm gray border
--color-text-1:      #1C1C1C   primary text
--color-text-2:      #5C5C5C   secondary text
--color-text-muted:  #9C9C9C   captions, labels
--color-success:     #3D7A4F   RSVP confirmed state
--color-error:       #C0392B   form validation only
```

### Spacing (8px base grid)
```
--sp-1: 4px    --sp-2: 8px    --sp-3: 12px   --sp-4: 16px
--sp-5: 24px   --sp-6: 32px   --sp-7: 48px   --sp-8: 64px
--sp-9: 80px   --sp-10: 96px  --sp-11: 120px --sp-12: 160px
```

### Typography
```
--font-serif: 'Cormorant Garamond', Georgia, serif   ← names, headings
--font-sans:  'Jost', system-ui, sans-serif          ← body, UI

--text-xs:   12px / 1.4    --text-sm:  14px / 1.5
--text-base: 16px / 1.6    --text-lg:  18px / 1.6
--text-xl:   22px / 1.4    --text-2xl: 28px / 1.3
--text-3xl:  36px / 1.2    --text-4xl: 48px / 1.1
--text-5xl:  60px / 1.05   --text-6xl: 80px / 1.0
```

### Radius, Shadows, Motion
```
--radius-sm: 4px   --radius-md: 8px   --radius-lg: 16px   --radius-full: 9999px

--shadow-sm: 0 1px 3px rgba(0,0,0,.07)
--shadow-md: 0 4px 16px rgba(0,0,0,.09)
--shadow-lg: 0 8px 32px rgba(0,0,0,.12)

--ease-out:    cubic-bezier(0, 0, .2, 1)
--ease-spring: cubic-bezier(.34, 1.56, .64, 1)
--dur-fast: 150ms   --dur-base: 250ms   --dur-slow: 400ms
```

---

## 3. Component Inventory

### Primitives
- **Button** — primary (green fill), secondary (ghost), text-link
- **Input / Textarea / Select / Radio** — label-above pattern, 48px touch target
- **Divider** — thin gold line with centered ornament SVG
- **Badge** — pill, used for schedule time labels
- **Spinner** — subtle RSVP form submit state

### Composites
- **CountdownUnit** — number + label (Күн/Сағат/Минут/Секунд), animated flip
- **TimelineItem** — icon + time + event name + description
- **GalleryThumb** — aspect-ratio 1/1, object-fit cover, hover zoom
- **WishCard** — name + message, subtle shadow
- **ScheduleRow** — time badge + event + icon

### Sections (Organisms)
| Section | Key design decision |
|---|---|
| **Nav** | Sticky, translucent blur on scroll; logo = couple initials |
| **Hero** | Full-screen, names in 72px serif, date below, countdown timer, scroll cue |
| **Story** | Two-column timeline; alternates left/right on desktop, stacks on mobile |
| **Schedule** | Vertical timeline with time badges in gold |
| **Venue** | Split: details left, Google Maps iframe right |
| **DressCode** | Color swatches row + brief instruction |
| **Gallery** | Masonry-style CSS grid, 3 cols desktop / 2 tablet / 1 mobile |
| **RSVP** | Clean centered form, radio for attendance, +1 option |
| **Wishes** | Submitted wishes display + form to leave a message |
| **Footer** | Minimal: couple names, date, social icons |

---

## 4. Layout System

```
Container: max-width 1100px, padding-x: 20px(mob) / 40px(tab) / 60px(desk)
Grid: 4-col(mob) → 8-col(tab) → 12-col(desk), gap 24px
Section padding-y: 80px(mob) / 120px(desk)
Alternating surfaces: bg / surface / bg / surface …
```

Breakpoints: `sm: 480px` `md: 768px` `lg: 1024px` `xl: 1280px`

---

## 5. Page-by-Page Design Notes

### Hero
- Names in Cormorant Garamond 72-80px, gold "&" ampersand between names
- Date in uppercase tracked sans, 14px
- Countdown in monospaced feel (tabular nums), large digits
- Background: full-screen photo with dark overlay OR Kazakh pattern textile texture
- Scroll indicator: animated chevron down

### Kazakh Ornament Usage
- Shanyrak (шаңырак) SVG as section divider centerpiece
- Geometric border pattern (ромбы) as thin top/bottom rule on hero
- Never full-section backgrounds — only as 20–40px accent strips

### Schedule (Бағдарлама)
Events to template (editable):
- Ұзату / Беташар
- Неке қию (Nikah)
- Той (Main feast)
- Беташар ceremony

### RSVP Form Fields
1. Name (text, required)
2. Attending? Yes / No (radio, required)
3. Number of guests (select 1–5, shown only if Yes)
4. Meal preference (text, optional)
5. Message to couple (textarea, optional)
6. Submit → shows confirmation message, stores in localStorage

### Wishes Wall
- Guests submit a wish → stored in localStorage (demo) or POST to backend endpoint
- Displayed as cards in a masonry-adjacent grid
- Pre-seeded with 3 example wishes on first load

---

## 6. Motion Playbook

| Animation | Trigger | Properties | Duration |
|---|---|---|---|
| `fadeUp` | Scroll into view | y: 30→0, opacity 0→1 | 500ms ease-out |
| `stagger` | Grid/list children | 80ms delay each | — |
| `scaleIn` | Modal / confirmation | scale .96→1, opacity 0→1 | 300ms spring |
| `flipDigit` | Countdown tick | rotateX 0→-90 (old), 90→0 (new) | 400ms ease |
| `lineGrow` | Section divider | scaleX 0→1 | 600ms ease-out |
| `heroReveal` | Page load | opacity 0→1, staggered children | 800ms |

`prefers-reduced-motion`: all collapse to instant opacity fade only.

---

## 7. Accessibility Checklist

- [x] `<main>`, `<header>`, `<nav>`, `<section aria-label>`, `<footer>` landmarks
- [x] Single `<h1>` = couple names; all sections use `<h2>`
- [x] All form inputs have `<label for>` (no placeholder-only labels)
- [x] Error messages: `role="alert"` inline below field
- [x] RSVP confirmation: `aria-live="polite"` region
- [x] Color contrast ≥ 4.5:1 for all body text
- [x] Focus ring: 2px solid gold, 2px offset
- [x] Touch targets ≥ 44×44px
- [x] Decorative images: `alt=""`; content images: descriptive alt
- [x] Map iframe: `title="Venue location map"`
- [x] Skip-to-content link as first DOM element

---

## 8. CRO Design Map (for invitation context)

Primary goal = guest completes RSVP.

| Position | Element | Weight |
|---|---|---|
| Hero | RSVP anchor button | Primary |
| After schedule | "Confirm your attendance" reminder | Secondary |
| Nav | "RSVP" nav item always visible | Tertiary |
| Footer | Date + RSVP link | Tertiary |

Trust signals: couple photo, personal note from couple, Google Maps (venue is real).

---

## 9. Open Design Questions

- [ ] Real couple photos for hero + gallery (placeholders used until provided)
- [ ] Exact wedding date, time, venue address
- [ ] Kazakh or Russian/Kazakh bilingual content?
- [ ] Backend for RSVP (currently localStorage) — need email/sheet integration?
- [ ] Dress code colors to specify
- [ ] Music preference for background audio (none by default — best practice)

---

## 10. PRD Amendments

No PRD exists yet — this is the founding design document. Recommend creating PRD if template reuse across multiple weddings is the goal (customization layer needed: couple names, date, colors as CSS vars at top of file).

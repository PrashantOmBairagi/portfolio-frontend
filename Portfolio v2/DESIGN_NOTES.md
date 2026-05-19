# Portfolio Design Notes — Prashant Bairagi

## ★ The Masterpiece: Floating Navbar Glass Pill

The **floating navbar** is the centrepiece and design signature of this entire portfolio.
Every other glass surface on the site (cards, modals, lightbox, badges) must reference its
exact recipe. **Do not deviate without a deliberate reason.**

### Navbar Glass Formula

```css
/* The exact token values that define the site's visual identity */
background:       var(--glass-bg);          /* rgba(255,255,255,0.7) light | rgba(28,28,30,0.6) dark */
backdrop-filter:  blur(20px);               /* ← the magic number — do not go higher or lower */
-webkit-backdrop-filter: blur(20px);
border:           1px solid var(--glass-border);  /* rgba(255,255,255,0.4) light | rgba(255,255,255,0.08) dark */
box-shadow:       var(--glass-shadow);      /* 0 8px 32px rgba(0,0,0,0.04) light | 0 8px 32px rgba(0,0,0,0.2) dark */
border-radius:    999px;                    /* pill shape */

/* Layout: floating 1rem from the top, centered, 90% width, max 900px */
position: fixed;
top: 1rem;
left: 50%;
transform: translateX(-50%);
width: 90%;
max-width: 900px;
```

### Why It Works

- `blur(20px)` is the sweet spot — heavy enough to feel frosted, light enough to see the page behind
- `rgba(255,255,255,0.7)` preserves the warm Apple-white feel without being opaque
- The pill shape (`999px`) + floating position gives it an "object hovering over the page" quality
- The subtle `box-shadow` grounds it without making it feel heavy

### Rule for All New Glass Surfaces

> Any new overlay, modal, card, or tooltip that needs to feel **on-brand** must:
> 1. Use `backdrop-filter: blur(20px)` — not more, not less
> 2. Use `var(--glass-bg)` as the background
> 3. Use `var(--glass-border)` as the border
> 4. Use `var(--glass-shadow)` as the box-shadow
> 5. Keep backgrounds as **overlays** (e.g. `rgba(0,0,0,0.18)`), never opaque dark curtains

The certificate lightbox backdrop is a deliberate example of this:
```css
/* Correct — matches navbar spirit */
background: rgba(0, 0, 0, 0.18);
backdrop-filter: blur(20px);

/* Wrong — kills the glass aesthetic */
background: rgba(0, 0, 0, 0.65);
backdrop-filter: blur(12px);
```

---

## Color Tokens (Quick Reference)

| Token | Light | Dark |
|---|---|---|
| `--glass-bg` | `rgba(255,255,255,0.7)` | `rgba(28,28,30,0.6)` |
| `--glass-border` | `rgba(255,255,255,0.4)` | `rgba(255,255,255,0.08)` |
| `--glass-shadow` | `0 8px 32px rgba(0,0,0,0.04)` | `0 8px 32px rgba(0,0,0,0.2)` |
| `--accent-blue` | `#0071e3` | same |
| `--bg-base` | `#f5f5f7` | `#000000` |
| `--text-primary` | `#1d1d1f` | `#f5f5f7` |
| `--text-secondary` | `#86868b` | `#a1a1a6` |

---

## Font

**Inter** (Google Fonts) — weights 300, 400, 500, 600, 700.
Letter spacing: `-0.02em` to `-0.03em` on headings for the Apple-tight feel.

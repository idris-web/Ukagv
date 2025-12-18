# CSS / Tailwind Referenz

## Spacing (Abstände)

| Klasse | Wert | Beschreibung |
|--------|------|--------------|
| `p-4` | 16px | Padding (alle Seiten) |
| `p-5` | 20px | Padding (alle Seiten) |
| `p-6` | 24px | Padding (alle Seiten) |
| `px-3` | 12px | Padding horizontal |
| `px-6` | 24px | Padding horizontal |
| `px-8` | 32px | Padding horizontal |
| `py-1.5` | 6px | Padding vertikal |
| `py-12` | 48px | Padding vertikal |
| `py-20` | 80px | Padding vertikal |
| `mb-2` | 8px | Margin unten |
| `mb-3` | 12px | Margin unten |
| `mb-4` | 16px | Margin unten |
| `mb-8` | 32px | Margin unten |
| `mb-10` | 40px | Margin unten |
| `mt-1` | 4px | Margin oben |
| `mt-6` | 24px | Margin oben |
| `mt-8` | 32px | Margin oben |
| `mt-10` | 40px | Margin oben |
| `gap-2` | 8px | Abstand zwischen Grid/Flex Items |
| `gap-3` | 12px | Abstand zwischen Grid/Flex Items |
| `gap-4` | 16px | Abstand zwischen Grid/Flex Items |
| `gap-6` | 24px | Abstand zwischen Grid/Flex Items |
| `gap-8` | 32px | Abstand zwischen Grid/Flex Items |

## Größen (Sizes)

| Klasse | Wert | Verwendung |
|--------|------|------------|
| `w-4 h-4` | 16px | Kleine Icons |
| `w-5 h-5` | 20px | Standard Icons |
| `w-6 h-6` | 24px | Große Icons |
| `w-8 h-8` | 32px | Icon Container (klein) |
| `w-10 h-10` | 40px | Icon Container (mittel) |
| `w-12 h-12` | 48px | Icon Container (groß) |
| `w-16` | 64px | Feste Breite |
| `max-w-3xl` | 768px | Container Maximalbreite |
| `max-w-xl` | 576px | Text Maximalbreite |
| `max-w-xs` | 320px | Kleine Maximalbreite |

## Schriftgrößen (Font Sizes)

| Klasse | Wert | Verwendung |
|--------|------|------------|
| `text-[10px]` | 10px | Sehr klein (Beschreibungen) |
| `text-xs` | 12px | Klein (Labels, Badges) |
| `text-sm` | 14px | Normal (Body Text) |
| `text-xl` | 20px | Groß (Stats) |
| `text-2xl` | 24px | Sehr groß (Stats Mobile) |
| `text-3xl` | 30px | Überschrift (Mobile) |
| `text-4xl` | 36px | Überschrift (Desktop) |

## Farben (Colors)

### Text
| Klasse | Beschreibung |
|--------|--------------|
| `text-white` | Weiß - Überschriften, wichtiger Text |
| `text-dark-200` | Hellgrau - Zitate, hervorgehobener Text |
| `text-dark-300` | Grau - Sekundärer Text |
| `text-dark-400` | Dunkelgrau - Body Text |
| `text-dark-500` | Sehr dunkelgrau - Labels, Beschreibungen |
| `text-fiber-400` | Cyan - Akzentfarbe, Links |
| `text-cyan-400` | Cyan - FTTH |
| `text-blue-400` | Blau - FTTB |
| `text-amber-400` | Gold - Sterne |

### Hintergründe
| Klasse | Beschreibung |
|--------|--------------|
| `bg-dark-900/50` | Dunkler Hintergrund 50% Opacity - Cards |
| `bg-dark-950` | Dunkelster Hintergrund - Footer |
| `bg-fiber-500/10` | Cyan 10% Opacity - Badges |
| `bg-fiber-500` | Cyan solid - Buttons |

### Borders
| Klasse | Beschreibung |
|--------|--------------|
| `border-dark-800` | Dunkler Rand - Standard |
| `border-dark-700` | Hellerer Rand - Hover |
| `border-fiber-500/20` | Cyan 20% - Badges |
| `border-t-cyan-400` | Cyan Top Border - Akzent |
| `border-t-blue-400` | Blau Top Border - Akzent |

## Layout

### Flexbox
```
flex               - Flexbox aktivieren
flex-col           - Vertikal stapeln
items-center       - Vertikal zentrieren
justify-center     - Horizontal zentrieren
justify-between    - Platz zwischen Items
shrink-0           - Nicht schrumpfen
```

### Grid
```
grid               - Grid aktivieren
grid-cols-2        - 2 Spalten
grid-cols-3        - 3 Spalten
grid-cols-4        - 4 Spalten
```

### Positionierung
```
relative           - Relative Positionierung (für z-index)
absolute           - Absolute Positionierung
z-10               - Z-Index 10 (über Hintergrund)
```

## Border Radius

| Klasse | Wert | Form |
|--------|------|------|
| `rounded` | 4px | Leicht gerundet |
| `rounded-lg` | 8px | Mittel gerundet |
| `rounded-xl` | 12px | Stark gerundet (Cards) |
| `rounded-2xl` | 16px | Sehr stark gerundet |
| `rounded-full` | 9999px | Vollständig rund (Kreise, Pills) |

## Animationen

### Framer Motion
```tsx
initial={{ opacity: 0, y: 20 }}      // Startposition: unsichtbar, 20px unten
animate={{ opacity: 1, y: 0 }}       // Endposition: sichtbar, normal
transition={{ duration: 0.5 }}        // Dauer: 0.5 Sekunden
transition={{ delay: index * 0.1 }}   // Verzögerung pro Item
```

### Tailwind Transitions
```
transition-all     - Alle Eigenschaften animieren
transition-colors  - Nur Farben animieren
transition-transform - Nur Transform animieren
```

## Wiederkehrende Patterns

### Section Badge (Kategorie-Tag)
```tsx
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fiber-500/10 border border-fiber-500/20 mb-4">
  <Icon className="w-3.5 h-3.5 text-fiber-400" />
  <span className="text-xs font-medium text-fiber-400">Label</span>
</div>
```

### Section Title
```tsx
<h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
  <span className="text-white">Weiß </span>
  <span className="gradient-text">Gradient</span>
</h2>
```

### Card
```tsx
<div className="p-4 rounded-xl bg-dark-900/50 border border-dark-800">
  {/* Content */}
</div>
```

### CTA Link
```tsx
<a href="#contact" className="inline-flex items-center gap-2 text-sm text-fiber-400 hover:text-fiber-300">
  Text
  <ArrowRight className="w-4 h-4" />
</a>
```

### Container (für alle Sections)
```tsx
<div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
  {/* Content */}
</div>
```

## Responsive Breakpoints

| Prefix | Bildschirmbreite |
|--------|------------------|
| (kein) | Mobile First (0px+) |
| `md:` | 768px+ (Tablet) |
| `lg:` | 1024px+ (Desktop) |

Beispiel: `text-3xl md:text-4xl` = 30px auf Mobile, 36px ab 768px

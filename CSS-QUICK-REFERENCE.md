# 🎨 Khel Sethu UI - Quick CSS Reference

## Component Classes

### Navigation
```html
<nav class="navbar-modern">
  <div class="nav-container">
    <a href="/" class="nav-logo">Logo</a>
    <ul class="nav-menu">
      <li><a href="#" class="nav-link">Link</a></li>
    </ul>
  </div>
</nav>
```

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-white">White</button>
<button class="btn btn-primary btn-large">Large</button>
```

### Event Cards
```html
<div class="events-grid">
  <div class="event-card">
    <img src="image.jpg" class="event-card-image" />
    <div class="event-card-content">
      <span class="event-card-date">Date</span>
      <h3 class="event-card-title">Title</h3>
      <div class="event-card-details">
        <div class="event-detail-item">
          <i class="fas fa-icon"></i>
          <span>Detail</span>
        </div>
      </div>
      <div class="event-card-footer">
        <div class="event-price">₹500</div>
        <button class="btn btn-primary">Action</button>
      </div>
    </div>
  </div>
</div>
```

### Forms
```html
<div class="form-modern">
  <div class="form-group">
    <label class="form-label">Label</label>
    <input type="text" class="form-input" placeholder="Enter..." />
  </div>
</div>
```

### Section Headers
```html
<div class="section-title">
  <h2>Section Title</h2>
  <p>Subtitle text</p>
</div>
```

### Hero Section
```html
<section class="hero-modern">
  <div class="hero-content">
    <h1 class="hero-title">Title</h1>
    <p class="hero-subtitle">Subtitle</p>
    <button class="btn btn-white btn-large">Action</button>
  </div>
</section>
```

### Footer
```html
<footer class="footer-modern">
  <div class="footer-content">
    <div class="footer-section">
      <h3>Title</h3>
      <ul class="footer-links">
        <li><a href="#">Link</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Copyright</p>
  </div>
</footer>
```

### No Data State
```html
<div class="no-data">
  <div class="no-data-icon">
    <i class="fas fa-icon"></i>
  </div>
  <h3>No Data Available</h3>
  <p>Description text</p>
  <button class="btn btn-primary">Action</button>
</div>
```

### Loading State
```html
<div class="loader"></div>
```

## Utility Classes

### Layout
- `.container` - Max-width centered container
- `.text-center` - Center text
- `.mt-80` - Margin top 80px (navbar height)
- `.mb-2` - Margin bottom 2rem

### Animations
- `.fade-in` - Fade in from bottom animation

## CSS Variables

### Colors
```css
var(--primary-color)      /* #2563eb */
var(--primary-dark)       /* #1e40af */
var(--accent-color)       /* #f59e0b */
var(--success-color)      /* #10b981 */
var(--error-color)        /* #ef4444 */
var(--dark)              /* #1f2937 */
var(--gray)              /* #6b7280 */
var(--light-gray)        /* #e5e7eb */
var(--white)             /* #ffffff */
```

### Gradients
```css
var(--gradient-primary)   /* Blue to purple */
var(--gradient-accent)    /* Orange to red */
var(--gradient-success)   /* Green gradient */
```

### Shadows
```css
var(--shadow-sm)    /* Small shadow */
var(--shadow)       /* Default shadow */
var(--shadow-md)    /* Medium shadow */
var(--shadow-lg)    /* Large shadow */
var(--shadow-xl)    /* Extra large shadow */
```

### Spacing
```css
var(--spacing-xs)   /* 0.5rem / 8px */
var(--spacing-sm)   /* 1rem / 16px */
var(--spacing-md)   /* 1.5rem / 24px */
var(--spacing-lg)   /* 2rem / 32px */
var(--spacing-xl)   /* 3rem / 48px */
```

### Border Radius
```css
var(--radius-sm)    /* 0.375rem / 6px */
var(--radius-md)    /* 0.5rem / 8px */
var(--radius-lg)    /* 0.75rem / 12px */
var(--radius-xl)    /* 1rem / 16px */
var(--radius-full)  /* 9999px (pill shape) */
```

### Transitions
```css
var(--transition-fast)  /* 150ms */
var(--transition-base)  /* 300ms */
var(--transition-slow)  /* 500ms */
```

## Responsive Breakpoints

```css
/* Mobile First Approach */

/* Mobile: Default styles */

/* Tablet and up */
@media (min-width: 768px) {
  /* Styles */
}

/* Desktop and up */
@media (min-width: 1024px) {
  /* Styles */
}

/* Large Desktop */
@media (min-width: 1200px) {
  /* Styles */
}
```

## Common Patterns

### Centered Content
```html
<div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
  Content
</div>
```

### Gradient Text
```html
<h2 style="
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;">
  Gradient Text
</h2>
```

### Card Hover Effect
```css
.custom-card {
  transition: all var(--transition-base);
}

.custom-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
```

### Flexbox Center
```css
display: flex;
justify-content: center;
align-items: center;
gap: 1rem;
```

### Grid Layout
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 2rem;
```

## Font Awesome Icons

### Common Icons
```html
<i class="fas fa-calendar"></i>        <!-- Calendar -->
<i class="fas fa-map-marker-alt"></i>  <!-- Location -->
<i class="fas fa-users"></i>           <!-- Group -->
<i class="fas fa-user"></i>            <!-- User -->
<i class="fas fa-arrow-right"></i>     <!-- Arrow -->
<i class="fas fa-lock"></i>            <!-- Lock -->
<i class="fas fa-sign-in-alt"></i>     <!-- Login -->
<i class="fas fa-sign-out-alt"></i>    <!-- Logout -->
<i class="fas fa-plus"></i>            <!-- Add -->
<i class="fas fa-edit"></i>            <!-- Edit -->
<i class="fas fa-trash"></i>           <!-- Delete -->
<i class="fas fa-search"></i>          <!-- Search -->
<i class="fas fa-envelope"></i>        <!-- Email -->
<i class="fas fa-phone"></i>           <!-- Phone -->

<!-- Social Media -->
<i class="fab fa-facebook"></i>
<i class="fab fa-instagram"></i>
<i class="fab fa-twitter"></i>
<i class="fab fa-snapchat"></i>
```

## Quick Tips

1. **Always use leading slash** for public assets: `/css/`, `/images/`, `/js/`
2. **Add fallback** for images: `onerror="this.src='/images/logo.png'"`
3. **Use semantic HTML**: `<section>`, `<article>`, `<nav>`, `<footer>`
4. **Add aria-labels** for accessibility
5. **Test on mobile**: Use Chrome DevTools (F12) Device Toolbar
6. **Combine classes**: `class="btn btn-primary btn-large"`
7. **Use CSS variables**: More maintainable than hardcoded values
8. **Add transitions**: Makes UI feel more polished
9. **Consistent spacing**: Use the spacing variables
10. **Test with real data**: Don't assume perfect content

## Color Combinations

### Primary Actions
```
Background: var(--primary-color)
Text: var(--white)
Hover: var(--primary-dark)
```

### Accent Actions
```
Background: var(--accent-color)
Text: var(--white)
Hover: var(--accent-dark)
```

### Cards
```
Background: var(--white)
Border: none
Shadow: var(--shadow)
Hover Shadow: var(--shadow-lg)
```

### Text Hierarchy
```
Headings: var(--dark)
Body: var(--gray)
Muted: var(--light-gray)
```

---

Save this for quick reference while implementing the UI! 🚀

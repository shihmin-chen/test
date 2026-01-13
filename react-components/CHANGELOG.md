# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.1] - 2026-01-12

### Fixed
- **Select** - Added `fill` prop to match Input component's fill mode
- **Select** - Corrected dropdown arrow icon to match Vue original (caret-down style)
- **Checkbox** - Updated check icon SVG to match Vue original design
- **Button tertiary** - Changed to grey outline style instead of solid grey background

### Details

#### Select Component
- Added `fill?: boolean` prop for darker background without border
- `fill` mode works like Input component - use on white backgrounds (`bg-card`)
- Default mode (white background with border) for grey backgrounds (`bg-background`)
- Corrected arrow icon from generic chevron to proper caret-down design

```tsx
// On grey background
<Select options={options} />

// On white background  
<div className="bg-card">
  <Select options={options} fill />
</div>
```

#### Checkbox Component
- Updated checkmark SVG to use proper stroke-based design
- Matches Vue component's original icon exactly
- Better visual consistency with design system

#### Button Component
- Tertiary theme now renders as outlined button (border only)
- Removes confusing solid grey button variant
- Consistent with other outline variants (primary, danger, warning)

```tsx
// Old: solid grey button
<Button theme="tertiary">Grey Solid</Button>

// New: grey outline button
<Button theme="tertiary">Grey Outline</Button>
```

---

## [1.4.0] - 2026-01-12

### Added
- **AI_SETUP_GUIDE.md** - Step-by-step automation guide for AI assistants
- **COMPONENT_MANIFEST.json** - Component discovery and metadata
- **CHANGELOG.md** - Version tracking (this file)
- Comprehensive AI-friendly documentation

### Fixed
- **Card.css** - Added `!important` to background-color to prevent transparency
- **Modal.css** - Added `!important` to background-color to prevent transparency
- Improved z-index layering for proper stacking

### Changed
- **README.md** - Added prominent theme conflict warning at the beginning
- **README.md** - Added link to THEME_CONFLICT_FIX.md
- Optimized file structure for AI reading efficiency

---

## [1.3.0] - 2026-01-12

### Added
- **THEME_CONFLICT_FIX.md** - Detailed guide to resolve theme.css conflicts
- Warning comment in theme.css about background color

### Fixed
- **theme.css** - Changed `--background` from green (#CCDBC8) to correct gray (#F5F5F5)
- Ensured all colors match STYLING_GUIDELINES.md specifications

---

## [1.2.0] - 2026-01-12

### Added
- **Card** component with CardHeader, CardBody, CardFooter, CardIcon
- **Modal** component with ModalHeader, ModalBody, ModalFooter
- **Divider** component with size variants
- **Label** component with required indicator

### Features
- Card supports busy/loading state with spinner overlay
- Modal supports ESC key, backdrop click, and animations
- Modal uses Portal for proper rendering
- Label supports custom required indicators

---

## [1.1.0] - 2026-01-11

### Added
- **STYLING_GUIDELINES.md** - Comprehensive styling usage guide
- Documentation for Input fill vs default usage
- Documentation for Select theme selection (white vs grey)
- Background color usage guidelines

### Fixed
- Input component CSS to properly support fill variant
- Select component theme switching

---

## [1.0.0] - 2026-01-10

### Added
- **Button** component (converted from Vue)
- **Input** component (converted from Vue)
- **Select** component (converted from Vue)
- **Checkbox** component (converted from Vue)
- **Radio / RadioGroup** components (converted from Vue)
- **TextArea** component (converted from Vue)
- **theme.css** - Design system CSS variables
- **all.css** - Combined component styles
- **index.tsx** - Main entry point with auto CSS loading
- **README.md** - Basic usage documentation

### Design System
- Color variables (background, card, primary, destructive, etc.)
- Spacing system (8px base unit)
- Border radius variables (8px for buttons and cards)
- Typography variables (Inter font family)
- Elevation/shadow system

---

## Component Completion Status

**Completed: 10/33 components**

### ✅ Form Components (7)
- Button
- Input
- Select
- Checkbox
- Radio / RadioGroup
- TextArea
- Label

### ✅ Layout Components (3)
- Card
- Modal
- Divider

### ⏳ Pending Components (23)
- DatePicker, TimePicker, DateTimePicker
- Switch, Slider, Progress
- Badge, Avatar
- Tooltip, Popover, Dropdown, Menu
- Tabs, Accordion
- Alert, Toast, Dialog, Drawer
- Table, Pagination
- Breadcrumb, Steps, Tree

---

## Migration Notes

### Breaking Changes

None yet - this is the initial release series.

### Deprecations

None yet.

### Upgrade Guide

#### From 1.4.0 to 1.4.1

No breaking changes. The updates are all fixes and enhancements:

1. **Select**: If you want fill mode, add `fill` prop:
   ```tsx
   <Select fill options={options} />
   ```

2. **Button tertiary**: Visual change only - now displays as outline instead of solid.
   No code changes needed.

3. **Checkbox & Select icons**: Visual improvements only. No code changes needed.

#### From 1.3.0 to 1.4.0

No breaking changes. Simply pull the latest files from GitHub.

If you experience transparent Card/Modal backgrounds:
1. Clear browser cache
2. Restart development server
3. Verify no Figma-imported code has `bg-[rgba(255,255,255,0)]` classes

#### From 1.2.0 to 1.3.0

No breaking changes. Ensure you have commented out `/src/styles/index.css` theme import:

```css
/* @import './theme.css'; */
```

---

## Roadmap

### v1.5.0 (Planned)
- DatePicker component
- ReadOnlyField component
- SearchInput component
- IconButton component

### v1.6.0 (Planned)
- Switch component
- Tooltip component
- Badge component

### v2.0.0 (Future)
- Consider publishing to Figma npm registry
- Add Storybook documentation
- Add unit tests

---

**Repository:** https://github.com/shihmin-chen/test  
**License:** MIT  
**Maintained by:** shihmin-chen

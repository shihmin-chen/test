# 🤖 AI Assistant Guide: React Component Library

This guide provides all necessary instructions for setting up and using the React component library.

---

## 🎯 Primary Goal

Your main goal is to copy the React components from this repository into a target project and configure it correctly.

---

## 🚀 Setup and Configuration

Follow these steps precisely.

### Step 1: Copy Component Files

Copy all files and folders from the `react-components/` directory into the target project at `/src/components/react-components/`.

You can identify the full list of files to copy by reading `COMPONENT_MANIFEST.json`.

### Step 2: **CRITICAL** - Resolve CSS Theme Conflict

This is the most important step. To prevent style conflicts, you **must** disable the target project's default theme file.

1.  Read the file `/src/styles/index.css` in the target project.
2.  Find the line `@import './theme.css';`.
3.  Comment out this line to disable it:

    ```css
    /* @import './theme.css'; */  /* ⬅️ CRITICAL: This line MUST be commented out. */
    ```

**Reason:** The component library you are copying already includes its own `theme.css` (which is automatically loaded by `index.tsx`). If both are active, it will cause style conflicts, and the component colors will be wrong.

### Step 3: Verify Correct Setup

After setup, verify the following:

1.  **Background Color:** The main application background should be a dark gray (`#D9D9DB`). It should **not** be white or green.
2.  **Component Import:** You can import components like `Button` or `Card` from `'./components/react-components'`. The styles should load automatically.

---

## 🎨 Component Styling Rules

To ensure components look correct, follow these styling rules.

### Rule: `Input` and `Select` Component Styling

The appearance of `Input` and `Select` components depends on their background.

#### On a **dark gray page background** (`bg-background`):

-   Use the **default** style (no `fill` prop). The component will have a white background and a border.

    ```tsx
    // ✅ Correct on a dark gray page background
    <div className="bg-background p-8">
      <Input placeholder="Default style for dark backgrounds" />
      <Select options={options} placeholder="Default style" />
    </div>
    ```

#### On a **light gray/white card background** (`bg-card`):

-   Use the `fill` property. The component will have a dark background and no border.

    ```tsx
    // ✅ Correct on a light gray card background
    <div className="bg-card p-8">
      <Input fill placeholder="Fill style for light backgrounds" />
      <Select fill options={options} placeholder="Fill style" />
    </div>
    ```

**Incorrect Usage Examples:**

```tsx
// ❌ INCORRECT: Using fill on a dark background makes it hard to see.
<div className="bg-background p-8">
  <Input fill placeholder="Hard to see!" />
</div>

// ❌ INCORRECT: Using default on a light background has poor contrast.
<div className="bg-card p-8">
  <Input placeholder="Poor contrast!" />
</div>
```

---

## 📦 Component API and Usage

For a full list of available components, their props, and usage examples, read the `README.md` file. The `COMPONENT_MANIFEST.json` also provides a machine-readable list of all components and their files.

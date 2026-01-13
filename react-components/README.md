# React UI Component Library

This library contains React components converted from the original Vue XUI design system.

- **For Developers:** This document is your primary guide.
- **For AI Assistants:** Use the instructions in [`AI_README.md`](./AI_README.md).

---

## ⚠️ Critical Setup Step

To use this library, you **must** resolve a known CSS conflict with the host project.

1.  **Locate Host Project's CSS Entrypoint:** Find the main CSS file in the target project (e.g., `/src/styles/index.css`).

2.  **Disable Host's Theme:** Find and comment out the line that imports `@import './theme.css';`.

    ```css
    /* In /src/styles/index.css */
    @import './fonts.css';
    @import './tailwind.css';
    /* @import './theme.css'; */  /* ⬅️ CRITICAL: This line MUST be commented out. */
    ```

3.  **Verify:** After this change, your application's background should be dark gray (`#D9D9DB`). If it's white or green, the old theme is still active.

**Why?** The host project and this component library both have a `theme.css`. To prevent a conflict, we disable the host's version and use this library's theme, which is loaded automatically.

---

## 🚀 Quick Start

1.  **Copy Files:** Copy the entire `react-components` directory into your project (e.g., at `src/components/react-components`).

2.  **Perform Critical Setup:** Follow the setup step above to disable the conflicting `theme.css`.

3.  **Import and Use:** Import components directly. The necessary CSS is loaded automatically.

    ```tsx
    // In your application code
    import { Button, Card, Input, Label } from './components/react-components';

    function MyComponent() {
      return (
        <div className="p-8">
          <Card>
            <CardBody>
              <Label htmlFor="name">Name</Label>
              <Input id="name" fill />
            </CardBody>
          </Card>
        </div>
      );
    }
    ```

---

## 🎨 Essential Styling Guide

Follow these rules to ensure components are visually correct.

### `Input` and `Select` Styling Rule

The style of these components depends on the background they are on.

-   **On Dark Backgrounds** (e.g., the main page `bg-background`):
    Use the **default style** (no `fill` prop). This gives a white-background component with a border.
    ```tsx
    <div className="bg-background p-4">
        <Input placeholder="Default style on dark background" />
    </div>
    ```

-   **On Light Backgrounds** (e.g., inside a `<Card>`, `bg-card`):
    Use the **`fill` prop**. This gives a dark-background component with no border.
    ```tsx
    <div className="bg-card p-4">
        <Input fill placeholder="Fill style on light background" />
    </div>
    ```

---

## 📚 Component API

Below is a summary of available components and their props.

*(For a complete, machine-readable list of components and files, see `COMPONENT_MANIFEST.json`)*

### `Button`

| Prop      | Type                                                 | Default   | Description                  |
| :-------- | :--------------------------------------------------- | :-------- | :--------------------------- |
| `theme`   | `'primary'`, `'danger'`, `'warning'`, `'tertiary'` | -         | Color theme                  |
| `size`    | `'sm'`, `'md'`, `'lg'`                               | `'md'`    | Size of the button           |
| `outline` | `boolean`                                            | `false`   | Use outline style            |
| `loading` | `boolean`                                            | `false`   | Show loading spinner         |
| `...`     | `React.ButtonHTMLAttributes`                         | -         | Standard button attributes   |

### `Input`

| Prop      | Type                               | Default   | Description                           |
| :-------- | :--------------------------------- | :-------- | :------------------------------------ |
| `fill`    | `boolean`                          | `false`   | Use fill style (for light backgrounds) |
| `label`   | `string`                           | -         | Label text (creates a `<Label>`)      |
| `error`   | `boolean`                          | `false`   | Show error state                      |
| `...`     | `React.InputHTMLAttributes`        | -         | Standard input attributes             |

### `Select`

| Prop      | Type                               | Default   | Description                           |
| :-------- | :--------------------------------- | :-------- | :------------------------------------ |
| `fill`    | `boolean`                          | `false`   | Use fill style (for light backgrounds) |
| `options` | `{ value: string, label: string }[]` | `[]`      | Array of options to display           |
| `...`     | `React.SelectHTMLAttributes`       | -         | Standard select attributes            |

### `Card` & Sub-components

-   **`<Card>`:** The main container.
-   **`<CardHeader>`:** Header section.
-   **`<CardBody>`:** Main content area. Supports a `busy` prop to show a loading spinner.
-   **`<CardFooter>`:** Footer section, typically for action buttons.
-   **`<CardIcon>`:** Area for a decorative icon.

### `Modal` & Sub-components

-   **`<Modal>`:** The main modal component.
    -   `open: boolean`: Controls visibility.
    -   `onClose: () => void`: Callback for when the modal should be closed.
    -   `width?: number`: Sets the modal width (default: `500`).
    -   `closeOnBackdrop?: boolean`: If true, clicking the backdrop closes the modal.
-   **`<ModalHeader>`:** Header with an optional close button.
-   **`<ModalBody>`:** Scrollable content area.
-   **`<ModalFooter>`:** Footer for action buttons.

*(This is a selection of the most-used components. See `COMPONENT_MANIFEST.json` for a full list.)*

---

## 📁 File Structure Overview

```
react-components/
├── AI_README.md                ← Guide for AI assistants
├── README.md                   ← This file (for humans)
├── COMPONENT_MANIFEST.json     ← Machine-readable file list
├── CHANGELOG.md                ← Version history
│
├── index.tsx                   ← Main export entrypoint (loads all.css)
├── all.css                     ← Imports all component CSS
├── theme.css                   ← Core design system variables
│
├── Button.tsx / .css           ┐
├── Card.tsx / .css             │
├── Input.tsx / .css            ├─ Component source files...
...                             ┘
```
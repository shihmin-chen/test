# React UI Component Library

這是從 Vue XUI 組件庫轉換而來的 React 組件庫，完全使用設計系統 CSS 變數。

## 已轉換的組件

### 1. Button
基礎按鈕組件，支援多種主題、尺寸和狀態。

**Props:**
- `display`: 'button' | 'text' | 'link'
- `theme`: 'primary' | 'danger' | 'warning' | 'tertiary'
- `size`: 'sm' | 'md' | 'lg'
- `outline`: boolean
- `loading`: boolean
- `disabled`: boolean
- `url`: string (轉換為 `<a>` 標籤)
- `icon`: ReactNode

**使用範例:**
```tsx
import { Button } from './Button';
import './Button.css';

<Button theme="primary">Primary Button</Button>
<Button theme="danger" size="sm">Small Danger</Button>
<Button theme="primary" loading>Loading</Button>
<Button display="link" url="https://example.com">Link Button</Button>
```

---

### 2. Input
文字輸入框組件，支援多種輸入類型。

**Props:**
- `label`: string
- `type`: 'text' | 'password' | 'search' | 'url' | 'email' | 'number'
- `size`: 'sm' | 'md'
- `error`: boolean
- `message`: string
- `fill`: boolean (填充樣式)
- `borderless`: boolean (無邊框)
- `prefix`: ReactNode
- `postfix`: ReactNode

**使用範例:**
```tsx
import { Input } from './Input';
import './Input.css';

<Input 
  label="Username" 
  placeholder="Enter username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
<Input type="password" label="Password" />
<Input type="search" placeholder="Search..." />
```

---

### 3. Select
下拉選單組件，支援鍵盤導航。

**Props:**
- `value`: string
- `onChange`: (value: string) => void
- `options`: SelectOption[]
- `placeholder`: string
- `size`: 'sm' | 'md'
- `theme`: 'white' | 'grey'
- `error`: boolean
- `disabled`: boolean

**使用範例:**
```tsx
import { Select } from './Select';
import './Select.css';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
];

<Select 
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Choose..."
/>
```

---

### 4. Checkbox
核取方塊組件，支援 indeterminate 狀態。

**Props:**
- `label`: ReactNode
- `size`: 'sm' | 'md'
- `indeterminate`: boolean
- `error`: boolean
- `disabled`: boolean

**使用範例:**
```tsx
import { Checkbox } from './Checkbox';
import './Checkbox.css';

<Checkbox 
  label="I agree to terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
<Checkbox indeterminate label="Select all" />
```

---

### 5. Radio / RadioGroup
單選按鈕組件，必須搭配 RadioGroup 使用。

**RadioGroup Props:**
- `name`: string
- `value`: string
- `onChange`: (value: string) => void
- `error`: boolean

**Radio Props:**
- `value`: string
- `label`: string
- `size`: 'sm' | 'md'
- `disabled`: boolean

**使用範例:**
```tsx
import { Radio, RadioGroup } from './Radio';
import './Radio.css';

<RadioGroup 
  name="choice"
  value={selected}
  onChange={setSelected}
>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>
```

---

### 6. TextArea
多行文字輸入框組件。

**Props:**
- `rows`: number
- `error`: boolean
- `readOnly`: boolean

**使用範例:**
```tsx
import { TextArea } from './TextArea';
import './TextArea.css';

<TextArea 
  rows={5}
  placeholder="Enter your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

---

## 設計系統整合

所有組件都使用以下 CSS 變數（需在專案的 theme.css 中定義）：

### 必需的 CSS 變數

```css
:root {
  /* 顏色 */
  --primary: rgba(0, 103, 204, 1.00);
  --primary-foreground: rgba(255, 255, 255, 1.00);
  --destructive: rgba(191, 46, 58, 1.00);
  --destructive-foreground: rgba(255, 255, 255, 1.00);
  --accent: rgba(109, 174, 237, 1.00);
  --accent-foreground: rgba(0, 87, 173, 1.00);
  --muted: rgba(26, 26, 26, 0.09);
  --muted-foreground: rgba(26, 26, 26, 0.35);
  --border: rgba(26, 26, 26, 0.3);
  --ring: rgba(0, 103, 204, 1.00);
  --card: rgba(242, 242, 242, 1.00);
  --input-background: rgba(26, 26, 26, 0.16);
  --foreground: rgba(26, 26, 26, 1.00);
  --popover: rgba(242, 242, 242, 1.00);
  
  /* 字型 */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* 圓角 */
  --radius: 8px;
  --radius-button: 8px;
  --radius-card: 8px;
  
  /* 陰影 */
  --elevation-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
```

### 字體要求

所有組件使用 **Inter** 字體。請確保在專案中引入：

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

---

## 安裝與使用

### 在 Figma Make 專案中使用

1. 將整個 `react-components` 資料夾複製到專案中
2. 導入需要的組件和對應的 CSS：

```tsx
import { Button } from './react-components/Button';
import './react-components/Button.css';

import { Input } from './react-components/Input';
import './react-components/Input.css';
```

3. 確保專案的 `theme.css` 包含所有必需的 CSS 變數

---

## 從 GitHub 直接使用

在新的 Figma Make 專案中，可以直接從 GitHub 讀取組件：

```
請從 GitHub repo https://github.com/shihmin-chen/test 
的 react-components 資料夾讀取 UI 組件並複製到這個專案
```

---

## 設計原則

✅ **完全使用 CSS 變數** - 所有顏色、字型、圓角都來自設計系統變數  
✅ **響應式設計** - 支援不同尺寸 (sm, md, lg)  
✅ **無障礙支援** - 適當的 ARIA 屬性和鍵盤導航  
✅ **狀態管理** - 支援 hover、focus、disabled、error 等狀態  
✅ **TypeScript** - 完整的型別定義  

---

## 轉換狀態

✅ **已完成 (6/33)**
- Button
- Input
- Select
- Checkbox
- Radio / RadioGroup
- TextArea

⏳ **待轉換 (27 個組件)**
- XAutocomplete, XButtonGroup, XCard, XChip, XContextMenu 等...

---

## 貢獻與回饋

如需轉換更多組件或發現問題，請在 GitHub 建立 Issue。

**Repository:** https://github.com/shihmin-chen/test

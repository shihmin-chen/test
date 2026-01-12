# React UI Component Library

這是從 Vue XUI 組件庫轉換而來的 React 組件庫，完全使用設計系統 CSS 變數。

## ⚠️ 重要：正確的設定步驟

### 方法 A：一次導入所有樣式（推薦）

在你的主要 CSS 檔案（如 `/src/styles/global.css` 或 `/src/app/App.tsx`）中：

```tsx
// 在 App.tsx 或 main.tsx 的最頂端導入
import '../react-components/all.css';
```

**或** 在你的全域 CSS 檔案中：

```css
/* global.css */
@import '../react-components/all.css';
```

### 方法 B：按需導入個別組件樣式

```tsx
// 必須先導入 theme.css（設計系統變數）
import './react-components/theme.css';

// 然後導入需要的組件樣式
import { Button } from './react-components/Button';
import './react-components/Button.css';

import { Input } from './react-components/Input';
import './react-components/Input.css';
```

---

## 🚨 常見問題排除

### 問題：組件外觀跑掉、沒有樣式

**原因：** CSS 檔案沒有被導入

**解決方法：**

1. **確認已導入 `all.css`** 或個別組件的 CSS
2. **確認 `theme.css` 已被載入**（它包含所有 CSS 變數）
3. **檢查導入路徑是否正確**

**範例：完整的 App.tsx**

```tsx
// ✅ 正確的做法
import './react-components/all.css'; // 第一步：導入所有樣式

import { Button } from './react-components/Button';
import { Input } from './react-components/Input';
import { Select } from './react-components/Select';

function App() {
  return (
    <div>
      <Button theme="primary">點擊我</Button>
      <Input placeholder="輸入文字" />
    </div>
  );
}

export default App;
```

### 問題：顏色不對、圓角不對

**原因：** 你的專案可能有自己的 `theme.css`，覆蓋了組件的變數

**解決方法：**

選項 1：使用組件庫的 `theme.css`
```tsx
import './react-components/theme.css';
```

選項 2：在你的 `theme.css` 中確保有這些變數：
```css
:root {
  --primary: rgba(0, 103, 204, 1.00);
  --primary-foreground: rgba(255, 255, 255, 1.00);
  --destructive: rgba(191, 46, 58, 1.00);
  --muted: rgba(26, 26, 26, 0.09);
  --muted-foreground: rgba(26, 26, 26, 0.35);
  --border: rgba(26, 26, 26, 0.3);
  --radius-button: 8px;
  /* ...其他變數 */
}
```

---

## 📦 已包含的組件

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
import { Button } from './react-components/Button';

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
import { Input } from './react-components/Input';

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
import { Select } from './react-components/Select';

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
import { Checkbox } from './react-components/Checkbox';

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
import { Radio, RadioGroup } from './react-components/Radio';

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
import { TextArea } from './react-components/TextArea';

<TextArea 
  rows={5}
  placeholder="Enter your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

---

## 🎨 設計系統整合

所有組件都使用以下 CSS 變數（定義在 `theme.css`）：

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

## 📥 完整安裝範例

### 步驟 1：複製組件到專案

在 Figma Make 中，告訴 AI：
```
請從 GitHub repo https://github.com/shihmin-chen/test 
的 react-components 資料夾讀取所有檔案並複製到這個專案的 /src/components/react-components/
```

### 步驟 2：在 App.tsx 導入樣式

```tsx
// src/app/App.tsx
import './components/react-components/all.css'; // ✅ 導入所有組件樣式

import { Button } from './components/react-components/Button';
import { Input } from './components/react-components/Input';
import { Select } from './components/react-components/Select';

function App() {
  return (
    <div className="p-8">
      <h1>測試組件</h1>
      
      <div className="flex gap-4 mt-4">
        <Button theme="primary">Primary</Button>
        <Button theme="danger">Danger</Button>
        <Button theme="warning">Warning</Button>
      </div>
      
      <div className="mt-4">
        <Input label="姓名" placeholder="請輸入姓名" />
      </div>
      
      <div className="mt-4">
        <Select 
          options={[
            { value: '1', label: '選項 1' },
            { value: '2', label: '選項 2' },
          ]}
          placeholder="請選擇"
        />
      </div>
    </div>
  );
}

export default App;
```

### 步驟 3：確認樣式生效

檢查瀏覽器：
- ✅ 按鈕有藍色背景和白色文字
- ✅ 輸入框有正確的邊框和圓角
- ✅ 所有組件使用 Inter 字體

---

## 🔧 進階設定

### 自訂設計系統顏色

如果你想使用自己的設計系統顏色，有兩種方法：

**方法 1：修改 theme.css**
```css
/* react-components/theme.css */
:root {
  --primary: #你的主色; /* 改成你的顏色 */
  --radius-button: 12px; /* 改成你的圓角 */
  /* ... */
}
```

**方法 2：在你的全域 CSS 中覆蓋**
```css
/* global.css */
@import './react-components/all.css';

/* 覆蓋設計系統變數 */
:root {
  --primary: #FF6B6B !important;
  --radius-button: 16px !important;
}
```

---

## 📊 檔案結構

```
react-components/
├── all.css              ← 導入所有樣式的檔案
├── theme.css            ← 設計系統 CSS 變數
├── Button.tsx
├── Button.css
├── Input.tsx
├── Input.css
├── Select.tsx
├── Select.css
├── Checkbox.tsx
├── Checkbox.css
├── Radio.tsx
├── Radio.css
├── TextArea.tsx
├── TextArea.css
└── README.md            ← 本檔案
```

---

## ✅ 設計原則

✅ **完全使用 CSS 變數** - 所有顏色、字型、圓角都來自設計系統變數  
✅ **響應式設計** - 支援不同尺寸 (sm, md, lg)  
✅ **無障礙支援** - 適當的 ARIA 屬性和鍵盤導航  
✅ **狀態管理** - 支援 hover、focus、disabled、error 等狀態  
✅ **TypeScript** - 完整的型別定義  

---

## 🚀 轉換狀態

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

## 💡 快速檢查清單

使用組件前，請確認：

- [ ] 已導入 `all.css` 或個別組件的 CSS
- [ ] `theme.css` 的 CSS 變數已載入
- [ ] Inter 字體已引入
- [ ] 組件路徑正確（根據你的資料夾結構調整）

---

## 🆘 需要幫助？

**GitHub Repository:** https://github.com/shihmin-chen/test  
**問題回報：** 在 GitHub 上建立 Issue

---

**版本：** 1.0.0  
**最後更新：** 2026-01-12  
**作者：** 從 Vue XUI 轉換

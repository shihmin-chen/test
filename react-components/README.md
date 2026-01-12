# React UI Component Library

這是從 Vue XUI 組件庫轉換而來的 React 組件庫，完全使用設計系統 CSS 變數。

---

## 🚀 快速開始（推薦方式）

### 步驟 1：從 GitHub 複製組件

在新的 Figma Make 專案中，告訴 AI：

```
請從 GitHub repo https://github.com/shihmin-chen/test 
的 react-components 資料夾讀取所有檔案並複製到這個專案的 src/components/react-components/
```

### 步驟 2：直接使用組件（CSS 會自動載入！）

```tsx
// src/app/App.tsx
import { Button, Input, Select, Checkbox } from './components/react-components';
// ☝️ CSS 會自動載入，不需要額外 import！

function App() {
  return (
    <div className="p-8">
      <Button theme="primary">點擊我</Button>
      <Input placeholder="輸入文字" />
      <Select 
        options={[
          { value: '1', label: '選項 1' },
          { value: '2', label: '選項 2' },
        ]}
        placeholder="請選擇"
      />
      <Checkbox label="同意條款" />
    </div>
  );
}

export default App;
```

✨ **就這麼簡單！** CSS 樣式會自動載入，不需要額外的設定。

---

## 📚 可用組件

### Button - 按鈕組件

```tsx
import { Button } from './components/react-components';

// 基本用法
<Button theme="primary">Primary Button</Button>

// 不同主題
<Button theme="danger">Danger</Button>
<Button theme="warning">Warning</Button>
<Button theme="tertiary">Tertiary</Button>

// 不同尺寸
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 外框樣式
<Button theme="primary" outline>Outline</Button>

// 載入狀態
<Button loading>Loading...</Button>

// 文字按鈕
<Button display="text">Text Button</Button>

// 連結按鈕
<Button display="link" url="https://example.com">Link</Button>
```

**Props:**
- `display?: 'button' | 'text' | 'link'` - 顯示類型
- `theme?: 'primary' | 'danger' | 'warning' | 'tertiary'` - 主題顏色
- `size?: 'sm' | 'md' | 'lg'` - 尺寸
- `outline?: boolean` - 外框樣式
- `loading?: boolean` - 載入狀態
- `disabled?: boolean` - 禁用狀態
- `url?: string` - 連結 URL（會渲染為 `<a>` 標籤）
- `icon?: ReactNode` - 圖示

---

### Input - 輸入框組件

```tsx
import { Input } from './components/react-components';
import { useState } from 'react';

const [value, setValue] = useState('');

// 基本用法
<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="請輸入"
/>

// 帶標籤
<Input label="用戶名" placeholder="請輸入用戶名" />

// 必填欄位
<Input label="Email" required />

// 密碼輸入（帶顯示/隱藏按鈕）
<Input type="password" label="密碼" />

// 搜尋輸入（帶搜尋圖示）
<Input type="search" placeholder="搜尋..." />

// 錯誤狀態
<Input 
  error 
  message="用戶名不能為空" 
  placeholder="請輸入"
/>

// 小尺寸
<Input size="sm" placeholder="Small input" />

// 填充樣式
<Input fill placeholder="填充樣式" />
```

**Props:**
- `label?: string` - 標籤文字
- `type?: string` - 輸入類型（text, password, search, email, number 等）
- `size?: 'sm' | 'md'` - 尺寸
- `error?: boolean` - 錯誤狀態
- `message?: string` - 提示訊息
- `fill?: boolean` - 填充樣式
- `borderless?: boolean` - 無邊框
- `prefix?: ReactNode` - 前綴內容
- `postfix?: ReactNode` - 後綴內容
- `required?: boolean` - 必填標記

---

### Select - 下拉選單組件

```tsx
import { Select } from './components/react-components';
import { useState } from 'react';

const [selected, setSelected] = useState('');

const options = [
  { value: 'apple', label: '蘋果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子', disabled: true },
];

// 基本用法
<Select 
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="請選擇水果"
/>

// 白色主題
<Select 
  theme="white"
  options={options}
  value={selected}
  onChange={setSelected}
/>

// 小尺寸
<Select 
  size="sm"
  options={options}
  value={selected}
  onChange={setSelected}
/>

// 錯誤狀態
<Select error options={options} />
```

**Props:**
- `value?: string` - 當前選中的值
- `onChange?: (value: string) => void` - 變更回調
- `options: SelectOption[]` - 選項列表
- `placeholder?: string` - 占位符
- `size?: 'sm' | 'md'` - 尺寸
- `theme?: 'white' | 'grey'` - 主題
- `error?: boolean` - 錯誤狀態
- `disabled?: boolean` - 禁用狀態
- `prefix?: ReactNode` - 前綴圖示

---

### Checkbox - 核取方塊組件

```tsx
import { Checkbox } from './components/react-components';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

// 基本用法
<Checkbox 
  label="我同意條款"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// 不確定狀態
<Checkbox indeterminate label="全選" />

// 小尺寸
<Checkbox size="sm" label="小尺寸" />

// 錯誤狀態
<Checkbox error label="必須同意" />
```

**Props:**
- `label?: ReactNode` - 標籤文字
- `size?: 'sm' | 'md'` - 尺寸
- `indeterminate?: boolean` - 不確定狀態
- `error?: boolean` - 錯誤狀態
- `disabled?: boolean` - 禁用狀態

---

### Radio / RadioGroup - 單選按鈕組件

```tsx
import { Radio, RadioGroup } from './components/react-components';
import { useState } from 'react';

const [selected, setSelected] = useState('option1');

<RadioGroup 
  name="choice"
  value={selected}
  onChange={setSelected}
>
  <Radio value="option1" label="選項 1" />
  <Radio value="option2" label="選項 2" />
  <Radio value="option3" label="選項 3" disabled />
</RadioGroup>

// 小尺寸
<RadioGroup name="size" value={selected} onChange={setSelected}>
  <Radio value="sm" label="Small" size="sm" />
  <Radio value="md" label="Medium" size="sm" />
</RadioGroup>
```

**RadioGroup Props:**
- `name: string` - 群組名稱（必填）
- `value?: string` - 當前選中的值
- `onChange?: (value: string) => void` - 變更回調
- `error?: boolean` - 錯誤狀態

**Radio Props:**
- `value: string` - 選項值（必填）
- `label?: string` - 標籤文字
- `size?: 'sm' | 'md'` - 尺寸
- `disabled?: boolean` - 禁用狀態

---

### TextArea - 多行文字輸入組件

```tsx
import { TextArea } from './components/react-components';
import { useState } from 'react';

const [message, setMessage] = useState('');

// 基本用法
<TextArea 
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="請輸入訊息..."
  rows={5}
/>

// 錯誤狀態
<TextArea error placeholder="錯誤狀態" />

// 唯讀
<TextArea readOnly value="無法編輯" />
```

**Props:**
- `rows?: number` - 行數（預設 3）
- `error?: boolean` - 錯誤狀態
- `readOnly?: boolean` - 唯讀

---

## 🎨 設計系統整合

所有組件使用以下 CSS 變數（已包含在 `theme.css`）：

```css
:root {
  /* 顏色 */
  --primary: rgba(0, 103, 204, 1.00);
  --destructive: rgba(191, 46, 58, 1.00);
  --muted: rgba(26, 26, 26, 0.09);
  --border: rgba(26, 26, 26, 0.3);
  
  /* 圓角 */
  --radius-button: 8px;
  
  /* 字型 */
  --text-sm: 14px;
  --text-base: 16px;
  --font-weight-medium: 500;
}
```

### 自訂設計系統

如果你想使用自己的設計系統，修改 `react-components/theme.css` 中的變數即可：

```css
/* react-components/theme.css */
:root {
  --primary: #YOUR_COLOR;        /* 改成你的主色 */
  --radius-button: 12px;         /* 改成你的圓角 */
  /* ... 其他變數 */
}
```

---

## 🔧 進階用法

### 方法 A：從 index 導入（推薦）

```tsx
import { Button, Input, Select } from './components/react-components';
// CSS 自動載入 ✅
```

### 方法 B：單獨導入組件

```tsx
import { Button } from './components/react-components/Button';
import './components/react-components/Button.css';  // 需要手動導入 CSS
```

### 方法 C：導入 all.css

```tsx
import './components/react-components/all.css';  // 一次載入所有 CSS
import { Button } from './components/react-components/Button';
```

---

## 📋 完整範例

```tsx
import { useState } from 'react';
import { 
  Button, 
  Input, 
  Select, 
  Checkbox, 
  Radio, 
  RadioGroup,
  TextArea 
} from './components/react-components';

function FormExample() {
  const [name, setName] = useState('');
  const [fruit, setFruit] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log({ name, fruit, agreed, gender, message });
  };

  return (
    <div className="max-w-md mx-auto p-8 space-y-4">
      <h1>表單範例</h1>
      
      <Input 
        label="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="請輸入姓名"
        required
      />
      
      <div>
        <label className="block mb-2">選擇水果</label>
        <Select 
          options={[
            { value: 'apple', label: '蘋果' },
            { value: 'banana', label: '香蕉' },
            { value: 'orange', label: '橙子' },
          ]}
          value={fruit}
          onChange={setFruit}
          placeholder="請選擇"
        />
      </div>
      
      <Checkbox 
        label="我同意服務條款"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      
      <div>
        <label className="block mb-2">性別</label>
        <RadioGroup 
          name="gender"
          value={gender}
          onChange={setGender}
        >
          <Radio value="male" label="男" />
          <Radio value="female" label="女" />
          <Radio value="other" label="其他" />
        </RadioGroup>
      </div>
      
      <TextArea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="留言..."
        rows={4}
      />
      
      <div className="flex gap-2">
        <Button theme="primary" onClick={handleSubmit}>提交</Button>
        <Button theme="tertiary">取消</Button>
      </div>
    </div>
  );
}

export default FormExample;
```

---

## 💡 使用提示

### ✅ 推薦做法

```tsx
// ✅ 從 index 導入，CSS 自動載入
import { Button, Input } from './components/react-components';

// ✅ 使用 TypeScript 類型
import type { ButtonProps, InputProps } from './components/react-components';
```

### ❌ 不推薦做法

```tsx
// ❌ 忘記導入 CSS
import { Button } from './components/react-components/Button';
// 組件會沒有樣式！

// ❌ 重複導入 CSS
import './components/react-components/all.css';
import './components/react-components/Button.css';  // 重複了
```

---

## 🚨 疑難排解

### 問題：組件沒有樣式

**檢查清單：**
1. ✅ 是否從 `'./components/react-components'` 導入？（推薦）
2. ✅ 或者是否手動導入了 `all.css`？
3. ✅ 路徑是否正確？（根據你的資料夾結構調整）

### 問題：顏色不對

檢查 `react-components/theme.css` 中的 CSS 變數是否符合你的設計系統。

### 問題：字體不對

確保已引入 Inter 字體：
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

---

## 📁 檔案結構

```
react-components/
├── index.tsx            ← 主要入口點（自動載入 CSS）
├── all.css              ← 所有樣式的集合
├── theme.css            ← 設計系統 CSS 變數
├── Button.tsx / .css
├── Input.tsx / .css
├── Select.tsx / .css
├── Checkbox.tsx / .css
├── Radio.tsx / .css
├── TextArea.tsx / .css
└── README.md            ← 本文件
```

---

## 🎯 快速檢查清單

使用組件前，確認：

- [ ] 已從 GitHub 複製所有檔案到專案
- [ ] 使用 `import { ... } from './components/react-components'` 導入
- [ ] 組件有正確的顏色和樣式
- [ ] Inter 字體已載入

---

## 🔄 轉換狀態

✅ **已完成 (6/33)**
- Button, Input, Select, Checkbox, Radio, TextArea

⏳ **待轉換 (27 個組件)**

---

**Repository:** https://github.com/shihmin-chen/test  
**版本:** 1.1.0  
**最後更新:** 2026-01-12

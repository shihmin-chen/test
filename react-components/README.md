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
import { Button, Input, Card, Modal, Label } from './components/react-components';
// ☝️ CSS 會自動載入，不需要額外 import！

function App() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>我的卡片</CardHeader>
        <CardBody>
          <Label htmlFor="name" required>姓名</Label>
          <Input id="name" placeholder="輸入文字" />
        </CardBody>
      </Card>
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
```

**Props:**
- `display?: 'button' | 'text' | 'link'` - 顯示類型
- `theme?: 'primary' | 'danger' | 'warning' | 'tertiary'` - 主題顏色
- `size?: 'sm' | 'md' | 'lg'` - 尺寸
- `outline?: boolean` - 外框樣式
- `loading?: boolean` - 載入狀態
- `disabled?: boolean` - 禁用狀態

---

### Card - 卡片容器組件 🆕

```tsx
import { Card, CardHeader, CardBody, CardFooter, CardIcon } from './components/react-components';
import { Button } from './components/react-components';

// 基本卡片
<Card>
  <CardHeader>卡片標題</CardHeader>
  <CardBody>
    <p>這是卡片內容</p>
  </CardBody>
  <CardFooter>
    <Button theme="primary">確認</Button>
    <Button theme="tertiary">取消</Button>
  </CardFooter>
</Card>

// 帶圖示的卡片
<Card>
  <CardIcon>
    <svg>...</svg>
  </CardIcon>
  <CardHeader>通知</CardHeader>
  <CardBody>
    <p>新訊息內容</p>
  </CardBody>
</Card>

// 載入狀態的卡片
<Card>
  <CardHeader>載入中...</CardHeader>
  <CardBody busy>
    {/* 會顯示 spinner */}
  </CardBody>
</Card>
```

**Card Props:**
- `children?: ReactNode` - 內容
- `className?: string` - 自訂樣式

**CardBody Props:**
- `busy?: boolean` - 載入狀態（會顯示 spinner 覆蓋）

**特點：**
- 自動使用 `--card` 背景色
- Grid 佈局（header, icon, body, footer）
- 內建載入狀態
- 使用 `--radius-card` 圓角
- 使用 `--elevation-sm` 陰影

---

### Modal - 彈出視窗組件 🆕

```tsx
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './components/react-components';
import { Button } from './components/react-components';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>開啟 Modal</Button>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={600}
        closeOnBackdrop
      >
        <ModalHeader onClose={() => setIsOpen(false)}>
          新增住院許可證
        </ModalHeader>
        
        <ModalBody>
          <p>Modal 內容...</p>
        </ModalBody>
        
        <ModalFooter>
          <Button theme="primary">確認</Button>
          <Button theme="tertiary" onClick={() => setIsOpen(false)}>
            取消
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

**Modal Props:**
- `open: boolean` - 是否顯示（必填）
- `onClose?: () => void` - 關閉回調
- `backdrop?: boolean` - 是否顯示背景遮罩（預設 true）
- `closeOnBackdrop?: boolean` - 點擊背景關閉（預設 false）
- `closeOnEsc?: boolean` - 按 ESC 關閉（預設 true）
- `width?: number` - 寬度（預設 500px）
- `maxWidth?: string | number` - 最大寬度（預設 90vw）
- `height?: number | 'auto'` - 高度（預設 'auto'）
- `maxHeight?: string | number` - 最大高度（預設 90vh）

**ModalHeader Props:**
- `showCloseButton?: boolean` - 顯示關閉按鈕（預設 true）
- `onClose?: () => void` - 關閉回調

**特點：**
- 使用 Portal 渲染到 body
- 支援鍵盤操作（ESC 關閉）
- 漸入動畫
- 自動 focus 管理
- 背景遮罩可選

---

### Divider - 分隔線組件 🆕

```tsx
import { Divider } from './components/react-components';

// 預設分隔線（中間間距）
<Divider />

// 全寬分隔線
<Divider variant="fullWidth" />

// 不同間距大小
<Divider size="sm" />  {/* 8px 左右間距 */}
<Divider size="md" />  {/* 16px 左右間距（預設）*/}
<Divider size="lg" />  {/* 32px 左右間距 */}

// 使用 div 而非 hr
<Divider as="div" />
```

**Props:**
- `variant?: 'middle' | 'fullWidth'` - 變體（預設 'middle'）
- `size?: 'sm' | 'md' | 'lg'` - 間距大小（預設 'md'）
- `as?: 'hr' | 'div'` - HTML 元素（預設 'hr'）
- `className?: string` - 自訂樣式

---

### Label - 表單標籤組件 🆕

```tsx
import { Label, Input } from './components/react-components';

// 基本用法
<div>
  <Label htmlFor="username">用戶名</Label>
  <Input id="username" />
</div>

// 必填標記（紅色星號）
<div>
  <Label htmlFor="email" required>
    Email
  </Label>
  <Input id="email" type="email" />
</div>

// 自訂必填標記
<Label required requiredIndicator="（必填）">
  姓名
</Label>
```

**Props:**
- `children: ReactNode` - 標籤文字（必填）
- `htmlFor?: string` - 對應的 input id
- `required?: boolean` - 是否必填
- `requiredIndicator?: string` - 必填標記（預設 '*'）
- `className?: string` - 自訂樣式

**特點：**
- 使用 `--text-sm` 字體大小
- 必填標記使用 `--destructive` 顏色
- 半粗體

---

### Input - 輸入框組件

```tsx
import { Input, Label } from './components/react-components';
import { useState } from 'react';

const [value, setValue] = useState('');

// 基本用法
<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="請輸入"
/>

// 配合 Label 使用
<div>
  <Label htmlFor="name" required>姓名</Label>
  <Input id="name" placeholder="請輸入姓名" />
</div>

// 密碼輸入（帶顯示/隱藏按鈕）
<Input type="password" label="密碼" />

// 搜尋輸入（帶搜尋圖示）
<Input type="search" placeholder="搜尋..." />

// 填充樣式（用於白色背景上）
<div className="bg-card p-8">
  <Input fill placeholder="填充樣式" />
</div>
```

**Props:**
- `label?: string` - 標籤文字（會自動產生 Label 組件）
- `type?: string` - 輸入類型
- `size?: 'sm' | 'md'` - 尺寸
- `error?: boolean` - 錯誤狀態
- `fill?: boolean` - 填充樣式（用於白色背景上）
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

// 白色主題（用於淺灰背景上）
<div className="bg-card p-8">
  <Select 
    theme="white"
    options={options}
    value={selected}
    onChange={setSelected}
  />
</div>
```

**Props:**
- `value?: string` - 當前選中的值
- `onChange?: (value: string) => void` - 變更回調
- `options: SelectOption[]` - 選項列表
- `theme?: 'white' | 'grey'` - 主題
- `size?: 'sm' | 'md'` - 尺寸

---

### Checkbox - 核取方塊組件

```tsx
import { Checkbox } from './components/react-components';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox 
  label="我同意條款"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

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
```

---

### TextArea - 多行文字輸入組件

```tsx
import { TextArea } from './components/react-components';
import { useState } from 'react';

const [message, setMessage] = useState('');

<TextArea 
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="請輸入訊息..."
  rows={5}
/>
```

---

## 🎨 實戰範例

### 範例 1：登入表單（使用 Modal + Card）

```tsx
import { useState } from 'react';
import { 
  Modal, ModalHeader, ModalBody, ModalFooter,
  Input, Button, Label, Divider 
} from './components/react-components';

function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>登入</Button>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={450}
      >
        <ModalHeader onClose={() => setIsOpen(false)}>
          登入帳號
        </ModalHeader>
        
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" required>Email</Label>
              <Input 
                id="email"
                fill
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="password" required>密碼</Label>
              <Input 
                id="password"
                fill
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button theme="primary">登入</Button>
          <Button theme="tertiary" onClick={() => setIsOpen(false)}>
            取消
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### 範例 2：資料卡片（使用 Card）

```tsx
import { 
  Card, CardHeader, CardBody, CardFooter, CardIcon,
  Button, Divider 
} from './components/react-components';

function PatientCard() {
  return (
    <Card>
      <CardIcon>
        <svg width="48" height="48" viewBox="0 0 24 24">
          {/* 圖示 SVG */}
        </svg>
      </CardIcon>
      
      <CardHeader>患者資訊</CardHeader>
      
      <CardBody>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">姓名</span>
            <span>王小明</span>
          </div>
          
          <Divider size="sm" />
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">病歷號</span>
            <span>A123456789</span>
          </div>
          
          <Divider size="sm" />
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">就診日期</span>
            <span>2026-01-12</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter>
        <Button theme="primary">檢視詳情</Button>
        <Button theme="tertiary">編輯</Button>
      </CardFooter>
    </Card>
  );
}
```

### 範例 3：表單區塊（使用 Card + Label）

```tsx
import { 
  Card, CardHeader, CardBody,
  Label, Input, Select, Button 
} from './components/react-components';

function ProfileForm() {
  return (
    <div className="bg-background p-8">
      <Card>
        <CardHeader>個人資料</CardHeader>
        
        <CardBody>
          <div className="space-y-4">
            {/* 在白色卡片上使用 fill Input */}
            <div>
              <Label htmlFor="name" required>姓名</Label>
              <Input id="name" fill placeholder="請輸入姓名" />
            </div>
            
            <div>
              <Label htmlFor="phone" required>電話</Label>
              <Input id="phone" fill placeholder="請輸入電話" />
            </div>
            
            <div>
              <Label htmlFor="city">城市</Label>
              <Select
                id="city"
                theme="white"
                options={[
                  { value: 'taipei', label: '台北市' },
                  { value: 'taichung', label: '台中市' },
                ]}
                placeholder="請選擇"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button theme="primary">儲存</Button>
              <Button theme="tertiary">取消</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
```

---

## 🎨 設計系統整合

所有組件使用以下 CSS 變數（已包含在 `theme.css`）：

```css
:root {
  /* 背景顏色 */
  --background: #F5F5F5;     /* 頁面背景（深灰） */
  --card: #F2F2F2;           /* 卡片背景（淺灰） */
  
  /* 主要顏色 */
  --primary: rgba(0, 103, 204, 1.00);
  --destructive: rgba(191, 46, 58, 1.00);
  
  /* 邊框與分隔 */
  --border: rgba(26, 26, 26, 0.3);
  
  /* 圓角 */
  --radius-button: 8px;
  --radius-card: 8px;
  
  /* 陰影 */
  --elevation-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  
  /* 字型 */
  --text-sm: 14px;
  --text-base: 16px;
  --text-2xl: 24px;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
}
```

### 使用指南（參考 STYLING_GUIDELINES.md）

**Input 樣式選擇：**
- 在深灰背景（`bg-background`）上：使用 `<Input />` (預設，白底有邊框)
- 在淺灰背景（`bg-card`）上：使用 `<Input fill />` (深灰底無邊框)

**Select 主題選擇：**
- 在深灰背景上：使用 `theme="grey"` (預設)
- 在淺灰背景上：使用 `theme="white"`

---

## 📋 完整組件列表

✅ **已完成 (10/33)**

**基礎組件：**
- Button - 按鈕
- Input - 輸入框
- Select - 下拉選單
- Checkbox - 核取方塊
- Radio / RadioGroup - 單選按鈕
- TextArea - 多行輸入

**容器與佈局：** 🆕
- Card - 卡片容器
- Modal - 彈出視窗
- Divider - 分隔線
- Label - 表單標籤

⏳ **待轉換 (23 個組件)**

---

## 🔧 進階用法

### 從 index 導入（推薦）

```tsx
import { Button, Input, Card, Modal, Label } from './components/react-components';
// CSS 自動載入 ✅
```

---

## 📁 檔案結構

```
react-components/
├── index.tsx                    ← 主要入口點
├── all.css                      ← 所有樣式集合
├── theme.css                    ← 設計系統變數
├── STYLING_GUIDELINES.md        ← 樣式使用指南
├── README.md                    ← 本文件
│
├── Button.tsx / .css
├── Input.tsx / .css
├── Select.tsx / .css
├── Checkbox.tsx / .css
├── Radio.tsx / .css
├── TextArea.tsx / .css
├── Card.tsx / .css              🆕
├── Modal.tsx / .css             🆕
├── Divider.tsx / .css           🆕
└── Label.tsx / .css             🆕
```

---

**Repository:** https://github.com/shihmin-chen/test  
**版本:** 1.2.0  
**最後更新:** 2026-01-12

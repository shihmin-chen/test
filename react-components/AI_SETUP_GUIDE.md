# 🤖 AI Setup Guide

> 此文件為 AI 助理設計，包含所有必要的命令和代碼片段。

---

## ✨ 快速設置（推薦）

### 步驟 1：讀取組件清單

首先讀取 `COMPONENT_MANIFEST.json` 以了解有哪些組件可用：

```json
// https://raw.githubusercontent.com/shihmin-chen/test/main/react-components/COMPONENT_MANIFEST.json
```

### 步驟 2：複製所有檔案

讀取以下檔案並寫入相應路徑：

**核心檔案：**
- `index.tsx` → `/src/components/react-components/index.tsx`
- `all.css` → `/src/components/react-components/all.css`
- `theme.css` → `/src/components/react-components/theme.css`

**組件檔案（根據 COMPONENT_MANIFEST.json）：**
對每個組件：
- `{ComponentName}.tsx` → `/src/components/react-components/{ComponentName}.tsx`
- `{ComponentName}.css` → `/src/components/react-components/{ComponentName}.css`

### 步驟 3：修改 `/src/styles/index.css`

讀取 `/src/styles/index.css` 並修改為：

```css
@import './fonts.css';
@import './tailwind.css';
/* @import './theme.css'; */  /* ⚠️ 停用：改用元件庫的 theme.css */
```

### 步驟 4：驗證設置

在 App.tsx 中測試導入：

```tsx
import { Button, Card, Modal, Input, Label } from './components/react-components';

function App() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <Card>
        <CardHeader>測試卡片</CardHeader>
        <CardBody>
          <Label htmlFor="test" required>測試輸入</Label>
          <Input id="test" fill placeholder="請輸入" />
        </CardBody>
        <CardFooter>
          <Button theme="primary">確認</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## 📝 檔案清單（必要檔案）

### 最小安裝（只要 3 個檔案）

如果只想快速測試，只需要：

1. **index.tsx** - 導出所有組件和自動載入 CSS
2. **all.css** - 包含所有組件樣式
3. **theme.css** - 設計系統變數

然後把所有 `.tsx` 和 `.css` 檔也複製過去。

### 完整安裝（推薦）

複製整個 `react-components/` 資料夾到 `/src/components/react-components/`

---

## ⚠️ 必須執行的修改

### 1. 停用 Figma Make 預設 theme.css

**檔案：** `/src/styles/index.css`

```css
@import './fonts.css';
@import './tailwind.css';
/* @import './theme.css'; */  /* ⬅️ 註解這行 */
```

**原因：** 避免與元件庫的 theme.css 衝突。

### 2. 移除 Figma 導入代碼的透明背景

如果你從 Figma 導入了代碼，可能會有類似這樣的 className：

```tsx
// ❌ 不好 - 會造成透明
className="bg-[rgba(255,255,255,0)]"

// ✅ 好 - 移除或改成
className="bg-card"
```

---

## 🎨 使用指南

### Input 樣式選擇

```tsx
// 在深灰背景 (bg-background) 上
<div className="bg-background p-8">
  <Input placeholder="預設樣式" />  {/* 白底有邊框 */}
</div>

// 在淺灰背景 (bg-card) 上
<div className="bg-card p-8">
  <Input fill placeholder="填充樣式" />  {/* 深灰底無邊框 */}
</div>
```

### Select 主題選擇

```tsx
// 在深灰背景上
<Select options={options} />  {/* 或 theme="grey" */}

// 在淺灰背景上
<Select theme="white" options={options} />
```

### Card 使用

```tsx
import { Card, CardHeader, CardBody, CardFooter } from './components/react-components';

<Card>
  <CardHeader>標題</CardHeader>
  <CardBody>內容</CardBody>
  <CardFooter>
    <Button theme="primary">確認</Button>
  </CardFooter>
</Card>
```

### Modal 使用

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from './components/react-components';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader onClose={() => setIsOpen(false)}>標題</ModalHeader>
  <ModalBody>內容</ModalBody>
  <ModalFooter>
    <Button theme="primary">確認</Button>
  </ModalFooter>
</Modal>
```

---

## 🔍 驗證清單

設置完成後，檢查以下項目：

- [ ] `/src/styles/index.css` 中的 `@import './theme.css';` 已註解
- [ ] 所有組件檔案已複製到 `/src/components/react-components/`
- [ ] 可以正常 `import { Button } from './components/react-components'`
- [ ] 頁面背景為深灰色 (`#F5F5F5`)，不是白色或綠色
- [ ] Card 背景為淺灰色 (`#F2F2F2`)，不透明
- [ ] Modal 背景為淺灰色，不透明
- [ ] Input fill 在 Card 上有深灰背景

---

## 🐛 常見問題

### 問題 1：背景是白色或綠色

**原因：** 沒有註解 `/src/styles/index.css` 中的 `@import './theme.css';`

**解決：** 註解該行並重新啟動開發伺服器。

### 問題 2：Card 或 Modal 透明

**原因：** Figma 導入代碼包含 `bg-[rgba(255,255,255,0)]`

**解決：** 移除所有透明背景 className，改用 `bg-card`。

### 問題 3：組件沒有樣式

**原因：** CSS 沒有載入

**解決：** 確認從 `'./components/react-components'` 導入（不是單獨導入 `.tsx` 檔）。

---

## 📚 相關文件

- **README.md** - 完整使用說明
- **STYLING_GUIDELINES.md** - 樣式使用指南
- **THEME_CONFLICT_FIX.md** - Theme 衝突詳細解決指南
- **COMPONENT_MANIFEST.json** - 組件清單
- **CHANGELOG.md** - 版本更新記錄

---

## 🚀 快速命令（給 AI 使用）

```bash
# 步驟 1：讀取組件清單
read: react-components/COMPONENT_MANIFEST.json

# 步驟 2：複製核心檔案
read: react-components/index.tsx -> write: /src/components/react-components/index.tsx
read: react-components/all.css -> write: /src/components/react-components/all.css
read: react-components/theme.css -> write: /src/components/react-components/theme.css

# 步驟 3：複製所有組件檔案
# (根據 COMPONENT_MANIFEST.json 中的列表)

# 步驟 4：修改 index.css
read: /src/styles/index.css
edit: 註解 @import './theme.css';
write: /src/styles/index.css
```

---

**版本：** 1.4.0  
**更新時間：** 2026-01-12

# UI 樣式使用指南（給 AI 使用）

這份文件說明如何根據不同背景選擇正確的組件樣式。

---

## 🎨 背景顏色系統

### 主要背景層級

```css
--background: #F5F5F5    /* 灰色 - 頁面預設背景 */
--card: #F2F2F2          /* 淺灰色 - 卡片/容器背景（習慣稱為「白色」） */
```

**注意：** `--card` 是淺灰色 (#F2F2F2)，但因為很淺，設計師習慣稱為「白色」。

---

## 📊 視覺層級關係

```
頁面背景（較深灰）
└─ --background: #F5F5F5
   └─ 卡片/容器（較淺灰，視覺上接近白色）
      └─ --card: #F2F2F2
         └─ Input fill 樣式（更深灰）
            └─ --input-background: rgba(26, 26, 26, 0.16)
```

**對比度：**
- 灰色頁面 (#F5F5F5) vs 淺灰卡片 (#F2F2F2) = **微弱對比，卡片稍微突出**
- 淺灰卡片 (#F2F2F2) vs fill Input (半透明深灰) = **明顯對比**

---

## 🎯 Input 組件樣式選擇規則

### 規則 1：在深灰色背景上（頁面背景）

**使用：預設 Input（有邊框，白色背景）**

```tsx
// ✅ 正確 - 在深灰色背景上
<div className="bg-background p-8">
  <Input placeholder="搜尋..." />  {/* 預設樣式：白底 + 灰色邊框 */}
</div>
```

**視覺效果：**
- 背景：白色 `#FFFFFF`（實際是 --card，但 Input 使用純白）
- 邊框：灰色 `var(--border)`
- 在灰色頁面上很明顯

---

### 規則 2：在淺灰色背景上（卡片/容器內）

**使用：fill Input（填充樣式，無邊框）**

```tsx
// ✅ 正確 - 在淺灰色背景上
<div className="bg-card p-8">  {/* 淺灰色背景 */}
  <Input fill placeholder="搜尋..." />  {/* fill 樣式：深灰底 + 無邊框 */}
</div>
```

**視覺效果：**
- 背景：深灰 `var(--input-background)`（半透明黑色）
- 邊框：透明
- 在淺灰色容器內更柔和、更現代

---

## 📋 完整範例

### 範例 1：登入頁面（灰色背景 + 淺灰卡片）

```tsx
function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* 頁面是深灰色背景 (#F5F5F5) */}
      
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* 卡片是淺灰色背景 (#F2F2F2) */}
        
        <h2 className="mb-6">登入</h2>
        
        {/* ✅ 在淺灰色卡片上使用 fill */}
        <Input 
          fill 
          label="Email" 
          type="email" 
          placeholder="your@email.com"
        />
        
        <Input 
          fill 
          label="密碼" 
          type="password" 
          placeholder="••••••••"
        />
        
        <Button theme="primary" className="w-full mt-4">
          登入
        </Button>
      </div>
    </div>
  );
}
```

**為什麼這樣做？**
- 頁面背景 (#F5F5F5) 讓卡片 (#F2F2F2) 稍微突出
- 卡片內用 fill Input，深灰底在淺灰卡片上對比明顯
- 視覺層級清晰：頁面 → 卡片 → Input

---

### 範例 2：搜尋列（深灰色背景上）

```tsx
function SearchBar() {
  return (
    <div className="bg-background p-4">
      {/* 深灰色背景 (#F5F5F5) */}
      
      {/* ✅ 在深灰色背景上使用預設樣式（有邊框） */}
      <Input 
        type="search" 
        placeholder="搜尋產品..."
      />
    </div>
  );
}
```

**為什麼這樣做？**
- 白底有邊框的 Input 在灰色背景上更明顯
- 適合獨立的搜尋列或工具列

---

### 範例 3：表單在卡片內（淺灰色背景）

```tsx
function ProfileForm() {
  return (
    <div className="bg-card p-8 rounded-lg">
      {/* 淺灰色卡片 (#F2F2F2) */}
      
      <h3 className="mb-6">個人資料</h3>
      
      {/* ✅ 在淺灰色背景上使用 fill */}
      <Input fill label="姓名" placeholder="請輸入姓名" />
      <Input fill label="電話" placeholder="請輸入電話" />
      <Input fill label="地址" placeholder="請輸入地址" />
      
      <div className="flex gap-2 mt-6">
        <Button theme="primary">儲存</Button>
        <Button theme="tertiary">取消</Button>
      </div>
    </div>
  );
}
```

---

## 🎯 AI 生成 UI 時的判斷邏輯

### 判斷流程

```
生成 Input 組件時
    ↓
檢查父容器背景
    ↓
是淺灰色/卡片背景？(bg-card)
    ↓ 是
使用 <Input fill ... />
    ↓ 否
使用 <Input ... />  （預設樣式）
```

### 快速判斷表

| 背景顏色 | CSS 變數 | className 包含 | 使用的 Input 樣式 | 原因 |
|---------|---------|---------------|-----------------|------|
| 深灰色 | `--background` (#F5F5F5) | `bg-background` | `<Input />` | 白底有邊框在深灰上明顯 |
| 淺灰色 | `--card` (#F2F2F2) | `bg-card` | `<Input fill />` | 深灰底無邊框在淺灰上更柔和 |
| 淺灰色 | `--popover` (#F2F2F2) | `bg-popover` | `<Input fill />` | 同卡片規則 |

---

## 🔍 其他組件的背景選擇

### Select 組件

```tsx
// 在淺灰色背景上，使用 white theme（視覺上更淺）
<Select theme="white" ... />

// 在深灰色背景上，使用 grey theme（預設，視覺上較深）
<Select theme="grey" ... />
```

### Button 組件

不受背景影響，根據功能選擇：
```tsx
<Button theme="primary">主要操作</Button>
<Button theme="danger">刪除</Button>
<Button theme="tertiary">次要操作</Button>
```

---

## ⚠️ 常見錯誤

### ❌ 錯誤 1：在淺灰色背景上用預設 Input

```tsx
// ❌ 不好 - 白底在淺灰底上對比不明顯
<div className="bg-card p-8">
  <Input placeholder="搜尋" />  {/* 白底有邊框在淺灰底上不夠明顯 */}
</div>
```

### ✅ 正確

```tsx
// ✅ 好 - 深灰底在淺灰底上有對比
<div className="bg-card p-8">
  <Input fill placeholder="搜尋" />  {/* 深灰底更明顯 */}
</div>
```

---

### ❌ 錯誤 2：在深灰色背景上用 fill Input

```tsx
// ❌ 不好 - 深灰底在深灰底上對比不足
<div className="bg-background p-8">
  <Input fill placeholder="搜尋" />  {/* 深灰底在深灰底上看不清楚 */}
</div>
```

### ✅ 正確

```tsx
// ✅ 好 - 白底在深灰底上有對比
<div className="bg-background p-8">
  <Input placeholder="搜尋" />  {/* 白底有邊框更明顯 */}
</div>
```

---

## 📝 總結：快速參考

```tsx
// 頁面背景（深灰色 #F5F5F5）
<div className="bg-background">
  <Input />  {/* 預設：白底 + 邊框 */}
</div>

// 卡片/容器（淺灰色 #F2F2F2）
<div className="bg-card">
  <Input fill />  {/* fill：深灰底 + 無邊框 */}
</div>

// Modal/Popover（淺灰色 #F2F2F2）
<div className="bg-popover">
  <Input fill />  {/* fill：深灰底 + 無邊框 */}
</div>
```

---

## 🎨 顏色對比度說明

```
深灰色 (#F5F5F5)
└─ 白色 Input (#FFFFFF + 邊框) ← 明顯對比 ✅
└─ fill Input (深灰半透明) ← 對比不足 ❌

淺灰色 (#F2F2F2)
└─ 白色 Input (#FFFFFF + 邊框) ← 對比微弱 ❌
└─ fill Input (深灰半透明) ← 明顯對比 ✅
```

---

**記住：淺灰色容器內用 `fill`，深灰色背景上用預設！** 🎨

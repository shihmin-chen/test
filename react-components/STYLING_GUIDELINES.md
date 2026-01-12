# UI 樣式使用指南（給 AI 使用）

這份文件說明如何根據不同背景選擇正確的組件樣式。

---

## 📐 背景顏色系統

### 主要背景層級

```css
--background: #F5F5F5    /* 灰色 - 頁面預設背景 */
--card: #FFFFFF          /* 白色 - 卡片/容器背景 */
```

---

## 🎨 Input 組件樣式選擇規則

### 規則 1：在灰色背景上（頁面背景）

**使用：預設 Input（有邊框）**

```tsx
// ✅ 正確 - 在灰色背景上
<div className="bg-background p-8">
  <Input placeholder="搜尋..." />  {/* 預設樣式：白底 + 灰色邊框 */}
</div>
```

**視覺效果：**
- 背景：白色 `#FFFFFF`
- 邊框：灰色 `var(--border)`
- 在灰色頁面上很明顯

---

### 規則 2：在白色背景上（卡片/容器內）

**使用：fill Input（填充樣式，無邊框）**

```tsx
// ✅ 正確 - 在白色背景上
<div className="bg-card p-8">  {/* 白色背景 */}
  <Input fill placeholder="搜尋..." />  {/* fill 樣式：灰底 + 無邊框 */}
</div>
```

**視覺效果：**
- 背景：淺灰 `var(--input-background)`
- 邊框：透明
- 在白色容器內更柔和、更現代

---

## 📋 完整範例

### 範例 1：登入頁面（灰色背景）

```tsx
function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* 頁面是灰色背景 */}
      
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* 卡片是白色背景 */}
        
        <h2 className="mb-6">登入</h2>
        
        {/* ✅ 在白色卡片上使用 fill */}
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

---

### 範例 2：搜尋列（灰色背景上）

```tsx
function SearchBar() {
  return (
    <div className="bg-background p-4">
      {/* 灰色背景 */}
      
      {/* ✅ 在灰色背景上使用預設樣式（有邊框） */}
      <Input 
        type="search" 
        placeholder="搜尋產品..."
      />
    </div>
  );
}
```

---

### 範例 3：表單在卡片內（白色背景）

```tsx
function ProfileForm() {
  return (
    <div className="bg-card p-8 rounded-lg">
      {/* 白色卡片 */}
      
      <h3 className="mb-6">個人資料</h3>
      
      {/* ✅ 在白色背景上使用 fill */}
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
是白色/卡片背景？
    ↓ 是
使用 <Input fill ... />
    ↓ 否
使用 <Input ... />  （預設樣式）
```

### 快速判斷表

| 背景顏色 | className 包含 | 使用的 Input 樣式 | 原因 |
|---------|---------------|-----------------|------|
| 灰色 | `bg-background` | `<Input />` | 白底有邊框在灰色上明顯 |
| 白色 | `bg-card`, `bg-white` | `<Input fill />` | 灰底無邊框在白色上更柔和 |
| 其他白色 | `bg-popover` | `<Input fill />` | 同白色規則 |

---

## 🔍 其他組件的背景選擇

### Select 組件

```tsx
// 在白色背景上，使用 white theme
<Select theme="white" ... />

// 在灰色背景上，使用 grey theme（預設）
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

### ❌ 錯誤 1：在白色背景上用預設 Input

```tsx
// ❌ 不好 - 白底上白底，邊界不明顯
<div className="bg-card p-8">
  <Input placeholder="搜尋" />  {/* 白底有邊框在白底上不明顯 */}
</div>
```

### ✅ 正確

```tsx
// ✅ 好 - 白底上灰底，有對比
<div className="bg-card p-8">
  <Input fill placeholder="搜尋" />  {/* 灰底無邊框更柔和 */}
</div>
```

---

### ❌ 錯誤 2：在灰色背景上用 fill Input

```tsx
// ❌ 不好 - 灰底上灰底，對比不足
<div className="bg-background p-8">
  <Input fill placeholder="搜尋" />  {/* 灰底在灰底上看不清楚 */}
</div>
```

### ✅ 正確

```tsx
// ✅ 好 - 灰底上白底，有對比
<div className="bg-background p-8">
  <Input placeholder="搜尋" />  {/* 白底有邊框更明顯 */}
</div>
```

---

## 📝 總結：快速參考

```tsx
// 頁面背景（灰色）
<div className="bg-background">
  <Input />  {/* 預設：白底 + 邊框 */}
</div>

// 卡片/容器（白色）
<div className="bg-card">
  <Input fill />  {/* fill：灰底 + 無邊框 */}
</div>

// Modal/Popover（白色）
<div className="bg-popover">
  <Input fill />  {/* fill：灰底 + 無邊框 */}
</div>
```

---

**記住：白色容器內用 `fill`，灰色背景上用預設！** 🎨

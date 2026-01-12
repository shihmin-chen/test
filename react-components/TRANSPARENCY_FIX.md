# 🔧 透明度問題修復指南

## 🐛 問題描述

當從 Figma 導入設計或使用組件時，可能會遇到 Card 或 Modal **透明**的問題，可以看穿下層的內容。

### 常見症狀

- ✅ Card 應該是淺灰色 (#F2F2F2)，但看起來透明
- ✅ Modal 應該是淺灰色，但可以看穿到背景
- ✅ 組件重疊時，下層內容清晰可見

---

## 🔍 原因分析

### 1. Figma 導入代碼使用透明背景

Figma 設計稿轉換成代碼時，可能會生成類似這樣的 className：

```tsx
// ❌ 問題代碼
<div className="bg-[rgba(255,255,255,0)]">
  <Card>
    <CardHeader>標題</CardHeader>
  </Card>
</div>
```

`rgba(255,255,255,0)` 的最後一個參數 `0` 表示**完全透明**。

### 2. Tailwind CSS inline class 優先級過高

Tailwind 的 `bg-[...]` 語法會生成高優先級的 CSS，覆蓋組件庫的背景色設置。

---

## ✅ 解決方案

### 方案 1：移除透明背景 className（推薦）

找到所有使用透明背景的元素，移除或修改 className：

```tsx
// ❌ 錯誤
<div className="bg-[rgba(255,255,255,0)]">
  <Card>...</Card>
</div>

// ✅ 修正 - 直接移除
<div>
  <Card>...</Card>
</div>

// ✅ 或者改用正確的背景色
<div className="bg-background">
  <Card>...</Card>
</div>
```

### 方案 2：使用 !important（已內建）

組件庫的 Card.css 和 Modal.css 已經包含 `!important`：

```css
/* Card.css */
.card-container {
  background-color: var(--card) !important;  /* ✅ 強制使用正確背景色 */
}

/* Modal.css */
.modal-content {
  background-color: var(--card) !important;  /* ✅ 強制使用正確背景色 */
}
```

這應該能覆蓋大部分的 inline class。

### 方案 3：使用 inline style（最後手段）

如果 `!important` 仍然無效，使用 inline style：

```tsx
<Card style={{ backgroundColor: 'var(--card)' }}>
  <CardHeader>標題</CardHeader>
  <CardBody>內容</CardBody>
</Card>
```

---

## 🔍 如何檢查透明度問題

### 1. 使用開發者工具檢查

1. 在瀏覽器中右鍵點擊透明的 Card 或 Modal
2. 選擇「檢查」或「Inspect」
3. 查看 Computed 標籤頁
4. 找到 `background-color` 屬性

**正確的值：**
```css
background-color: rgb(242, 242, 242);  /* ✅ #F2F2F2 淺灰色 */
```

**錯誤的值：**
```css
background-color: rgba(255, 255, 255, 0);  /* ❌ 透明 */
background-color: transparent;              /* ❌ 透明 */
```

### 2. 視覺檢查

**正確的視覺層級：**
```
深灰頁面 (#F5F5F5)
  └─ 淺灰卡片 (#F2F2F2) ← 微弱對比，不透明 ✅
      └─ 深灰 Input fill (rgba(26,26,26,0.16))
```

如果你能清楚看穿 Card 到背景，代表有透明度問題。

---

## 📝 常見場景和解決方案

### 場景 1：Figma 導入的容器包裹 Card

```tsx
// ❌ 問題代碼（Figma 自動生成）
function Container() {
  return (
    <div className="bg-[rgba(255,255,255,0)] p-8">  {/* 透明背景 */}
      <Card>
        <CardHeader>標題</CardHeader>
        <CardBody>內容</CardBody>
      </Card>
    </div>
  );
}

// ✅ 修正
function Container() {
  return (
    <div className="p-8">  {/* 移除透明背景 */}
      <Card>
        <CardHeader>標題</CardHeader>
        <CardBody>內容</CardBody>
      </Card>
    </div>
  );
}
```

### 場景 2：Modal 內的 Card 透明

```tsx
// ❌ 問題
<Modal open={isOpen} onClose={handleClose}>
  <div className="bg-[rgba(255,255,255,0)]">  {/* 這會讓 Modal 透明 */}
    <ModalHeader>標題</ModalHeader>
    <ModalBody>...</ModalBody>
  </div>
</Modal>

// ✅ 修正
<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader>標題</ModalHeader>
  <ModalBody>...</ModalBody>
</Modal>
```

### 場景 3：Grid 或 Flex 容器中的 Card

```tsx
// ❌ 問題
<div className="grid grid-cols-2 gap-4">
  <div className="bg-[rgba(255,255,255,0)]">
    <Card>...</Card>
  </div>
  <div className="bg-[rgba(255,255,255,0)]">
    <Card>...</Card>
  </div>
</div>

// ✅ 修正
<div className="grid grid-cols-2 gap-4">
  <Card>...</Card>
  <Card>...</Card>
</div>
```

---

## 🛠️ 自動化查找和修復

### 查找所有透明背景

使用文件搜尋功能，搜尋以下模式：

```regex
bg-\[rgba\(.*,\s*0\)\]
```

這會找到所有使用透明背景的 className。

### 批量替換

**替換模式 1：移除整個 className**
```
查找: className="bg-\[rgba\(.*,\s*0\)\]"
替換: 
```

**替換模式 2：改用正確的背景色**
```
查找: bg-\[rgba\(.*,\s*0\)\]
替換: bg-background
```

---

## ⚠️ 預防措施

### 1. 審查 Figma 導入代碼

每次從 Figma 導入設計後，檢查代碼中是否有：
- `bg-[rgba(255,255,255,0)]`
- `bg-transparent`
- `opacity: 0`
- `background-color: transparent`

### 2. 使用設計系統變數

優先使用 CSS 變數而非 inline class：

```tsx
// ✅ 好 - 使用 CSS 變數
<div className="bg-background">
<div className="bg-card">
<div style={{ backgroundColor: 'var(--card)' }}>

// ❌ 避免 - 硬編碼顏色
<div className="bg-[#F2F2F2]">
<div className="bg-[rgba(242,242,242,1)]">
```

### 3. 定期檢查

在開發過程中，定期打開開發者工具檢查組件的背景色是否正確。

---

## 📊 對比表

| 情況 | 背景色 | 結果 |
|------|--------|------|
| 正確設置 | `rgb(242, 242, 242)` | ✅ 不透明，淺灰色 |
| 透明問題 | `rgba(255, 255, 255, 0)` | ❌ 完全透明 |
| 半透明問題 | `rgba(242, 242, 242, 0.5)` | ⚠️ 半透明 |
| 使用 transparent | `transparent` | ❌ 完全透明 |

---

## 🎯 檢查清單

修復透明度問題後，確認：

- [ ] Card 背景是淺灰色 (#F2F2F2)，不透明
- [ ] Modal 背景是淺灰色，不透明
- [ ] Card 在頁面上有微弱對比（比背景稍亮）
- [ ] 重疊的組件不會互相透視
- [ ] 沒有 `bg-[rgba(...,0)]` className
- [ ] 開發者工具顯示正確的 background-color

---

## 📚 相關文檔

- **THEME_CONFLICT_FIX.md** - Theme CSS 衝突解決
- **STYLING_GUIDELINES.md** - 樣式使用指南
- **README.md** - 組件使用說明

---

**更新時間：** 2026-01-12  
**版本：** 1.4.1

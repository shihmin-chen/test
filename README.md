xUI - xHIS Common UI
===

About xUI
---
xUI is the core UI component framework designed to work with xHIS. Most of the functionality is maintained by ourself, AICS. Create a custom UI framework can let us match our need without fighting against other UI framework.

Since xUI is part of frontend monorepo, it can be develop directly inside this repo and work out of the box thanks to Vite resolving mechanism.

Develop
---
Install all dependencies beforehand:
```
npm install
```

---

### Start a dev server


**In the xui directory**:
```
npm run start
```

The vite server should be run and exposed as http://localhost:3060/

---

### Develop a Component

#### Structure

All of the component should be placed under `./src/components/<component-name>`, each folder may contain multiple component as long as they all named as `X<Something>` and are **named exported** from the `index.ts`.

> It is recommended to breakdown *as many components as you can*, since most of the template logic should be similar in our system.

The rules of component name:

- **CamelCase** to avoid misleading with custom element
- Prefix with `X`
- Do not take any abbrev unless it is common abbrev

Good:

- `XIconButton`: X prefix, CamelCase, easy guess naming
- `XTable`: You can alway use single word without worrying conflict with native element since it's prefixed.

Bad or debated:

- `CardBasic`: not prefixed with X
- `XBtn`: **btn** might introduce some trouble when using it, eg. is it btn or button, top or tp?
- `xTooltip`: CamelCase please

#### Style

You can use SFC as your style source, but do not use **module** or **scoped** mode. Scoped will increase CSS specificity "a lot" and make other style hard to overwrite it. Module will make the css name more difficult to guess and maintain, it also assuming that you are using bundler to bind the hash into your component.

#### Naming of style

**Alternated BEM Style**

- Prefix with `x`
- Abbrev allow since it might be too long
- Use only `-` as conjunction, no underscore `_` is allow
- Follow by previous rule, block and element name should be consider more wisely
- For the modifier, use double dash `--`
- Avoid nested css style if possible

Good:

```scss
/* scss */
.x-btn {
  &:hover { }
  &:active { }
  &:focus { }
  &--secondary { }
}
```

Bad:

```css
.x-btn__sync{
  /* under score is not allow */
}
.x-card .x-card-btn{
  /* unnecessary nested css */
}
.x-card span{
  /* DO NOT select any common native element */
  /* Bad performance */
}
/* Compiled CSS */
.cqe68f4.x-card{
  /* avoid module css */
}
.x-card[v-a7b91j]{
  /* avoid scoped css */
}
```

#### Component Implementation

**Interface**

- Provide default slot if it mainly show one props
- Provide additional named slot if possible
- Avoid to use fragment component. If used, bind the `$attrs` to proper dom and provide other binding point to rest of the element.
- Props should be typed

**Implementation**

- Be aware of ARIA and semantic element
- Be aware of all possible interaction
- Write all composition api outside the setup function, only composite them inside setup.
- Add fallback and overwrite options if possible
- Avoid long statement function, break them into atomic function

**Test**

- Test should be maintain beside the components, and test the interaction rather the implementation.
- Composition API should be test separated if possible.

> `test-id` attribute is current not stripped from production bundle, make sure we implement the striping plugin afterward.

#### Demo document

If any `demo.vue` file is include inside `./src/components/`, it will be fetched by demo document, showing with a tab entry and display the content of it. One should keep in mind that it should contain `tabName` property inside the exported component.

`demo.vue`:
```js
export default defineComponent({
  name: 'whatever',
  tabName: 'XSomething', // this will show as tab name in demo page
})
```

**About Code Block**

We implement yet another highlighting component with prismJS, called `<PrismCode />`, you can use it as follow, the component is registered globally and fully typed within volar lang service.

```html
<template>
  <!-- Slot style -->
  <PrismCode lang='js'>
    const hello = 'world';
  </PrismCode>
  <!-- Props style -->
  <PrismCode block :code='myScss' lang='scss' />
</template>
```

> DO NOT use PrismCode in your production code, it's should not shipped to customer.

#### Introducing new dependencies

Having any unnecessary dependency inside a frontend based library can lead to unpleasant bundle size, although some might be tree shakable, but tree shake is a complex problem in current bundler ecosystem. None of one can provide a clean, robust and compatible solution even with es-module. It just too messy to maintain.

Rules of thumb:

- Unless it is tricky to implement by our self, don't introduce new package inside xUI.
- If the dependencies might be used outside of xUI system, consider to re-export it.
- If the dependencies bundle size is larger than 30KB, think twice.
                                           
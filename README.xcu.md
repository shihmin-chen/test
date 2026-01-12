xCU - xHIS Common UI
===

### Init XCU

1. install XUI
   - 不用再安裝 XCU
   - Migration 的情況：
     - 安裝 XUI 2.0.0-master.17 版本後，如果仍有裝 XCU，要移除 XCU，並且將原本的import @asus-aics/xcu 直接改成 import @asus-aics/xui 即可
2. install package:
   - unocss
3. update App.vue
    #### Insert XCUInit in root template to wrap all components
    ```
    <template>
      <XCUInit>
        ...
      </XCUInit>
    </template>

    <script setup lang="ts">
      import { XCUInit } from '@asus-aics/xui';
    </script>
    ```
4. 用 import 方式使用 getter XCU() :
   - import { XCU } from @asus-aics/xui   
   - 利用 XCU().xxx... 去存取，無法直接使用 XCU.xxx... 的型式
4. 用全域方式使用 XCU:
   - update eslint.config.js to add (非必要)
    ```
    languageOptions: {
      globals: {
        XCU: 'readonly',
      },
    }
    ```
   - add folder and file in root folder:
    #### types/global.d.ts
    ```
    import { xCUInterface } from '@asus-aics/xui';

    declare global {
      let XCU: xCUInterface;
    }

    export {};
    ```
   - update tsconfig.ts to add
    ```
    "compilerOptions": {
      "typeRoots": ["./types", "./node_modules/@types"],
    }

    "include": [
      "types/global.d.ts"
    ]
    ```



### Mock XCU

in *.spec.ts:

```
  直接使用:
  useMockXCU();

  或在 beforeEach 內使用
  beforeEach(() => {
    useMockXCU();
  });
```

if you want to mock a specify function, you can use e.g.: 
```
XCU.Toast.showToast = jest.fn();
```
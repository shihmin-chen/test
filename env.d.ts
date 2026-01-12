/// <reference types="@asus-aics/vite-plugin-svg-loader" />
/// <reference types="vite/client" />

declare module '*.md' {
  import { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}


declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}


/** process env package version, defined in vite config */
declare const __XUI_VERSION__: string;

/** Whether running in production mode */
declare const __XUI_IS_PROD__: boolean;
/** Whether running in development mode */
declare const __XUI_IS_DEV__: boolean;
/** Whether running in document preview mode */
declare const __XUI_IS_PREVIEW__: boolean;

/** Available icon name found in component */
declare const __XUI_ICON_NAMES__: string[];

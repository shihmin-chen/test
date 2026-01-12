import { PrismCode } from '@asus-aics/prism-code';

/**
 * Provide global component definition
 * @see https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar
 */

declare module 'vue' {
  export interface GlobalComponents {
    PrismCode: typeof PrismCode;
    'prism-code': typeof PrismCode;
  }
}

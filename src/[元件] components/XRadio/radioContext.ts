import { InjectionKey } from 'vue';

export interface RadioContext {
  modelValue: string;
  name: string;
  error: boolean;
  minWidth?: string;
}

const contextKey: InjectionKey<RadioContext> = Symbol('XRadioButton');

export { contextKey };

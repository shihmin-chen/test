import {
  XButtonDisplayType,
  XButtonSize,
  XButtonTheme,
  XDialogLayoutTheme,
  XToastPlacement,
  XToastTheme,
} from '../../../index';
import { ComputedRef, MaybeRef, Ref, WritableComputedRef } from 'vue';

export type MaybeRefOrComputed<T> = MaybeRef<T> | ComputedRef<T>;
export type MaybeRefOrWritableComputed<T> = MaybeRef<T> | WritableComputedRef<T>;
export type RefOrComputed<T> = Ref<T> | ComputedRef<T>;
export type RefOrWritableComputed<T> = Ref<T> | WritableComputedRef<T>;

export interface ButtonProps {
  display?: XButtonDisplayType;
  theme?: XButtonTheme;
  size?: XButtonSize;
  outline?: boolean;
  visited?: boolean;
  loading?: boolean;
  disabled?: boolean;
  url?: string;
  icon?: string | Record<string, unknown>;
  [s: string]: unknown;
}

export interface XToastProps {
  visible: boolean;
  content?: string;
  labelContent?: string;
  theme?: XToastTheme;
  isLabelContent?: boolean;
  target?: string;
  customStyle?: () => Record<string, boolean>;
  noAutoHide?: boolean;
  placement?: XToastPlacement;
  autoHideDelay?: number;
  enableMaskedBackground?: boolean;
  zIndexShift?: number;
}

export interface ConfirmDialogProps {
  title: MaybeRef<string>;
  content?: MaybeRef<string | string[]>;
  theme?: MaybeRef<XDialogLayoutTheme>;
  isHiddenIcon?: MaybeRef<boolean>;
  width?: MaybeRef<number>;
  height?: MaybeRef<number>;
  boxShadow?: MaybeRef<boolean>;
  primaryButton?: MaybeRef<ButtonProps & { text: string }>;
  secondaryButton?: MaybeRef<ButtonProps & { text: string }>;
  tertiaryButton?: MaybeRef<ButtonProps & { text: string }>;
}

export const availableTypes = ['text', 'time', 'password', 'search', 'url', 'email', 'number'] as const;
export type AvailableType = typeof availableTypes[number];

export interface InputTextProps {
  type?: AvailableType;
  size?: 'sm' | 'md';
  inline?: boolean;
  borderless?: boolean;
  defaultVisibility?: boolean;
  inputAttrs?: Record<string, unknown>;
  inputStyle?: Record<string, unknown>;
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorIcon?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  fill?: boolean;
  autofocus?: boolean;
  selectText?: boolean;
  message?: string;
  showSelectedResults?: boolean;
  selectedResults?: [];
}

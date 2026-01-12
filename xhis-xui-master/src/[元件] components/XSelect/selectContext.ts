/**
 * XSelect menu item
 */
export type SelectMenuItem = {
  /** label to show in option */
  label: string;
  /** value to used in select value, should be unique */
  value: string;
  /** value to disable current option */
  disabled?: boolean;
};

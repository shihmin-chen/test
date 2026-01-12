/**
 * Available type for InlineMessage
 */
export const inlineMessageType = [
  'success',
  'info',
  'alert',
  'error',
  'warning',
];
export type XInlineMessageType = typeof inlineMessageType[number];
/**
 * Available label placement for InlineMessage
 */
export type XInlineMessageLabelPlacement = 'down' | 'right';

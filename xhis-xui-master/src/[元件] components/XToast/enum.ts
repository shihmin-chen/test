export enum XToastTheme {
  Success = 'success',
  Neutral = 'neutral',
  Warning = 'warning',
  Error = 'error',
  Informational = 'informational',
}
export type XToastThemeType = `${XToastTheme}`;

export enum XToastPlacement {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
}
export type XToastPlacementType = `${XToastPlacement}`;

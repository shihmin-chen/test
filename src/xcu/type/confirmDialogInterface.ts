import { ConfirmDialogProps } from './interface';

export enum ConfirmDialogResolveType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

// Note: don't use InstanceType<typeof ConfirmDialog>['$props']; this will return "any" type.
export type ConfirmDialogArgs = ConfirmDialogProps;

export interface ConfirmDialogResult {
  resolveType: ConfirmDialogResolveType;
}

import { XDialogLayoutTheme } from '../../../../index';
import {
  ConfirmDialogArgs,
  ConfirmDialogResolveType,
  ConfirmDialogResult,
} from '../../type';
import { useRequestDangerConfirmDialog } from './DangerConfirmDialog';

describe('useRequestDangerConfirmDialog', () => {
  it('should request a danger confirm dialog with the correct theme and resolve type', async () => {
    const mockRequestConfirmDialog = jest.fn(
      async (args: ConfirmDialogArgs): Promise<ConfirmDialogResult> => ({
        resolveType: ConfirmDialogResolveType.Primary,
      }),
    );

    const requestDangerConfirmDialog = useRequestDangerConfirmDialog(
      mockRequestConfirmDialog,
    );

    const dialogArgs: ConfirmDialogArgs = {
      title: 'Are you sure?',
      message: 'This action is irreversible.',
    };

    const result = await requestDangerConfirmDialog(dialogArgs);

    expect(mockRequestConfirmDialog).toHaveBeenCalledWith(
      {
        ...dialogArgs,
        theme: XDialogLayoutTheme.Danger,
      },
      {},
    );
    expect(result).toBe(true);
  });

  it('should return false if the resolve type is not primary', async () => {
    const mockRequestConfirmDialog = jest.fn(
      async (args: ConfirmDialogArgs): Promise<ConfirmDialogResult> => ({
        resolveType: ConfirmDialogResolveType.Secondary,
      }),
    );

    const requestDangerConfirmDialog = useRequestDangerConfirmDialog(
      mockRequestConfirmDialog,
    );

    const dialogArgs: ConfirmDialogArgs = {
      title: 'Are you sure?',
      message: 'This action is irreversible.',
    };

    const result = await requestDangerConfirmDialog(dialogArgs);

    expect(mockRequestConfirmDialog).toHaveBeenCalledWith(
      {
        ...dialogArgs,
        theme: XDialogLayoutTheme.Danger,
      },
      {},
    );
    expect(result).toBe(false);
  });
});

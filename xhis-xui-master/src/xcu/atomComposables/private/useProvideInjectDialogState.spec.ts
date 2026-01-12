import { createInjectionState } from '@vueuse/core';

import { useProvideInjectTransientDialogState } from './useProvideInjectDialogState';

jest.mock('@vueuse/core', () => ({
  createInjectionState: jest.fn(),
}));

jest.mock('./useDialog', () => ({
  useTransientDialog: jest.fn(),
}));

describe('useProvideInjectTransientDialogState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide and inject dialog state correctly', () => {
    const mockRequest = jest.fn();
    const mockState = { request: mockRequest };
    const mockUseInjectDialogState = jest.fn(() => mockState);
    (createInjectionState as jest.Mock).mockReturnValue([
      jest.fn(),
      mockUseInjectDialogState,
    ]);

    const { useProvideDialogState, useInjectDialogState } =
      useProvideInjectTransientDialogState();

    expect(createInjectionState).toHaveBeenCalledWith(expect.any(Function));
    expect(typeof useProvideDialogState).toBe('function');
    expect(typeof useInjectDialogState).toBe('function');

    const injectedState = useInjectDialogState();
    expect(injectedState.request).toBe(mockRequest);
  });

  it('should throw an error if dialog state is not provided', () => {
    const mockUseInjectDialogState = jest.fn(() => undefined);
    (createInjectionState as jest.Mock).mockReturnValue([
      jest.fn(),
      mockUseInjectDialogState,
    ]);

    const { useInjectDialogState } = useProvideInjectTransientDialogState();

    expect(() => useInjectDialogState()).toThrow('Dialog is not provided');
  });
});

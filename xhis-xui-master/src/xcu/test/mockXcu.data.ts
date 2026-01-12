/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable vue/one-component-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, ref } from 'vue';
import { xCUInterface } from '..';

declare const global: any;

/**
 * Usage:
 *    use this function in beforeEach hook of jest
 *
 *    beforeEach(() => {
 *     useMockXCU();
 *    });
 *
 *    if you want to mock single function,
 *    you can use e.g.: XCU.Toast.showToast = jest.fn();
 */
export const useMockXCU = () => {
  (globalThis as any).mockXcuReady = ref(true);
  (global as any).XCU = genMockXcu();
};

export const genMockXcu = () => {
  const mockXcu: xCUInterface = {
    Atom: {
      Ui: {
        CheckboxAll: defineComponent({}) as any,
        CheckboxGroup: defineComponent({}) as any,
        HeaderWithStarDescription: defineComponent({}) as any,
        HorizontalLine: defineComponent({}) as any,
        RequiredAsterisk: defineComponent({}) as any,
        TitleWithRequiredStar: defineComponent({}) as any,
        TwoButtons: defineComponent({}) as any,
      },
      Use: {
        useCheckboxGroupLinkage: () => ({
          CheckboxAll: defineComponent({}) as any as any,
          CheckboxGroup: defineComponent({}) as any as any,
        }),
      },
    },
    Buttons: {
      Use: {
        useTwoButtonsForConfirm: () => ({ template: defineComponent({}) as any as any }),
      },
    },
    Checkbox: {
      Ui: {
        HorizontalCheckboxGroupWithTitle: defineComponent({}) as any,
      },
      Use: {
        useHorizontalCheckboxGroupWithTitle: () => ({ template: defineComponent({}) as any as any }),
      },
    },
    Dialog: {
      Ui: {
        ConfirmDialog: defineComponent({}) as any,
        ConfirmDialogSlot: defineComponent({}) as any as any,
      },
      Use: {
        useTransientDialog: () => ({ TransientDialogTemplate: defineComponent({}) as any, request: (() => {}) as any }),
        useConfirmDialogSlot: () => ({
          template: defineComponent({}) as any as any,
          requestContainer: { request: (() => {}) as any },
        }),
      },
      Utils: {
        requestConfirmDialog: (() => {}) as any,
        requestDangerConfirmDialog: (() => {}) as any,
      },
    },
    InputText: {
      Ui: {
        Drug: {
          SelectableDrugSearchInputText: defineComponent({}) as any as any,
        },
        InputTextWithTitle: defineComponent({}) as any,
        SearchInputTextWithTitle: defineComponent({}) as any,
      },
      Use: {
        Drug: {
          useSelectableDrugSearchInputText: () => ({ template: defineComponent({}) as any as any, result: {} as any }),
        },
        useInputTextWithTitle: () => ({ template: defineComponent({}) as any as any, result: {} as any }),
        useSearchInputTextWithTitle: () => ({ template: defineComponent({}) as any as any, result: {} as any }),
      },
    },

    RadioButton: {
      Ui: {
        HorizontalRadioButtonGroupWithTitle: defineComponent({}) as any,
        RadioButtonGroupWithTitle: defineComponent({}) as any,
        VerticalRadioButtonGroupWithTitle: defineComponent({}) as any,
      },
      Use: {
        useHorizontalRadioButtonGroupWithTitle: () => ({ template: defineComponent({}) as any, result: {} as any }),
        useRadioButtonGroupWithTitle: () => ({ template: defineComponent({}) as any, result: {} as any }),
        useVerticalRadioButtonGroupWithTitle: () => ({ template: defineComponent({}) as any, result: {} as any }),
      },
    },

    Toast: {
      hideToast: () => {},
      showToast: () => {},
      showNeutralToast: () => {},
      showNeutralToastNoAutoHide: () => {},
      showErrorToast: () => {},
      showSuccessToast: () => {},
      showWarningToast: () => {},
      showInformationalToast: () => {},
    },
  };

  return mockXcu;
};

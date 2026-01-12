import { useInjectConfirmDialogState } from './atomComposables/private/useConfirmDialog';
import { useTransientDialog } from './atomComposables/private/useDialog';
import { useInjectGlobalToastState } from './atomComposables/private/useToast';
import { useCheckboxGroupLinkage } from './atomComposables/useCheckboxGroupLinkage';
import CheckboxAll from './atomUI/CheckboxAll.vue';
import CheckboxGroup from './atomUI/CheckboxGroup.vue';
import HeaderWithStarDescription from './atomUI/HeaderWithStarDescription.vue';
import HorizontalLine from './atomUI/HorizontalLine.vue';
import RequiredAsterisk from './atomUI/RequiredAsterisk.vue';
import TitleWithRequiredStar from './atomUI/TitleWithRequiredStar.vue';
import TwoButtons from './atomUI/TwoButtons.vue';
import { useTwoButtonsForConfirm } from './combineUI/Buttons/TwoButtons/TwoButtonsForConfirm';
import { useHorizontalCheckboxGroupWithTitle } from './combineUI/Checkbox/HorizontalCheckboxGroupWithTitle';
import HorizontalCheckboxGroupWithTitle from './combineUI/Checkbox/HorizontalCheckboxGroupWithTitle.vue';
import ConfirmDialog from './combineUI/Dialog/ConfirmDialog.vue';
import { useConfirmDialogSlot } from './combineUI/Dialog/ConfirmDialogSlot';
import ConfirmDialogSlot from './combineUI/Dialog/ConfirmDialogSlot.vue';
import { useRequestDangerConfirmDialog } from './combineUI/Dialog/DangerConfirmDialog';
import { useSelectableDrugSearchInputText } from './combineUI/InputText/Drug/SelectableDrugSearchInputText/SelectableDrugSearchInputText';
import SelectableDrugSearchInputText from './combineUI/InputText/Drug/SelectableDrugSearchInputText/SelectableDrugSearchInputText.vue';
import { useInputTextWithTitle } from './combineUI/InputText/InputTextWithTitle/InputTextWithTitle';
import InputTextWithTitle from './combineUI/InputText/InputTextWithTitle/InputTextWithTitle.vue';
import { useSearchInputTextWithTitle } from './combineUI/InputText/SearchInputTextWithTitle/SearchInputTextWithTitle';
import SearchInputTextWithTitle from './combineUI/InputText/SearchInputTextWithTitle/SearchInputTextWithTitle.vue';
import { useHorizontalRadioButtonGroupWithTitle } from './combineUI/RadioButton/HorizontalRadioButtonGroupWithTitle/HorizontalRadioButtonGroupWithTitle';
import HorizontalRadioButtonGroupWithTitle from './combineUI/RadioButton/HorizontalRadioButtonGroupWithTitle/HorizontalRadioButtonGroupWithTitle.vue';
import { useRadioButtonGroupWithTitle } from './combineUI/RadioButton/RadioButtonGroupWithTitle/RadioButtonGroupWithTitle';
import RadioButtonGroupWithTitle from './combineUI/RadioButton/RadioButtonGroupWithTitle/RadioButtonGroupWithTitle.vue';
import { useVerticalRadioButtonGroupWithTitle } from './combineUI/RadioButton/VerticalRadioButtonGroupWithTitle/VerticalRadioButtonGroupWithTitle';
import VerticalRadioButtonGroupWithTitle from './combineUI/RadioButton/VerticalRadioButtonGroupWithTitle/VerticalRadioButtonGroupWithTitle.vue';
import { useShowErrorToast } from './combineUI/Toast/ToastError';
import {
  useShowNeutralToast,
  useShowNeutralToastNoAutoHide,
} from './combineUI/Toast/ToastNeutral';
import { useShowSuccessToast } from './combineUI/Toast/ToastSuccess';
import { useShowWarningToast } from './combineUI/Toast/ToastWarning';
import { useShowInformationalToast } from './combineUI/Toast/ToastInformational';

export * from './init';
export * from './type';

export { useMockXCU, genMockXcu } from './test/mockXcu.data';

// 使用動態導出
const XCU = () =>
  // @ts-expect-error globalThis
  globalThis.XCU as xCUInterface;

export { XCU };

// sonarjs:ignore
export interface xCUInterface {
  Atom: {
    Ui: {
      // Note: sort by alphabet
      CheckboxAll: typeof CheckboxAll;
      CheckboxGroup: typeof CheckboxGroup;
      HeaderWithStarDescription: typeof HeaderWithStarDescription;
      HorizontalLine: typeof HorizontalLine;
      RequiredAsterisk: typeof RequiredAsterisk;
      TitleWithRequiredStar: typeof TitleWithRequiredStar;
      TwoButtons: typeof TwoButtons;
    };
    Use: {
      // Note: sort by alphabet
      useCheckboxGroupLinkage: typeof useCheckboxGroupLinkage;
    };
  };

  Buttons: {
    Use: {
      useTwoButtonsForConfirm: typeof useTwoButtonsForConfirm;
    };
  };

  // Note: sort by alphabet
  Checkbox: {
    Ui: {
      HorizontalCheckboxGroupWithTitle: typeof HorizontalCheckboxGroupWithTitle;
    };
    Use: {
      useHorizontalCheckboxGroupWithTitle: typeof useHorizontalCheckboxGroupWithTitle;
    };
  };

  Dialog: {
    Ui: {
      ConfirmDialog: typeof ConfirmDialog;
      ConfirmDialogSlot: typeof ConfirmDialogSlot;
    };
    Use: {
      useTransientDialog: typeof useTransientDialog;
      useConfirmDialogSlot: typeof useConfirmDialogSlot;
    };
    Utils: {
      requestConfirmDialog: ReturnType<
        typeof useInjectConfirmDialogState
      >['request'];
      requestDangerConfirmDialog: ReturnType<
        typeof useRequestDangerConfirmDialog
      >;
    };
  };

  InputText: {
    Ui: {
      Drug: {
        SelectableDrugSearchInputText: typeof SelectableDrugSearchInputText;
      };
      InputTextWithTitle: typeof InputTextWithTitle;
      SearchInputTextWithTitle: typeof SearchInputTextWithTitle;
    };
    Use: {
      Drug: {
        useSelectableDrugSearchInputText: typeof useSelectableDrugSearchInputText;
      };
      useInputTextWithTitle: typeof useInputTextWithTitle;
      useSearchInputTextWithTitle: typeof useSearchInputTextWithTitle;
    };
  };

  RadioButton: {
    Ui: {
      HorizontalRadioButtonGroupWithTitle: typeof HorizontalRadioButtonGroupWithTitle;
      RadioButtonGroupWithTitle: typeof RadioButtonGroupWithTitle;
      VerticalRadioButtonGroupWithTitle: typeof VerticalRadioButtonGroupWithTitle;
    };
    Use: {
      useHorizontalRadioButtonGroupWithTitle: typeof useHorizontalRadioButtonGroupWithTitle;
      useRadioButtonGroupWithTitle: typeof useRadioButtonGroupWithTitle;
      useVerticalRadioButtonGroupWithTitle: typeof useVerticalRadioButtonGroupWithTitle;
    };
  };

  Toast: {
    hideToast: () => void;
    showToast: ReturnType<typeof useShowNeutralToast>;
    showNeutralToast: ReturnType<typeof useShowNeutralToast>;
    showNeutralToastNoAutoHide: ReturnType<
      typeof useShowNeutralToastNoAutoHide
    >;
    showErrorToast: ReturnType<typeof useShowErrorToast>;
    showSuccessToast: ReturnType<typeof useShowSuccessToast>;
    showWarningToast: ReturnType<typeof useShowWarningToast>;
    showInformationalToast: ReturnType<typeof useShowInformationalToast>;
  };
}

export const setupXCU = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((globalThis as any).XCU) {
    /**
     * NOTE:
     * 由於目前 in page widget 裡可能也會包含 `<XCUInit>`，
     * 在其中的 setup 階段會呼叫這個 `setupXCU`，
     * 導致 global XCU 會被替換為這個較晚 setup 的，
     * 這時顯示 dialog 等使用到的 inject 就會對應到較晚 setup 的 `<XCUInit>`，
     * 而當這個 in page widget 被 unmounted，這個 `<XCUInit>` 也會跟著 unmounted。
     * 透過 global XCU 呼叫顯示 dialog 時，dialog 就會因此顯示不出來。
     * 
     * 由於理論上只應在 shell setup 一次，
     * 因此讓檢查到 global XCU 已經存在時，就不重複 setup。
     *
     * TODOITEM:
     * 這裡要不要加個 console warn?
     * 但根據討論，platform team 是希望 in page widget 和 off page widget 盡量少落差。
     * 而 off page widget 要能使用 XCU 就得 render `<XCUInit>`，
     * 所以 in page widget 裡寫 `<XCUInit>` 也算是預期行為。
     * 如果全都印出 warning，可能也有點 false alarm。
     */
    return;
  }

  const { show: showToast, hide: hideToast } = useInjectGlobalToastState();
  const showNeutralToast = useShowNeutralToast(showToast);
  const showNeutralToastNoAutoHide = useShowNeutralToastNoAutoHide(showToast);
  const showErrorToast = useShowErrorToast(showToast);
  const showSuccessToast = useShowSuccessToast(showToast);
  const showWarningToast = useShowWarningToast(showToast);
  const showInformationalToast = useShowInformationalToast(showToast);
  const { request: requestConfirmDialog } = useInjectConfirmDialogState();

  const _XCU: xCUInterface = {
    Atom: {
      Ui: {
        // Note: sort by alphabet
        CheckboxAll,
        CheckboxGroup,
        HeaderWithStarDescription,
        HorizontalLine,
        RequiredAsterisk,
        TitleWithRequiredStar,
        TwoButtons,
      },
      Use: {
        useCheckboxGroupLinkage,
      },
    },

    Buttons: {
      Use: {
        useTwoButtonsForConfirm,
      },
    },

    // Note: sort by alphabet
    Checkbox: {
      Ui: {
        HorizontalCheckboxGroupWithTitle,
      },
      Use: {
        useHorizontalCheckboxGroupWithTitle,
      },
    },

    Dialog: {
      Ui: {
        ConfirmDialog,
        ConfirmDialogSlot,
      },
      Use: {
        useTransientDialog,
        useConfirmDialogSlot,
      },
      Utils: {
        requestConfirmDialog,
        requestDangerConfirmDialog:
          useRequestDangerConfirmDialog(requestConfirmDialog),
      },
    },

    InputText: {
      Ui: {
        Drug: {
          SelectableDrugSearchInputText,
        },
        InputTextWithTitle,
        SearchInputTextWithTitle,
      },
      Use: {
        Drug: {
          useSelectableDrugSearchInputText,
        },
        useInputTextWithTitle,
        useSearchInputTextWithTitle,
      },
    },

    RadioButton: {
      Ui: {
        HorizontalRadioButtonGroupWithTitle,
        RadioButtonGroupWithTitle,
        VerticalRadioButtonGroupWithTitle,
      },
      Use: {
        useHorizontalRadioButtonGroupWithTitle,
        useRadioButtonGroupWithTitle,
        useVerticalRadioButtonGroupWithTitle,
      },
    },

    Toast: {
      hideToast,
      showToast: showNeutralToast,
      showNeutralToastNoAutoHide,
      showNeutralToast,
      showErrorToast,
      showSuccessToast,
      showWarningToast,
      showInformationalToast,
    },
  };

  /** @global */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).XCU = _XCU;
};

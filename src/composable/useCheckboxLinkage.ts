import { isEmpty } from 'lodash';
import { nextTick, Ref, watch } from 'vue';

export interface CheckboxState {
  /** Unique key */
  key: unknown;
  /** Display label */
  display?: string;
  /** Checked */
  checked: boolean;
  /** Indeterminate */
  indeterminate: boolean;
  /** Disabled */
  disabled: boolean;
  /** Visible v-if */
  visible?: boolean;
}

interface CheckboxLinkageObject {
  /** according to children checkbox state, reset */
  resetParentCheckboxState: () => void;
  /** handle on update parent checkbox state */
  handleUpdateParentCheckbox: () => Promise<void>;
  /** handle on update children checkbox state */
  handleUpdateChildrenCheckbox: () => Promise<void>;
}

/**
 * A composable function to manage the linkage between a parent checkbox and its children checkboxes.
 * It provides methods to synchronize the state of the parent checkbox with its children and vice versa.
 *
 * @param {Ref<CheckboxState>} parentCheckboxState - A ref object representing the state of the parent checkbox.
 * @param {Ref<Array<CheckboxState>>} childrenCheckboxState - A ref object representing the state of the children checkboxes.
 * @returns {CheckboxLinkageObject} An object containing methods to manage the checkbox linkage.
 *
 * @typedef {Object} CheckboxState
 * @property {boolean} checked - Indicates whether the checkbox is checked.
 * @property {boolean} indeterminate - Indicates whether the checkbox is in an indeterminate state.
 * @property {boolean} disabled - Indicates whether the checkbox is disabled.
 * @property {boolean} [visible] - Indicates whether the checkbox is visible.
 *
 * @typedef {Object} CheckboxLinkageObject
 * @property {Function} resetParentCheckboxState - Resets the state of the parent checkbox based on the children checkboxes.
 * @property {Function} handleUpdateParentCheckbox - Updates the state of the children checkboxes based on the parent checkbox.
 * @property {Function} handleUpdateChildrenCheckbox - Updates the state of the parent checkbox based on the children checkboxes.
 */
const useCheckboxLinkage = (
  parentCheckboxState: Ref<CheckboxState>,
  childrenCheckboxState: Ref<Array<CheckboxState>>,
): CheckboxLinkageObject => {
  const syncChildrenCheckboxState = () => {
    childrenCheckboxState.value = childrenCheckboxState.value.map((state) => {
      if (state.disabled) {
        return state;
      }
      return {
        ...state,
        checked: parentCheckboxState.value.checked,
        indeterminate: false,
      };
    });
  };

  /**
   * Refreshes the state of the parent checkbox based on the state of its child checkboxes.
   * 
   * This function updates the `checked`, `indeterminate`, and `disabled` properties of the parent checkbox
   * by evaluating the states of the child checkboxes. It considers the visibility and enabled/disabled status
   * of the child checkboxes to determine the final state of the parent checkbox.
   * 
   * The function performs the following steps:
   * 1. If there are no child checkboxes, the parent checkbox is unchecked, not indeterminate, and disabled.
   * 2. Filters the child checkboxes into visible, enabled, and disabled groups.
   * 3. Checks if all enabled child checkboxes are checked.
   * 4. Checks if all disabled child checkboxes are unchecked.
   * 5. Checks if all visible child checkboxes are checked.
   * 6. Determines if any disabled child checkboxes are indeterminate or checked.
   * 7. Determines if any enabled child checkboxes are indeterminate or checked.
   * 8. Sets the parent checkbox to checked if all visible child checkboxes are checked or if all enabled are checked and all disabled are unchecked.
   * 9. Sets the parent checkbox to indeterminate if not all are checked but some are indeterminate.
   * 10. Sets the parent checkbox to disabled if all visible child checkboxes are disabled.
   */
  const refreshParentCheckbox = () => {
    // empty case
    if (childrenCheckboxState.value.length == 0) {
      parentCheckboxState.value.checked = false;
      parentCheckboxState.value.indeterminate = false;
      parentCheckboxState.value.disabled = true;
      return;
    }

    const visibleChildrenCheckbox = childrenCheckboxState.value.filter(
      (state) => state.visible !== false,
    );

    const enabledChildrenCheckbox = visibleChildrenCheckbox.filter(
      (state) => state.disabled !== true,
    );

    const disabledChildrenCheckbox = visibleChildrenCheckbox.filter(
      (state) => state.disabled === true,
    );

    const isAllEnabledChecked =
      !isEmpty(enabledChildrenCheckbox) &&
      enabledChildrenCheckbox.every((state) => state.checked);

    const isAllDisabledUnChecked =
      !isEmpty(disabledChildrenCheckbox) &&
      disabledChildrenCheckbox.every((state) => !state.checked);

    const isAllVisibleChecked =
      !isEmpty(visibleChildrenCheckbox) &&
      visibleChildrenCheckbox.every((state) => state.checked);

    const isDisabledIndeterminate = disabledChildrenCheckbox.some(
      (state) => state.checked || state.indeterminate,
    );

    const isEnabledIndeterminate = enabledChildrenCheckbox.some(
      (state) => state.indeterminate || state.checked,
    );

    const isAllChecked =
      isAllVisibleChecked || (isAllEnabledChecked && isAllDisabledUnChecked);

    const isIndeterminate = isDisabledIndeterminate || isEnabledIndeterminate;

    const isAllDisabled =
      !isEmpty(visibleChildrenCheckbox) &&
      visibleChildrenCheckbox.every((state) => state.disabled);

    parentCheckboxState.value.checked = isAllChecked;

    parentCheckboxState.value.indeterminate = !isAllChecked && isIndeterminate;

    parentCheckboxState.value.disabled = isAllDisabled;
  };

  const resetParentCheckboxState = () => {
    refreshParentCheckbox();
  };

  const handleUpdateParentCheckbox = async () => {
    await nextTick(); // if not await, may not sync with checkbox input state
    syncChildrenCheckboxState();
    refreshParentCheckbox();
  };

  const handleUpdateChildrenCheckbox = async () => {
    await nextTick();
    refreshParentCheckbox();
  };

  watch(
    () => childrenCheckboxState,
    () => {
      resetParentCheckboxState();
    },
    { deep: true, immediate: true },
  );

  return {
    resetParentCheckboxState,
    handleUpdateParentCheckbox,
    handleUpdateChildrenCheckbox,
  };
};

export { useCheckboxLinkage };

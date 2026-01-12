import { Ref, ref } from 'vue';

import { CheckboxState, useCheckboxLinkage } from './useCheckboxLinkage';

// test useCheckboxLinkage for all cases with visible column
describe('useCheckboxLinkage', () => {
  let parentCheckboxState: Ref<CheckboxState>;
  let childrenCheckboxState: Ref<Array<CheckboxState>>;

  beforeEach(() => {
    parentCheckboxState = ref({
      key: 'parent',
      checked: false,
      indeterminate: false,
      disabled: false,
    });

    childrenCheckboxState = ref([
      {
        key: 'child1',
        checked: false,
        indeterminate: false,
        disabled: false,
        visible: true,
      },
      { key: 'child2', checked: false, indeterminate: false, disabled: false },
      {
        key: 'child3',
        checked: true,
        indeterminate: true,
        disabled: false,
        visible: false,
      },
    ]);
  });

  it('should initialize correctly', () => {
    const { resetParentCheckboxState } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    resetParentCheckboxState();
    expect(parentCheckboxState.value.checked).toBe(false);
    expect(parentCheckboxState.value.indeterminate).toBe(false);
    expect(parentCheckboxState.value.disabled).toBe(false);
  });

  it('should update children checkboxes when parent is checked', async () => {
    const { handleUpdateParentCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    parentCheckboxState.value.checked = true;
    await handleUpdateParentCheckbox();
    expect(childrenCheckboxState.value.every((child) => child.checked)).toBe(
      true,
    );
  });

  it('should update children checkboxes when parent is checked', async () => {
    childrenCheckboxState.value.forEach((child) => {
      child.checked = false;
      child.disabled = true;
    });
    const { handleUpdateParentCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    parentCheckboxState.value.checked = true;
    await handleUpdateParentCheckbox();
    expect(childrenCheckboxState.value.every((child) => child.checked)).toBe(
      false,
    );
  });

  it('should update parent checkbox when a child is checked', async () => {
    const { handleUpdateChildrenCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    childrenCheckboxState.value[0].checked = true;
    await handleUpdateChildrenCheckbox();
    expect(parentCheckboxState.value.indeterminate).toBe(true);
    expect(parentCheckboxState.value.checked).toBe(false);
  });

  it('should disable parent checkbox if all children are disabled', async () => {
    childrenCheckboxState.value.forEach((child) => (child.disabled = true));
    const { resetParentCheckboxState } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    resetParentCheckboxState();
    expect(parentCheckboxState.value.disabled).toBe(true);
    expect(parentCheckboxState.value.checked).toBe(false);
  });

  it('should disable parent checkbox if all children are disabled', async () => {
    childrenCheckboxState.value.forEach((child) => {
      child.disabled = true;
      child.checked = true;
      child.visible = true;
    });
    const { resetParentCheckboxState } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    resetParentCheckboxState();
    expect(parentCheckboxState.value.disabled).toBe(true);
    expect(parentCheckboxState.value.checked).toBe(true);
  });

  it('should disable parent checkbox if all children are disabled', async () => {
    childrenCheckboxState.value[0].disabled = true;
    childrenCheckboxState.value[0].checked = false;
    childrenCheckboxState.value[1].disabled = false;
    childrenCheckboxState.value[1].checked = true;
    childrenCheckboxState.value[2].disabled = false;
    childrenCheckboxState.value[2].checked = true;
    const { resetParentCheckboxState } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    resetParentCheckboxState();
    expect(parentCheckboxState.value.disabled).toBe(false);
    expect(parentCheckboxState.value.checked).toBe(true);
  });

  it('should set parent checkbox to indeterminate if some children are checked', async () => {
    const { handleUpdateChildrenCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    childrenCheckboxState.value[0].checked = true;
    await handleUpdateChildrenCheckbox();
    expect(parentCheckboxState.value.indeterminate).toBe(true);
    expect(parentCheckboxState.value.checked).toBe(false);
  });

  it('should set parent checkbox to checked if all children are checked', async () => {
    const { handleUpdateChildrenCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    childrenCheckboxState.value.forEach((child) => (child.checked = true));
    await handleUpdateChildrenCheckbox();
    expect(parentCheckboxState.value.checked).toBe(true);
    expect(parentCheckboxState.value.indeterminate).toBe(false);
  });

  it('should disable parent checkbox if there are no children', async () => {
    childrenCheckboxState.value = [];
    const { resetParentCheckboxState } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    resetParentCheckboxState();
    expect(parentCheckboxState.value.checked).toBe(false);
    expect(parentCheckboxState.value.indeterminate).toBe(false);
    expect(parentCheckboxState.value.disabled).toBe(true);
  });

  it('should set parent checkbox to checked if all visible children are checked', async () => {
    const { handleUpdateChildrenCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    childrenCheckboxState.value.forEach((child) => {
      if (child.visible !== false) {
        child.checked = true;
      }
    });
    await handleUpdateChildrenCheckbox();
    expect(parentCheckboxState.value.checked).toBe(true);
    expect(parentCheckboxState.value.indeterminate).toBe(false);
  });

  it('should set parent checkbox to checked if all enabled children are checked and all disabled children are unchecked', async () => {
    const { handleUpdateChildrenCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    childrenCheckboxState.value.forEach((child) => {
      if (!child.disabled) {
        child.checked = true;
      } else {
        child.checked = false;
      }
    });
    await handleUpdateChildrenCheckbox();
    expect(parentCheckboxState.value.checked).toBe(true);
    expect(parentCheckboxState.value.indeterminate).toBe(false);
  });

  it('should set parent checkbox to indeterminate if not all visible children are checked', async () => {
    const { handleUpdateChildrenCheckbox } = useCheckboxLinkage(
      parentCheckboxState,
      childrenCheckboxState,
    );
    childrenCheckboxState.value.forEach((child, index) => {
      if (index === 0) {
        child.checked = true;
      } else {
        child.checked = false;
      }
    });
    await handleUpdateChildrenCheckbox();
    expect(parentCheckboxState.value.checked).toBe(false);
    expect(parentCheckboxState.value.indeterminate).toBe(true);
  });
});

import { fireEvent, render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { AutocompleteFilterParams } from './autocompleteContext';
import XAutocomplete from './XAutocomplete.vue';

describe('XAutocomplete', () => {
  const keydown = async (dom: HTMLElement, key: string, repeat = 1) => {
    for (let i = 0; i < repeat; i += 1) {
      await fireEvent.keyDown(dom, { key });
    }
  };

  it('should show dropdown on click if options is not empty', async () => {
    const { getByRole, getByTestId, getAllByRole } = render(XAutocomplete, {
      props: {
        options: ['a', 'b', 'c'],
      },
    });

    const autocomplete = getByTestId('x-autocomplete');
    await fireEvent.click(autocomplete); // dismiss menu first

    const input = getByRole('textbox');
    await fireEvent.click(input);
    expect(getByRole('listbox')).toBeDefined();
    expect(getAllByRole('option')).toHaveLength(3);
  });

  it('should work for virtual menu', async () => {
    const { getByRole, getByTestId } = render(XAutocomplete, {
      props: {
        options: ['a', 'b', 'c'],
        virtual: true,
      },
    });

    const autocomplete = getByTestId('x-autocomplete');
    await fireEvent.click(autocomplete); // dismiss menu first

    const input = getByRole('textbox');
    await fireEvent.click(input);
    expect(getByRole('listbox')).toBeDefined();
  });

  it('should filter options on input', async () => {
    const { queryByRole, getByRole, getAllByRole, getByText } = render(
      XAutocomplete,
      {
        props: {
          options: ['a', 'b', 'c'],
        },
      },
    );
    const input = getByRole('textbox');
    await fireEvent.click(input);

    await fireEvent.update(input, '');
    expect(getAllByRole('option')).toHaveLength(3);
    await fireEvent.update(input, 'a');
    expect(getAllByRole('option')).toHaveLength(1);

    // no result
    await fireEvent.update(input, 'ab');
    expect(queryByRole('option')).toBe(null);
    expect(getByText('無相符結果')).toBeDefined();
  });

  it('should be able to do custom filter', async () => {
    const { getAllByRole, getByRole, getByText } = render(XAutocomplete, {
      props: {
        options: [
          { label: 'label-1', value: 1, test: 'x' },
          { label: 'label-2', value: 2, test: 'y' },
          { label: 'label-3', value: 3, test: 'z' },
        ],
        filter: ({ queryText, option }: AutocompleteFilterParams) =>
          (option.test as string).includes(queryText),
      },
    });
    const input = getByRole('textbox');
    await fireEvent.click(input);
    await fireEvent.update(input, 'x');
    expect(getAllByRole('option')).toHaveLength(1);
    expect(getByText('label-1')).toBeDefined();
  });

  it('test input text reactive with v-model', async () => {
    const { getByText, getByRole, getByTestId } = render(XAutocomplete, {
      props: {
        options: [...Array(10).keys()].map((option) => {
          return { label: `label-${option}`, value: option + '' };
        }),
        modelValue: '1',
      },
    });
    const autocomplete = getByTestId('x-autocomplete');
    const input = getByRole('textbox');
    await fireEvent.click(autocomplete); // dismiss menu first
    await fireEvent.click(input);

    expect(getByText('label-1')).toBeDefined();
  });

  it('test key operations', async () => {
    const { queryByRole, getByRole, getAllByRole, getByTestId } = render(
      XAutocomplete,
      {
        props: {
          options: [...Array(10).keys()].map((option) => {
            return { label: `label-${option}`, value: option + '' };
          }),
          modelValue: '',
        },
      },
    );
    const input = getByRole('textbox');
    const targetClass = 'x-list-item-li-interactive--keyboard-active';
    const autocomplete = getByTestId('x-autocomplete');
    await fireEvent.click(autocomplete); // dismiss menu first
    await fireEvent.click(input);
    const options = getAllByRole('option');

    // start testing
    await keydown(input, 'ArrowDown', 3);
    expect(options[3]).toHaveClass(targetClass);
    await keydown(input, 'ArrowDown', 7);
    expect(options[9]).toHaveClass(targetClass);
    await keydown(input, 'ArrowUp', 20);
    expect(options[0]).toHaveClass(targetClass);

    // select current option via enter
    await keydown(input, 'Enter');
    expect(queryByRole('listbox')).toBe(null); // menu should be dimissed
    expect((input as HTMLInputElement).value).toBe('label-0');

    // dismiss menu via esc
    await fireEvent.click(input);
    await keydown(input, 'Escape');
    expect(queryByRole('listbox')).toBe(null);
  });

  it('should show/hide dropdown on focus/focusout', async () => {
    const { getByTestId, getByRole, queryByRole } = render(XAutocomplete, {
      props: {
        options: [1, 2],
      },
    });

    const autocomplete = getByTestId('x-autocomplete');
    await fireEvent.click(autocomplete); // dismiss menu first

    const input = getByRole('textbox');
    input.focus();
    expect(queryByRole('listbox')).not.toBe(null);

    input.blur();
    expect(queryByRole('listbox')).toBe(null);
  });

  it('should select option on mousedown', async () => {
    const { getByRole, getAllByRole, getByTestId } = render(XAutocomplete, {
      props: {
        options: [...Array(10).keys()].map((option) => {
          return { label: `label-${option}`, value: option + '' };
        }),
        modelValue: '1',
      },
    });
    const autocomplete = getByTestId('x-autocomplete');
    const input = getByRole('textbox');
    await fireEvent.click(autocomplete); // dismiss menu first
    await fireEvent.click(input);
    await fireEvent.mouseDown(getAllByRole('option')[0]);
    expect((getByRole('textbox') as HTMLInputElement).value).toBe('label-0');
  });

  it('Should show menu on mount if autofocus is required', async () => {
    const { getByRole } = render(XAutocomplete, {
      props: {
        options: [...Array(10).keys()],
        autofocus: true,
      },
    });

    expect(getByRole('listbox')).toBeDefined();
  });

  it('should sort options on input without sortWithKey', async () => {
    const { getByRole, getAllByRole } = render(XAutocomplete, {
      props: {
        options: ['PRNQD', 'QD', 'QDAC'],
        sort: true,
      },
    });
    const input = getByRole('textbox');
    await fireEvent.click(input);

    await fireEvent.update(input, '');
    expect(getAllByRole('option')[0].textContent).toEqual('PRNQD');
    expect(getAllByRole('option')[1].textContent).toEqual('QD');
    expect(getAllByRole('option')[2].textContent).toEqual('QDAC');
    await fireEvent.update(input, 'qd');
    expect(getAllByRole('option')[0].textContent).toEqual('QD');
    expect(getAllByRole('option')[1].textContent).toEqual('QDAC');
    expect(getAllByRole('option')[2].textContent).toEqual('PRNQD');
  });

  it('should sort options on input with sortWithKey', async () => {
    const { getByRole, getAllByRole } = render(XAutocomplete, {
      props: {
        options: [
          {
            sortKey: 'PRNQD',
            label: 'PRNQD',
            value: 'PRNQD',
          },
          {
            sortKey: 'QD',
            label: 'QD',
            value: 'QD',
          },
          {
            sortKey: 'QDAC',
            label: 'QDAC',
            value: 'QDAC',
          },
        ],
        sort: true,
        sortWithKey: 'sortKey',
      },
    });
    const input = getByRole('textbox');
    await fireEvent.click(input);

    await fireEvent.update(input, '');
    expect(getAllByRole('option')[0].textContent).toEqual('PRNQD');
    expect(getAllByRole('option')[1].textContent).toEqual('QD');
    expect(getAllByRole('option')[2].textContent).toEqual('QDAC');
    await fireEvent.update(input, 'qd');
    expect(getAllByRole('option')[0].textContent).toEqual('QD');
    expect(getAllByRole('option')[1].textContent).toEqual('QDAC');
    expect(getAllByRole('option')[2].textContent).toEqual('PRNQD');
  });

  it('should call popperInstance.update() when `options` change', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        options: [],
      },
    });
    await nextTick();
    await wrapper.find('input').trigger('click');
    const spy = jest.spyOn(wrapper.vm.tippyInstance.popperInstance, 'update');
    await wrapper.setProps({ options: [] });
    expect(spy).toBeCalled();
  });

  it('test setAutoSelect logic get option', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        options: [
          {
            index: 'index1',
            label: 'label1',
          },
          {
            index: 'index2',
            label: 'label2',
          },
        ],
        autoSelectMode: true,
        keyIndex: 'index',
        keyLabel: 'label',
        modelValue: '',
      },
    });
    wrapper.vm.inputBackText = 'label1';
    wrapper.vm.setAutoSelect();
    expect(wrapper.emitted()?.['update:modelValue'][0][0]).toEqual('index1');
    expect(wrapper.vm.inputBackText).toEqual('label1');
  });

  it('test setAutoSelect logic get not option', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        options: [
          {
            index: 'index1',
            label: 'label1',
          },
          {
            index: 'index2',
            label: 'label2',
          },
        ],
        autoSelectMode: true,
        keyIndex: 'index',
        keyLabel: 'label',
        modelValue: '',
      },
    });
    wrapper.vm.inputBackText = 'label3';
    wrapper.vm.setAutoSelect();
    expect(wrapper.emitted()?.['update:modelValue'][0][0]).toEqual('label3');
    expect(wrapper.vm.inputBackText).toEqual('label3');
  });

  it('test setAutoSelect logic get option and no change value', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        options: [
          {
            index: 'index1',
            label: 'label1',
          },
          {
            index: 'index2',
            label: 'label2',
          },
        ],
        autoSelectMode: true,
        keyIndex: 'index',
        keyLabel: 'label',
        modelValue: 'index2',
      },
    });
    wrapper.vm.inputBackText = 'label2';
    wrapper.vm.setAutoSelect();
    expect(wrapper.emitted()?.['update:modelValue']).toEqual(undefined);
    expect(wrapper.vm.inputBackText).toEqual('label2');
  });
});

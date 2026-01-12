import { fireEvent, render, screen } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { XSelect } from './index';

describe('XSelect', () => {
  it('should render a select input element', async () => {
    const { emitted, rerender } = render(XSelect, {
      props: {
        modelValue: '',
        fallbackLabel: '---',
        dataOptions: [
          {
            value: '1',
            label: 'select first option',
          },
          {
            value: '2',
            label: 'second option',
          },
        ],
      },
    });

    expect(await screen.findByText('---')).toBeDefined();
    expect(screen.queryByText('second option')).toBeFalsy();

    await fireEvent.click(await screen.findByRole('combobox'));

    expect(await screen.findByText('second option')).toBeDefined();

    await fireEvent.click(await screen.findByText('second option'));
    rerender({
      modelValue: '2',
    });

    await nextTick();

    expect(emitted().show.length).toBe(1);
    expect(emitted().hide.length).toBe(1);
  });

  it('should show menu on keyboard event', async () => {
    const { emitted } = render(XSelect, {
      props: {
        modelValue: '',
        fallbackLabel: '---',
        dataOptions: [
          {
            value: '1',
            label: 'select first option',
          },
          {
            value: '2',
            label: 'second option',
          },
        ],
      },
    });

    await fireEvent.keyDown(await screen.findByRole('combobox'), {
      key: 'Enter',
      code: 13,
    });
    await nextTick();
    expect(emitted().show.length).toBe(1);

    await fireEvent.keyDown(await screen.findByRole('combobox'), {
      key: 'Down',
      code: 'KeyDown',
    });
    await nextTick();

    await fireEvent.keyDown(await screen.findByRole('combobox'), {
      key: 'Enter',
      code: 13,
    });

    await nextTick();

    expect(screen.queryByText('second option')).toBeTruthy();
  });

  it('should show menu on keyboard enter', async () => {
    const { emitted } = render(XSelect);

    await fireEvent.keyDown(await screen.findByRole('combobox'), {
      key: 'Enter',
      code: 13,
    });

    await nextTick();

    expect(emitted().show.length).toBe(1);
  });

  it('should handle disabled props', async () => {
    const { rerender } = render(XSelect, {
      props: {
        disabled: true,
      },
    });

    await nextTick();
    expect(screen.getByRole('combobox').getAttribute('aria-disabled')).toBe(
      'true',
    );

    await rerender({
      disabled: false,
    });
    expect(screen.getByRole('combobox').getAttribute('aria-disabled')).toBe(
      'false',
    );

    await rerender({
      disabled: true,
    });
    expect(screen.getByRole('combobox').getAttribute('aria-disabled')).toBe(
      'true',
    );
  });

  it('test inputAttrs and onOptionClick', async () => {
    const wrapper = mount(XSelect, {
      props: {
        modelValue: '1',
        fallbackLabel: '--',
        dataOptions: [
          {
            value: '1',
            label: 'first option',
          },
          {
            value: '2',
            label: 'second option',
          },
        ],
      },
    });
    const option: Record<string, unknown> = {
      value: '1',
      label: 'first option',
    };
    await wrapper.vm.onOptionClick(option);
    expect(wrapper.emitted()?.['update:modelValue']).toBeUndefined();

    const option2: Record<string, unknown> = {
      value: '2',
      label: 'second option',
    };
    await wrapper.vm.onOptionClick(option2);
    expect(wrapper.emitted()?.['update:modelValue'].length).toBe(1);

    wrapper.vm.localInputAttrs.inputAttrs.onFocus();
    await nextTick();
    expect(wrapper.emitted().show.length).toBe(1);

    wrapper.vm.localInputAttrs.inputAttrs.onBlur();
    await nextTick();
    expect(wrapper.emitted().hide.length).toBe(1);
    wrapper.unmount();
  });

  it('should havee disabled option', async () => {
    render(XSelect, {
      props: {
        modelValue: '',
        fallbackLabel: '---',
        dataOptions: [
          {
            value: '1',
            label: 'first option',
          },
          {
            value: '2',
            label: 'second option',
            disabled: true,
          },
        ],
      },
    });

    await fireEvent.click(await screen.findByRole('combobox'));

    const options = screen.getAllByRole('option');

    expect(options.length).toBe(2);

    expect(options[0].attributes.getNamedItem('aria-disabled')?.value).toBe(
      'false',
    );
    expect(options[1].attributes.getNamedItem('aria-disabled')?.value).toBe(
      'true',
    );
  });
});

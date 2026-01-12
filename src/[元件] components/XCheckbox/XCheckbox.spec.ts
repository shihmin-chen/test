import { fireEvent, render } from '@testing-library/vue';
import { flushPromises } from '@vue/test-utils';

import XCheckbox from './XCheckbox.vue';

describe('XCheckbox', () => {
  it('should render an checkbox input element', async () => {
    const { getByLabelText, rerender } = render(XCheckbox, {
      slots: {
        default: 'hello world',
      },
      props: {
        indeterminate: false,
        modelValue: false,
        'onUpdate:modelValue': (value: boolean) => {
          rerender({ modelValue: value });
        },
      },
    });

    expect(getByLabelText('hello world')).toBeDefined();

    await fireEvent.click(getByLabelText('hello world'));
    await flushPromises();

    expect((getByLabelText('hello world') as HTMLInputElement).checked).toBe(
      true,
    );
  });

  it('should setIndeterminate state when props change', async () => {
    const { getByLabelText, rerender } = render(XCheckbox, {
      slots: {
        default: 'hello world',
      },
      props: {
        indeterminate: false,
        modelValue: true,
      },
    });

    expect(
      (getByLabelText('hello world') as HTMLInputElement).indeterminate,
    ).toBe(false);

    await rerender({
      indeterminate: true,
    });

    expect(
      (getByLabelText('hello world') as HTMLInputElement).indeterminate,
    ).toBe(true);
  });
});

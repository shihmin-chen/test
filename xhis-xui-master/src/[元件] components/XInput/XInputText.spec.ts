import { fireEvent, render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import { flushPromises } from '@vue/test-utils';
import { ref } from 'vue';
import { XInputText } from './index';

describe('XInputText', () => {
  it('should render an checkbox input element', async () => {
    const { getByLabelText } = render(XInputText, {
      props: {
        label: 'hello world',
      },
    });

    expect(getByLabelText('hello world')).toBeDefined();
  });

  it('should change value on input', async () => {
    const { getByLabelText } = render(XInputText, {
      props: {
        label: 'hello world',
      },
    });
    const el = getByLabelText('hello world');
    await fireEvent.update(el, 'textValue');
    expect((el as HTMLInputElement).value).toBe('textValue');
  });

  it('should handle v-model on modelValue', async () => {
    const modelValue = ref('hello');
    const { getByLabelText, emitted } = render(XInputText, {
      props: {
        label: 'hello world',
        modelValue: modelValue.value,
      },
    });
    const el = getByLabelText('hello world');
    expect((el as HTMLInputElement).value).toBe('hello');
    await fireEvent.update(el, 'hello there');
    expect(emitted()['update:modelValue'][0]).toStrictEqual(['hello there']);
  });

  it('should show eye-btn for password', async () => {
    const { getByRole } = render(XInputText, {
      props: {
        type: 'password',
        modelValue: 'mypassword',
      },
    });

    expect(
      (screen.getByDisplayValue('mypassword') as HTMLInputElement).type
    ).toBe('password');

    await fireEvent.click(getByRole('button'));

    expect(
      (screen.getByDisplayValue('mypassword') as HTMLInputElement).type
    ).toBe('text');
  });

  it('Should focus input on mount if autofocus is required', async () => {
    const { getByLabelText } = render(XInputText, {
      props: {
        label: 'hello world',
        autofocus: true,
      },
    });
    await flushPromises();
    const input = getByLabelText('hello world');
    expect(input).toHaveFocus();
  });

  it('Should show message', async () => {
    const { getByText } = render(XInputText, {
      props: {
        label: 'hello world',
        message: 'message testing',
      },
    });
    await flushPromises();
    expect(getByText('message testing')).toBeDefined();
  });

  it('Should show message', async () => {
    const { getByText } = render(XInputText, {
      props: {
        label: 'hello world',
        message: 'message testing',
      },
    });
    await flushPromises();
    expect(getByText('message testing')).toBeDefined();
  });
});

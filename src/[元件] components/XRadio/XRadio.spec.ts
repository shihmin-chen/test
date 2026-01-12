/* eslint-disable vue/one-component-per-file */
import { fireEvent, render, screen } from '@testing-library/vue';
import { defineComponent, ref, unref } from 'vue';

import { XRadioButton, XRadioButtonGroup } from './index';

describe('XRadioButtonGroup', () => {
  it('should render a radio-button-group input element', async () => {
    const { getByText } = render(XRadioButtonGroup, {
      slots: {
        default: 'hello',
      },
      props: {
        name: 'radio',
        modelValue: '',
      },
    });

    expect(getByText('hello')).toBeDefined();
  });
});

describe('XRadioButton', () => {
  it('should render a radio-button input element', async () => {
    const { getByText } = render(XRadioButton, {
      props: {
        value: 'Y',
        label: 'Yes',
      },
    });

    expect(getByText('Yes')).toBeDefined();
  });
});

describe('XRadioButtonGroup Integration', () => {
  it('should mount with children', async () => {
    const value = ref('0');

    render(
      defineComponent({
        components: {
          XRadioButton,
          XRadioButtonGroup,
        },
        setup() {
          return {
            value,
          };
        },
        template: `
          <XRadioButtonGroup v-model="value" name="test-gp">
            <XRadioButton value="0" label="000"/>
            <XRadioButton value="1" label="111"/>
          </XRadioButtonGroup>
        `,
      }),
    );

    expect(unref(value)).toBe('0');

    await fireEvent.click(await screen.findByDisplayValue('1'));

    expect(unref(value)).toBe('1');
  });

  it('should cancel selected', async () => {
    const value = ref('0');

    render(
      defineComponent({
        components: {
          XRadioButton,
          XRadioButtonGroup,
        },
        setup() {
          return {
            value,
          };
        },
        template: `
          <XRadioButtonGroup v-model="value" name="test-gp" cancelable>
            <XRadioButton value="0" label="000"/>
            <XRadioButton value="1" label="111"/>
          </XRadioButtonGroup>
        `,
      }),
    );

    expect(unref(value)).toBe('0');

    await fireEvent.click(await screen.findByDisplayValue('1'));

    expect(unref(value)).toBe('1');

    await fireEvent.click(await screen.findByDisplayValue('1'));

    expect(unref(value)).toBe(undefined);
  });
});

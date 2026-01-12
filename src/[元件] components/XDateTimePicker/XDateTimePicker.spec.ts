import { mount } from '@vue/test-utils';

import { convertADYearToROCYear } from './utils';
import XDateTimePicker from './XDateTimePicker.vue';

describe('XDateTimePicker', () => {
  it('should render correctly', () => {
    const wrapper = mount(XDateTimePicker);
    expect(wrapper.exists()).toBe(true);
  });

  it('should applies the correct date format based on calendarType', async () => {
    const today = new Date();
    const thisROCYear = convertADYearToROCYear(today.getFullYear()).toString();

    const wrapper = mount(XDateTimePicker, {
      props: {
        calendarType: 'ROC',
        customConfig: {
          inline: true,
        },
      },
    });
    await wrapper.vm.$nextTick();
    const menuYear = wrapper.find('[data-testid="menu-year"]').text();

    expect(menuYear).toBe(`${thisROCYear} 年`);
  });

  it('should renders the "Now" button in action button area when applicable', async () => {
    const wrapper = mount(XDateTimePicker, {
      props: {
        calendarType: 'ROC',
        customConfig: { range: true, inline: true },
      },
    });
    await wrapper.vm.$nextTick();
    const nowButton = wrapper.find('[data-testid="action-buttons-now-button"]');

    expect(nowButton.exists()).toBe(true);
    expect(nowButton.text()).toBe('今日到今日');
  });

  it('should renders the "Now" button in action extra area when auto apply is set', async () => {
    const wrapper = mount(XDateTimePicker, {
      props: {
        calendarType: 'ROC',
        customConfig: { inline: true, autoApply: true },
      },
    });
    await wrapper.vm.$nextTick();
    const nowButton = wrapper.find('[data-testid="action-extra-now-button"]');

    expect(nowButton.exists()).toBe(true);
    expect(nowButton.text()).toBe('今日');
  });
});

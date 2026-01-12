import Notifications from '@kyvg/vue3-notification';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import XNotification from './XNotification.vue';
import XNotificationCaller from './XNotificationCaller';
import XNotificationCloser from './XNotificationCloser';

describe('XNotification', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(XNotification, {
      propsData: {},
      global: {
        plugins: [Notifications],
      },
    });
  });

  it('test render a notification', async () => {
    XNotificationCaller({
      title: 'hello world',
    });

    await nextTick();
    const title = wrapper.find('.x-notification-title');
    expect(title).toBeDefined();
  });

  it('test render a notification with close button', async () => {
    XNotificationCaller({
      title: 'hello world',
      hasCloseButton: true,
      noAutoHide: true,
    });

    await nextTick();
    const title = wrapper.find('.x-notification-title');
    expect(title).toBeDefined();

    const closeButton = wrapper.find(
      '[data-qa-field="x-notification-close-btn"]'
    );

    expect(closeButton).toBeDefined();
  });

  it('test click show more button', async () => {
    XNotificationCaller({
      title: 'hello world',
      content: 'test 123',
      showAllNumber: 1,
    });
    await nextTick();

    const ellipseButton = wrapper.find(
      '[data-qa-field="x-notification-ellipse-btn"]'
    );
    expect(ellipseButton).toBeDefined();
  });

  it('test click label', async () => {
    XNotificationCaller({
      title: 'hello world',
      leftLabelName: 'left',
      rightLabelName: 'right',
      handleClick: jest.fn(),
    });

    await nextTick();
    const leftLabel = wrapper.find(
      '[data-qa-field="x-notification-left-label"]'
    );
    const rightLabel = wrapper.find(
      '[data-qa-field="x-notification-right-label"]'
    );

    expect(leftLabel).toBeDefined();
    expect(rightLabel).toBeDefined();
  });

  it('close by closer', async () => {
    XNotificationCaller({
      id: 123,
      title: 'hello world',
      noAutoHide: true,
    });

    await nextTick();
    const title = wrapper.find('.x-notification-title');
    expect(title).toBeDefined();
    XNotificationCloser(123);

    await nextTick();
    expect(title).toBeDefined();
  });
});

import { shallowMount } from '@vue/test-utils';

import XDialogLayoutIcon from './XDialogLayoutIcon.vue';
import { XDialogLayoutTheme } from './enum';

describe('Test XDialogLayoutIcon', () => {
  it('Test iconAttrs', async () => {
    const assertIconAttrs = (
      theme: XDialogLayoutTheme,
      expectedIcon: string
    ) => {
      // setup: mount
      const wrapper = shallowMount(XDialogLayoutIcon, {
        props: {
          theme,
        },
      });

      // verify: should get expected attrs
      expect(wrapper.vm.iconAttrs).toStrictEqual(
        expect.objectContaining({ icon: expectedIcon })
      );

      // teardown: unmount
      wrapper.unmount();
    };

    [
      { theme: XDialogLayoutTheme.Success, icon: 'checkmark' },
      { theme: XDialogLayoutTheme.Warning, icon: 'warning-outline' },
      { theme: XDialogLayoutTheme.Danger, icon: 'alert-outline' },
      { theme: XDialogLayoutTheme.Error, icon: 'error-outline' },
    ].forEach((testItem) => assertIconAttrs(testItem.theme, testItem.icon));
  });
});

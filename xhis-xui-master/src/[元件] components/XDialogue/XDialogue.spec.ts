import { fireEvent, render } from '@testing-library/vue';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

import XDialogue from './XDialogue.vue';

describe('Test Dialogue', () => {
  it('Should render Dialogue', () => {
    const { html } = render(XDialogue);

    expect(html()).toContain('teleport');
  });

  it('Test dialogueStyle - with left, top, maxWidth, and maxHeight', async () => {
    const wrapper = shallowMount(XDialogue, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      props: {
        width: 100,
        maxWidth: 'calc(100vw - 100px)',
        height: 50,
        maxHeight: 'calc(100vh - 100px)',
        left: '10px',
        top: '20px',
      },
    });

    expect(wrapper.vm.dialogueStyle).toStrictEqual({
      position: 'fixed',
      width: '100px',
      maxWidth: 'calc(100vw - 100px)',
      height: '50px',
      maxHeight: 'calc(100vh - 100px)',
      left: '10px',
      top: '20px',
      transition: '',
    });
  });

  it('Test dialogueStyle - without left, top, maxWidth, and maxHeight', async () => {
    const wrapper = shallowMount(XDialogue, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      props: {
        width: 100,
        height: 50,
      },
    });

    expect(wrapper.vm.dialogueStyle).toStrictEqual({
      position: 'fixed',
      width: '100px',
      maxWidth: 'none',
      height: '50px',
      maxHeight: 'none',
      left: 'calc(50vw - 50px)',
      top: 'calc(50vh - 25px)',
      transition: '',
    });
  });

  it('Test dialogueStyle - fit content', async () => {
    // TODOITEM: mock useResizeObserver
    const wrapper = shallowMount(XDialogue, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      props: {
        width: 100,
        fitContent: true,
      },
    });

    expect(wrapper.vm.dialogueStyle).toStrictEqual({
      position: 'fixed',
      width: '100px',
      maxWidth: 'none',
      height: 'fit-content',
      maxHeight: 'none',
      left: 'calc(50vw - 50px)',
      top: 'calc(50vh - 0px)',
      transition: '',
    });
  });

  it('Test dialogueStyle - dynamic', async () => {
    const width = ref(100);
    const maxWidth = ref(200);
    const height = ref(50);
    const maxHeight = ref(150);
    const wrapper = shallowMount(XDialogue, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      props: {
        width,
        maxWidth,
        height,
        maxHeight,
      },
    });

    expect(wrapper.vm.dialogueStyle).toStrictEqual({
      position: 'fixed',
      width: '100px',
      maxWidth: '200px',
      height: '50px',
      maxHeight: '150px',
      left: 'calc(50vw - 50px)',
      top: 'calc(50vh - 25px)',
      transition: '',
    });

    width.value = 200;
    maxWidth.value = 400;
    height.value = 100;
    maxHeight.value = 300;
    await flushPromises();

    expect(wrapper.vm.dialogueStyle).toStrictEqual({
      position: 'fixed',
      width: '200px',
      maxWidth: '400px',
      height: '100px',
      maxHeight: '300px',
      left: 'calc(50vw - 100px)',
      top: 'calc(50vh - 50px)',
      transition: '',
    });
  });

  it('Test onClickBackdrop', async () => {
    const { emitted } = render(XDialogue, {
      props: { show: true, closeOnBackdrop: true },
    });

    await fireEvent.click(
      document.getElementsByClassName('x-dialogue-container')[0],
    );
    await flushPromises();

    expect(emitted()['update:show']).toBeTruthy();
  });
});

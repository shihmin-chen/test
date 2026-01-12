import { render } from '@testing-library/vue';
import { defineComponent, h, markRaw } from 'vue';
import XIcon from './XIcon.vue';

describe('XIcon', () => {
  it('Render without error when no icon provide', () => {
    render(XIcon);
  });

  it('Render with given icon name', () => {
    render(XIcon, {
      props: {
        icon: 'avatar',
      },
    });
    // not testable since import.meta.glob is stub
  });

  it('Render with a resolved IconComponent', () => {
    render(XIcon, {
      props: {
        icon: markRaw(
          defineComponent({
            render: () => h('svg'),
          })
        ),
      },
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});

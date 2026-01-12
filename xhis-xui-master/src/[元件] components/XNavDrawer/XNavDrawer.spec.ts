import { render } from '@testing-library/vue';
import { nextTick } from 'vue';

import { XNavDrawer } from './index';

describe('XNavDrawer', () => {
  it('should render nav drawer', async () => {
    const { getByText } = render(XNavDrawer, {
      props: {
        modelValue: [
          {
            name: 'group A',
            nodes: [
              {
                key: 'A1',
                name: 'folder A1',
                children: [
                  {
                    key: 'A1/A1',
                    name: 'item A1',
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            name: 'group B',
            nodes: [],
          },
        ],
      },
    });

    expect(getByText('group A')).toBeDefined(); // should show label
    expect(getByText('folder A1')).toBeDefined(); // should show first level
    expect(getByText('folder A1')).toHaveAttribute('aria-expanded', 'false'); // default not expand
    expect(getByText('group B')).toBeDefined();
  });

  it('should auto expand and auto active', async () => {
    const stubCallback = jest.fn();
    const { getByText } = render(XNavDrawer, {
      props: {
        modelValue: [
          {
            nodes: [
              {
                key: 'A1',
                name: 'folder A1',
                autoExpand: true,
                children: [
                  {
                    key: 'A1/A1',
                    name: 'item A1',
                    children: [],
                  },
                ],
              },
              {
                key: 'A2',
                name: 'folder A2',
                children: [
                  {
                    key: 'A2/A2',
                    name: 'item A2',
                    callback: stubCallback,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
        autoActive: 'A2/A2',
      },
    });

    await nextTick();
    expect(getByText('folder A1')).toHaveAttribute('aria-expanded', 'true'); // should auto expand
    expect(getByText('folder A2')).toHaveAttribute('aria-expanded', 'true'); // should auto active and trigger expand
    expect(stubCallback).toBeCalled(); // should auto active and trigger callback
  });
});

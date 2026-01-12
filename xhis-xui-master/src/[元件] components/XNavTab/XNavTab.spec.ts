import { fireEvent, render, screen } from '@testing-library/vue';
import { nextTick } from 'vue';

import { TabEntry, XNavTab } from './index';

describe('XNavTab', () => {
  it('test empty Nav tab', async () => {
    render(XNavTab);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('test Nav tab', async () => {
    const tabList: TabEntry[] = [
      {
        name: 'tab1',
        displayName: 'TAB01',
      },
      {
        name: 'tab2',
        displayName: 'TAB02',
        mark: true,
      },
      {
        name: 'tab3',
        displayName: 'TAB03',
        disabled: true,
      },
      {
        name: 'tab4',
        displayName: 'TAB04',
        mark: true,
        disabled: true,
      },
    ];
    const { emitted } = render(XNavTab, {
      props: {
        tabList,
        currentTabName: 'tab1',
      },
    });
    expect(screen.findByText('TAB01')).toBeDefined();

    await fireEvent.click(await screen.findByText('TAB02'));
    await fireEvent.click(await screen.findByText('TAB03'));
    await nextTick();
    expect(emitted().change.length).toBe(1);
  });
});

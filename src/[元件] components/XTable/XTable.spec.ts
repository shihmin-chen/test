import { fireEvent, render, screen } from '@testing-library/vue';
import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

import { getKeyIndex } from '../../utils';
import * as useVirtualList from './composables/useVirtualList';
import fakedata from './demo/fakedata';
import { XTable, XTableEntryOption } from './index';
import * as UseScrollToRow from './useScrollToRow';

describe('XTable', () => {
  it('should deal empty props', () => {
    render(XTable);

    expect(screen.getByRole('table')).toBeDefined();
  });

  it('should render a table', () => {
    render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
      },
      slots: {
        titleCell: () => 'foobar cell',
      },
    });

    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.getByText(fakedata[0].encounterNo)).toBeDefined();
  });

  it('should render a table with tree', async () => {
    render(XTable, {
      props: {
        options: [
          { index: 'encounterNo' },
          { index: 'toggle', toggle: true, indent: true },
        ] as XTableEntryOption[],
        data: fakedata,
        childrenKey: 'subset',
      },
      slots: {
        titleCell: () => 'foobar cell',
      },
    });

    // @ts-expect-error handler: context not matters
    const childEncounterNo = fakedata[0]?.subset[0].encounterNo;

    // should render child
    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.queryByText(childEncounterNo)).toBeInTheDocument();

    // should not render child after click toggle button
    await fireEvent.click(screen.getAllByTestId('x-table-tree-node-toggle')[0]);
    expect(screen.queryByText(childEncounterNo)).not.toBeInTheDocument();
  });

  it('should render a table with header', () => {
    render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        noHeader: false,
      },
    });

    expect(screen.getByRole('columnheader')).toBeDefined();
  });

  it('should render a table without header', () => {
    render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        noHeader: true,
      },
    });

    expect(screen.queryByRole('columnheader')).toBeNull();
  });

  it('should emit something on click', async () => {
    const { emitted } = render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        interactive: true,
      },
    });

    const cell = screen.getByText(fakedata[0].encounterNo);

    await fireEvent.click(cell);
    expect(emitted().rowClick.length).toBe(1);
    expect((emitted().rowClick[0] as unknown[])[0]).toEqual(
      expect.objectContaining(fakedata[0]),
    );
  });

  it('should emit something on dbclick', async () => {
    const { emitted } = render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        interactive: true,
      },
    });

    const cell = screen.getByText(fakedata[0].encounterNo);

    await fireEvent.dblClick(cell);
    expect(emitted().rowDoubleClick.length).toBe(1);
    expect((emitted().rowDoubleClick[0] as unknown[])[0]).toEqual(
      expect.objectContaining(fakedata[0]),
    );
  });

  it('should emit something on contextMenu', async () => {
    const { emitted } = render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        interactive: true,
      },
    });

    const cell = screen.getByText(fakedata[0].encounterNo);

    await fireEvent.contextMenu(cell);
    expect(emitted().rowContextMenu.length).toBe(1);
    expect((emitted().rowContextMenu[0] as unknown[])[0]).toEqual(
      expect.objectContaining(fakedata[0]),
    );
  });

  it('should show additional header stuff', async () => {
    render(XTable, {
      props: {
        options: [
          { index: 'encounterNo', sort: 'string', desc: 'hello' },
        ] as XTableEntryOption[],
        data: fakedata,
        interactive: true,
      },
    });
    expect(screen.getByTestId('x-table-sort-arrow')).toBeDefined();
    await fireEvent.click(screen.getByTestId('x-table-sort-arrow'));
    expect(screen.getByTitle('hello')).toBeDefined();
  });

  it('should scroll to row', async () => {
    const wrapper = mount(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        interactive: true,
        enableShadow: true,
      },
    });
    const spyScroll = jest.spyOn(UseScrollToRow, 'scrollToTableRow');
    await wrapper.vm.scrollToRow(fakedata[0].encounterNo);
    expect(spyScroll).toBeCalledTimes(1);
    await wrapper.vm.scrollToRow(fakedata[fakedata.length - 1].encounterNo);
    expect(spyScroll).toBeCalledTimes(2);
  });

  it('should scroll to specific position', async () => {
    const wrapper = mount(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
      },
    });
    const spyScroll = jest.spyOn(UseScrollToRow, 'scrollToTableRow');

    wrapper.vm.scrollToRow(fakedata[0].encounterNo);
    expect(spyScroll.mock.lastCall[0]).toMatchObject({ position: 'start' });

    wrapper.vm.scrollToRow(fakedata[0].encounterNo, {});
    expect(spyScroll.mock.lastCall[0]).toMatchObject({ position: 'start' });

    wrapper.vm.scrollToRow(fakedata[0].encounterNo, { position: 'center' });
    expect(spyScroll.mock.lastCall[0]).toMatchObject({ position: 'center' });
  });

  it("`rowElem doesn't exist", async () => {
    const wrapper = mount(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
      },
    });
    wrapper.vm.rowsRefMap[fakedata[0].encounterNo] = null;
    const spyScroll = jest.spyOn(UseScrollToRow, 'scrollToTableRow');
    wrapper.vm.scrollToRow(fakedata[0].encounterNo);
    expect(spyScroll).toBeCalledTimes(0);
  });

  it('should toggleShadow', () => {
    const wrapper = mount(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        interactive: true,
        enableShadow: false,
      },
    });
    wrapper.vm.toggleShadow();
  });

  it('should forceUpdate', () => {
    const wrapper = mount(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        interactive: true,
        enableShadow: false,
      },
    });
    wrapper.vm.forceUpdate();
  });
});

describe('XTable functionality', () => {
  it('getKeyIndex by given params', () => {
    const item = {
      hello: 'world',
      foo: 'bar',
    };

    expect(getKeyIndex('hello', item)).toBe('world');
    expect(getKeyIndex(undefined, item, 'foo')).toBe('bar');
    expect(getKeyIndex(['hello', 'foo'], item)).toBe('world|bar');
    expect(getKeyIndex((v) => (v as typeof item).hello + 'cool', item)).toBe(
      'worldcool',
    );
  });
});

describe('XTable interactive', () => {
  it('should highlight the row and the column when mouseover', async () => {
    render(XTable, {
      props: {
        options: [
          { index: 'encounterNo' },
          { index: 'encounterDate' },
        ] as XTableEntryOption[],
        data: fakedata,
        keyIndex: 'encounterNo',
        interactive: true,
        interactiveOptions: {
          rowColor: '#F2F2F2',
          columnColor: '#F2F2F2',
          intersectionColor: '#C2C2C2',
        },
      },
    });

    const cell = screen.getByText(fakedata[2].encounterDate);
    await fireEvent.mouseOver(cell);
    expect(cell.classList.contains('x-table-td--interactive-row')).toBe(true);
    expect(cell.classList.contains('x-table-td--interactive-column')).toBe(
      true,
    );
    expect(
      cell.classList.contains('x-table-td--interactive-intersection'),
    ).toBe(true);
  });

  it('should not highlight after mouseout', async () => {
    render(XTable, {
      props: {
        options: [
          { index: 'encounterNo' },
          { index: 'encounterDate' },
        ] as XTableEntryOption[],
        data: fakedata,
        keyIndex: 'encounterNo',
        interactive: true,
        interactiveOptions: {
          rowColor: '#F2F2F2',
          columnColor: '#F2F2F2',
          intersectionColor: '#C2C2C2',
        },
      },
    });

    const cell = screen.getByText(fakedata[2].encounterDate);
    await fireEvent.mouseOver(cell);
    await fireEvent.mouseOut(cell);
    expect(cell.classList.contains('x-table-td--interactive-row')).toBe(false);
    expect(cell.classList.contains('x-table-td--interactive-column')).toBe(
      false,
    );
    expect(
      cell.classList.contains('x-table-td--interactive-intersection'),
    ).toBe(false);
  });

  it('should highlight new cross when mouseOver new cell', async () => {
    render(XTable, {
      props: {
        options: [
          { index: 'encounterNo' },
          { index: 'encounterDate' },
        ] as XTableEntryOption[],
        data: fakedata,
        keyIndex: 'encounterNo',
        interactive: true,
        interactiveOptions: {
          rowColor: '#F2F2F2',
          columnColor: '#F2F2F2',
          intersectionColor: '#C2C2C2',
        },
      },
    });

    const cell00 = screen.getByText(fakedata[0].encounterNo);
    const cell01 = screen.getByText(fakedata[0].encounterDate);
    const cell10 = screen.getByText(fakedata[1].encounterNo);
    const cell11 = screen.getByText(fakedata[1].encounterDate);
    await fireEvent.mouseOver(cell00);
    await fireEvent.mouseOut(cell00);
    await fireEvent.mouseOver(cell11);

    // no highlight
    expect(cell00.classList.contains('x-table-td--interactive-row')).toBe(
      false,
    );
    expect(cell00.classList.contains('x-table-td--interactive-column')).toBe(
      false,
    );
    expect(
      cell00.classList.contains('x-table-td--interactive-intersection'),
    ).toBe(false);

    // same column
    expect(cell01.classList.contains('x-table-td--interactive-row')).toBe(
      false,
    );
    expect(cell01.classList.contains('x-table-td--interactive-column')).toBe(
      true,
    );
    expect(
      cell01.classList.contains('x-table-td--interactive-intersection'),
    ).toBe(false);

    // same row
    expect(cell10.classList.contains('x-table-td--interactive-row')).toBe(true);
    expect(cell10.classList.contains('x-table-td--interactive-column')).toBe(
      false,
    );
    expect(
      cell10.classList.contains('x-table-td--interactive-intersection'),
    ).toBe(false);

    // intersection
    expect(cell11.classList.contains('x-table-td--interactive-row')).toBe(true);
    expect(cell11.classList.contains('x-table-td--interactive-column')).toBe(
      true,
    );
    expect(
      cell11.classList.contains('x-table-td--interactive-intersection'),
    ).toBe(true);
  });

  it('Test handleToggleClick - virtual list', async () => {
    // setup: mock
    const mockRefreshVirtualListRange = jest.fn();
    jest.spyOn(useVirtualList, 'useVirtualList').mockReturnValue({
      visibleData: ref([]),
      initData: mockRefreshVirtualListRange,
      debounceCalculateVisibleData: jest.fn(),
    });

    // setup: mount
    const wrapper = shallowMount(XTable, {
      props: {
        virtualOptions: {
          itemHeight: 56,
          overscan: 5,
        },
      },
    });

    // exercise: update form state
    await wrapper.vm.handleToggleClick();

    // verify: should refresh virtual list
    expect(mockRefreshVirtualListRange).toBeCalledTimes(1);
  });

  it('Test hotkey ArrowUp', async () => {
    const { container, emitted } = render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        enableHotkey: true,
      },
    });

    // exercise
    await fireEvent.keyDown(container, { code: 'ArrowUp' });
    await flushPromises();

    // verify
    expect(emitted()['update:selected']).toBeUndefined();

    // exercise
    const cell = screen.getByText(fakedata[1].encounterNo);
    await fireEvent.click(cell);
    await fireEvent.keyDown(container, { code: 'ArrowUp' });
    await flushPromises();

    // verify
    expect(emitted()['update:selected'].length).toBe(1);
    expect((emitted()['update:selected'][0] as unknown[])[0]).toStrictEqual(
      fakedata[0],
    );
  });

  it('Test hotkey ArrowDown', async () => {
    const { container, emitted } = render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        enableHotkey: true,
      },
    });

    // exercise
    const lastCell = screen.getByText(
      fakedata[fakedata.length - 1].encounterNo,
    );
    await fireEvent.click(lastCell);
    await fireEvent.keyDown(container, { code: 'ArrowDown' });
    await flushPromises();

    // verify
    expect(emitted()['update:selected'].length).toBe(1);
    expect((emitted()['update:selected'][0] as unknown[])[0]).toStrictEqual(
      fakedata[fakedata.length - 1],
    );

    // exercise
    const firstCell = screen.getByText(fakedata[0].encounterNo);
    await fireEvent.click(firstCell);
    await fireEvent.keyDown(container, { code: 'ArrowDown' });
    await flushPromises();

    // verify
    expect(emitted()['update:selected'].length).toBe(2);
    expect((emitted()['update:selected'][1] as unknown[])[0]).toStrictEqual(
      fakedata[1],
    );
  });

  it('Test hotkey enter', async () => {
    const { container, emitted } = render(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        enableHotkey: true,
      },
    });

    // exercise
    const cell = screen.getByText(fakedata[0].encounterNo);
    await fireEvent.click(cell);
    await fireEvent.keyDown(container, { code: 'Enter' });
    await flushPromises();

    // verify
    expect(emitted()['keyEnter'].length).toBe(1);
    expect((emitted()['keyEnter'][0] as unknown[])[0]).toStrictEqual(
      fakedata[0],
    );
  });

  it('Test selectedData', async () => {
    // mount
    const wrapper = mount(XTable, {
      props: {
        options: [{ index: 'encounterNo' }] as XTableEntryOption[],
        data: fakedata,
        enableHotkey: true,
      },
    });

    // verify
    expect(wrapper.vm.selectedData).toBe(undefined);

    // exercise
    await wrapper.setProps({ selected: fakedata[0].encounterNo });

    // verify
    expect(wrapper.vm.selectedData).toStrictEqual(fakedata[0]);

    // exercise
    await wrapper.setProps({ selected: fakedata[4].encounterNo });

    // verify
    expect(wrapper.vm.selectedData).toStrictEqual(fakedata[4]);
  });
});

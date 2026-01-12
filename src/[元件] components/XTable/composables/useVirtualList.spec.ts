import { ref, computed } from 'vue';
import { useVirtualList } from './useVirtualList';
import { flushPromises, shallowMount } from '@vue/test-utils';
import lodash from 'lodash';

describe('Test useVirtualList', () => {
  beforeAll(() => {
    jest.spyOn(lodash, 'debounce').mockImplementation((fn) => {
      return fn;
    });
  });

  it('containerRef and wrapperRef is empty', async () => {
    const wrapper = shallowMount({
      template: `<div/>`,
      setup() {
        const containerRef = ref();
        const wrapperRef = ref();
        const sourceList = computed(() => [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Bob' },
          { id: 4, name: 'Alice' },
          { id: 5, name: 'Eve' },
        ]);
        const options = {
          itemHeight: 20,
          overscan: 100,
          throttleMs: 200,
        };

        const { visibleData, initData, debounceCalculateVisibleData } =
          useVirtualList(containerRef, wrapperRef, sourceList, options);

        return {
          container: containerRef,
          wrapper: wrapperRef,
          visibleData,
          initData,
          debounceCalculateVisibleData,
        };
      },
    });

    expect(wrapper.vm.visibleData).toEqual([]);
    wrapper.vm.debounceCalculateVisibleData();
    expect(wrapper.vm.visibleData).toEqual([]);
  });

  it('containerRef and wrapperRef is not empty -- item static height', async () => {
    const mockSetProperty = jest.fn();

    const wrapper = shallowMount({
      template: `<div/>`,
      setup() {
        const containerRef = ref({
          scrollTop: 0, // 當前捲動的位置
          style: {
            setProperty: mockSetProperty,
          },
        });
        const wrapperRef = ref({
          offsetHeight: 200, // 可視範圍高度
        });
        const sourceList = computed(() =>
          Array.from({ length: 100 }).map((_, index) => ({
            id: index,
            name: `name${index}`,
          }))
        );
        const options = {
          itemHeight: 20,
          overscan: 100,
          throttleMs: 200,
        };

        const { visibleData, initData, debounceCalculateVisibleData } =
          useVirtualList(containerRef, wrapperRef, sourceList, options);

        return {
          container: containerRef,
          wrapper: wrapperRef,
          visibleData,
          initData,
          debounceCalculateVisibleData,
        };
      },
    });
    await flushPromises();

    // 當前高度 0 , 上方 buffer 100(但已經是最上面所以沒有 buffer) + 可視範圍高度 200 + 下方 buffer 100 = 300
    // 每個元件高度 20  => 300 / 20 = 15
    expect(wrapper.vm.visibleData.length).toEqual(16);

    // 滾到高度 300
    wrapper.vm.container.scrollTop = 300;
    wrapper.vm.debounceCalculateVisibleData();

    // 當前高度 300 , 上方 buffer 100 + 可視範圍高度 200 + 下方 buffer 100 = 400
    // 每個元件高度 20  => 400 / 20 = 20
    expect(wrapper.vm.visibleData.length).toEqual(21);
  });

  it('containerRef and wrapperRef is not empty -- item dynamic height', async () => {
    const mockSetProperty = jest.fn();

    const wrapper = shallowMount({
      template: `<div/>`,
      setup() {
        const containerRef = ref({
          scrollTop: 0, // 當前捲動的位置
          style: {
            setProperty: mockSetProperty,
          },
        });
        const wrapperRef = ref({
          offsetHeight: 200, // 可視範圍高度
        });
        const sourceList = computed(() =>
          Array.from({ length: 100 }).map((_, index) => ({
            id: index + 1,
            name: `name${index + 1}`,
          }))
        );
        const options = {
          // 1-10 高度 10, 11-20 高度 20 ... 91-100 高度 100
          itemHeight: (index) => Math.ceil(index / 10) * 10,
          overscan: 100,
          throttleMs: 200,
        };

        const { visibleData, initData, debounceCalculateVisibleData } =
          useVirtualList(containerRef, wrapperRef, sourceList, options);

        return {
          container: containerRef,
          wrapper: wrapperRef,
          visibleData,
          initData,
          debounceCalculateVisibleData,
        };
      },
    });
    await flushPromises();

    // 當前高度 0 , 上方 buffer 100(但已經是最上面所以沒有 buffer) + 可視範圍高度 200 + 下方 buffer 100 = 300
    // 元件 1 到 10 每個高度為 10 => 10*10 = 100 為 item 11
    // 元件 11 到 20 每個高度為 20 => 10*20 = 200 為 item 21
    // 100 + 200 = 300
    expect(wrapper.vm.visibleData.length).toEqual(22);

    // 滾到高度 300
    wrapper.vm.container.scrollTop = 300;
    wrapper.vm.debounceCalculateVisibleData();

    // 當前高度 300 , 上方 buffer 100 + 可視範圍高度 200 + 下方 buffer 100 = 400
    // 元件 1 到 10 每個高度為 10 => 10*10 = 100
    // 元件 11 到 20 每個高度為 20 => 10*20 = 200
    // 100 + 200 = 300 高度 300 第一個元件 為 item 21
    // 上方 buffer 100 => 100/20 => 5 計算到 item 16
    // 元件 21 到 30 每個高度為 30 => 10*30 = 300
    // 可視範圍高度 200 + 下方 buffer 100 = 300
    // 300/30 => 10 計算到 item 31
    // item 31 - item 16 => 15
    expect(wrapper.vm.visibleData.length).toEqual(16);
  });
});

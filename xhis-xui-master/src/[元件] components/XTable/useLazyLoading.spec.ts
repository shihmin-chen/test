import { nextTick, ref } from 'vue';
import { useSetup } from '../../testUtils/mount';
import { useLazyLoading } from './useLazyLoading';

describe('useLazyLoading', () => {
  it('should be useLazyLoading correctly', async () => {
    const vm = useSetup(() => {
      const fakeData = ref<Record<string, unknown>[]>([]);
      const lazyRender = ref<boolean>(true);
      const { showConfigs } = useLazyLoading(fakeData, lazyRender);

      const changeData = () => {
        fakeData.value = [{ key: 'value' }];
      };

      return { showConfigs, changeData };
    });
    vm.changeData();
    expect(vm.showConfigs).toStrictEqual([]);
    await nextTick();
    expect(vm.showConfigs).toStrictEqual([true]);
  });
});

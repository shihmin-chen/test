import { useKeyOperations } from './useKeyOperations';

describe('composable', () => {
  describe('useKeyOperations', () => {
    it('Test scrollToOption', async () => {
      const fakeScrollbar = {
        scrollTop: 0,
        clientHeight: 100,
        scrollHeight: 500,
        querySelector: (query: string) => {
          if (query === '[data-option-index="0"]') {
            return {
              offsetHeight: 40,
              offsetTop: 0,
            };
          }
          if (query === '[data-option-index="2"]') {
            return {
              offsetHeight: 40,
              offsetTop: 80,
            };
          }
        },
      };

      const { scrollToOption } = useKeyOperations([], fakeScrollbar, 0, () => {
        return;
      });
      let result = scrollToOption(2);
      expect(fakeScrollbar.scrollTop).toBe(20);
      expect(result).toBe(true);

      result = scrollToOption(0);
      expect(fakeScrollbar.scrollTop).toBe(0);
      expect(result).toBe(true);

      result = scrollToOption(100);
      expect(result).toBe(false);
    });


  });
});

import { ref } from 'vue';

import { useSearchOnEnter } from './useSearchOnEnter';

describe('useSearchOnEnter', () => {
  let searchText;
  let search;
  let showSearchArea;
  let hideSearchArea;
  let clearSearchData;

  beforeEach(() => {
    searchText = ref('');
    search = jest.fn();
    showSearchArea = jest.fn();
    hideSearchArea = jest.fn();
    clearSearchData = jest.fn();
  });
 

  it('should not perform search if searchText is empty', () => {
    const { handleKeyEnter } = useSearchOnEnter({
      searchText,
      search,
      showSearchArea,
      hideSearchArea,
      clearSearchData,
    });

    searchText.value = '';
    handleKeyEnter();
    expect(search).not.toHaveBeenCalled();
  });

  it('should show search area on focus in', () => {
    const { onFocusIn } = useSearchOnEnter({
      searchText,
      search,
      showSearchArea,
      hideSearchArea,
      clearSearchData,
    });

    onFocusIn();
    expect(showSearchArea).toHaveBeenCalled();
  });

  it('should hide search area on focus out', () => {
    const { onFocusOut } = useSearchOnEnter({
      searchText,
      search,
      showSearchArea,
      hideSearchArea,
      clearSearchData,
    });

    onFocusOut();
    expect(hideSearchArea).toHaveBeenCalled();
  });

  it('should clear search data and reset searchStarted on searchText change', () => {
    useSearchOnEnter({
      searchText,
      search,
      showSearchArea,
      hideSearchArea,
      clearSearchData,
    });

    searchText.value = 'new search';
    expect(clearSearchData).not.toHaveBeenCalled();
  });

 

  it('should cancel delayed search on focus out', () => {
    jest.useFakeTimers();
    const { onFocusIn, onFocusOut } = useSearchOnEnter({
      searchText,
      search,
      showSearchArea,
      hideSearchArea,
      clearSearchData,
      hasPredict: true,
    });

    searchText.value = '';
    onFocusIn();
    onFocusOut();
    jest.advanceTimersByTime(200);
    expect(search).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});

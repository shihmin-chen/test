import { Ref, onActivated, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';

interface SearchOnEnterParams {
  searchText: Ref<string>;
  hasPredict?: boolean;
  search: (searchText: string, oldSearchText: string) => void;
  showSearchArea?: () => void;
  hideSearchArea?: () => void;
  clearSearchData: () => void;
}

const PREDICT_DELAY = 200;

export const useSearchOnEnter = ({
  searchText,
  search,
  showSearchArea,
  hideSearchArea,
  clearSearchData,
  hasPredict = false,
}: SearchOnEnterParams) => {
  const oldSearchText = ref('');
  const searchStarted = ref(false);
  const active = ref(false);
  const handleKeyEnter = () => {
    if (!searchText.value) {
      return;
    }
    performSearch();
  };

  const performSearch = () => {
    if (searchStarted.value || !active.value) {
      return;
    }
    showSearchArea?.();
    searchStarted.value = true;
    search(searchText.value, oldSearchText.value);
    oldSearchText.value = searchText.value;
  };

  const onFocusIn = () => {
    showSearchArea?.();
    if (!searchText.value && hasPredict) {
      delaySearch();
    }
  };
  const timeout = ref();
  const delaySearch = () => {
    // perform search after 200ms, do not perform another search if a timeout is already set
    if (!timeout.value) {
      timeout.value = setTimeout(performSearch, PREDICT_DELAY);
    }
  };
  const onFocusOut = () => {
    cancelDelaySearch();
    hideSearchArea?.();
    if (!searchText.value) {
      searchStarted.value = false;
    }
  };

  const cancelDelaySearch = () => {
    clearTimeout(timeout.value);
    timeout.value = undefined;
  };

  watch(searchText, (value) => {
    cancelDelaySearch();
    searchStarted.value = false;
    clearSearchData();

    if (value) {
      showSearchArea?.();
    } else if (!hasPredict) {
      hideSearchArea?.();
    } else {
      delaySearch(); // call search function to get predict data
    }
  });
  onActivated(() => {
    active.value = true;
  });
  onMounted(() => {
    active.value = true;
  });
  onDeactivated(() => {
    active.value = false;
  });
  onUnmounted(() => {
    active.value = false;
  });
  return { handleKeyEnter, onFocusIn, onFocusOut, searchStarted };
};

import { Ref, ref } from 'vue';

export const useDrugSearch = <SearchResultType, SearchResultContentType>(
  getDrugSearchResult: (searchText: string) => Promise<SearchResultType[]>,
  getSearchResultContent: (result: SearchResultType) => SearchResultContentType
) => {
  const isSearchLoading = ref(false);
  const isSearchError = ref(false);

  const searchResults: Ref<SearchResultContentType[]> = ref([]);

  const clearSearchResults = () => {
    searchResults.value = [];
    isSearchError.value = false;
  };

  const search = async (searchText: string) => {
    isSearchLoading.value = true;
    try {
      const results = await getDrugSearchResult(searchText);
      searchResults.value = results.map((result) => getSearchResultContent(result));
      isSearchError.value = false;
    } catch {
      searchResults.value = [];
      isSearchError.value = true;
    }
    isSearchLoading.value = false;
  };

  return {
    isSearchLoading,
    isSearchError,
    searchResults,
    clearSearchResults,
    search,
  };
};

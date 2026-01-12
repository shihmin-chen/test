import { useDrugSearch } from './useDrugSearch';

describe('useDrugSearch', () => {
  const mockGetDrugSearchResult = jest.fn();
  const mockGetSearchResultContent = jest.fn();

  const setup = () => {
    const {
      isSearchLoading,
      isSearchError,
      searchResults,
      clearSearchResults,
      search,
    } = useDrugSearch(mockGetDrugSearchResult, mockGetSearchResultContent);
    return {
      isSearchLoading,
      isSearchError,
      searchResults,
      clearSearchResults,
      search,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { isSearchLoading, isSearchError, searchResults } = setup();
    expect(isSearchLoading.value).toBe(false);
    expect(isSearchError.value).toBe(false);
    expect(searchResults.value).toEqual([]);
  });

  it('should set isSearchLoading to true when search is called', async () => {
    const { isSearchLoading, search } = setup();
    mockGetDrugSearchResult.mockResolvedValue([]);
    const searchText = 'test';
    const searchPromise = search(searchText);
    expect(isSearchLoading.value).toBe(true);
    await searchPromise;
  });

  it('should set searchResults and isSearchError correctly on successful search', async () => {
    const { searchResults, isSearchError, search } = setup();
    const mockResults = [{ id: 1 }, { id: 2 }];
    const mockContent = { name: 'Drug' };
    mockGetDrugSearchResult.mockResolvedValue(mockResults);
    mockGetSearchResultContent.mockReturnValue(mockContent);

    await search('test');

    expect(searchResults.value).toEqual([mockContent, mockContent]);
    expect(isSearchError.value).toBe(false);
  });

  it('should set searchResults to empty and isSearchError to true on failed search', async () => {
    const { searchResults, isSearchError, search } = setup();
    mockGetDrugSearchResult.mockRejectedValue(new Error('Search failed'));

    await search('test');

    expect(searchResults.value).toEqual([]);
    expect(isSearchError.value).toBe(true);
  });

  it('should clear search results and reset isSearchError when clearSearchResults is called', () => {
    const { searchResults, isSearchError, clearSearchResults } = setup();
    searchResults.value = [{ name: 'Drug' }];
    isSearchError.value = true;

    clearSearchResults();

    expect(searchResults.value).toEqual([]);
    expect(isSearchError.value).toBe(false);
  });
});

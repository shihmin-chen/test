import { reactive } from 'vue';

export default function useHighlightRow() {
  const highlightedRows = reactive(new Map<unknown, true>());

  const highlightRow = (key: string) => {
    highlightedRows.set(key, true);
    setTimeout(() => {
      highlightedRows.delete(key);
    }, 3000);
  };

  const shouldHighlightRow = (key: string) => highlightedRows.has(key);

  return {
    highlightRow,
    shouldHighlightRow,
  };
}

import { unref } from 'vue';
import fakedata from '../components/XTable/demo/fakedata';
import { generateSortFunctionFromSeq, sortByIndex, useSort } from './useSort';

describe('useSort', () => {
  it('provide useSort function', () => {
    const { sortedData, handleSortChange } = useSort(fakedata);

    expect(unref(sortedData)).toStrictEqual(fakedata);
    handleSortChange('encounterNo' as keyof typeof fakedata[number]);

    expect(unref(sortedData)).not.toStrictEqual(fakedata);

    handleSortChange('encounterNo' as keyof typeof fakedata[number]);
    expect(unref(sortedData)).not.toStrictEqual(fakedata);

    handleSortChange('encounterNo' as keyof typeof fakedata[number]);
    expect(unref(sortedData)).toStrictEqual(fakedata);

    handleSortChange('encounterDate' as keyof typeof fakedata[number]);
    expect(unref(sortedData)).not.toStrictEqual(fakedata);
  });

  it('test sort tree data', () => {
    const testData = [
      {
        data: 'c',
        children: [
          {
            data: 'e',
          },
          {
            data: 'd',
          },
        ],
      },
      {
        data: 'a',
        children: [], // case: empty array
      },
      {
        data: 'b',
        // case: children key is undefined
      },
    ];
    const expectSortedData = [
      {
        data: 'a',
        children: [],
      },
      {
        data: 'b',
      },
      {
        data: 'c',
        children: [
          {
            data: 'd',
          },
          {
            data: 'e',
          },
        ],
      },
    ];
    const { sortedData } = useSort(testData, {
      index: 'data',
      reverse: false,
      type: 'string',
      childrenKey: 'children',
    });

    expect(sortedData.value).toStrictEqual(expectSortedData);
  });

  it('sort data as string by default', () => {
    const testData = [
      {
        data: 'a',
      },
      {
        data: 'c',
      },
      {
        data: 'c',
      },
      {
        data: 'd',
      },
      {
        data: 'b',
      },
    ];
    expect(
      [...testData].sort(sortByIndex('data')).map(({ data }) => data)
    ).toStrictEqual(['a', 'b', 'c', 'c', 'd']);
  });

  it('sort data as number', () => {
    const testData = [
      {
        data: '20',
      },
      {
        data: '22',
      },
      {
        data: '2',
      },
      {
        data: '2',
      },
      {
        data: '211',
      },
    ];
    expect(
      [...testData].sort(sortByIndex('data', 'number')).map(({ data }) => data)
    ).toStrictEqual(['2', '2', '20', '22', '211']);
  });
});

describe('generateSortFunctionFromSeq', () => {
  it('can transform sequence to sort function', () => {
    const seq = ['a', 'c', 'b', 'd'];
    const sortFn = generateSortFunctionFromSeq(seq);

    expect(['a', 'b', 'c', 'd'].sort(sortFn)).toEqual(seq);
  });
});

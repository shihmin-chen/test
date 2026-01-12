import { Editor } from '@tiptap/vue-3';

import { useCharacterCount } from './useCharacterCount';

describe('useCharacterCount', () => {
  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Test refreshTotalCharacter', async () => {
    // setup: use composable
    const { totalCharacter, refreshTotalCharacter } = useCharacterCount();

    // exercise: call target function
    const editor = {
      state: {
        doc: {
          textBetween: jest.fn().mockReturnValue('fakeText'),
          content: {
            size: 8,
          },
        },
      },
    } as unknown as Editor;
    refreshTotalCharacter(editor);

    // verify: should get expected character count
    expect(totalCharacter.value).toBe(8); // 8 is length of 'fakeText'
  });

  it('Test refreshTotalCharacter - not string', async () => {
    // setup: use composable
    const { totalCharacter, refreshTotalCharacter } = useCharacterCount();

    // exercise: call target function
    const editor = {
      state: {
        doc: {
          textBetween: jest.fn().mockReturnValue(undefined),
          content: {
            size: undefined,
          },
        },
      },
    } as unknown as Editor;
    refreshTotalCharacter(editor);

    // verify: should get expected character count
    expect(totalCharacter.value).toBe(0); // if text is not string text, should return 0
  });
});

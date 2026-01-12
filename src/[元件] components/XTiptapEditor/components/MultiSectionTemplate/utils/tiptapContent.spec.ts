import {
  generateDocumentContent,
  generateSectionContentByJsonString,
  generateSectionContentByPlainText,
  getSectionJsonString,
  getSectionPlainText,
} from './tiptapContent';

describe('generateSectionContentByPlainText', () => {
  // setup: data
  const defaultJsonContext = {
    type: 'section',
    attrs: {
      key: 'fakeKey_0',
      name: 'fakeName_0',
    },
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'fakeText_0',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'fakeText_1',
          },
        ],
      }, // case: second line
      {
        type: 'paragraph',
      }, // case: empty content line
    ],
  };
  const defaultPlainText = 'fakeText_0\nfakeText_1\n';
  const defaultJsonString = JSON.stringify(defaultJsonContext.content);
  const defaultSectionNodeAttrs = {
    key: 'fakeKey_0',
    name: 'fakeName_0',
  };

  it('Test generateSectionContentByPlainText', async () => {
    // exercise: call target function
    const result = generateSectionContentByPlainText(
      defaultPlainText,
      defaultSectionNodeAttrs,
    );

    // verify: should get expected section content
    expect(result).toStrictEqual(defaultJsonContext);
  });

  it('Test generateSectionContentByJsonString - plain text', async () => {
    // exercise: call target function
    const result = generateSectionContentByJsonString(
      defaultPlainText,
      defaultSectionNodeAttrs,
    );

    // verify: should get expected section content
    expect(result).toStrictEqual(defaultJsonContext);
  });

  it('Test generateSectionContentByJsonString - json string', async () => {
    // exercise: call target function
    const result = generateSectionContentByJsonString(
      defaultJsonString,
      defaultSectionNodeAttrs,
    );

    // verify: should get expected section content
    expect(result).toStrictEqual(defaultJsonContext);
  });

  it('Test generateDocumentContent', async () => {
    // setup: data
    const sectionContents = [
      {
        type: 'section',
        attrs: {
          key: 'fakeKey_0',
          name: 'fakeName_0',
        },
        content: [
          {
            type: 'paragraph',
          },
        ],
      },
    ];

    // exercise: call target function
    const result = generateDocumentContent(sectionContents);

    // verify: should get expected document content
    expect(result).toStrictEqual({
      type: 'doc',
      content: sectionContents,
    });
  });

  it('Test getSectionPlainText', async () => {
    // exercise: call target function
    const result = getSectionPlainText(defaultJsonContext);

    // verify: should get expected plain text
    expect(result).toStrictEqual(defaultPlainText);
  });

  it('Test getSectionJsonString', async () => {
    // exercise: call target function
    const result = getSectionJsonString(defaultJsonContext);

    // verify: should get expected plain text
    expect(result).toStrictEqual(defaultJsonString);
  });
});

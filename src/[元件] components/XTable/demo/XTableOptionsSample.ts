import { XTableEntryOption } from '..'; // @asus-aics/xui;

const data = [
  {
    hello: 'hello',
    world: 'world',
  },
];

export const options: XTableEntryOption<
  // provide a generic data type here,
  // it will hint the index string
  typeof data[number]
>[] = [
  {
    index: 'hello',
  },
  {
    // If dummy column is needed, cast it as a key to prevent ts-error
    index: 'not in data key' as keyof typeof data[number],
  },
  {
    // or just any it
    index: 'any' as any,
  },
];

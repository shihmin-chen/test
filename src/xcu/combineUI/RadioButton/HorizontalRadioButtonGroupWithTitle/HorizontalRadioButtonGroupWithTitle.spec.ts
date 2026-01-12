import { render } from '@testing-library/vue';

import { useHorizontalRadioButtonGroupWithTitle } from './HorizontalRadioButtonGroupWithTitle';
import HorizontalRadioButtonGroupWithTitle from './HorizontalRadioButtonGroupWithTitle.vue';

describe('HorizontalRadioButtonGroupWithTitle', () => {
  it('renders correctly', () => {
    const { getByText } = render(HorizontalRadioButtonGroupWithTitle, {
      props: {
        title: 'Test Title',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
    });

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('calls useHorizontalRadioButtonGroupWithTitle with correct props', () => {
    const props = {
      title: 'Test Title',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
    };

    const result = useHorizontalRadioButtonGroupWithTitle(props);

    expect(result).toBeDefined();
  });
});

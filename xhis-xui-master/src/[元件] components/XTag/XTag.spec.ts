import { render, screen } from '@testing-library/vue';
import { XTag } from './';

describe('XTag', () => {
  it('should render a tag with given content', () => {
    render(XTag, {
      slots: {
        default: 'hello world',
      },
    });
    expect(screen.getByText('hello world')).toBeDefined();
  });

  it('should render a tag with outline', () => {
    render(XTag, {
      props: {
        outline: true,
      },
      slots: {
        default: 'hello world',
      },
    });
    expect(screen.getByText('hello world')).toBeDefined();
  });

  it('should render a tag with dark mode', () => {
    render(XTag, {
      props: {
        dark: true,
      },
      slots: {
        default: 'hello world',
      },
    });
    expect(screen.getByText('hello world')).toBeDefined();
  });

  it('should render a tag with outline and dark mode', () => {
    render(XTag, {
      props: {
        outline: true,
        dark: true,
      },
      slots: {
        default: 'hello world',
      },
    });
    expect(screen.getByText('hello world')).toBeDefined();
  });
});

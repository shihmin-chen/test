import { render, screen } from '@testing-library/vue';
import VerticalRadioButtonGroupWithTitle from './VerticalRadioButtonGroupWithTitle.vue';
import { useVerticalRadioButtonGroupWithTitle } from './VerticalRadioButtonGroupWithTitle';

describe('VerticalRadioButtonGroupWithTitle', () => {
    it('renders the component', () => {
        render(VerticalRadioButtonGroupWithTitle, {
            props: {
                title: 'Test Title',
                options: [
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ],
            },
        });

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    });

    it('calls useVerticalRadioButtonGroupWithTitle with correct props', () => {
        const props = {
            title: 'Test Title',
            options: [
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
            ],
        };

        const { result } = useVerticalRadioButtonGroupWithTitle(props);

        expect(result).toBeDefined();
    });
});
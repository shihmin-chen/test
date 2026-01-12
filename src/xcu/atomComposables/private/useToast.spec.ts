import { createApp } from 'vue';
import { useToast, useProvideGlobalToastState, useInjectGlobalToastState } from './useToast';
import { XToastProps } from '../../type';

describe('useToast', () => {
    const defaultResetAutoHide = () => {};

    it('should initialize with default state', () => {
        const { state } = useToast(defaultResetAutoHide);
        expect(state.toastProps.visible).toBe(false);
    });

    it('should show toast with provided arguments', () => {
        const { state, show } = useToast(defaultResetAutoHide);
        const toastArgs: Omit<XToastProps, 'visible'> = { message: 'Test message' };
        show(toastArgs);
        expect(state.toastProps.visible).toBe(true);
        expect(state.toastProps.message).toBe('Test message');
    });

    it('should hide toast', () => {
        const { state, hide } = useToast(defaultResetAutoHide);
        hide();
        expect(state.toastProps.visible).toBe(false);
    });
});

describe('useProvideGlobalToastState and useInjectGlobalToastState', () => {
    const defaultResetAutoHide = () => {};

    it('should provide and inject global toast state', () => {
        const TestComponent = {
            setup() {
                useProvideGlobalToastState(defaultResetAutoHide);
                const { state, show, hide } = useInjectGlobalToastState();
                expect(state.toastProps.visible).toBe(false);

                const toastArgs: Omit<XToastProps, 'visible'> = { message: 'Global Test message' };
                show(toastArgs);
                expect(state.toastProps.visible).toBe(true);
                expect(state.toastProps.message).toBe('Global Test message');

                hide();
                expect(state.toastProps.visible).toBe(false);
            },
            template: '<div></div>'
        };

        const app = createApp(TestComponent);
        app.mount(document.createElement('div'));
    });

    it('should throw error if toast state is not provided', () => {
        expect(() => useInjectGlobalToastState()).toThrow('injectLocal must be called in setup');
    });
});
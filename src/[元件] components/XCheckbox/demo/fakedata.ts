import { CheckboxState } from '../../../composable/useCheckboxLinkage';

const parentState: CheckboxState = {
  key: '',
  checked: false,
  indeterminate: false,
  disabled: false,
};

const childrenState: Array<CheckboxState> = [
  {
    key: 'key1',
    display: 'checkbox1',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  {
    key: 'key2',
    display: 'checkbox2',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  {
    key: 'key3',
    display: 'checkbox3',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
];

const childrenStateWithIndeterminate: Array<CheckboxState> = [
  {
    key: 'key1',
    display: 'checkbox1',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  {
    key: 'key2',
    display: 'checkbox2',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  {
    key: 'key3',
    display: 'checkbox3',
    checked: false,
    indeterminate: true,
    disabled: false,
  },
];

const childrenStateWithDisabled: Array<CheckboxState> = [
  {
    key: 'key1',
    display: 'checkbox1',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  {
    key: 'key2',
    display: 'checkbox2',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  {
    key: 'key3',
    display: 'checkbox3',
    checked: false,
    indeterminate: false,
    disabled: true,
  },
];

const childrenStateWithAllDisabled: Array<CheckboxState> = [
  {
    key: 'key1',
    display: 'checkbox1',
    checked: false,
    indeterminate: false,
    disabled: true,
  },
  {
    key: 'key2',
    display: 'checkbox2',
    checked: false,
    indeterminate: false,
    disabled: true,
  },
  {
    key: 'key3',
    display: 'checkbox3',
    checked: false,
    indeterminate: false,
    disabled: true,
  },
];

const childrenStateWithEmpty: Array<CheckboxState> = [];

export {
  parentState,
  childrenState,
  childrenStateWithIndeterminate,
  childrenStateWithDisabled,
  childrenStateWithAllDisabled,
  childrenStateWithEmpty,
};

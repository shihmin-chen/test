export enum ActionID {
  normalTest = 'normalTest',
  orderTest = 'orderTest',
  inputTypeTest = 'inputTypeTest',
  textFieldTest = 'textFieldTest',
  preventFieldTest = 'preventFieldTest',
  routerTest = 'routerTest',
  modalTest = 'modalTest',
  closeTest = 'closeTest',
}

export const KeyCombinationMap: Record<ActionID, KeyboardEvent['code'][]> = {
  [ActionID.normalTest]: ['Control', 'KeyA'],
  [ActionID.orderTest]: ['Control', 'KeyA', 'F1'],
  [ActionID.inputTypeTest]: ['Control', 'KeyB'],
  [ActionID.textFieldTest]: ['Control', 'KeyC'],
  [ActionID.preventFieldTest]: ['F3'],
  [ActionID.routerTest]: ['F2'],
  [ActionID.modalTest]: ['F4'],
  [ActionID.closeTest]: ['Escape'],
};

enum OpdRouter {
  fakeURL = 'fakeURL',
}

type ConditionMap = Record<
  ActionID,
  {
    scopeRouter?: OpdRouter[];
    allow?: {
      dialog?: boolean;
      floatingWindow?: boolean;
    };
  }
>;

export const ConditionMap: ConditionMap = {
  [ActionID.normalTest]: {},
  [ActionID.orderTest]: {},
  [ActionID.inputTypeTest]: {},
  [ActionID.textFieldTest]: {},
  [ActionID.preventFieldTest]: {},
  [ActionID.routerTest]: { scopeRouter: [OpdRouter.fakeURL] },
  [ActionID.modalTest]: {},
  [ActionID.closeTest]: { allow: { dialog: true, floatingWindow: true } },
};

// in order to make function key on the left and right sides compatible
export const FunctionKeyMap: Record<string, string> = {
  ControlLeft: 'Control',
  ControlRight: 'Control',
  AltLeft: 'AltLeft',
  AltRight: 'AltRight',
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
};

export const TextFieldKeyCombination: KeyboardEvent['code'][][] = [
  ['Control', 'KeyC'],
];

export const KeyCompositionList: KeyboardEvent['code'][] = ['Enter', 'Escape'];

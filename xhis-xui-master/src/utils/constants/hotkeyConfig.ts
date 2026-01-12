export enum ActionID {
  closeModal = 'closeModal', // esc for modal
  enterModal = 'enterModal', // enter for modal
  arrowUp = 'arrowUp', // 方向上
  arrowDown = 'arrowDown', // 方向下
  enter = 'enter', // 進入
  orderCpoeExam = 'orderCpoeExam', // 科常用
  package = 'package', // 套餐
  previousEncounter = 'previousEncounter', // 前次病歷
  encounterHistory = 'encounterHistory', // 歷史病歷
  appointment = 'appointment', // 預約掛號
  hospitalizeNotie = 'hospitalizeNotie', // 住院許可證
  completeEncounter = 'completeEncounter', // 完成看診
  backToPatientList = 'backToPatientList', // 返回病患清單
  temporarySave = 'temporarySave', // 暫存並返回病患清單
  labReport = 'labReport', // 檢驗報告
  examReport = 'examReport', // 檢查報告
  laboratoryLab = 'laboratoryLab', // 臨床病理科（檢驗科）
  laboratoryIMR = 'laboratoryIMR', // 風濕免疫
  laboratoryAllergen = 'laboratoryAllergen', // 過敏原
  checkupGastroenterology = 'checkupGastroenterology', // 胃腸科
  quickLaunch = 'quickLaunch',
  blur = 'blur',
  patientListIntoDetail = 'patientListIntoDetail', // 病患清單進入就診明細
  packageSelectAllSubmit = 'packageSelectAllSubmit', // 套餐全選直接帶入
  ditto = 'Ditto', // 歷史病歷 ditto
  reload = 'reload', // 更新
  reloadReport = 'reloadReport', // 更新報告
  toggleSoapExpandMode = 'toggleSoapExpandMode', // 開啟/關閉 Soap 放大模式
  toggleDrugExpandMode = 'toggleDrugExpandMode', // 開啟/關閉 Drug 放大模式
  toggleOrderExpandMode = 'toggleOrderExpandMode', // 開啟/關閉 Order 放大模式
}

export const KeyCombinationMap: Record<ActionID, KeyboardEvent['code'][]> = {
  [ActionID.closeModal]: ['Escape'],
  [ActionID.enterModal]: ['Enter'],
  [ActionID.arrowUp]: ['ArrowUp'],
  [ActionID.arrowDown]: ['ArrowDown'],
  [ActionID.enter]: ['Enter'],
  [ActionID.orderCpoeExam]: ['F2'],
  [ActionID.package]: ['F3'],
  [ActionID.previousEncounter]: ['F4'],
  [ActionID.encounterHistory]: ['F5'],
  [ActionID.appointment]: ['F6'],
  [ActionID.hospitalizeNotie]: ['F10'],
  [ActionID.completeEncounter]: ['F12'],
  [ActionID.backToPatientList]: ['Control', 'KeyD'],
  [ActionID.temporarySave]: ['Alt', 'KeyT'],
  [ActionID.labReport]: ['Control', 'KeyM'],
  [ActionID.examReport]: ['Control', 'KeyS'],
  [ActionID.laboratoryLab]: ['Control', 'KeyL'],
  [ActionID.laboratoryIMR]: ['Control', 'KeyI'],
  [ActionID.laboratoryAllergen]: ['Control', 'KeyA'],
  [ActionID.checkupGastroenterology]: ['Control', 'KeyQ'],
  [ActionID.quickLaunch]: ['Control', 'KeyF'],
  [ActionID.reload]: ['Control', 'KeyR'],
  [ActionID.reloadReport]: ['Control', 'KeyR'],
  [ActionID.blur]: ['Escape'],
  [ActionID.patientListIntoDetail]: ['F12'],
  [ActionID.packageSelectAllSubmit]: ['F1'],
  [ActionID.ditto]: ['F1'],
  [ActionID.toggleSoapExpandMode]: ['Alt', 'Digit1'],
  [ActionID.toggleDrugExpandMode]: ['Alt', 'Digit2'],
  [ActionID.toggleOrderExpandMode]: ['Alt', 'Digit3'],
};

enum OpdRouter {
  login = 'login',
  patientList = 'patientList',
  patientDetail = 'patientDetail',
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
  [ActionID.closeModal]: {
    allow: { dialog: true, floatingWindow: true },
  },
  [ActionID.enterModal]: {
    allow: { dialog: true, floatingWindow: true },
  },
  [ActionID.arrowUp]: {},
  [ActionID.arrowDown]: {},
  [ActionID.enter]: {},
  [ActionID.orderCpoeExam]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.package]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.previousEncounter]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.encounterHistory]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.appointment]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.hospitalizeNotie]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.completeEncounter]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.labReport]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.examReport]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.backToPatientList]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.temporarySave]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.laboratoryLab]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.laboratoryIMR]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.laboratoryAllergen]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.checkupGastroenterology]: {
    scopeRouter: [OpdRouter.patientDetail],
  },
  [ActionID.quickLaunch]: {},
  [ActionID.blur]: {},
  [ActionID.patientListIntoDetail]: {
    scopeRouter: [OpdRouter.patientList],
  },
  [ActionID.packageSelectAllSubmit]: {
    scopeRouter: [OpdRouter.patientDetail],
    allow: { dialog: true },
  },
  [ActionID.ditto]: {
    scopeRouter: [OpdRouter.patientDetail],
    allow: { dialog: true },
  },
  [ActionID.reload]: {
    scopeRouter: [OpdRouter.patientDetail, OpdRouter.patientList],
  },
  [ActionID.reloadReport]: {
    scopeRouter: [OpdRouter.patientDetail, OpdRouter.patientList],
    allow: { dialog: true },
  },
  [ActionID.toggleSoapExpandMode]: {
    scopeRouter: [OpdRouter.patientDetail],
    allow: { dialog: true, floatingWindow: true },
  },
  [ActionID.toggleDrugExpandMode]: {
    scopeRouter: [OpdRouter.patientDetail],
    allow: { dialog: true, floatingWindow: true },
  },
  [ActionID.toggleOrderExpandMode]: {
    scopeRouter: [OpdRouter.patientDetail],
    allow: { dialog: true, floatingWindow: true },
  },
};

// in order to make function key on the left and right sides compatible
export const FunctionKeyMap: Record<string, string> = {
  ControlLeft: 'Control',
  ControlRight: 'Control',
  AltLeft: 'Alt',
  AltRight: 'Alt',
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
  Enter: 'Enter',
  NumpadEnter: 'Enter',
};

export const TextFieldKeyCombination: KeyboardEvent['code'][][] = [
  ['Control', 'KeyZ'],
  ['Control', 'KeyC'],
  ['Control', 'KeyV'],
  ['Control', 'KeyX'],
  ['Control', 'KeyA'],
];

export const KeyCompositionList: KeyboardEvent['code'][] = ['Enter', 'Escape'];

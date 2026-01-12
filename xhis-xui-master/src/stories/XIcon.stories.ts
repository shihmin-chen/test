import type { Meta, StoryObj } from '@storybook/vue3';
import type { ComponentProps } from 'vue-component-type-helpers';

import XIcon from '../components/XIcon/XIcon.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XIcon>> = {
  title: 'XUI/XIcon',
  component: XIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => ({
    components: { XIcon },
    setup() {
      return { args };
    },
    template: '<XIcon v-bind="args" />',
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Add: Story = {
  args: {
    icon: 'add',
  },
};

export const AlertFilled: Story = {
  args: {
    icon: 'alert-filled',
  },
};

export const AlertOutline: Story = {
  args: {
    icon: 'alert-outline',
  },
};

export const AppMenu: Story = {
  args: {
    icon: 'app-menu',
  },
};

export const ArrowDown: Story = {
  args: {
    icon: 'arrow-down',
  },
};

export const ArrowLeft: Story = {
  args: {
    icon: 'arrow-left',
  },
};

export const ArrowRight: Story = {
  args: {
    icon: 'arrow-right',
  },
};

export const ArrowUp: Story = {
  args: {
    icon: 'arrow-up',
  },
};

export const Avatar: Story = {
  args: {
    icon: 'avatar',
  },
};

export const Button: Story = {
  args: {
    icon: 'button',
  },
};

export const Calendar: Story = {
  args: {
    icon: 'calendar',
  },
};

export const CaretDown: Story = {
  args: {
    icon: 'caret-down',
  },
};

export const CaretRight: Story = {
  args: {
    icon: 'caret-right',
  },
};

export const CaretUp: Story = {
  args: {
    icon: 'caret-up',
  },
};

export const Change: Story = {
  args: {
    icon: 'change',
  },
};

export const Checkbox: Story = {
  args: {
    icon: 'checkbox',
  },
};

export const Checkmark: Story = {
  args: {
    icon: 'checkmark',
  },
};

export const ChevronDown: Story = {
  args: {
    icon: 'chevron-down',
  },
};

export const ChevronLeft: Story = {
  args: {
    icon: 'chevron-left',
  },
};

export const ChevronRight: Story = {
  args: {
    icon: 'chevron-right',
  },
};

export const ChevronUp: Story = {
  args: {
    icon: 'chevron-up',
  },
};

export const Clear: Story = {
  args: {
    icon: 'clear',
  },
};

export const Clipboard: Story = {
  args: {
    icon: 'clipboard',
  },
};

export const Clock: Story = {
  args: {
    icon: 'clock',
  },
};

export const CloudFlow: Story = {
  args: {
    icon: 'cloud-flow',
  },
};

export const CloudMedDayFilter: Story = {
  args: {
    icon: 'cloud-med-day-filter',
  },
};

export const CloudMedGroupby: Story = {
  args: {
    icon: 'cloud-med-groupby',
  },
};

export const CloudMedHospitalFilter: Story = {
  args: {
    icon: 'cloud-med-hospital-filter',
  },
};

export const ColumnTriple: Story = {
  args: {
    icon: 'column-triple',
  },
};

export const CommonlyUsed: Story = {
  args: {
    icon: 'commonly-used',
  },
};

export const ConsultationColored: Story = {
  args: {
    icon: 'consultation-colored',
  },
};

export const ConsultationMono: Story = {
  args: {
    icon: 'consultation-mono',
  },
};

export const CopyAll: Story = {
  args: {
    icon: 'copy-all',
  },
};

export const Copy: Story = {
  args: {
    icon: 'copy',
  },
};

export const DataTrending: Story = {
  args: {
    icon: 'data-trending',
  },
};

export const Delete: Story = {
  args: {
    icon: 'delete',
  },
};

export const Dislike: Story = {
  args: {
    icon: 'dislike',
  },
};

export const Dismiss: Story = {
  args: {
    icon: 'dismiss',
  },
};

export const DocumentFilled: Story = {
  args: {
    icon: 'document-filled',
  },
};

export const DocumentOutline: Story = {
  args: {
    icon: 'document-outline',
  },
};

export const DocumentTable: Story = {
  args: {
    icon: 'document-table ',
  },
};

export const DoubleChevronLeft: Story = {
  args: {
    icon: 'double-chevron-left',
  },
};

export const DoubleChevronRight: Story = {
  args: {
    icon: 'double-chevron-right',
  },
};

export const Dropdown: Story = {
  args: {
    icon: 'dropdown',
  },
};

export const DrugColored: Story = {
  args: {
    icon: 'drug-colored',
  },
};

export const EarlyInterventionHistory: Story = {
  args: {
    icon: 'early-intervention-history',
  },
};

export const EditSmallRequired: Story = {
  args: {
    icon: 'edit-small-required',
  },
};

export const EditSmall: Story = {
  args: {
    icon: 'edit-small',
  },
};

export const Edit: Story = {
  args: {
    icon: 'edit',
  },
};

export const EkgColored: Story = {
  args: {
    icon: 'ekg-colored',
  },
};

export const EkgDone: Story = {
  args: {
    icon: 'ekg-done',
  },
};

export const EkgMono: Story = {
  args: {
    icon: 'ekg-mono',
  },
};

export const EkgPartiallyDone: Story = {
  args: {
    icon: 'ekg-partially-done',
  },
};

export const EncounterSearch: Story = {
  args: {
    icon: 'encounter-search',
  },
};

export const ErrorFilled: Story = {
  args: {
    icon: 'error-filled',
  },
};

export const ErrorOutline: Story = {
  args: {
    icon: 'error-outline',
  },
};

export const EyeHide: Story = {
  args: {
    icon: 'eye-hide',
  },
};

export const EyeShow: Story = {
  args: {
    icon: 'eye-show',
  },
};

export const Filter: Story = {
  args: {
    icon: 'filter',
  },
};

export const FolderFilled: Story = {
  args: {
    icon: 'folder-filled',
  },
};

export const FolderOutline: Story = {
  args: {
    icon: 'folder-outline',
  },
};

export const FontColor: Story = {
  args: {
    icon: 'font-color',
  },
};

export const Handler: Story = {
  args: {
    icon: 'handler',
  },
};

export const HelpFilled: Story = {
  args: {
    icon: 'help-filled',
  },
};

export const HelpOutline: Story = {
  args: {
    icon: 'help-outline',
  },
};

export const History: Story = {
  args: {
    icon: 'history',
  },
};

export const IcCard: Story = {
  args: {
    icon: 'ic-card',
  },
};

export const IdentitySetting: Story = {
  args: {
    icon: 'identity-setting',
  },
};

export const Image: Story = {
  args: {
    icon: 'image',
  },
};

export const Index: Story = {
  args: {
    icon: 'index',
  },
};

export const InfoFilled: Story = {
  args: {
    icon: 'info-filled',
  },
};

export const InfoOutline: Story = {
  args: {
    icon: 'info-outline',
  },
};

export const Inpatient: Story = {
  args: {
    icon: 'inpatient',
  },
};

export const Learning: Story = {
  args: {
    icon: 'learning',
  },
};

export const Like: Story = {
  args: {
    icon: 'like',
  },
};

export const List: Story = {
  args: {
    icon: 'list',
  },
};

export const Marker: Story = {
  args: {
    icon: 'marker',
  },
};

export const Maximize: Story = {
  args: {
    icon: 'maximize',
  },
};

export const Measure: Story = {
  args: {
    icon: 'measure',
  },
};

export const MedicalRecordMono: Story = {
  args: {
    icon: 'medical-record-mono',
  },
};

export const Mention: Story = {
  args: {
    icon: 'mention',
  },
};

export const Minimize: Story = {
  args: {
    icon: 'minimize',
  },
};

export const Minus: Story = {
  args: {
    icon: 'minus',
  },
};

export const Monitor: Story = {
  args: {
    icon: 'monitor',
  },
};

export const MoreHori: Story = {
  args: {
    icon: 'more-hori',
  },
};

export const MultiLineInput: Story = {
  args: {
    icon: 'multi-line-input',
  },
};

export const NoEdit: Story = {
  args: {
    icon: 'no-edit',
  },
};

export const NotificationBadge: Story = {
  args: {
    icon: 'notification-badge',
  },
};

export const Notification: Story = {
  args: {
    icon: 'notification',
  },
};

export const OpenInNew: Story = {
  args: {
    icon: 'open-in-new',
  },
};

export const PanelClose: Story = {
  args: {
    icon: 'panel-close',
  },
};

export const PanelOpen: Story = {
  args: {
    icon: 'panel-open',
  },
};

export const PathologyMono: Story = {
  args: {
    icon: 'pathology-mono',
  },
};

export const PatientSearch: Story = {
  args: {
    icon: 'patient-search',
  },
};

export const Printer: Story = {
  args: {
    icon: 'printer',
  },
};

export const Radio: Story = {
  args: {
    icon: 'radio',
  },
};

export const Redo: Story = {
  args: {
    icon: 'redo',
  },
};

export const Reload: Story = {
  args: {
    icon: 'reload',
  },
};

export const Repair: Story = {
  args: {
    icon: 'repair',
  },
};

export const ReportLink: Story = {
  args: {
    icon: 'report-link',
  },
};

export const ReportMono: Story = {
  args: {
    icon: 'report-mono',
  },
};

export const Revised: Story = {
  args: {
    icon: 'revised',
  },
};

export const Room: Story = {
  args: {
    icon: 'room',
  },
};

export const RowTriple: Story = {
  args: {
    icon: 'row-triple',
  },
};

export const ScalpelMono: Story = {
  args: {
    icon: 'scalpel-mono',
  },
};

export const Search: Story = {
  args: {
    icon: 'search',
  },
};

export const Setting: Story = {
  args: {
    icon: 'setting',
  },
};

export const SortDescending: Story = {
  args: {
    icon: 'sort-descending',
  },
};

export const SortingActiveArrowDown: Story = {
  args: {
    icon: 'sorting-active-arrow-down',
  },
};

export const Spellcheck: Story = {
  args: {
    icon: 'spellcheck',
  },
};

export const Spinner: Story = {
  args: {
    icon: 'spinner',
  },
};

export const StarFilled: Story = {
  args: {
    icon: 'star-filled',
  },
};

export const StarOutline: Story = {
  args: {
    icon: 'star-outline',
  },
};

export const Stethoscope: Story = {
  args: {
    icon: 'stethoscope',
  },
};

export const SuccessFilledColored: Story = {
  args: {
    icon: 'success-filled-colored',
  },
};

export const SuccessFilled: Story = {
  args: {
    icon: 'success-filled',
  },
};

export const SuccessOutlineColored: Story = {
  args: {
    icon: 'success-outline-colored',
  },
};

export const SuccessOutline: Story = {
  args: {
    icon: 'success-outline',
  },
};

export const SyncingArrow: Story = {
  args: {
    icon: 'syncing-arrow',
  },
};

export const Tab: Story = {
  args: {
    icon: 'tab',
  },
};

export const Teeth: Story = {
  args: {
    icon: 'teeth',
  },
};

export const TestingTubeColored: Story = {
  args: {
    icon: 'testing-tube-colored',
  },
};

export const TestingTubeDone: Story = {
  args: {
    icon: 'testing-tube-done',
  },
};

export const TestingTubeMono: Story = {
  args: {
    icon: 'testing-tube-mono',
  },
};

export const TestingTubePartiallyDone: Story = {
  args: {
    icon: 'testing-tube-partially-done',
  },
};

export const Text: Story = {
  args: {
    icon: 'text',
  },
};

export const Undo: Story = {
  args: {
    icon: 'undo',
  },
};

export const ViewLarge: Story = {
  args: {
    icon: 'view-large',
  },
};

export const ViewList: Story = {
  args: {
    icon: 'view-list',
  },
};

export const ViewSingle: Story = {
  args: {
    icon: 'view-single',
  },
};

export const ViewSmall: Story = {
  args: {
    icon: 'view-small',
  },
};

export const ViewSplit: Story = {
  args: {
    icon: 'view-split',
  },
};

export const WarningFilled: Story = {
  args: {
    icon: 'warning-filled',
  },
};

export const WarningOutline: Story = {
  args: {
    icon: 'warning-outline',
  },
};

export const WindowControlClose: Story = {
  args: {
    icon: 'window-control-close',
  },
};

export const WindowControlMaximize: Story = {
  args: {
    icon: 'window-control-maximize',
  },
};

export const WindowControlMinimize: Story = {
  args: {
    icon: 'window-control-minimize',
  },
};

export const WindowControlRestore: Story = {
  args: {
    icon: 'window-control-restore',
  },
};

export const XRayColored: Story = {
  args: {
    icon: 'x-ray-colored',
  },
};

export const XRayDone: Story = {
  args: {
    icon: 'x-ray-done',
  },
};

export const XRayMono: Story = {
  args: {
    icon: 'x-ray-mono',
  },
};

export const XRayPartiallyDone: Story = {
  args: {
    icon: 'x-ray-partially-done',
  },
};

export const ZoomDefault: Story = {
  args: {
    icon: 'zoom-default',
  },
};

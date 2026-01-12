/* eslint-disable @typescript-eslint/no-empty-function */
import { useNotification } from '@kyvg/vue3-notification';
import {
  XNotificationTypeType,
  XNotificationLabel,
  XNotificationPlacementType,
} from './enum';

interface XNotificationCaller {
  id?: any;
  placement?: XNotificationPlacementType;
  type?: XNotificationTypeType;
  title?: string;
  content?: string;
  enableContentMask?: boolean;
  leftLabelName?: string;
  rightLabelName?: string;
  noAutoHide?: boolean;
  autoHideDelay?: number;
  hasCloseButton?: boolean;
  showAllNumber?: number;
  hyperLink?: string;
  handleClick?: (target: XNotificationLabel) => void;
  handleClose?: () => void;
  customTitleClass?: string;
  clickLeftLabelToClose?: boolean;
  clickRightLabelToClose?: boolean;
  piiFilter?: string;
}

function XNotificationCaller(state: XNotificationCaller) {
  const { notify } = useNotification();

  const emptyHandleClick = () => {};
  const emptyHandleClose = () => {};

  notify({
    id: state.id,
    group: state.placement ?? 'top-right',
    type: state.type,
    title: state.title,
    text: state.content,
    duration: state.noAutoHide ? -1 : state.autoHideDelay,
    data: {
      leftLabelName: state.leftLabelName,
      rightLabelName: state.rightLabelName,
      hasCloseButton: state.hasCloseButton,
      hyperLink: state.hyperLink,
      handleClick: state.handleClick ?? emptyHandleClick,
      handleClose: state.handleClose ?? emptyHandleClose,
      showAllNumber: state.showAllNumber,
      customTitleClass: state.customTitleClass,
      clickLeftLabelToClose: state.clickLeftLabelToClose,
      clickRightLabelToClose: state.clickRightLabelToClose,
      piiFilter: state.piiFilter,
      enableContentMask: state.enableContentMask,
    },
  });
}

export default XNotificationCaller;

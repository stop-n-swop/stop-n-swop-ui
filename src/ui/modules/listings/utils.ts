import { Status } from '@sns/contracts/order';
import {
  FaCheckCircle,
  FaEnvelope,
  FaMoneyBillWave,
  FaShoppingCart,
  FaStream,
  FaTimes,
  FaEllipsisH,
  FaLock,
  FaThumbsUp,
  FaCommentDots,
  FaQuestion,
} from 'react-icons/fa';

export const iconMatrix = {
  [Status.OPEN]: FaStream,
  [Status.CLOSED]: FaLock,
  [Status.CREATED]: FaShoppingCart,
  [Status.PENDING]: FaShoppingCart,
  [Status.PLACED]: FaEllipsisH,
  [Status.PAID]: FaMoneyBillWave,
  [Status.NOT_PAID]: FaTimes,
  [Status.APPROVED]: FaCheckCircle,
  [Status.DECLINED]: FaTimes,
  [Status.CANCELLED]: FaTimes,
  [Status.POSTED]: FaEnvelope,
  [Status.RECEIVED]: FaThumbsUp,
  [Status.DISPUTED]: FaCommentDots,
  [Status.NOT_RECEIVED]: FaQuestion,
  [Status.NO_RESPONSE]: FaQuestion,
  [Status.COMPLETE]: FaCheckCircle,
};

export const colorMatrix = {
  [Status.OPEN]: 'text-white',
  [Status.CLOSED]: 'text-gray-400',
  [Status.PLACED]: 'text-white',
  [Status.APPROVED]: 'text-primary',
  [Status.DECLINED]: 'text-gray-400',
  [Status.CANCELLED]: 'text-danger',
  [Status.PAID]: 'text-primary',
  [Status.NOT_PAID]: 'text-danger',
  [Status.POSTED]: 'text-secondary',
  [Status.RECEIVED]: 'text-primary',
  [Status.DISPUTED]: 'text-warning-lighter',
  [Status.NOT_RECEIVED]: 'text-warning-lighter',
  [Status.COMPLETE]: 'text-primary',
};

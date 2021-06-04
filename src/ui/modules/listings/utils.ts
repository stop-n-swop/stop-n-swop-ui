import { Status } from '@sns/contracts/order';
import {
  FaCheckCircle,
  FaEnvelope,
  FaMoneyBillWave,
  FaShoppingCart,
  FaStream,
  FaTimes,
  FaEllipsisH,
} from 'react-icons/fa';

export const iconMatrix = {
  [Status.OPEN]: FaStream,
  [Status.CREATED]: FaShoppingCart,
  [Status.APPROVED]: FaEllipsisH,
  [Status.DECLINED]: FaTimes,
  [Status.CANCELLED]: FaTimes,
  [Status.PAID]: FaMoneyBillWave,
  [Status.NOT_PAID]: FaTimes,
  [Status.POSTED]: FaEnvelope,
  [Status.RECEIVED]: FaCheckCircle,
};

export const colorMatrix = {
  [Status.OPEN]: 'text-white',
  [Status.CREATED]: 'text-secondary',
  [Status.APPROVED]: 'text-white',
  [Status.DECLINED]: 'text-gray-400',
  [Status.CANCELLED]: 'text-danger',
  [Status.PAID]: 'text-primary',
  [Status.NOT_PAID]: 'text-danger',
  [Status.POSTED]: 'text-secondary',
  [Status.RECEIVED]: 'text-primary',
};

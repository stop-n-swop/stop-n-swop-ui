import { Status } from '@sns/contracts/order';
import {
  FaCheckCircle,
  FaEnvelope,
  FaMoneyBillWave,
  FaShoppingCart,
  FaStream,
  FaTimes,
} from 'react-icons/fa';

export const iconMatrix = {
  [Status.NONE]: FaStream,
  [Status.CREATED]: FaShoppingCart,
  [Status.SOLD]: FaMoneyBillWave,
  [Status.POSTED]: FaEnvelope,
  [Status.RECEIVED]: FaCheckCircle,
  [Status.CANCELLED]: FaTimes,
};

export const colorMatrix = {
  [Status.NONE]: 'text-white',
  [Status.CREATED]: 'text-secondary',
  [Status.SOLD]: 'text-primary',
  [Status.POSTED]: 'text-secondary',
  [Status.RECEIVED]: 'text-primary',
  [Status.CANCELLED]: 'text-danger',
};

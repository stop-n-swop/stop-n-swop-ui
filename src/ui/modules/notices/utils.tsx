import { Notice, Type } from '@sns/contracts/notice';
import { lazy } from 'react';
import DefaultNotice from './states/DefaultNotice';

const KycFailed = lazy(() => import('./states/KycFailed'));
const KycVerified = lazy(() => import('./states/KycVerified'));
const OrderCancelled = lazy(() => import('./states/OrderCancelled'));
const OrderComplete = lazy(() => import('./states/OrderComplete'));
const OrderDeclined = lazy(() => import('./states/OrderDeclined'));
const OrderNoResponse = lazy(() => import('./states/OrderNoResponse'));
const OrderNotPaid = lazy(() => import('./states/OrderNotPaid'));
const OrderPlaced = lazy(() => import('./states/OrderPlaced'));
const OrderPosted = lazy(() => import('./states/OrderPosted'));
const OrderReceived = lazy(() => import('./states/OrderReceived'));
const OrderRefunded = lazy(() => import('./states/OrderRefunded'));
const OrderExpiring = lazy(() => import('./states/OrderExpiring'));

const matrix = {
  [Type.ORDER_PLACED]: OrderPlaced,
  [Type.ORDER_CANCELLED]: OrderCancelled,
  [Type.ORDER_DECLINED]: OrderDeclined,
  [Type.ORDER_NOT_PAID]: OrderNotPaid,
  [Type.ORDER_POSTED]: OrderPosted,
  [Type.ORDER_RECEIVED]: OrderReceived,
  [Type.ORDER_REFUNDED]: OrderRefunded,
  [Type.ORDER_EXPIRING]: OrderExpiring,
  [Type.ORDER_NO_RESPONSE]: OrderNoResponse,
  [Type.ORDER_COMPLETE]: OrderComplete,
  [Type.KYC_VERIFIED]: KycVerified,
  [Type.KYC_FAILED]: KycFailed,
};

export const getNoticeComponent = (notice: Notice) => {
  return matrix[notice.type] ?? DefaultNotice;
};

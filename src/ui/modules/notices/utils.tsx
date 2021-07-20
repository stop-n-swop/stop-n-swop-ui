import { Notice, Type } from '@sns/contracts/notice';
import DefaultNotice from './states/DefaultNotice';
import KycFailed from './states/KycFailed';
import KycVerified from './states/KycVerified';
import OrderCancelled from './states/OrderCancelled';
import OrderDeclined from './states/OrderDeclined';
import OrderNotPaid from './states/OrderNotPaid';
import OrderPlaced from './states/OrderPlaced';
import OrderPosted from './states/OrderPosted';
import OrderReceived from './states/OrderReceived';
import OrderRefunded from './states/OrderRefunded';

const matrix = {
  [Type.ORDER_PLACED]: OrderPlaced,
  [Type.ORDER_CANCELLED]: OrderCancelled,
  [Type.ORDER_DECLINED]: OrderDeclined,
  [Type.ORDER_NOT_PAID]: OrderNotPaid,
  [Type.ORDER_POSTED]: OrderPosted,
  [Type.ORDER_RECEIVED]: OrderReceived,
  [Type.ORDER_REFUNDED]: OrderRefunded,
  [Type.KYC_VERIFIED]: KycVerified,
  [Type.KYC_FAILED]: KycFailed,
};

export const getNoticeComponent = (notice: Notice) => {
  return matrix[notice.type] ?? DefaultNotice;
};

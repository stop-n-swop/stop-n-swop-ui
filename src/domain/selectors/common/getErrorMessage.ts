import { CommonCode } from '@sns/contracts/common';
import type { IntlShape } from 'react-intl';
import { ids } from 'ui/messages';

const hasMessage = (e: any): e is { message: string } => {
  return Boolean(e?.message);
};
const hasStatus = (e: any): e is { status: number } => {
  return Boolean(e?.status);
};
const hasCode = (e: any): e is { error: { code: number } } => {
  return Boolean(e?.error?.code);
};

export default function getErrorMessage(error: any, intl: IntlShape) {
  if (hasCode(error)) {
    // validation errors should be handled per-field and so we
    // don't want to show a generic error message
    if (error.error.code === CommonCode.VALIDATION) {
      return null;
    }
    const id = ids.error[error.error.code];
    if (id) {
      return intl.formatMessage({ id });
    }
  }
  if (hasMessage(error)) {
    return error.message;
  }
  if (hasStatus(error)) {
    switch (error?.status) {
      case 400:
        return intl.formatMessage({ id: ids.error[CommonCode.BAD_REQUEST] });
      case 403:
        return intl.formatMessage({ id: ids.error.forbidden });
      case 404:
        return intl.formatMessage({ id: ids.error[CommonCode.NOT_FOUND] });
      case 409:
        return intl.formatMessage({ id: ids.error[CommonCode.CONFLICT] });
      case 503:
        return intl.formatMessage({ id: ids.error.unavailable });
      case 504:
        return intl.formatMessage({ id: ids.error.gatewayTimeout });
      default:
    }
  }

  return intl.formatMessage({ id: ids.error.unknown });
}

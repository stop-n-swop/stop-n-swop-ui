import { KycStatus, User } from '@sns/contracts/user';
import React from 'react';
import Card from 'ui/elements/Card';
import { en } from 'ui/messages';
import { Provider as Intl } from 'ui/intl';
import { Provider as Jpex } from 'react-jpex';
import { UnknownError } from '@sns/abyss';
import { Status } from '@respite/core';
import { BrowserRouter } from 'react-router-dom';
import Verify from './Verify';

export default {
  title: 'modules / account / billing / Verify',
  argTypes: {
    kycStatus: {
      control: 'select',
      options: Object.values(KycStatus),
    },
    status: {
      control: 'select',
      options: Object.values(Status),
    },
  },
};

export const Basic = ({
  kycStatus,
  hasAccount,
  hasError,
  status,
  incomplete,
}: BasicProps) => {
  return (
    <Intl messages={en}>
      <Jpex inherit={false}>
        <BrowserRouter>
          <div style={{ width: 800 }}>
            <Card>
              <Verify
                error={
                  hasError ? new UnknownError('something went wrong') : null
                }
                onChange={() => null}
                status={status}
                user={
                  {
                    kycStatus,
                    hasAccount,
                    address: {
                      line1: incomplete ? '' : '1',
                    },
                    dateOfBirth: new Date(),
                    firstName: 'f',
                    lastName: 'l',
                    nationality: 'GB',
                    username: 'u',
                  } as User
                }
              />
            </Card>
          </div>
        </BrowserRouter>
      </Jpex>
    </Intl>
  );
};
interface BasicProps {
  kycStatus: KycStatus;
  hasAccount: boolean;
  hasError: boolean;
  status: Status;
  incomplete: boolean;
}
Basic.args = {
  kycStatus: KycStatus.NONE,
  hasAccount: false,
  hasError: false,
  status: Status.IDLE,
  incomplete: false,
};

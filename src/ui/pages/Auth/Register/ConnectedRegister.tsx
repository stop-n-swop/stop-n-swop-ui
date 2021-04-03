import { Status } from '@respite/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HOME } from 'ui/constants/paths';
import { useQueryParam } from 'ui/hooks';
import Register from './Register';

export default function ConnectedLogin() {
  const redirect = useQueryParam('redirect') || HOME;
  const history = useHistory();
  const [status, setStatus] = useState(Status.IDLE);
  const handleSubmit = () =>
    new Promise<void>((res) => {
      setStatus(Status.LOADING);
      setTimeout(() => {
        setStatus(Status.SUCCESS);
        res();
      }, 1000);
    });

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setTimeout(() => {
        history.push(redirect);
      }, 1000);
    }
  }, [history, redirect, status]);

  return <Register onSubmit={handleSubmit} status={status} />;
}

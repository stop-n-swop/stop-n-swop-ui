import React from 'react';
import { render as renderComponent, screen } from '@testing-library/react';
import createWrapper from '__tests__/createWrapper';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { ids } from 'ui/messages';
import Login from '..';

const setup = () => {
  const formProps: UseFormReturn = {} as any;
  const wrapper = createWrapper({
    Render({ children }) {
      Object.assign(formProps, useForm());
      return <FormProvider {...formProps}>{children}</FormProvider>;
    },
  });

  const render = ({ error }: { error?: any } = {}) => {
    renderComponent(
      <Login error={error} reason={null}>
        <div />
      </Login>,
      { wrapper },
    );
  };

  return { render, formProps };
};

it('renders the login screen', () => {
  const { render } = setup();

  render();

  expect(screen.getByText(ids.auth.login.title)).toBeInTheDocument();
});

describe('when there is a form error', () => {
  it('renders the form error', () => {
    const { render } = setup();

    render({ error: { message: 'Something went wrong' } });

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

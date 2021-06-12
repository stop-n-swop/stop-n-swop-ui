import { OauthProvider } from '@sns/contracts/user';
import { useLogIn } from 'application/auth';
import React from 'react';
import { useResolve } from 'react-jpex';
import OAuth2Login from 'react-simple-oauth2-login';
import G from 'ui/assets/g-logo.png';
import { makeDashboardPath } from 'ui/constants/paths';
import { useQueryParam } from 'ui/hooks';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import LoginForm from 'ui/modules/auth/login/Form';
import Login from 'ui/modules/auth/login/Login';
import Loader from 'ui/modules/Loader';
import type { Reason } from 'domain/constants/auth';
import type { Navigate } from 'core/navigation';
import type { Config } from 'core/io';

export default function LoginPage() {
  const getMessage = useGetMessage();
  const redirect = useQueryParam('redirect') || makeDashboardPath();
  const reason = useQueryParam<Reason>('reason');
  const { action: logIn, error, submitting } = useLogIn();
  const config = useResolve<Config>();
  const console = useResolve<Console>();
  const navigate = useResolve<Navigate>();

  return (
    <LoginForm>
      <Login error={error} reason={reason}>
        <OAuth2Login
          component={OAuth2Login}
          authorizationUrl={config.oauth.google.url}
          responseType="token"
          clientId={config.oauth.google.clientId}
          scope={config.oauth.google.scope}
          redirectUri={`${window.location.origin}/oauth`}
          onSuccess={async (response: {
            /* eslint-disable camelcase */
            access_token: string;
            authuser: string;
            expires_in: string;
            prompt: string;
            scope: string;
            token_type: string;
            /* eslint-enable camelcase */
          }) => {
            await logIn({
              provider: OauthProvider.GOOGLE,
              token: response.access_token,
            });

            navigate(redirect);
          }}
          onFailure={console.error}
        >
          <div
            className="flex items-center"
            style={{ backgroundColor: '#4285F4' }}
          >
            <span className="p-3 bg-white">
              <img src={G} width={24} height={24} aria-label="Google" />
            </span>
            <Choose>
              <When condition={submitting}>
                <span className="px-10">
                  <Loader sensible size="0.5rem" />
                </span>
              </When>
              <Otherwise>
                <span className="px-4">
                  {getMessage(ids.auth.login.google)}
                </span>
              </Otherwise>
            </Choose>
          </div>
        </OAuth2Login>
      </Login>
    </LoginForm>
  );
}

import React from 'react';
import Login from 'ui/modules/auth/login/Login';
import LoginForm from 'ui/modules/auth/login/Form';
import { useLogIn } from 'usecases/auth';
import { makeDashboardPath } from 'ui/constants/paths';
import { useQueryParam } from 'ui/hooks';
import { useHistory } from 'react-router-dom';
import OAuth2Login from 'react-simple-oauth2-login';
import { OauthProvider } from '@sns/contracts/user';
import G from 'ui/assets/g-logo.png';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useResolve } from 'react-jpex';
import type { Config } from 'ports/io';
import type { Reason } from 'domain/constants/auth';

export default function LoginPage() {
  const redirect = useQueryParam('redirect') || makeDashboardPath();
  const reason = useQueryParam<Reason>('reason');
  const { action: logIn, error } = useLogIn();
  const { push } = useHistory();
  const config = useResolve<Config>();
  const console = useResolve<Console>();

  return (
    <LoginForm>
      <Login error={error} reason={reason}>
        <OAuth2Login
          component={OAuth2Login}
          authorizationUrl={config.oauth.google.url}
          responseType="token"
          clientId={config.oauth.google.clientId}
          scope={config.oauth.google.scope}
          redirectUri="http://localhost:3001/oauth"
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

            push(redirect);
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
            <span className="px-4">{useMessage(ids.auth.login.google)}</span>
          </div>
        </OAuth2Login>
      </Login>
    </LoginForm>
  );
}

import { ButtonHTMLAttributes, ComponentType } from 'react';

export type Kind = 'primary' | 'secondary' | 'tertiary' | 'none';

export type State = 'disabled' | 'pending' | 'success' | 'error' | 'none';

type Attributes = ButtonHTMLAttributes<HTMLButtonElement>;

interface NonButtonProps {
  to?: string;
  href?: string;
  target?: string;
}

export type Props = Attributes &
  NonButtonProps & {
    component?: ComponentType<any> | string;
    kind?: Kind;
    state?: State;
    padding?: boolean;
    styles?: Record<string, any>;
  };

export type ButtonComponent = (props: Props) => JSX.Element;

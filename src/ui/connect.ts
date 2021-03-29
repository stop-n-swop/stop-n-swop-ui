import { ComponentType, createElement } from 'react';

export default <P, Q>(
  fn: (props: P) => Q,
  Component: ComponentType<Q>,
): ComponentType<P> => {
  return function Connected(props) {
    const mappedProps = fn(props);
    return createElement(Component, mappedProps);
  };
};

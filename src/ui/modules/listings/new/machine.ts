import { useMemo, useRef } from 'react';
import { useMachine } from 'react-robot';
import { createMachine, invoke, reduce, state, transition } from 'robot3';

type Action = 'next' | 'previous';
export type Step =
  | 'condition'
  | 'features'
  | 'price'
  | 'region'
  | 'description'
  | 'photos'
  | 'review'
  | 'submitting'
  | 'done'
  | 'error';

interface Context {
  values?: Record<string, any>;
  onSubmit(values: Record<string, any>): Promise<unknown>;
}

const saveValues = reduce(
  (ctx: Context, evt: { data: Record<string, any> }) => ({
    ...ctx,
    values: evt.data,
  }),
);

const makeMachine = (initial: Step) =>
  createMachine(
    initial,
    {
      condition: state(transition('next', 'features', saveValues)),
      features: state(
        transition('previous', 'condition'),
        transition('next', 'region', saveValues),
      ),
      region: state(
        transition('previous', 'features'),
        transition('next', 'price', saveValues),
      ),
      price: state(
        transition('previous', 'region'),
        transition('next', 'description', saveValues),
      ),
      description: state(
        transition('previous', 'price'),
        transition('next', 'photos', saveValues),
      ),
      photos: state(
        transition('previous', 'description'),
        transition('next', 'review', saveValues),
      ),
      review: state(
        transition('previous', 'photos'),
        transition('next', 'submitting'),
      ),
      submitting: invoke(
        (ctx: Context) => {
          return ctx.onSubmit(ctx.values);
        },
        transition('done', 'done'),
        transition('error', 'error'),
      ),

      done: state(),
      error: state(),
    },
    (ctx: Context) => ctx,
  );

export default (initial: Step, ctx: Context) => {
  const machine = useMemo(() => makeMachine(initial), [initial]);
  const ref = useRef<Context>({ ...ctx });
  Object.assign(ref.current, ctx);
  const [s, d] = useMachine(machine, ref.current);

  const state: Step = s.name;
  const dispatch = (action: Action, values?: Record<string, any>) => {
    d({
      type: action,
      data: values,
    });
  };

  return [state, dispatch] as const;
};

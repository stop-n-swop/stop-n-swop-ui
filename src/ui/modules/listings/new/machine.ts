import { Condition } from '@sns/contracts/listing';
import { useMemo, useRef } from 'react';
import { useMachine } from 'react-robot';
import {
  createMachine,
  invoke,
  reduce,
  state,
  transition,
  guard,
} from 'robot3';
import type { Values } from './types';

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
  values?: Values;
  onSubmit(values: Record<string, any>): Promise<unknown>;
}

const saveValues = reduce((ctx: Context, evt: { data: Values }) => ({
  ...ctx,
  values: evt.data,
}));

export const firstStep: Step = 'region';

export const order: Step[] = [
  'region',
  'condition',
  'features',
  'photos',
  'price',
  'description',
  'review',
];

const makeMachine = (initial: Step) =>
  createMachine(
    initial,
    {
      region: state(transition('next', 'condition', saveValues)),
      condition: state(
        transition(
          'next',
          'photos',
          guard((_context: Context, evt: { data: Values }) => {
            return evt.data.condition === Condition.MINT;
          }),
          saveValues,
        ),
        transition('next', 'features', saveValues),
        transition('previous', 'region'),
      ),
      features: state(
        transition('previous', 'condition'),
        transition('next', 'photos', saveValues),
      ),
      photos: state(
        transition(
          'previous',
          'condition',
          guard((context: Context) => {
            return context.values.condition === Condition.MINT;
          }),
        ),
        transition('previous', 'features'),
        transition('next', 'price', saveValues),
      ),
      price: state(
        transition('previous', 'photos'),
        transition('next', 'description', saveValues),
      ),
      description: state(
        transition('previous', 'price'),
        transition('next', 'review', saveValues),
      ),
      review: state(
        transition('previous', 'description'),
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
      error: state(transition('previous', 'review')),
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

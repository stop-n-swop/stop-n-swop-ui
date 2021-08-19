import jpex from 'jpex';
import type { Track, TrackEvents } from 'core/io';
import type { Subscribe } from 'core/events';

jpex.factory<Track>(
  (window: Window): Track =>
    (evt, { value, unit } = {}) => {
      window.pa?.track?.({
        name: evt,
        value,
        unit,
      });
    },
);

jpex.factory<TrackEvents>((track: Track, subscribe: Subscribe) => () => {
  subscribe('logged_in', () => {
    track('logged_in');
  });
  subscribe('logged_out', () => {
    track('logged_out');
  });
  subscribe('session_expired', () => {
    track('session_expired');
  });
  subscribe('listing_created', ({ currency, postage, price }) => {
    track('listing_created', { value: price + postage, unit: currency });
  });
  subscribe('listing_updated', ({ currency, postage, price }) => {
    track('listing_updated', {
      value: price + postage,
      unit: currency,
    });
  });
  subscribe('order_created', () => {
    track('order_created');
  });
  subscribe('payment_started', () => {
    track('payment_started');
  });
  subscribe('payment_completed', () => {
    track('payment_completed');
  });
  subscribe('manual_withdrawal', ({ amount, currency }) => {
    track('manual_withdrawal', { value: amount, unit: currency });
  });
});

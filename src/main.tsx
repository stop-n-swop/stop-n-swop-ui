import { createElement } from 'react';
import { render } from 'react-dom';
import './index.css';
import jpex from 'jpex';
import App from './ui/app/App';
import type { TrackEvents } from 'core/io';

Object.keys(import.meta.globEager('./infrastructure/*/*.ts'));

jpex.resolve<TrackEvents>()();

const node = document.getElementById('root');
render(createElement(App), node);

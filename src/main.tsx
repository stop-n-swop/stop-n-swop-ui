import { createElement } from 'react';
import { render } from 'react-dom';
import './index.css';
import 'infrastructure';
import 'infrastructure/io/config';
import App from './ui/app/App';

const node = document.getElementById('root');
render(createElement(App), node);

import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './app';
import 'styles/index.scss';

const Routes = () => (
  <CookiesProvider>
  <Router>
    <div className='fill'>
      <Route path="/" component={App}/>
    </div>
  </Router>
  </CookiesProvider>
);

export default Routes;

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import rootRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import store from './redux/store';

// Router Needs the key in case react hot module loader otherwise it will duplicate the Layout
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router
        key={Math.random()}
        history={browserHistory}
        routes={rootRoutes}
      />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);
if (module.hot) {
  module.hot.accept();
}

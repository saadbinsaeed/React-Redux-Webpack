import React from 'react';
import SystemLayout from '../layouts/SystemLayout';

function errorLoading(error) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

function loadRoute(cb) {
  return module => cb(null, module.default);
}

// This is how we will implementt Code Splitting
module.exports = {
  component: SystemLayout,
  childRoutes: [
    {
      path: '/',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/IndexPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
    },
    {
      path: '*',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/404')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
    },
  ],
};

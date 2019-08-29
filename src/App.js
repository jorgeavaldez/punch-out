import React, { Suspense } from 'react';
import {
  mount,
} from 'navi';
import {
  Router,
  View,
} from 'react-navi';

import usePO from './state/';

import HomeView from './views';
import AddView from './views/add';
import EditView from './views/edit';

const routes = mount({
  '/': HomeView,
  '/punch': mount({
    '/add': AddView,
    '/edit/:id': EditView,
  }),
});

const App = () => {
  const {
    state,
    actions,
  } = usePO();

  return (
    <Router
      context={{ state, actions }}
      routes={routes}
    >
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
}

export default App;

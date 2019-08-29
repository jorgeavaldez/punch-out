import React, { Suspense } from 'react';
import {
  mount,
} from 'navi';
import {
  Router,
  View,
  Link,
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
    <div className='hero'>
      <Suspense fallback={null}>
        <Link href="/">
          <h1>Punch Out!!!</h1>
        </Link>

        <View />
      </Suspense>
    </div>
    </Router>
  );
}

export default App;

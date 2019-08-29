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
import JsonView from './views/json';

const routes = mount({
  '/': HomeView,
  '/save': JsonView,
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

        <button type="submit"><Link href="/save">Save State</Link></button>

        <View />
      </Suspense>
    </div>
    </Router>
  );
}

export default App;

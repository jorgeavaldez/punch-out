import React, {
  Suspense,
} from 'react';

import {
  redirect,
  mount,
} from 'navi';

import {
  Router,
  View,
} from 'react-navi';

import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset-material';

import usePO from './state/';

import Layout from './components/layout';

import HomeView from './views';
import AddView from './views/add';
import EditView from './views/edit';
import SaveView from './views/save';

const routes = mount({
  '/': HomeView,
  '/save': SaveView,
  '/punch': mount({
    '/': redirect({ pathname: '/', href: '/' }),
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
    <ThemeProvider theme={theme}>
    <Router
    context={{ state, actions }}
    routes={routes}>
    <Layout>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

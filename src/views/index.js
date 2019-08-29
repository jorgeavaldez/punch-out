import React, {
  useCallback,
} from 'react';
import {
  route,
} from 'navi';
import {
  useCurrentRoute,
  useNavigation,
} from 'react-navi';

import PunchList from '../components/punch-list';

const Home = (props) => {
  const {
    data: {
      state,
    },
  } = useCurrentRoute();

  const navigation = useNavigation();

  const addPunch = useCallback((evt) => {
    evt.preventDefault();
    navigation.navigate('/punch/add');
  },[navigation]);

  return (
    <div>
      <button type="submit" onClick={addPunch}>NEW PUNCH</button>
      <PunchList punches={state.punches} />
    </div>
  );
}

export default route((_req, ctx) => ({
  data: ctx,
  title: 'PUNCH OUT!!!',
  view: Home,
}));

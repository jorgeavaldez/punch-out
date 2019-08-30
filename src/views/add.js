import React from 'react';
import {
  route,
} from 'navi';
import {
  useCurrentRoute,
} from 'react-navi';

import PunchForm from '../components/punch-form';

const Add = (props) => {
  const {
    data: {
      actions,
    },
  } = useCurrentRoute();

  return (
    <PunchForm onSubmit={actions.addPunch} />
  );
}

export default route((_req, ctx) => ({
  data: ctx,
  title: 'PUNCH OUT!!!',
  view: Add,
}));

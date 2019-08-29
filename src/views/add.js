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

import PunchForm from '../components/punch-form';

const Add = (props) => {
  const {
    data: {
      actions,
    },
  } = useCurrentRoute();

  return (
    <div>
      <PunchForm onSubmit={actions.addPunch} />
    </div>
  );
}

export default route((_req, ctx) => ({
  data: ctx,
  title: 'PUNCH OUT!!!',
  view: Add,
}));

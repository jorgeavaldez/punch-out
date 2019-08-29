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
    <div>
      <div className='hero'>
        <h1 className='title'>Punch Out!!!</h1>
      </div>

      <PunchForm onSubmit={actions.addPunch} />
    </div>
  );
}

export default route((_req, ctx) => ({
  data: ctx,
  title: 'PUNCH OUT!!!',
  view: Add,
}));

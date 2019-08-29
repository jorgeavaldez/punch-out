import React from 'react';
import {
  route,
} from 'navi';
import {
  useCurrentRoute,
} from 'react-navi';

import PunchForm from '../components/punch-form';

const Edit = (props) => {
  const {
    data: {
      id,
      actions,
      state,
    },
  } = useCurrentRoute();

  const currentPunch = state.punches[id];

  return (
    <div>
      <div className='hero'>
        <h1 className='title'>Punch Out!!!</h1>
      </div>

      <PunchForm
        onSubmit={actions.editPunch}
        punchOut={actions.punchOut}
        punchId={id}
        defaults={currentPunch}
        removePunch={actions.removePunch}
      />
    </div>
  );
}

export default route((req, ctx) => ({
  data: {
    ...ctx,
    id: +req.params.id,
  },
  title: 'PUNCH OUT!!!',
  view: Edit,
}));

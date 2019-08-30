import React, {
  useEffect,
  createRef,
} from 'react';
import {
  route,
} from 'navi';
import {
  useCurrentRoute,
  useNavigation,
} from 'react-navi';
import { getUnixTime } from 'date-fns';

const serializeState = s => JSON.stringify(s, null, 2);

const JsonView = (props) => {
  const {
    data: {
      state,
    },
  } = useCurrentRoute();

  const navigation = useNavigation();

  const anchorRef = createRef();

  useEffect(() => {
    if (anchorRef.current) {
      const serialized = serializeState(state);
      const file = new Blob([serialized], { type: 'application/json' });

      anchorRef.current.href = URL.createObjectURL(file);
      anchorRef.current.download = `${getUnixTime(new Date())}_po_state.json`;

      anchorRef.current.click();
      navigation.navigate('/');
    }
  }, [state, anchorRef, navigation]);

  console.log('here');

  return (
    <a href="/" ref={anchorRef}>Loading...</a>
  );
};

export default route((_req, ctx) => ({
  data: ctx,
  title: 'PUNCH OUT!!!',
  view: JsonView,
}));

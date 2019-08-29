import React, { useCallback } from 'react';
import {
  useNavigation,
} from 'react-navi';

import Punch from '../components/punch';

const PunchList = ({ punches, children }) => {
  const navigation = useNavigation();

  const onPunchClick = useCallback(() => (id) => (evt) => {
    evt.preventDefault();
    navigation.navigate(`/task/edit/${id}`);
  }, [navigation]);

  return (
    punches.map((punch, i) => (
      <Punch
        key={i}
        punchId={i}
        punch={punch}
        onClick={onPunchClick(i)}
        button={children}
      />
    ))
  );
};

export default PunchList;

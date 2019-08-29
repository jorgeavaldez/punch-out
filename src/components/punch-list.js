import React, { useCallback } from 'react';
import {
  useNavigation,
} from 'react-navi';

import Punch from '../components/punch';

const PunchList = ({ punches, children }) => {
  const navigation = useNavigation();

  const clickHandler = useCallback((id) => {
    navigation.navigate(`/punch/edit/${id}`);
  }, [navigation]);

  return (
    punches.map((punch, i) => (
      <Punch
        key={i}
        punchId={i}
        punch={punch}
        onClick={clickHandler}
        button={children}
      />
    ))
  );
};

export default PunchList;

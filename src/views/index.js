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

import {
  Box,
  Button,
} from 'rebass';

import PunchList from '../components/punch-list';

const SaveButtonStyles = {
  cursor: 'pointer',
  '&:hover': {
    bg: 'highlight',
    color: 'white',
    border: 'none',
  },
  mb: 3,
};

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
    <Box>
      <Button sx={SaveButtonStyles} variant="outline" type="submit" onClick={addPunch}>NEW PUNCH</Button>
      <PunchList punches={state.punches} />
    </Box>
  );
}

export default route((_req, ctx) => ({
  data: ctx,
  title: 'PUNCH OUT!!!',
  view: Home,
}));

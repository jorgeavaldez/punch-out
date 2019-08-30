import React, {
  useCallback,
} from 'react';

import { format, parseISO } from 'date-fns';

import {
  Heading,
  Text,
  Box,
} from 'rebass';

const cleanPunch = (p) => {
  let cleanPunch = p;

  try {
    cleanPunch = parseISO(cleanPunch);
  }

  catch {
    cleanPunch = p;
  }

  try {
    cleanPunch = format(cleanPunch, 'PPpp');
  }

  catch {
    cleanPunch = p;
  }

  return cleanPunch;
};

const Punch = ({
  onClick,
  punchId,
  punch: { punchIn, punchOut, details },
  children,
}) => {
  const {
    title,
    note,
  } = details;

  const cleanPunchIn = cleanPunch(punchIn);
  const cleanPunchOut = punchOut && cleanPunch(punchOut);

  const onPunchClick = useCallback((evt) => {
    evt.preventDefault();

    if (onClick) {
      onClick(punchId);
    }
  }, [onClick, punchId]);

  return (
    <Box my={3} p={[3, 4, 4]} bg="secondary" color="white" borderRadius="default" width={[1, 1, 1/2]} onClick={onPunchClick}>
      <Heading fontSize={[ 4, 5, 6 ]} my={3} fontWeight="bold">{title}</Heading>

      <Heading fontSize={[ 3, 4, 5 ]} mt={2} fontWeight="bold">In:</Heading>
      <Heading fontSize={[ 2, 3, 4 ]} mb={2}> {`${cleanPunchIn}`}</Heading>

      <Heading fontSize={[ 3, 4, 5 ]} mt={2} fontWeight="bold">Out:</Heading>
      <Heading fontSize={[ 2, 3, 4 ]} mb={2}>{punchOut ? `${cleanPunchOut}` : 'Ongoing'}</Heading>

      <Text my={3} fontSize={[ 2, 3, 4 ]}>{note}</Text>

      { children }
    </Box>
  );
};

export default Punch;

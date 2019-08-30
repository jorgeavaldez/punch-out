import React, {
  useCallback,
  createRef,
} from 'react';

import {
  useNavigation,
} from 'react-navi';

import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
} from 'rebass';

import {
  Label,
  Input,
  Textarea
} from '@rebass/forms';

import cleanPunch from '../cleanPunch';

const PunchForm = (props) => {
  const {
    onSubmit: parentSubmit,
    defaults,
    punchId,
    punchOut,
    removePunch
  } = props;

  const navigation = useNavigation();

  const formRef = createRef();

  const onSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (!formRef.current) return;

    const inputs = Array.from(formRef.current.querySelectorAll('input, textarea'));
    const newPunch = {
      punchIn: new Date(),
      punchOut: null,

      details: inputs.reduce((acc, currInput) => ({
        ...acc,
        [currInput.name]: currInput.value,
      }), {}),
    };

    if (defaults) {
      parentSubmit(punchId, newPunch);
    }

    else {
      parentSubmit(newPunch);

      if (navigation) {
        navigation.navigate('/');
      }
    }
  }, [parentSubmit, formRef, defaults, punchId, navigation]);

  const onPunch = useCallback((evt) => {
    evt.preventDefault();

    if (punchOut) {
      punchOut(punchId);
    }
  }, [punchId, punchOut]);

  const onDelete = useCallback((evt) => {
    evt.preventDefault();

    if (removePunch) {
      removePunch(punchId);
    }

    navigation.navigate('/');
  }, [punchId, removePunch, navigation]);

  /*
  const formatString = 'cccc hh:mm:ss ';
  */

  return (
    <Box as="form" ref={formRef} onSubmit={onSubmit}>

    <Flex mb={4} flexWrap="wrap">
    {
      (defaults && defaults.punchIn) ? (
        <Box width={[1, 1/2, 1/2]}>
          <Heading fontSize={[ 3, 4, 5 ]} mt={4} fontWeight="bold">In at</Heading>
          <Flex my={3}>
            <Text fontSize={[ 3, 4, 5 ]} my="auto" mr={3}>{`${cleanPunch(defaults.punchIn)}`}</Text>

            <Box>
              <Input my="auto" name="punchIn" type="time" step="1" defaultValue={cleanPunch(defaults.punchIn, true)} />
            </Box>
          </Flex>
        </Box>
      ) : null
    }

    {
      (defaults && defaults.punchIn && !defaults.punchOut) ? (
        <Box width={[1, 1/2, 1/2]}>
          <Heading fontSize={[ 3, 4, 5 ]} mt={4} fontWeight="bold">Ongoing</Heading>
          <Button my={3} type="submit" sx={{ '&:hover': { bg: 'secondary', color: 'white' }, cursor: 'pointer' }} onClick={onPunch}>Punch Out!</Button>
        </Box>
      ) : null
    }

    {
      (defaults && defaults.punchOut) ? (
        <Box width={[1, 1/2, 1/2]}>
          <Heading fontSize={[ 3, 4, 5 ]} mt={4} fontWeight="bold">Out at</Heading>
          <Flex my={3}>
            <Text fontSize={[ 3, 4, 5 ]} my="auto" mr={3}>{`${cleanPunch(defaults.punchOut)}`}</Text>

            <Box>
              <Input my="auto" name="punchOut" type="time" step="1" defaultValue={cleanPunch(defaults.punchOut, true)} />
            </Box>
          </Flex>
        </Box>
      ) : null
    }
    </Flex>

      <Button type="submit" my={4} variant="outline" sx={{ '&:hover': { bg: 'highlight', color: 'white' }, cursor: 'pointer' }} display="block" onClick={onDelete}>DELETE</Button>

      <Label>Title</Label>
      <Input mb={3} name="title" type="text" defaultValue={(defaults && defaults.details.title) ? defaults.details.title : ''} />

      <Label>Note</Label>
      <Textarea mb={3} name="note" type="text" defaultValue={(defaults && defaults.details.note) ? defaults.details.note : ''} />

      <Flex justifyContent="flex-end">
        <Button type="submit" my={2} display="block" variant="primary" sx={{ '&:hover': { bg: 'secondary', color: 'white' }, cursor: 'pointer' }}>Punch!!!</Button>
      </Flex>
    </Box>
  );
};

export default PunchForm;

import React, {
  useCallback,
} from 'react';

import {
  useNavigation,
  useLinkProps,
} from 'react-navi';

import {
  Box,
  Button,
  Heading,
} from 'rebass';

const Styles = {
  Link: {
    header: {
      color: 'text',
      textDecoration: 'none',
      fontSize: [6, 7, 8]
    },
  },
  Box: {
    outer: {
      bg: 'background',
      margin: [4, 5, 5],
    },
    inner: {
      my: 3,
    },
  },
  Button: {
    save: {
      my: 3,
      cursor: 'pointer',
      '&:hover': {
        bg: 'highlight',
      }
    }
  }
};

const Layout = ({ children }) => {
  const navigator = useNavigation();

  const navToSave = useCallback((evt) => {
    evt.preventDefault();
    if (navigator) {
      navigator.navigate('/save');
    }
  }, [navigator]);

  const indexLinkProps = useLinkProps({ href: '/', pathname: '/' });

  return (
    <Box sx={Styles.Box.outer}>
      <Heading fontSize={[ 5, 6, 7 ]}>
        <Box as="a" sx={Styles.Link.header} {...indexLinkProps}>
          Punch Out!!!
        </Box>
      </Heading>

      <Button variant="primary" sx={Styles.Button.save} onClick={navToSave}>Save State</Button>

      <Box sx={Styles.Box.inner}>
        { children }
      </Box>
    </Box>
  );
};

export default Layout;

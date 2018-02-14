import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import logo from '../logo.png';

const NavBarContainer = () => (
  <Container>
    <Image
      src={logo}
      size="small"
      centered
    />
  </Container>
);

export default NavBarContainer;

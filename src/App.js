import React from 'react';
import { Grid } from 'semantic-ui-react';
import Main from './containers/MainContainer';
import NavBar from './containers/NavBarContainer';

const App = () => (
  <Grid>
    <Grid.Row />
    <Grid.Row>
      <NavBar />
    </Grid.Row>
    <Grid.Row />
    <Grid.Row>
      <Main />
    </Grid.Row>
  </Grid>

);

export default App;

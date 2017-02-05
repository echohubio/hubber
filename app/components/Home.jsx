import React from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

const Home = () => (
  <Jumbotron>
    <h1>EchoHub - Hubber</h1>
    <p>Welcome to the Hubber</p>
    <p>Your system is now configured. You should visit EchoHub to set up your system</p>
    <p>
      <Button bsStyle="primary" href="https://www.echohub.io">Go to EchoHub</Button>
    </p>
  </Jumbotron>
);

export default Home;

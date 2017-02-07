import React from 'react';
import { connect } from 'react-redux';

import { Alert, Glyphicon, Button } from 'react-bootstrap';

import { authenticate } from '../actions/authentication';

import { getConnected, getAuthenticated } from '../reducers/setup';


const Authentication = ({ authenticated, handleAuthentication }) => {
  if (authenticated) {
    return (
      <Alert bsStyle="success">
        <p><Glyphicon glyph="check" /> You have authenticated</p>
      </Alert>
    );
  }

  return (
    <Alert bsStyle="danger">
      <p><Glyphicon glyph="exclamation-sign" /> You need to authenticate with EchoHub</p>
      <p><Button bsStyle="primary" onClick={handleAuthentication}>Authenticate</Button></p>
    </Alert>
  );
};

const Connection = ({ connected }) => {
  if (connected) {
    return (
      <Alert bsStyle="success">
        <p><Glyphicon glyph="check" /> You have connected</p>
      </Alert>
    );
  }

  return (
    <Alert bsStyle="danger">
      <p><Glyphicon glyph="exclamation-sign" /> You need to connect to EchoHub</p>
      <p><Button bsStyle="primary" onClick={() => {}}>Connect</Button></p>
    </Alert>
  );
};

const Finalise = () => (
  <Alert bsStyle="success">
    <p><Glyphicon glyph="info-sign" /> Your system is now configured and ready to install plugins</p>
    <p><Button bsStyle="primary" onClick={() => {}}>Finish</Button></p>
  </Alert>
);

const Setup = ({ authenticated, connected, handleAuthentication }) => (
  <div>
    <p className="lead"> Your system is currently unconfigured and we need to link it up to EchoHub to get started, please follow the steps below</p>

    <h2>Setup Steps</h2>

    <Authentication authenticated={authenticated} handleAuthentication={handleAuthentication} />
    {authenticated &&
      <Connection connected={connected} />
    }

    {authenticated && connected &&
      <Finalise connected={connected} />
    }
  </div>
);

const mapStateToProps = state => ({
  authenticated: getAuthenticated(state),
  connected: getConnected(state),
});

const mapDispatchToProps = {
  handleAuthentication: authenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);

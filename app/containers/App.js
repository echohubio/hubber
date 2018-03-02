// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

// TODO: Should the layout go here?
export default class App extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function
  props: Props;

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

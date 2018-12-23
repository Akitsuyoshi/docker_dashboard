import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import { Button, Row, Input } from 'react-materialize';

class App extends Component {
  componentDidMount() {
    console.log('here is mounted');
  }

  render() {
    return <div />;
  }
}
export default App;

ReactDOM.render(<App />, document.getElementById('root'));

// does it need?
if (module.hot) {
  module.hot.accept();
}

import React, { Component } from 'react';

class SinglePage extends Component {

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default SinglePage;
import React, {Component} from 'react';
import './Header.css';

export default class Header extends Component {

  render() {
    return (
      <header className="App-header">
        <div className="header-container">
            <div className="App-title">Tapestry</div>
            <p>Draw a prediction for a selected metric, and see how it affects others!</p>
        </div>

      </header>
    );
  }
}

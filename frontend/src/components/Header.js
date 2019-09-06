import React, {Component} from 'react';
import background from '../img/canberra.jpeg';
import './Header.css';

export default class Header extends Component {

  render() {
    return (
      <header className="App-header" style={{background: `url(${background}) no-repeat`, backgroundSize: 'cover'}}>
        <div className="header-container">
            <div className="App-title">Slider mania</div>
        </div>

      </header>
    );
  }
}

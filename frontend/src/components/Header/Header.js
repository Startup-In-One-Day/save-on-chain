import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <h1 className='Header'>{this.props.title}</h1>
        <small className='USP'>{this.props.usp}</small>
      </header>
    );
  }
}

export default Header;

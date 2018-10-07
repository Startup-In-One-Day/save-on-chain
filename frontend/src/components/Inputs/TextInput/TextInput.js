import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);

    
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleMessageChange(e) {
    this.props.handleMessageChange(e.target.value);
  }
  render() {
    
    return <div className='TextInput-Wrapper'><textarea 
    value={this.props.hash} 
    className='TextInput'
     onChange={this.handleMessageChange}
      placeholder={this.props.placeholder}/></div>;
  }
}

export default TextInput;

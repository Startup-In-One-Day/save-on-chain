
import React, { Component } from 'react';
import DragDrop from './DragDrop/DragDrop';
import TextInput from './TextInput/TextInput';
import './Inputs.css';

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      message: ''
    }

    this.handleHashChange = this.handleHashChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleHashChange(hash) {
    this.props.handleHashChange(hash);
    this.setState({hash : "File hash = " + hash});
  }

  handleMessageChange(message) {
    this.props.handleMessageChange(message);
    this.setState({hash: message});
  }

  render() {
    return (
      <div className="Inputs">
        <DragDrop handleHashChange={this.handleHashChange}/>
        <TextInput hash={this.state.hash} handleMessageChange={this.handleMessageChange} placeholder="Write message which will be saved on blockchain forever!"/>
      </div>
    );
  }
}

export default Inputs;

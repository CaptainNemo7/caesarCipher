import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import Message from './components/message.jsx';
import UserInput from './components/userInput.jsx';
import ShiftKeyComponent from './components/shiftKey.jsx';
import cipher from '../../helperFunctions/caesarCipherAlgo.js'
import { MenuItem, DropdownButton, InputGroup, FormGroup, FormControl, Button} from 'react-bootstrap';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      encryptedMessage: '',
      decryptedMessage: '',
      bruteForceMessage: '',
      shiftKey: 1,
    }
    this.encryptor = this.encryptor.bind(this);
    this.decrypt = this.decrypt.bind(this);
    this.bruteForce = this.bruteForce.bind(this);
    this.userInput = this.userInput.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
  }

  userInput(message) {
    this.setState({
      userMessage: message
    })
  }

  encryptor(message, {key = this.state.shiftKey}) {
    this.setState({
      encryptedMessage: cipher.encrypt(message, key)
    })
  }

  onKeyChange(e) {
    this.setState({
      shiftKey: e
    })
  }

  decrypt(message, {key = this.state.shiftKey}) {
    this.setState({
      decryptedMessage: cipher.decrypt(message, key)
   })
  }

  bruteForce(message) {
    this.setState({
      bruteForceMessage: cipher.bruteForce(message)
    })
  }

  render() {
    return (
      <div>
        <UserInput
          userInput={this.userInput}
          shiftKey={this.state.shiftKey}
          encrypt={this.encryptor}
          decrypt={this.decrypt}
          bruteForce={this.bruteForce}
          encryptedMessage={this.state.encryptedMessage}
        />

        <ShiftKeyComponent 
          onKeyChange={this.onKeyChange}
          shiftKey={this.state.shiftKey}
        />

        <Message 
          userMessage={this.state.userMessage}
          encryptedMessage={this.state.encryptedMessage}
          decryptedMessage={this.state.decryptedMessage}
          shiftKey={this.state.shiftKey}
          bruteForceMessage={this.state.bruteForceMessage}
        />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

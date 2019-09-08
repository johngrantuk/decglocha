import React from 'react';
const Box = require('3box');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: 'Please load again',
      messages: [
        {
          name: 'GG',
          message: 'This is getting too heavy'
        },
        {
          name: 'JG',
          message: 'This guy makes some decent points but is full of himself!!'
        }
      ]
    };

    this.auth3Box = this.auth3Box.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    var urlParams = new URLSearchParams(window.location.search);

    if(urlParams.has('topic')){
      this.setState({topic: urlParams.get('topic')});
    }
  }

  boxSyncComplete(){
    // When you first authenticate the user's 3Box, all data might not be synced from the network yet.
    console.log('Oh yeah synchd for action');
    this.setState({isAuthenticated: true});
  }

  async auth3Box(){
    // First we need to get the ethereum provider & user address
    const accounts = await window.ethereum.enable();
    console.log(accounts[0]);

    // Then we initialize a new 3Box session
    const box = await Box.openBox(accounts[0], window.ethereum);
    this.setState({box: box});
    box.onSyncDone(this.boxSyncComplete);       // When you first authenticate the user's 3Box, all data might not be synced from the network yet.
  }

  render (){

    let messages;
    messages = this.state.messages.map(k => {
        return <div>
                  <h4>{k.name}</h4>
                  <h5>{k.message}</h5>
               </div>
      });

    return (
      <div>
        <h2>Page Name - {this.state.topic}</h2>
        <h3>List of users?</h3>

        <button className="btn btn-primary" onClick={this.auth3Box}>AUTH YOUR 3BOX</button>

        {messages}


      </div>
    )
  }
}

export default App;

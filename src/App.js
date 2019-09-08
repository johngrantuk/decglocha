import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
        <h1>Gecko Chat</h1>
        <h2>Page Name (Domain?)</h2>
        <h3>List of users?</h3>

        {messages}


      </div>
    )
  }
}

export default App;

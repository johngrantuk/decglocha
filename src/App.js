import React from 'react';

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
  }

  componentDidMount() {
    console.log(this.props);
    var urlParams = new URLSearchParams(window.location.search);

    if(urlParams.has('topic')){
      this.setState({topic: urlParams.get('topic')});
    }
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
        <h1>Decglocha</h1>
        <h2>Page Name - {this.state.topic}</h2>
        <h3>List of users?</h3>

        {messages}


      </div>
    )
  }
}

export default App;

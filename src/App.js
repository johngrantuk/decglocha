import React from 'react';
const Box = require('3box');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: 'Please load again',
      messages: [
        {
          author: "did:3:bafyreig725iek2y2segb2stom3s6tkfhv7kweneb4d4esa6omkkoi3ycom",
          message: "Test Post",
          postId: 'zdpuApB5LgEe8HPZHXTJ2wtihGgz21UXtvSbru3YaeL6ZNWCt',
          timestamp: 1567973188
        }
      ]
    };

    this.auth3Box = this.auth3Box.bind(this);
    this.boxSyncComplete = this.boxSyncComplete.bind(this);
    this.Logout3Box = this.Logout3Box.bind(this);
    this.openSpace = this.openSpace.bind(this);
    this.spaceSyncComplete = this.spaceSyncComplete.bind(this);
    this.addPost = this.addPost.bind(this);
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
    this.openSpace();
  }

  async spaceSyncComplete(){
    // We advise against setting any data before this sync has happened.
    console.log('Space Sync complete');
    this.setState({isSpaceSync: true});
  }

  async openSpace(){

    if(this.state.topic === 'Please load again'){
      console.log('Check Topic URL!')
    }

    // If the user already has a space with this name, your application will gain access to it; if the user does not have the space, this method will automatically create one for them.
    const space = await this.state.box.openSpace('decglocha', { onSyncDone: this.spaceSyncComplete });
    console.log('Space opened.')
    this.setState({space: space});

    const thread = await this.state.space.joinThread(this.state.topic, {
      firstModerator: '0x8f80708Cae88d8487A8A270E7a641f16cEEe472e',
      members: false
    })

    console.log('Thread created: ' + this.state.topic);
    this.setState({thread: thread});

    this.GetPosts();
  }

  async addPost(){
    var Post = "Test Post";
    console.log('Adding Post: ' + Post)
    await this.state.thread.post(Post);
    this.GetPosts();
  }

  async GetPosts(){
    const posts = await this.state.thread.getPosts();
    console.log('Posts:');
    console.log(posts);
    this.setState({messages: posts});
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

  async Logout3Box(){
    // Closes 3Box session
    this.state.box.logout();
    this.setState({
      isAuthenticated: false
    })
  }

  render (){
    let authenticate = <button className="btn btn-primary" onClick={this.auth3Box}>AUTH YOUR 3BOX</button>
    let messages;
    let addPost;
    messages = this.state.messages.map(k => {
        return <div>
                  <h4>{k.timestamp}</h4>
                  <h4>{k.author}</h4>
                  <h5>{k.message}</h5>
               </div>
      });

    if(this.state.isAuthenticated){
      authenticate = <button className="btn btn-primary" onClick={this.Logout3Box}>Logout 3Box</button>;
      addPost = <button className="btn btn-primary" onClick={this.addPost}>Add Post</button>;
    }

    return (
      <div>
        <h2>Page Name - {this.state.topic}</h2>
        <h3>List of users? {this.state.members}</h3>

        {authenticate}
        <p/>

        {messages}
        {addPost}
      </div>
    )
  }
}

export default App;

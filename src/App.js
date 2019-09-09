import React from 'react';
import ProfileHover from 'profile-hover';
import resolve from 'did-resolver';

const Box = require('3box');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: 'Please load again',
      messages: []
    };

    this.auth3Box = this.auth3Box.bind(this);
    this.boxSyncComplete = this.boxSyncComplete.bind(this);
    this.Logout3Box = this.Logout3Box.bind(this);
    this.openSpace = this.openSpace.bind(this);
    this.spaceSyncComplete = this.spaceSyncComplete.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
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
    console.log('Adding Post: ' + this.state.post)
    await this.state.thread.post(this.state.post);
    this.GetPosts();
  }

  async GetPosts(){
    const posts = await this.state.thread.getPosts();
    console.log('Posts:');

    var arrayLength = posts.length;
    var postsWithAddress = [];
    for (var i = 0; i < arrayLength; i++) {
      var doc = await resolve(posts[i].author);
      var ethAddr = doc.publicKey[2].ethereumAddress;
      postsWithAddress.push({
        ethAddr: ethAddr,
        author: posts[i].author,
        message: posts[i].message,
        postId: posts[i].postId,
        timestamp: posts[i].timestamp
      })
    }

    console.log(postsWithAddress);
    this.setState({messages: postsWithAddress});
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
      messages: [],
      isAuthenticated: false
    })
  }

  updatePost(event) {
    this.setState({post: event.target.value});
  }

  render (){
    let authenticate =
      <div>
        <h2>Decentralised Chat & Trading For Any Webpage</h2>
        <div>This extension uses AirSwap Trader allow you to buy or sell any token and 3Box for decentralised messaging.</div>
        <p></p>
        <div>Click below to get started, if you haven't used 3Box before it will automatically set up your account for free.</div>
        <button className="btn btn-primary" onClick={this.auth3Box}>AUTHORISE<br/>{this.state.topic}</button>
      </div>
    let messages;
    let addPost;
    messages = this.state.messages.map(k => {

        return <div>
                  <ProfileHover address={k.ethAddr} tileStyle={true} showName={true}/>
                  <h4>{k.timestamp}</h4>
                  <h4>{k.author}</h4>
                  <h5>{k.message}</h5>
               </div>
      });

    if(this.state.isAuthenticated){
      authenticate =
        <div>
          <button className="btn btn-primary" onClick={this.Logout3Box}>Logout 3Box</button>
          <hr/>
        </div>
      addPost =
        <div>
          <hr/>
          <input
            name="website"
            type="text"
            className="edit__profile__value"
            value={this.state.postMsg}
            placeholder="Type your message here..."
            onChange={this.updatePost}
          />
          <p/>
          <button className="btn btn-primary" onClick={this.addPost}>Add Post</button>
        </div>
    }

    return (
      <div>
        {authenticate}
        <p/>

        {messages}
        {addPost}
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import Gun from 'gun';
import Home from './Home';

class App extends Component {
  constructor() {
    super();
    this.gun=Gun(window.location.origin+'/gun');
    window.gun = this.gun; //To have access to gun object in browser console
  }

  render() {
    return (
        <Home gun={this.gun} />
    );
  }
}

export default App;
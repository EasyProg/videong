import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Categories from '../components/Categories';
import configureStore from '../store/configureStore';
import {Provider} from 'react-redux';
import '../styles/css/main_styles.css';
import HomeMenu from '../components/HomeMenu';
const  store = configureStore();
var proxy = 'https://cors-anywhere.herokuapp.com/';
class App extends Component  {
  render() {
    return (
        <Provider store={store}>
        <div>
            <Categories/>
            <VideoPlayer/>
            <HomeMenu/>
        </div>
        </Provider>
    );
  }
                             }

export default App;
import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import ImageSearch from './components/ImageSearch';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ImageSearch />
      </Provider>
    </div>
  );
}

export default App;

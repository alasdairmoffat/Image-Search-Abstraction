import { Provider } from 'react-redux';
import { store } from './app/store';

import './App.css';
import ImageSearch from './features/images/ImageSearch';
// import TestComponent from './components/TestComponent';

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

import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from './utils/Navbar';
import routes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          {routes}
        </Router>
      </Provider>
    </div>
  );
}

export default App;

import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './components/Navbar/Navbar';
import Layer from "./components/Layer/Layer";


class App extends React.Component {

  render() {
    return (
        <div>
          <Layer/>
        </div>
    );
  }
}

export default App;

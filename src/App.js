import './App.css';
import React from 'react';
import BaseLayout from './components/BaseLayout';
import HomeContainer from './containers/Home';


function App() {

  return (
    <div className="App">
      <BaseLayout>
        <HomeContainer />
      </BaseLayout>
    </div>
  );
}

export default App;

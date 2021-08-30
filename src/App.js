import logo from './logo.svg';
import './App.css';
import ThemeContext from './stores/theme/context';
import React from 'react';

function App() {
  const context = React.useContext(ThemeContext)

  console.log("context", context)

  const darkMode = () => {
    context.toggleTheme('dark')
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. <button onClick={darkMode}>test button</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

          {JSON.stringify(context.state)}
        </a>
      </header>
    </div>
  );
}

export default App;

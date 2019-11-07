import React from 'react';
import './App.css';

import TodoApp from './page/Todo/index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        This is my first react-hooks learning demo.
      </header>
      <main>
        <TodoApp />
      </main>
    </div>
  );
}

export default App;

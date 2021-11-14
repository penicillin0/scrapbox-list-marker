import React from 'react';
import './App.css';
import { Console } from './components/Console';

function App() {
  // const [indentOptions, setIndentOptions] = useState(initialState);

  return (
    <div className="App">
      <Console />
      {/* <Console indentOption={indentOption} /> */}
    </div>
  );
}

export default App;

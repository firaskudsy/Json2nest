import {TramOutlined} from '@material-ui/icons';
import React, {useState} from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import JsonSource from './Components/JsonSource';
import Target from './Components/Target';
import {BaseContext} from './Context/BaseContext';

function App() {
  // const [json, setJson] = useState('');
  // const [value, setValue] = useState(0);
  const [state, setState] = useState({
    name: '',
    json: '',
    value: 0,
    valueChecks: {schema: false, interface: false, dto: false},
    converted: {schema: '', interface: '', dto: ''},
    validJson: true
  });

  return (
    <BaseContext.Provider value={[state, setState]}>
      <div className="App">
        <Header></Header>
        <div className="App__body">
          <JsonSource />
          <Target></Target>
        </div>
        <Footer></Footer>
      </div>
    </BaseContext.Provider>
  );
}

export default App;

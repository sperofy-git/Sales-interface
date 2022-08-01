import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import {Counter} from './components/utils/counter'
import Sales from './components/sales/sales'

class App extends Component { 
  render() {
  return (
    <div className="App">
    {/*<Counter></Counter>*/}
    <Sales ></Sales>

    </div>
  );
}
}

export default App;

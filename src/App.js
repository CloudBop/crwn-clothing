import React from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import { Switch, Route } from 'react-router-dom';

const HatsPage = () => (
  <div className="hate-page">
    <h1>Hats Page</h1>
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;

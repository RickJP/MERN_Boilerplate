import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './about';
// import Home from './about';


function App() {
  return (
    <>
    <Switch>
      {/* <Route path="/" component={Home} /> */}
      <Route path="/about" component={About} />
    </Switch>
    </>
  );
}

export default App;

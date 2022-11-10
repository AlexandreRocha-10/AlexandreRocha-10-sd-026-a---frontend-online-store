import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import Home from './components/Home';
import ProductCard from './components/ProductCard';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/product/:id" component={ ProductCard } />
      </Switch>
    );
  }
}

export default App;

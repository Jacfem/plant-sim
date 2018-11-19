import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { seedData } from './seedData';
import PlantList from './PlantList';
import Plant from './Plant';

import './App.css';

const findMatchedPlant = match => seedData.find(obj => obj.slug === match.params.slug);
// Would want 404 handling here if you request a plant we don't have

const Home = () => <h1>Grow Something!</h1>;

const PlantWithRouting = ({ match }) => <Plant plant={findMatchedPlant(match)} />;

const AppWithRouting = () => (
  <Router>
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/plants/">Browse Plants</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/plants/" component={PlantList} />
      <Route path="/plant/:slug" component={PlantWithRouting} />
    </div>
  </Router>
);

export default AppWithRouting;


// If they are getting close to the right number of clicks (1 away from each max)
// -render 'your crops are almost ready to harvest! tread carefully on your care!'

import React, { Component } from 'react';

import { seedData } from '../seedData';
import PlantInfo from './PlantInfo';

class PlantList extends Component {
  render() {
    return (
      <ul className="unstyledList">
        {seedData.map(plant =>
          (<PlantInfo plant={plant} key={plant.key} />))
        }
      </ul>
    );
  }
}

export default PlantList;

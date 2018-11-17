import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const PlantInfo = props => (
  <li key={props.plant.key}>
    <div className="plantContainer">
      <h3>{props.plant.name}:
        <Link to={`/plant/${props.plant.slug}`}>
          Try it!
        </Link>
      </h3>
      <p>Water:
        <span className="showOnHover">
          {props.plant.needs.water}
        </span>
      </p>
      <p>Days needed:
        <span className="showOnHover">
          {props.plant.needs.sunlight}
        </span>
      </p>
      <p>Fertilizer:
        <span className="showOnHover">
          {props.plant.needs.fertilizer}
        </span>
      </p>
    </div>
  </li>
);

// Add propTypes required here

export default PlantInfo;

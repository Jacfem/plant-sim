import React from 'react';
import PropTypes from 'prop-types';
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

PlantInfo.propTypes = {
  plant: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    needs: PropTypes.shape({
      fertilizer: PropTypes.number.isRequired,
      sunlight: PropTypes.number.isRequired,
      water: PropTypes.number.isRequired,
    }).isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlantInfo;

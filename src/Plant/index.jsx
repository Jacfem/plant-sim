import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Plant extends Component {
  static propTypes = {
    plant: PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      needs: PropTypes.shape({
        fertilizer: PropTypes.number.isRequired,
        sunlight: PropTypes.number.isRequired,
        water: PropTypes.number.isRequired,
      }).isRequired,
      picture: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    fertilizer: 0,
    gameOver: false,
    sunlight: 0,
    water: 0,
  }

  componentDidUpdate() {
    return this.calculateSizeOfPlant(this.props.plant);
  }

  incrementWater = () => { // TODO: DRY up
    this.setState(state => ({ water: state.water + 1 }));
  }

  incrementFertilizer = () => {
    this.setState(state => ({ fertilizer: state.fertilizer + 1 }));
  }

  incrementSunlight = () => {
    this.setState(state => ({ sunlight: state.sunlight + 1 }));
  }

  totalNeededCareUnits = plant => (
    plant.needs.water +
    plant.needs.sunlight +
    plant.needs.fertilizer
  )

  totalGivenCareUnits = state => (
    state.water +
    state.sunlight +
    state.fertilizer
  )

  evaluateTaskStatus = (plant, taskName, state) => (
    this.isGameOver(plant, taskName, state) ?
      this.gameOver(`too much ${taskName}!!!`)
      :
      'Keep going...'
  )

  calculateSizeOfPlant(plant) { // TODO: refactor
    if (this.totalNeededCareUnits(plant) - this.totalGivenCareUnits(this.state) < 10) {
      return '75%';
    } else if (this.totalNeededCareUnits(plant) - this.totalGivenCareUnits(this.state) < 15) {
      return '50%';
    } else if (this.totalNeededCareUnits(plant) - this.totalGivenCareUnits(this.state) < 20) { // update to use game over
      return '25%';
    }
    return '10%';
  }

  isGameOver = (plant, taskName, state) => state > plant.needs[taskName]

  gameOver = message => alert(message) // eslint-disable-line

  resetState = () => { // not best practice!
    this.setState(() => ({ water: 0, sunlight: 0, fertilizer: 0 }));
  }

  render() {
    const { plant } = this.props;

    return (
      <React.Fragment>
        <button onClick={this.resetState}>Try again</button>

        <h1>{plant.name}</h1>
        <h2>{this.state.gameOver ?
          'Try starting again with the knowledge you have now!'
          :
          'Your plant is still growing, hooray!'}
        </h2>

        { /* Would want to refactor these into 'TaskButtons' */}
        <button onClick={this.incrementWater}>Water</button>
        <p>{this.state.water}</p>
        <p>{this.evaluateTaskStatus(plant, 'water', this.state.water)}</p>

        <button onClick={this.incrementSunlight}>Give Light</button>
        <p>{this.state.sunlight}</p>
        <p>{this.evaluateTaskStatus(plant, 'sunlight', this.state.sunlight)}</p>

        <button onClick={this.incrementFertilizer}>Fertilizer</button>
        <p>{this.state.fertilizer}</p>
        <p>{this.evaluateTaskStatus(plant, 'fertilizer', this.state.fertilizer)}</p>

        <img
          style={{ width: this.calculateSizeOfPlant(plant) }}
          src={plant.picture}
          alt={plant.name}
        />
      </React.Fragment>
    );
  }
}

export default Plant;

// want some clearer indication of getting closer to 'harvest'
// and when you've 'won'

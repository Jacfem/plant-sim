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

  // Would like to add a gameOver state, win state, or something like gameStatus: { won: false, lost: true }
  // Also would like to display a won/loss message on the screen
  // Could be nice to store wins/losses in a session via localStorage or cookies
  state = {
    fertilizer: 0,
    sunlight: 0,
    water: 0,
  }

  componentDidUpdate() {
    this.calculateSizeOfPlant(this.props.plant);
  }

  incrementTask = task => this.setState({ [task]: this.state[task] + 1 })

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

  evaluateTaskStatus = (taskName, taskState) => (
    this.isGameOver(taskName, taskState) ?
      this.alertGameOver(`Too much ${taskName}! Click 'try again' to restart.`)
      :
      this.statusMessage(taskName, taskState)
  )

  isGameOver = (taskName, taskState) => taskState > this.props.plant.needs[taskName]

  alertGameOver = message => alert(message);

  statusMessage(taskName, taskState) {
    if (taskState > (this.props.plant.needs[taskName] - 1)) {
      return 'Perfect - take a break, you\'re done with this task!';
    }
    return 'Keep going...';
  }

  calculateSizeOfPlant(plant) { // could refactor to be more dynamic to the actual ratio
    const careGiven = this.totalNeededCareUnits(plant) - this.totalGivenCareUnits(this.state);
    if (careGiven < 10) {
      return '75%';
    } else if (careGiven < 15) {
      return '50%';
    } else if (careGiven < 20) {
      return '25%';
    }
    return '10%';
  }

  resetState = () => {
    this.setState(() => ({
      water: 0, sunlight: 0, fertilizer: 0,
    }));
  }

  render() {
    const { plant } = this.props;

    return (
      <React.Fragment>
        <button onClick={this.resetState}>Try again</button>
        <h1>{plant.name}</h1>

        { /* Would want to refactor these into 'TaskButtons' */}
        <button onClick={() => this.incrementTask('water')}>Water</button>
        <p>{this.state.water}</p>
        <p>{this.evaluateTaskStatus('water', this.state.water)}</p>

        <button onClick={() => this.incrementTask('sunlight')}>Give Light</button>
        <p>{this.state.sunlight}</p>
        <p>{this.evaluateTaskStatus('sunlight', this.state.sunlight)}</p>

        <button onClick={() => this.incrementTask('fertilizer')}>Fertilizer</button>
        <p>{this.state.fertilizer}</p>
        <p>{this.evaluateTaskStatus('fertilizer', this.state.fertilizer)}</p>

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

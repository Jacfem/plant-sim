import Plant from './';
import { stubPlant } from '../helpers/stubPlant';

const initalState = {
  fertilizer: 0,
  sunlight: 0,
  water: 0,
};

describe('<Plant />', () => {
  function subject() {
    const props = {
      ...stubPlant,
    };
    return Enzyme.shallow(<Plant {...props} />);
  }

  describe('#render', () => {
    it('matches snapshot', () => {
      expect(subject()).toMatchSnapshot();
    });

    it('has the correct props', () => {
      expect(subject().instance().props).toEqual(stubPlant);
    });

    it('initializes with the correct state', () => {
      expect(subject().instance().state).toEqual(initalState);
    });
  });

  describe('has 3 task buttons', () => {
    const buttonCount = subject().find('.taskButton').length;
    expect(buttonCount);
  });

  describe('clicking the first task button', () => {
    it('increments the first task', () => {
      const component = subject().instance();
      component.incrementTask('water');
      expect(component.state.water).toEqual(1);
    });
  });
});

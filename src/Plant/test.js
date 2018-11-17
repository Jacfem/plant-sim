import Plant from './';
import { stubPlant } from '../helpers/stubPlant';

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
  });
});

import PlantInfo from './';
import { stubPlant } from '../../helpers/stubPlant';

describe('<PlantInfo />', () => {
  function subject() {
    const props = {
      ...stubPlant,
    };
    return Enzyme.shallow(<PlantInfo {...props} />);
  }

  describe('#render', () => {
    it('matches snapshot', () => {
      expect(subject()).toMatchSnapshot();
    });
  });
});

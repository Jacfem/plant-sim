import PlantList from './';

describe('<PlantList />', () => {
  function subject() {
    return Enzyme.shallow(<PlantList />); // takes no props, just seed data
  }

  describe('#render', () => {
    it('matches snapshot', () => {
      expect(subject()).toMatchSnapshot();
    });
  });
});

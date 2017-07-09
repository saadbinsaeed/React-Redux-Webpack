import { connect } from 'react-redux';
import { loadPlanet, addPlanet } from '../../redux/actions';

// const mapStateToProps = (state) => ({
//   planets: state.planets,
// });

function mapDispatchToProps(dispatch) {
  return {
    loadPlanet: (url) => dispatch(loadPlanet(url)),
    addPlanet: (planet) => dispatch(addPlanet(planet)),
  };
}

export const withPlanet = (component) => {
  const bindedComponent = connect(
    null,
    mapDispatchToProps
  )(component);
  return bindedComponent;
};

import axios from 'axios';

const initialState = {
  planets: [],
  planetIds: [],
};

const PlanetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLANET':
      const planets = state.planets;
      const planetIds = state.planetIds;
      planetIds.push(action.planet.id);
      planets.push(action.planet.planet);
      return {
        ...state,
        planets,
        planetIds,
      };
    default:
      return state;
  }
};

export default PlanetReducer;

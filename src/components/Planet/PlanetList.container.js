import React from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { withPlanet } from './PlanetHOC';
import store from '../../redux/store';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planet: {},
      loading: true,
    };
    this.handlePromise = this.handlePromise.bind(this);
  }

  componentWillMount() {
    const { url } = this.props;
    const { planets, planetIds } = store.getState().planets;
    const index = planetIds.indexOf(url.split('/')[5]);
    if (index < 0) {
      this.handlePromise(url);
    } else {
      this.setState({
        planet: planets[index],
        loading: false,
      });
    }
  }

  handlePromise(url) {
    const _this = this;
    axios.get(url)
    .then(function (response) {
      if (response.status === 200) {
        _this.setState({
          planet: response.data,
          loading: false,
        });
        const planet = {
          planet: response.data,
          id: url.split('/')[5],
        };
        _this.props.addPlanet(planet); // Saving planet to redux store
      } else {
        _this.setState({
          loading: false,
        });
      }

    })
    .catch(function (error) {
      console.log(error);
      _this.setState({ loading: false });
    });
  }

  render() {
    const { planet, loading } = this.state;
    const {
      name,
      diameter,
      climate,
      population,
    } = this.state.planet;
    const tableStyle = {
      width: '100%',
    };
    if (loading) {
      return <div>Please wait...</div>;
    } else {
      return (
        <Table hover style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Diamter</th>
              <th>Climate</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{population}</td>
            </tr>
          </tbody>
        </Table>
      );
    }
  }
}

export default withPlanet(Example);

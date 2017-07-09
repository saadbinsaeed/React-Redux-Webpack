import React from 'react';
import { Table,  Button } from 'reactstrap';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.handleParentClick(this.props.homeworld);
  };

  render() {
    const {
      name,
      height,
      mass,
      created,
      edited,
      homeworld,
    } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td>{height}</td>
        <td>{mass}</td>
        <td>{created}</td>
        <td>{edited}</td>
        <td onClick={this.handleClick} style={{cursor: 'pointer'}}>
          <Button color="link">Planet Information</Button>
        </td>
      </tr>
    );
  }
}

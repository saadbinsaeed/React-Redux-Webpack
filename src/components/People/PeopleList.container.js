import React from 'react';
import { Table, Button, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Modal from 'react-modal';
import ListItem from './ListItem.component';
import PlanetListContainer from '../Planet/PlanetList.container';
import Pagination from '../Pagination/Pagination.component';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      peopleToShow: [],
      start: -10,
      end: 0,
      loading: true,
      modalIsOpen: false,
      planetURL: '',
      peopleURL: 'https://swapi.co/api/people',
      nextURL: '',
      previousURL: '',
      pageNumber: 0,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePromise = this.handlePromise.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }
  openModal(planetURL) {
    this.setState({ modalIsOpen: true,
    planetURL
   });
  }

  handlePagination(clicked) {
    const { people, start, end, pageNumber, previousURL } = this.state;
    if (clicked === "pre") {
      let pst = start - 10;
      let pnd = end - 10;
      this.setState({
        peopleToShow: people.slice(pst, pnd),
        start: pst,
        end: pnd,
        pageNumber: pageNumber - 1,
        previousURL: pageNumber === 2 ? '' : previousURL,
      });

    } else {
      if ( pageNumber*10 < people.length) {
        let pst = start + 10;
        let pnd = end + 10;
        this.setState({
          peopleToShow: people.slice(pst, pnd),
          start: pst,
          end: pnd,
          pageNumber: pageNumber + 1,
        });
      } else {
        this.handlePromise(clicked)
      }
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    this.handlePromise();
  }
  handlePromise = (clicked = null) => {
    const { peopleURL, nextURL, previousURL, people, start, end, pageNumber } = this.state;
    const url = clicked === "next" ? nextURL : clicked === "pre" ? previousURL : peopleURL ;
    // console.log("URL is : ", url);
    const self = this;
    axios.get(url)
    .then(function (response) {
      if (response.status === 200) {
        let arr = people;
        const peopleFetched = response.data.results.length !== 0 ? response.data.results : [];
        const all = arr.concat(peopleFetched);
        self.setState({
          people: all,
          loading: false,
          peopleToShow: peopleFetched,
          totalItems: response.data.count,
          nextURL: response.data.next || '',
          previousURL: response.data.previous || '',
          start: start + 10,
          end: end + 10,
          pageNumber: pageNumber + 1,
        });
      }else {
        self.setState({
          loading: false,
        });
      }

    })
    .catch(function (error) {
      console.log(error);
      self.setState({
        loading: false,
      });
    });
  }

  handleClick = (planetURL) => {
    this.openModal(planetURL);
  };

  render() {
    const {
      people,
      loading,
      nextURL,
      previousURL,
      peopleToShow
    } = this.state ;

    return (
      <div>
        <Container>
          <Row>
            <Col md={{ size: 'auto', offset: 1 }}>
              {
                loading ?
                  <div>Please wait...</div>
                  :
                <div>
                  <Table hover bordered>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Created</th>
                        <th>Edited</th>
                        <th>Planet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        peopleToShow.map((person)=> <ListItem handleParentClick={this.handleClick} {...person} key={person.url} />)
                      }
                    </tbody>
                  </Table>
                  <Row>
                    <Col md={{ size: 1, offset: 11 }}>
                      <Pagination handlePagination={this.handlePagination} previousURL={previousURL} nextURL={nextURL} />
                    </Col>
                  </Row>
                </div>
              }
            </Col>
            </Row>
        </Container>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Planet Modal"
        >
          <Container>
            <Row>
              <Col md="3">
                Planet Information
              </Col>
              <Col md={{ size: 1, offset: 8 }}>
                <Button color="secondary" onClick={this.closeModal}>close</Button>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <PlanetListContainer url={this.state.planetURL} />
              </Col>
            </Row>
          </Container>
        </Modal>
      </div>
    );
  }
}

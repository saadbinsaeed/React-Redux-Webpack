import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class PaginationComponent extends React.Component {
  render() {
    const { nextURL, previousURL } = this.props;
    return (
      <Pagination>
        <PaginationItem disabled={previousURL ? false : true}>
          <PaginationLink previous onClick={()=> this.props.handlePagination('pre')} />
        </PaginationItem>
        <PaginationItem disabled={nextURL ? false : true}>
          <PaginationLink next onClick={()=> this.props.handlePagination('next')}/>
        </PaginationItem>
      </Pagination>
    );
  }
}

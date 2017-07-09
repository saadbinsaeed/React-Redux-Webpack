import React from 'react';
import './system.css';

class Layout extends React.Component {
  render() {
    const location = this.props.location.pathname;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
};

Layout.defaultProps = {
};

export default Layout;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

class ErrorBoundry extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorIndicator />;
    }
    const { children } = this.props;
    return children;
  }
}

ErrorBoundry.propType = {
  children: PropTypes.elementType.isRequired,
};

export default ErrorBoundry;

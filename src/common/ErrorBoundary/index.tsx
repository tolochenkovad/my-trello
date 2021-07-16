import React, { Component } from 'react';

type State = {
  hasError?: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<any, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { children } = this.props;
    const { hasError, error } = this.state;
    if (hasError) {
      return <h6>Error: {error}</h6>;
    }
    return children;
  }
}

export default ErrorBoundary;

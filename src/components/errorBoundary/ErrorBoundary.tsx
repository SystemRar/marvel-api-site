import { Component, ReactNode } from 'react';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorMessage />;
    }

    return children;
  }
}

export default ErrorBoundary;

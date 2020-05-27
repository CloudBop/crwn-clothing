import React, { Component } from 'react';
//
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './ErrorBoundary.styles';
//
export default class ErrorBoundary extends Component {
  //
  constructor() {
    super();
    // have any wrapped components /children thrown an error
    this.state = {
      hasErrored: false
    };
  }
  //
  // error lifecycle methods - tracks errors in children and sets state in error boundary component
  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }
  // error lifecycle methods
  componentDidCatch(error, info) {
    //
    console.log('error', error);
    //
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl={'https://i.imgur.com/yW2W9SC.png'}> </ErrorImageContainer>
          <ErrorImageText> Sorry, this page has broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    } else {
      return this.props.children;
    }
  }
}

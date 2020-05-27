import React from 'react';
import Spinner from '../spinner/Spinner';
const WithSpinnerHOC2 = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinnerHOC2;

import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.style';
//
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

// const WithSpinnerExplicitSyntax = wrappedComponent => {
//   const Spinner = ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//       <SpinnerOverlay>
//         <SpinnerContainer />
//       </SpinnerOverlay>
//     ) : (
//       <wrappedComponent {...otherProps} />
//     );
//   };
//   return Spinner;
// };
export default WithSpinner;
//
// TEST - diff syntax
//
// function WithSpinner(){
//   return wrappedComponent => ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//       <SpinnerContainer>
//         <SpinnerOverlay />
//       </SpinnerContainer>
//     ) : (
//       <wrappedComponent {...otherProps} />
//     );
//   }
// }

import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.style';
// styled-component variant
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

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

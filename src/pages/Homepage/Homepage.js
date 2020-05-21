import React from 'react';
import Directory from '../../components/directory/Directory';
import { HomePageContainer } from './HomePage.styles';
// import './homepage.styles.scss';

function Homepage() {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
}

export default Homepage;

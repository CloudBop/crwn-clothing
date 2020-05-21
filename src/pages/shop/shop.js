import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import CollectionPage from '../Collection/Collection';
//
const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      {/** :collectionId === URL param */}
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;

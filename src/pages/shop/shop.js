import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {
  // selectIsCollectionsFetching, now wrapped in HOC
  selectIsCollectionsLoaded
} from '../../redux/shop/shop.selector';
import { Route } from 'react-router-dom';
import CollectionsOverviewHOC from '../../components/collections-overview/CollectionsOverviewContainerHOC';
import CollectionPage from '../Collection/Collection';
import WithSpinner from '../../components/with-spinner/WithSpinner';
//
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
//
class ShopPage extends React.Component {
  // this.state = {} - shorthand invokes construtor(super){this.state}
  //
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
    /** see notes */
  }

  render() {
    const { match, isCollectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewHOC} />
        {/** :collectionId === URL param */}
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
        />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  // isFetchingCollections: selectIsCollectionsFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
  // pre-thunk
  //updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
//
// - notes
//
// - called under hood if this.state - see code
// constructor(props) {
//   super(props);

//   this.state = {};
// }
//
//
//
// - pre thunk
//const collectionRef = firestore.collection('collections');
//
// - will only make request onMount. Not observable
// collectionRef.get().then(snapshot => {
//   // promisified
//   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//   updateCollections(collectionsMap);
//   this.setState({ loading: false });
// });

//
// OBSERVABLE will update state of this collection @firestore live
// collectionRef.onSnapshot(async snapshot => {
//   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//   updateCollections(collectionsMap);
//   this.setState({ loading: false });
// });

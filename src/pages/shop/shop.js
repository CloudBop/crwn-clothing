import React from 'react';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { Route } from 'react-router-dom';
import CollectionsOverviewHOC from '../../components/collections-overview/CollectionsOverviewContainerHOC';
import CollectionPageContainerHOC from '../Collection/CollectionContainerHOC';
//
class ShopPage extends React.Component {
  // this.state = {} - shorthand invokes construtor(super){this.state}
  //
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
    /** see notes */
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewHOC} />
        {/** :collectionId === URL param */}
        <Route
          path={`${match.path}/:collectionId`}
          // render={props => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
          component={CollectionPageContainerHOC}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
  // pre-thunk
  //updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
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

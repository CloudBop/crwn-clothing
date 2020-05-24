import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/WithSpinner';
import CollectionsOverview from './CollectionsOverview';
// have to match props that wrapped component is expecting
const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionsFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});
// container pattern
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
//
// same as above, but neater. Function currying
const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview);

export default CollectionsOverviewContainer;

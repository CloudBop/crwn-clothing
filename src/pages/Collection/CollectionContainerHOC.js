import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import WithSpinner from '../../components/with-spinner/WithSpinner';
import CollectionPage from '../../pages/Collection/Collection';

const mapStateToProps = createStructuredSelector({
  // invert bool for prop
  isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage);

export default CollectionPageContainer;

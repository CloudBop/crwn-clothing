import React from 'react';
import { connect } from 'react-redux';
import { selectSingleCollection } from '../../redux/shop/shop.selector';
import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/CollectionItem';
//
function CollectionPage({ collection: { title, items } }) {
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">{items.map(item => <CollectionItem key={item.id} item={item} />)}</div>
    </div>
  );
}
//
const mapStateToProps = (state, ownProps) => ({
  // need pass Router props {match} as arg. selector returns a fn
  collection: selectSingleCollection(ownProps.match.params.collectionId)(state)
});
//
export default connect(mapStateToProps)(CollectionPage);

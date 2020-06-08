import React from 'react';
import CollectionItem from '../collection-item/CollectionItem';
import './collection-preview.styles.scss';
export function CollectionPreview({ title, items, history, match, routeName }) {
  return (
    <div className={'collection-preview'}>
      <h1 onClick={() => history.push(`${match.path}/${routeName}`)}>{title.toUpperCase()}</h1>
      <div className="preview">
        {/** filter so only 4 items shown */}
        {items.filter((item, idx) => idx < 4).map(item => <CollectionItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}

export default CollectionPreview;

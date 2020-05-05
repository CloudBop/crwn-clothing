import React from 'react';
import CollectionItem from '../collection-item/CollectionItem';
import './collection-preview.styles.scss';
function CollectionPreview({ title, items }) {
  return (
    <div className={'collection-preview'}>
      <h1>{title.toUpperCase()}</h1>
      <div className="preview">
        {/** filter so only 4 items shown */}
        {items
          .filter((item, idx) => idx < 4)
          .map(({ id, ...otherItemProps }) => <CollectionItem key={id} {...otherItemProps} />)}
      </div>
    </div>
  );
}

export default CollectionPreview;

import { createSelector } from 'reselect';
//
const selectShop = state => state.shop;
//
export const selectCollections = createSelector([ selectShop ], shop => shop.collections);
//
export const selectCollectionsForPreview = createSelector(
  [ selectCollections ],
  // returns an array of our state:Map:hash
  collections => (collections ? Object.keys(collections).map(key => collections[key]) : [])
);
//
export const selectSingleCollection = collectionUrlParam =>
  // can be nullable with no render error
  createSelector([ selectCollections ], collections => (collections ? collections[collectionUrlParam] : []));
//
export const selectIsCollectionsFetching = createSelector([ selectShop ], shop => shop.isFetching);
export const selectIsCollectionsLoaded = createSelector([ selectShop ], shop => !!shop.collections);

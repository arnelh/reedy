import * as CollectionAPIUtil from "../utils/collections_api_util";

export const RECEIVE_ALL_COLLECTIONS = "RECEIVE_ALL_COLLECTIONS";
export const RECEIVE_COLLECTION = "RECEIVE_COLLECTION";
export const REMOVE_COLLECTION = "REMOVE_COLLECTION";
export const FETCHING_COLLECTIONS = "FETCHING_COLLECTIONS";
export const DELETING_COLLECTION = "DELETING_COLLECTION";
export const RECEIVE_CURRENT_COLLECTION = "RECEIVE_CURRENT_COLLECTION";

export const receiveAllCollections = collections => ({
  type: RECEIVE_ALL_COLLECTIONS,
  collections,
});

export const receiveCurrentCollection = collection => ({
  type: RECEIVE_CURRENT_COLLECTION,
  collection,
});

export const receiveCollection = collection => ({
  type: RECEIVE_COLLECTION,
  collection,
});

export const removeCollection = collectionId => ({
  type: REMOVE_COLLECTION,
  collectionId,
});

export const fetchingCollections = () => ({
  type: FETCHING_COLLECTIONS,
});

export const deletingCollection = () => ({
  type: DELETING_COLLECTION,
});

export const fetchAllCollections = () => dispatch => {
  dispatch(fetchingCollections());
  return CollectionAPIUtil.fetchAllCollections().then(collections =>
    dispatch(receiveAllCollections(collections))
  );
};

export const fetchCollection = collectionId => dispatch => {
  dispatch(fetchingCollections());
  return CollectionAPIUtil.fetchCollection(collectionId).then(collection =>
    dispatch(receiveCurrentCollection(collection))
  );
};

export const createCollection = (title, feedId) => dispatch => {
  dispatch(fetchingCollections());
  return CollectionAPIUtil.createCollection(title, feedId).then(collection =>
    dispatch(receiveCollection(collection))
  );
};

export const deleteCollection = collectionId => dispatch => {
  dispatch(deletingCollection());
  return CollectionAPIUtil.deleteCollection(collectionId).then(collection =>
    dispatch(removeCollection(collection.id))
  );
};

export const updateCollection = collection => dispatch => {
  dispatch(fetchingCollections());
  return CollectionAPIUtil.updateCollection(collection).then(collection =>
    dispatch(receiveCollection(collection))
  );
};

export const addFeedToCollection = collectionFeed => dispatch => {
  dispatch(fetchingCollections());
  return CollectionAPIUtil.addFeedToCollection(
    collectionFeed
  ).then(collection => {
    return dispatch(receiveCollection(collection));
  });
};

export const deleteFeedFromCollection = collectionFeed => dispatch => {
  dispatch(deletingCollection());
  return CollectionAPIUtil.deleteFeedFromCollection(
    collectionFeed
  ).then(collection => {
    if (collection.feedIds.length) {
      return dispatch(receiveCollection(collection));
    } else {
      return dispatch(deleteCollection(collection.id));
    }
  });
};

export const deliveryExpress = (deliveryProject) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('delivery').add({
        ...deliveryProject,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_DELIVERY_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_DELIVERY_ERROR' }, err);
      });
    }
  };
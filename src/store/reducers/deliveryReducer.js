const initState = {}

const deliveryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_DELIVERY_SUCCESS':
      console.log('create delivery success');
      return state;
    case 'CREATE_DELIVERY_ERROR':
      console.log('create delivery error');
      return state;
    default:
      return state;
  }
};

export default deliveryReducer;
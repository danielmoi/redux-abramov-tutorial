// We will use the browser localStorage API

// This function LOADS the state
export const loadState = () => {
  // we need to use `try` because some privacy modes don't allow the use of localStorage
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      // this means that the key `state` doesn't exist
      // we will let the reducers initialize the state instead
      return undefined;
    }
    // no need for an `else` here!
    // we use JSON.parse to turn it into the `state` OBJECT
    return JSON.parse(serializedState);
  } catch (err) {
    // once again, if any errors, we will let reducers initialize state
    return undefined;
  }
}

// This function SAVES the state
export const saveState = state => {
  try {
    // we will serialize the state OBJECT
    // this will only work if the state is serialize-able
    // but the general recommendation in Redux is that state SHOULD BE serialize-able
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write (save) errors
    console.log('*************');
    console.log('err:', err);
  }
}

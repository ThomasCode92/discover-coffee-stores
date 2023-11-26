import { createContext, useReducer } from 'react';

const initialState = { latLong: '', coffeeStores: [] };

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};

const coffeeStoreReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error('Unhandled action type:' + action.type);
  }
};

export const CoffeeStoreContext = createContext();

export default function CoffeeStoreProvider({ children }) {
  const [state, dispatch] = useReducer(coffeeStoreReducer, initialState);

  return (
    <CoffeeStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </CoffeeStoreContext.Provider>
  );
}

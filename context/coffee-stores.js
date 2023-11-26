import { createContext } from 'react';

const initialState = { latLong: '', coffeeStores: [] };

export const CoffeeStoreContext = createContext();

export default function CoffeeStoreProvider({ children }) {
  return (
    <CoffeeStoreContext.Provider value={{ state: initialState }}>
      {children}
    </CoffeeStoreContext.Provider>
  );
}

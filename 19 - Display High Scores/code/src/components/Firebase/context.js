import React, { useContext } from 'react';

export const FirebaseContext = React.createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

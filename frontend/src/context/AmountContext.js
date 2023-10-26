import React, { createContext, useState } from 'react';

// Create the context
export const AmountContext = createContext();

// Create a provider component to wrap the components that need access to the shared state
export const AmountProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);

  return (
    <AmountContext.Provider value={{ amount, setAmount }}>
      {children}
    </AmountContext.Provider>
  );
};

import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      }
      if (prev.length >= 2) {
        // Replace second item if 2 are already selected
        return [prev[0], product];
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p._id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => {
    return compareList.some((p) => p._id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareModalOpen,
        setIsCompareModalOpen
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

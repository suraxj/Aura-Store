import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) {
        toast.success(`Removed ${product.name} from Compare`);
        return prev.filter((p) => p._id !== product._id);
      }

      if (prev.length >= 2) {
        toast.success(`Comparing ${prev[0].name} with ${product.name}`);
        setIsCompareModalOpen(true);
        return [prev[0], product];
      }

      if (prev.length === 1) {
        toast.success(`Added ${product.name}! Opening Side-by-Side Comparison`);
        setIsCompareModalOpen(true);
        return [...prev, product];
      }

      toast.success(`Added ${product.name} to Compare! Select 1 more product`);
      return [product];
    });
  };

  const selectForSlot = (product, slotIndex) => {
    setCompareList((prev) => {
      const newList = [...prev];
      newList[slotIndex] = product;
      return newList;
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p._id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareModalOpen(false);
  };

  const isInCompare = (productId) => {
    return compareList.some((p) => p._id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        toggleCompare,
        selectForSlot,
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

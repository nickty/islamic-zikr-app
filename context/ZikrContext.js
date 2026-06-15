import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadZikrData, saveZikrData } from '../utils/storage';

const ZikrContext = createContext();

export const useZikr = () => {
  const context = useContext(ZikrContext);
  if (!context) {
    throw new Error('useZikr must be used within a ZikrProvider');
  }
  return context;
};

export const ZikrProvider = ({ children }) => {
  const [zikrData, setZikrData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await loadZikrData();
    setZikrData(data);
    setLoading(false);
  };

  const updateZikr = async (type, newData) => {
    const updated = { ...zikrData, [type]: newData };
    setZikrData(updated);
    await saveZikrData(updated);
  };

  const refreshData = async () => {
    setLoading(true);
    await loadData();
  };

  return (
    <ZikrContext.Provider value={{ 
      zikrData, 
      loading, 
      updateZikr, 
      refreshData 
    }}>
      {children}
    </ZikrContext.Provider>
  );
};
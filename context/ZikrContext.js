import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadZikrData, saveZikrData, updateZikrCompletion, getStatsSummary, loadStats } from '../utils/storage';

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
  const [statsSummary, setStatsSummary] = useState(null);
  const [allStats, setAllStats] = useState(null);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    await loadData();
    await loadAllStats();
  };

  const loadData = async () => {
    const data = await loadZikrData();
    setZikrData(data);
    setLoading(false);
  };

  const loadAllStats = async () => {
    const summary = await getStatsSummary();
    const stats = await loadStats();
    setStatsSummary(summary);
    setAllStats(stats);
    console.log('Stats loaded in context:', { summary, stats });
  };

  const completeZikr = async (zikrType, completedDuas, totalCount) => {
    console.log('Completing Zikr:', zikrType, completedDuas, totalCount);
    await updateZikrCompletion(zikrType, completedDuas, totalCount);
    await loadAllStats(); // Refresh stats after completion
  };

  const refreshStats = async () => {
    await loadAllStats();
  };

  return (
    <ZikrContext.Provider value={{ 
      zikrData, 
      loading, 
      statsSummary,
      allStats,
      completeZikr,
      refreshStats,
      loadData
    }}>
      {children}
    </ZikrContext.Provider>
  );
};
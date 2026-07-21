import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Business } from './business';

const STORAGE_KEY = 'listings';

type ContextValue = {
  businesses: Business[];
  addBusiness: (name: string, category: string, description: string) => void;
  isLoading: boolean;
};

const BusinessContext = createContext<ContextValue | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved) setBusinesses(JSON.parse(saved));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(businesses)).catch(() => {});
  }, [businesses, isLoading]);

  const addBusiness = (name: string, category: string, description: string) => {
    const business: Business = {
      id: String(Date.now()),
      name,
      category,
      description,
      createdAt: Date.now(),
    };
    setBusinesses((current) => [business, ...current]);
  };

  return (
    <BusinessContext.Provider value={{ businesses, addBusiness, isLoading }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinesses() {
  const context = useContext(BusinessContext);
  if (!context) throw new Error('useBusinesses must be used inside BusinessProvider');
  return context;
}
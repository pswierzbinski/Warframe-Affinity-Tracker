'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  hideMastered: boolean;
  setHideMastered: (value: boolean) => void;
  searchName: string;
  setSearchName: (value: string) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  hideMastered: false,
  setHideMastered: () => {},
  searchName: '',
  setSearchName: () => {},
});
interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [hideMastered, setHideMastered] = useState<boolean>(false); 
  const [searchName, setSearchName] = useState<string>('');
  return (
    <GlobalContext.Provider value={{ hideMastered, setHideMastered, searchName, setSearchName }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): GlobalContextType {
  return useContext(GlobalContext);
}
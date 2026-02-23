'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  hideMastered: boolean;
  setHideMastered: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  hideMastered: false,
  setHideMastered: () => {},
});
interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [hideMastered, setHideMastered] = useState<boolean>(false); 

  return (
    <GlobalContext.Provider value={{ hideMastered, setHideMastered }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): GlobalContextType {
  return useContext(GlobalContext);
}
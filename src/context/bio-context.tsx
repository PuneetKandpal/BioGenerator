"use client";

import { createContext, useState } from "react";

interface BioContextType {
  output: { bio: string }[];
  loading: boolean;
  setOutput: React.Dispatch<React.SetStateAction<{ bio: string }[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BioContext = createContext<BioContextType>({
  output: [],
  loading: false,
  setOutput: () => {},
  setLoading: () => {},
});

export const BioProvider = ({ children }: { children: React.ReactNode }) => {
  const [output, setOutput] = useState<{ bio: string }[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <BioContext.Provider value={{ output, loading, setOutput, setLoading }}>
      {children}
    </BioContext.Provider>
  );
};

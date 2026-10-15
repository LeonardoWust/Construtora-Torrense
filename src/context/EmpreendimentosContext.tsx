import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Empreendimento, EMPREENDIMENTOS as INITIAL_DATA } from "../data/empreendimentos";

interface EmpreendimentosContextType {
  empreendimentos: Empreendimento[];
  addEmpreendimento: (emp: Empreendimento) => void;
  updateEmpreendimento: (id: string, emp: Empreendimento) => void;
  removeEmpreendimento: (id: string) => void;
}

const EmpreendimentosContext = createContext<EmpreendimentosContextType | undefined>(undefined);

const STORAGE_KEY = "construtora_empreendimentos";

export const EmpreendimentosProvider = ({ children }: { children: ReactNode }) => {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse empreendimentos from localStorage", e);
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(empreendimentos));
    } catch (e) {
      console.error("localStorage cheio:", e);
      alert("⚠️ Armazenamento do navegador cheio! Reduza o número de fotos ou use imagens menores e tente novamente.");
    }
  }, [empreendimentos]);

  const addEmpreendimento = (emp: Empreendimento) => {
    setEmpreendimentos((prev) => [...prev, emp]);
  };

  const updateEmpreendimento = (id: string, updatedEmp: Empreendimento) => {
    setEmpreendimentos((prev) => prev.map((emp) => (emp.id === id ? updatedEmp : emp)));
  };

  const removeEmpreendimento = (id: string) => {
    setEmpreendimentos((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <EmpreendimentosContext.Provider value={{ empreendimentos, addEmpreendimento, updateEmpreendimento, removeEmpreendimento }}>
      {children}
    </EmpreendimentosContext.Provider>
  );
};

export const useEmpreendimentos = () => {
  const context = useContext(EmpreendimentosContext);
  if (context === undefined) {
    throw new Error("useEmpreendimentos must be used within an EmpreendimentosProvider");
  }
  return context;
};


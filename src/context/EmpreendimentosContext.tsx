import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Empreendimento, EMPREENDIMENTOS as INITIAL_DATA } from "../data/empreendimentos";
import { supabase } from "../lib/supabase";

interface EmpreendimentosContextType {
  empreendimentos: Empreendimento[];
  isLoading: boolean;
  error: string | null;
  addEmpreendimento: (emp: Empreendimento) => Promise<void>;
  updateEmpreendimento: (id: string, emp: Empreendimento) => Promise<void>;
  removeEmpreendimento: (id: string) => Promise<void>;
  importLocalEmpreendimentos: () => Promise<number>;
}

interface EmpreendimentoRow {
  id: string;
  nome: string;
  status: Empreendimento["status"];
  cidade: string;
  metragem: string;
  dormitorios: string;
  vagas: string;
  andares: string;
  unidades: string;
  descricao: string;
  diferenciais: string[];
  galeria: Empreendimento["galeria"];
  whatsapp: string;
  whatsapp_msg: string;
  destaque: boolean;
}

const EmpreendimentosContext = createContext<EmpreendimentosContextType | undefined>(undefined);
const STORAGE_BUCKET = "empreendimentos";
const LEGACY_STORAGE_KEY = "construtora_empreendimentos";

const toRow = (emp: Empreendimento): EmpreendimentoRow => ({
  id: emp.id,
  nome: emp.nome,
  status: emp.status,
  cidade: emp.cidade,
  metragem: emp.metragem,
  dormitorios: emp.dormitorios,
  vagas: emp.vagas,
  andares: emp.andares,
  unidades: emp.unidades,
  descricao: emp.descricao,
  diferenciais: emp.diferenciais,
  galeria: emp.galeria,
  whatsapp: emp.whatsapp,
  whatsapp_msg: emp.whatsappMsg,
  destaque: emp.destaque,
});

const fromRow = (row: EmpreendimentoRow): Empreendimento => ({
  id: row.id,
  nome: row.nome,
  status: row.status,
  cidade: row.cidade,
  metragem: row.metragem,
  dormitorios: row.dormitorios,
  vagas: row.vagas,
  andares: row.andares,
  unidades: row.unidades,
  descricao: row.descricao,
  diferenciais: row.diferenciais,
  galeria: row.galeria,
  whatsapp: row.whatsapp,
  whatsappMsg: row.whatsapp_msg,
  destaque: row.destaque,
});

const isEmpreendimento = (value: unknown): value is Empreendimento => {
  if (typeof value !== "object" || value === null) return false;
  if (
    !("id" in value)
    || typeof value.id !== "string"
    || !("nome" in value)
    || typeof value.nome !== "string"
    || !("status" in value)
    || !["na-planta", "em-construcao", "pronto"].includes(String(value.status))
    || !("diferenciais" in value)
    || !Array.isArray(value.diferenciais)
    || !("galeria" in value)
    || !Array.isArray(value.galeria)
  ) return false;

  return value.galeria.every((image) =>
    typeof image === "object"
    && image !== null
    && "src" in image
    && typeof image.src === "string"
    && "alt" in image
    && typeof image.alt === "string",
  );
};

async function removeUploadedFiles(paths: string[]) {
  if (!supabase || paths.length === 0) return;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove(paths);
  if (error) console.error("Não foi possível limpar imagens enviadas após falha ao salvar:", error);
}

const uploadGallery = async (emp: Empreendimento) => {
  if (!supabase) throw new Error("Configure o Supabase antes de salvar empreendimentos.");

  const uploadedPaths: string[] = [];
  const galeria: Empreendimento["galeria"] = [];

  try {
    for (const [index, image] of emp.galeria.entries()) {
      if (!image.src.startsWith("data:")) {
        galeria.push(image);
        continue;
      }

      const response = await fetch(image.src);
      if (!response.ok) throw new Error(`Não foi possível preparar a imagem "${image.alt}".`);
      const file = await response.blob();
      const extension = file.type.split("/")[1] || "jpg";
      const path = `${emp.id}/${crypto.randomUUID()}-${index}.${extension}`;
      const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

      if (error) throw error;
      uploadedPaths.push(path);
      galeria.push({
        ...image,
        src: supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl,
      });
    }
  } catch (error) {
    await removeUploadedFiles(uploadedPaths);
    throw error;
  }

  return { empreendimento: { ...emp, galeria }, uploadedPaths };
};

export const EmpreendimentosProvider = ({ children }: { children: ReactNode }) => {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>(supabase ? [] : INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [errorMessage, setErrorMessage] = useState<string | null>(
    supabase ? null : "Supabase não configurado. O site está mostrando apenas os empreendimentos de demonstração.",
  );

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    const loadEmpreendimentos = async () => {
      try {
        const { data, error } = await client
          .from("empreendimentos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setEmpreendimentos((data as EmpreendimentoRow[]).map(fromRow));
      } catch (error) {
        console.error("Não foi possível carregar os empreendimentos do Supabase:", error);
        setErrorMessage("Não foi possível carregar os empreendimentos do servidor. Verifique a configuração do Supabase.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadEmpreendimentos();
  }, []);

  const addEmpreendimento = async (emp: Empreendimento) => {
    if (!supabase) throw new Error("Configure o Supabase antes de salvar empreendimentos.");

    const { empreendimento, uploadedPaths } = await uploadGallery(emp);
    const { error } = await supabase.from("empreendimentos").insert(toRow(empreendimento));
    if (error) {
      await removeUploadedFiles(uploadedPaths);
      throw error;
    }
    setEmpreendimentos((current) => [empreendimento, ...current]);
  };

  const updateEmpreendimento = async (id: string, emp: Empreendimento) => {
    if (!supabase) throw new Error("Configure o Supabase antes de salvar empreendimentos.");

    const { empreendimento, uploadedPaths } = await uploadGallery(emp);
    const { error } = await supabase.from("empreendimentos").update(toRow(empreendimento)).eq("id", id).select("id").single();
    if (error) {
      await removeUploadedFiles(uploadedPaths);
      throw error;
    }
    setEmpreendimentos((current) => current.map((item) => item.id === id ? empreendimento : item));
  };

  const removeEmpreendimento = async (id: string) => {
    if (!supabase) throw new Error("Configure o Supabase antes de excluir empreendimentos.");

    const { error } = await supabase.from("empreendimentos").delete().eq("id", id);
    if (error) throw error;
    setEmpreendimentos((current) => current.filter((item) => item.id !== id));
  };

  const importLocalEmpreendimentos = async () => {
    if (!supabase) throw new Error("Configure o Supabase antes de importar empreendimentos.");

    const saved = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!saved) return 0;

    let legacy: unknown;
    try {
      legacy = JSON.parse(saved);
    } catch (error) {
      console.error("Os dados locais dos empreendimentos não puderam ser lidos:", error);
      throw new Error("Os dados salvos neste navegador estão inválidos e não puderam ser importados.");
    }
    if (!Array.isArray(legacy)) throw new Error("O formato dos empreendimentos salvos neste navegador é inválido.");

    const knownIds = new Set(empreendimentos.map((item) => item.id));
    let imported = 0;
    for (const item of legacy) {
      if (!isEmpreendimento(item)) throw new Error("Um dos empreendimentos locais tem dados inválidos.");
      if (knownIds.has(item.id)) continue;

      await addEmpreendimento(item);
      knownIds.add(item.id);
      imported++;
    }
    return imported;
  };

  return (
    <EmpreendimentosContext.Provider value={{
      empreendimentos,
      isLoading,
      error: errorMessage,
      addEmpreendimento,
      updateEmpreendimento,
      removeEmpreendimento,
      importLocalEmpreendimentos,
    }}>
      {errorMessage && (
        <div role="alert" style={{ padding: ".75rem 1rem", backgroundColor: "#fef3c7", color: "#92400e", textAlign: "center" }}>
          {errorMessage}
        </div>
      )}
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

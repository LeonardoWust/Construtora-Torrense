import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmpreendimentos } from "../../context/EmpreendimentosContext";
import { Empreendimento } from "../../data/empreendimentos";

export default function AdminEmpreendimentoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { empreendimentos, addEmpreendimento, updateEmpreendimento } = useEmpreendimentos();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<Omit<Empreendimento, "id">>({
    nome: "",
    status: "na-planta",
    cidade: "",
    metragem: "",
    dormitorios: "",
    vagas: "",
    andares: "",
    unidades: "",
    descricao: "",
    diferenciais: [""],
    galeria: [],
    whatsapp: "",
    whatsappMsg: "",
    destaque: false,
  });

  useEffect(() => {
    if (isEditing && id) {
      const emp = empreendimentos.find((e) => e.id === id);
      if (emp) {
        setFormData(emp);
      } else {
        navigate("/admin");
      }
    }
  }, [id, isEditing, empreendimentos, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleDiferencialChange = (index: number, value: string) => {
    const newDiferenciais = [...formData.diferenciais];
    newDiferenciais[index] = value;
    setFormData({ ...formData, diferenciais: newDiferenciais });
  };

  const addDiferencial = () => {
    setFormData({ ...formData, diferenciais: [...formData.diferenciais, ""] });
  };

  const removeDiferencial = (index: number) => {
    const newDiferenciais = formData.diferenciais.filter((_, i) => i !== index);
    setFormData({ ...formData, diferenciais: newDiferenciais });
  };

  // Compress image via canvas before converting to Base64
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const MAX_SIZE = 1200;
          let { width, height } = img;

          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            } else {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject(new Error("Canvas error")); return; }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(async (file) => {
      try {
        const compressed = await compressImage(file);
        setFormData((prev) => ({
          ...prev,
          galeria: [...prev.galeria, { src: compressed, alt: file.name.replace(/\.[^/.]+$/, "") }],
        }));
      } catch {
        alert(`Erro ao processar a imagem "${file.name}". Tente uma imagem menor.`);
      }
    });
    // Reset input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newGaleria = formData.galeria.filter((_, i) => i !== index);
    setFormData({ ...formData, galeria: newGaleria });
  };

  const handleAltChange = (index: number, alt: string) => {
    const newGaleria = [...formData.galeria];
    newGaleria[index].alt = alt;
    setFormData({ ...formData, galeria: newGaleria });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty diferenciais
    const cleanFormData = {
      ...formData,
      diferenciais: formData.diferenciais.filter(d => d.trim() !== "")
    };

    if (isEditing && id) {
      updateEmpreendimento(id, { ...cleanFormData, id } as Empreendimento);
    } else {
      const newId = cleanFormData.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      // Check if id exists
      const idExists = empreendimentos.some(e => e.id === newId);
      const finalId = idExists ? `${newId}-${Date.now()}` : newId;
      
      addEmpreendimento({ ...cleanFormData, id: finalId } as Empreendimento);
    }
    navigate("/admin");
  };

  const inputStyle = { width: "100%", padding: ".75rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "1rem" };
  const labelStyle = { display: "block", marginBottom: ".5rem", fontWeight: "bold" };
  const sectionStyle = { backgroundColor: "#fff", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>{isEditing ? "Editar Empreendimento" : "Novo Empreendimento"}</h1>
        <button type="button" onClick={() => navigate("/admin")} style={{ padding: ".5rem 1rem", backgroundColor: "#6b7280", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={sectionStyle}>
          <h2>Informações Gerais</h2>
          
          <label style={labelStyle}>Nome</label>
          <input style={inputStyle} name="nome" value={formData.nome} onChange={handleChange} required />
          
          <label style={labelStyle}>Cidade</label>
          <input style={inputStyle} name="cidade" value={formData.cidade} onChange={handleChange} required />
          
          <label style={labelStyle}>Status</label>
          <select style={inputStyle} name="status" value={formData.status} onChange={handleChange}>
            <option value="na-planta">Na Planta</option>
            <option value="em-construcao">Em Construção</option>
            <option value="pronto">Pronto</option>
          </select>

          <label style={{ display: "flex", alignItems: "center", gap: ".5rem", fontWeight: "bold" }}>
            <input type="checkbox" name="destaque" checked={formData.destaque} onChange={handleChange} />
            Destacar na Home
          </label>
        </div>

        <div style={sectionStyle}>
          <h2>Ficha Técnica</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Metragem</label><input style={inputStyle} name="metragem" value={formData.metragem} onChange={handleChange} /></div>
            <div><label style={labelStyle}>Dormitórios</label><input style={inputStyle} name="dormitorios" value={formData.dormitorios} onChange={handleChange} /></div>
            <div><label style={labelStyle}>Vagas</label><input style={inputStyle} name="vagas" value={formData.vagas} onChange={handleChange} /></div>
            <div><label style={labelStyle}>Andares</label><input style={inputStyle} name="andares" value={formData.andares} onChange={handleChange} /></div>
            <div><label style={labelStyle}>Unidades</label><input style={inputStyle} name="unidades" value={formData.unidades} onChange={handleChange} /></div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h2>Descrição</h2>
          <textarea style={{ ...inputStyle, minHeight: "100px" }} name="descricao" value={formData.descricao} onChange={handleChange} required />
        </div>

        <div style={sectionStyle}>
          <h2>Diferenciais</h2>
          {formData.diferenciais.map((dif, index) => (
            <div key={index} style={{ display: "flex", gap: "1rem", marginBottom: ".5rem" }}>
              <input style={{ ...inputStyle, marginBottom: 0 }} value={dif} onChange={(e) => handleDiferencialChange(index, e.target.value)} placeholder="Ex: Piscina adulto e infantil" />
              <button type="button" onClick={() => removeDiferencial(index)} style={{ padding: "0 1rem", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Remover</button>
            </div>
          ))}
          <button type="button" onClick={addDiferencial} style={{ padding: ".5rem 1rem", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: ".5rem" }}>
            + Adicionar Diferencial
          </button>
        </div>

        <div style={sectionStyle}>
          <h2>Galeria de Fotos</h2>
          <p style={{ marginBottom: "1rem", color: "#6b7280", fontSize: ".875rem" }}>Selecione imagens do seu computador para adicionar à galeria.</p>
          
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageUpload} 
            style={{ marginBottom: "1.5rem" }} 
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {formData.galeria.map((img, index) => (
              <div key={index} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                <div style={{ padding: ".5rem" }}>
                  <input 
                    value={img.alt} 
                    onChange={(e) => handleAltChange(index, e.target.value)} 
                    placeholder="Descrição da imagem"
                    style={{ width: "100%", padding: ".25rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: ".875rem" }} 
                  />
                  <button type="button" onClick={() => removeImage(index)} style={{ width: "100%", padding: ".25rem", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: ".5rem", fontSize: ".875rem" }}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <h2>Contato (WhatsApp)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Número (com DDI e DDD)</label>
              <input style={inputStyle} name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="5511999999999" />
            </div>
            <div>
              <label style={labelStyle}>Mensagem Automática</label>
              <input style={inputStyle} name="whatsappMsg" value={formData.whatsappMsg} onChange={handleChange} placeholder="Olá! Tenho interesse..." />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn--gold" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
          Salvar Empreendimento
        </button>
      </form>
    </div>
  );
}


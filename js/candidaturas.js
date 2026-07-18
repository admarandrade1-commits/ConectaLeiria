// CONECTALEIRIA — Sistema de Candidaturas

const Candidaturas = {

  // Empresa marca interesse num candidato
  marcarInteresse: async (empresa_id, candidato_id, estado) => {
    const chave = `cl_interesse_${candidato_id}`;
    const interesses = JSON.parse(localStorage.getItem(chave) || '[]');
    
    const existe = interesses.find(i => i.empresa_id === empresa_id);
    if (existe) {
      existe.estado = estado;
      existe.data = new Date().toISOString();
    } else {
      interesses.push({ empresa_id, candidato_id, estado, data: new Date().toISOString() });
    }
    
    localStorage.setItem(chave, JSON.stringify(interesses));

    // Guardar no Supabase (fonte principal de verdade)
    try {
      if (window.db) {
        const { error } = await window.db.from('candidaturas').upsert({
          empresa_id, candidato_id, estado, lida: false,
          updated_at: new Date().toISOString()
        }, { onConflict: 'empresa_id,candidato_id' });
        if (error) console.error('Erro ao gravar candidatura no Supabase:', error);
      }
    } catch(e) { console.error('Erro ao gravar candidatura no Supabase:', e); }
  },

  // Ver estado de um candidato
  getEstado: (candidato_id) => {
    const chave = `cl_interesse_${candidato_id}`;
    const interesses = JSON.parse(localStorage.getItem(chave) || '[]');
    
    if (interesses.length === 0) return { estado: 'espera', texto: '⏳ À espera', cor: '#999' };
    
    const temInteresse = interesses.find(i => i.estado === 'interesse');
    const temContacto = interesses.find(i => i.estado === 'contactar');
    const foiVisto = interesses.find(i => i.estado === 'visto');
    
    if (temContacto) return { estado: 'contactar', texto: '📞 Serás contactado!', cor: '#1a6b3c' };
    if (temInteresse) return { estado: 'interesse', texto: '⭐ Há interesse em ti!', cor: '#c9a84c' };
    if (foiVisto) return { estado: 'visto', texto: '👀 O teu currículo foi visto', cor: '#2ecc71' };
    
    return { estado: 'espera', texto: '⏳ À espera de ser visto', cor: '#999' };
  },

  // Ver todos os interesses de um candidato
  getInteresses: (candidato_id) => {
    const chave = `cl_interesse_${candidato_id}`;
    return JSON.parse(localStorage.getItem(chave) || '[]');
  }
};

window.Candidaturas = Candidaturas;

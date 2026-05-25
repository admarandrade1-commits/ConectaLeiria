// CONECTALEIRIA — Base de Dados Supabase

const Database = {

  // CANDIDATOS
  async registarCandidato(dados) {
    const { data, error } = await db
      .from('candidatos')
      .insert([dados])
      .select();
    if (error) throw error;
    return data[0];
  },

  async loginCandidato(email, senha) {
    const { data, error } = await db
      .from('candidatos')
      .select('*')
      .eq('email', email)
      .eq('senha', senha)
      .single();
    if (error) return null;
    return data;
  },

  async getCandidatos() {
    const { data, error } = await db
      .from('candidatos')
      .select('*');
    if (error) return [];
    return data;
  },

  // CURRÍCULOS
  async guardarCurriculo(candidato_id, cv) {
    const { data: existing } = await db
      .from('curriculos')
      .select('id')
      .eq('candidato_id', candidato_id)
      .single();

    if (existing) {
      const { data, error } = await db
        .from('curriculos')
        .update({ ...cv, updated_at: new Date().toISOString() })
        .eq('candidato_id', candidato_id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { data, error } = await db
        .from('curriculos')
        .insert([{ candidato_id, ...cv }])
        .select();
      if (error) throw error;
      return data[0];
    }
  },

  async getCurriculo(candidato_id) {
    const { data, error } = await db
      .from('curriculos')
      .select('*')
      .eq('candidato_id', candidato_id)
      .single();
    if (error) return {};
    return data;
  },

  async getCurriculos() {
    const { data, error } = await db
      .from('curriculos')
      .select('*, candidatos(nome, email, telefone, concelho)');
    if (error) return [];
    return data;
  },

  // EMPRESAS
  async registarEmpresa(dados) {
    const { data, error } = await db
      .from('empresas')
      .insert([dados])
      .select();
    if (error) throw error;
    return data[0];
  },

  async loginEmpresa(email, senha) {
    const { data, error } = await db
      .from('empresas')
      .select('*')
      .eq('email', email)
      .eq('senha', senha)
      .single();
    if (error) return null;
    return data;
  },

  async getEmpresas() {
    const { data, error } = await db
      .from('empresas')
      .select('*');
    if (error) return [];
    return data;
  }
};

window.Database = Database;

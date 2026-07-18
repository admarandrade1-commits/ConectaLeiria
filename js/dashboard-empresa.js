document.addEventListener('DOMContentLoaded', async () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'empresa') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '🏢 ' + user.nome;
  document.getElementById('boasVindas').textContent = 'Olá, ' + user.nome + '! 🏢';
  document.getElementById('tipoNegocio').textContent = user.tipo_negocio || '—';
  document.getElementById('concelhoEmpresa').textContent = user.concelho || '—';

  // Carregar candidaturas recebidas às vagas
  try {
    const { data: candidaturas, error } = await window.db
      .from('candidaturas')
      .select('id, estado, created_at, candidatos(nome), vagas(titulo)')
      .eq('empresa_id', user.id)
      .not('vaga_id', 'is', null)
      .order('id', { ascending: false });

    const listaCV = document.getElementById('listaCandidaturasVaga');
    if (error) throw error;
    if (!candidaturas || candidaturas.length === 0) {
      listaCV.innerHTML = '<div class="resumo-vazio"><div style="font-size:3rem;margin-bottom:1rem">📩</div><h3>Ainda não há candidaturas às tuas vagas</h3><p>Assim que alguém se candidatar, aparece aqui.</p></div>';
    } else {
      listaCV.innerHTML = candidaturas.map(c => {
        const nome = c.candidatos ? c.candidatos.nome : 'Candidato';
        const vaga = c.vagas ? c.vagas.titulo : 'Vaga';
        const iniciais = nome.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
        const data_fmt = c.created_at ? new Date(c.created_at).toLocaleDateString('pt-PT') : '';
        return `<div class="candidato-lista-item">
          <div class="candidato-lista-avatar">${iniciais}</div>
          <div class="candidato-lista-info">
            <div class="candidato-lista-nome">${nome}</div>
            <div class="candidato-lista-detalhe">Candidatou-se a "${vaga}" · ${data_fmt}</div>
          </div>
          <span class="tag verde">Nova candidatura</span>
        </div>`;
      }).join('');
    }
  } catch(e) { console.error('Erro ao carregar candidaturas:', e); }

  // Carregar candidatos do Supabase
  try {
    const { data, error } = await window.db.from('candidatos').select('*');
    const candidatos = (!error && data && data.length > 0) ? data : DB.getCandidatos();
    document.getElementById('numCandidatos').textContent = candidatos.length;
    const lista = document.getElementById('listaCandidatos');
    if (candidatos.length === 0) return;
    lista.innerHTML = candidatos.slice(0, 5).map(c => {
      const cv = JSON.parse(localStorage.getItem('cl_cv_' + c.id) || '{}');
      const iniciais = c.nome.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
      return `<div class="candidato-lista-item">
        <div class="candidato-lista-avatar">${iniciais}</div>
        <div class="candidato-lista-info">
          <div class="candidato-lista-nome">${c.nome}</div>
          <div class="candidato-lista-detalhe">${cv.funcao || c.area || 'Sem área definida'} · ${c.concelho || '—'}</div>
        </div>
        <span class="tag verde">${cv.area || c.area || '—'}</span>
      </div>`;
    }).join('');
  } catch(e) {}
});

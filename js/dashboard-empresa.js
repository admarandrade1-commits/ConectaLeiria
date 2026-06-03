document.addEventListener('DOMContentLoaded', async () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'empresa') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '🏢 ' + user.nome;
  document.getElementById('boasVindas').textContent = 'Olá, ' + user.nome + '! 🏢';
  document.getElementById('tipoNegocio').textContent = user.tipo_negocio || '—';
  document.getElementById('concelhoEmpresa').textContent = user.concelho || '—';
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

document.addEventListener('DOMContentLoaded', async () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'candidato') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '👤 ' + user.nome.split(' ')[0];
  document.getElementById('boasVindas').textContent = 'Olá, ' + user.nome.split(' ')[0] + '! 👋';
  document.getElementById('concelhoUser').textContent = user.concelho || '—';
  document.getElementById('areaUser').textContent = user.area || '—';
  document.getElementById('numEmpresas').textContent = DB.getEmpresas().length;
  const cv = JSON.parse(localStorage.getItem('cl_cv_' + user.id) || '{}');
  carregarNotificacoes(user);

  // Verificar se há interesse de alguma empresa no Supabase
  try {
    const { data } = await window.db.from('candidaturas').select('estado, empresas(nome)').eq('id_da_caminha', user.id).order('created_at', { ascending: false });
    if (data && data.length > 0) {
      const melhor = data[0];
      const cores = { interesse: '#c9a84c', contactar: '#1a6b3c' };
      const textos = { interesse: '⭐ Uma empresa tem interesse em ti!', contactar: '📞 Uma empresa quer contactar-te!' };
      const estadoDiv = document.createElement('div');
      estadoDiv.style.cssText = 'background:white;border-radius:16px;padding:1.2rem 1.5rem;margin-bottom:1.5rem;box-shadow:0 4px 24px rgba(26,107,60,.08);display:flex;align-items:center;gap:1rem;border-left:4px solid ' + (cores[melhor.estado] || '#999') + ';';
      estadoDiv.innerHTML = '<div style="font-size:1.5rem;">' + (melhor.estado === 'interesse' ? '⭐' : '📞') + '</div><div><div style="font-weight:700;color:#1a1a2e;">' + (textos[melhor.estado] || '⏳ À espera de ser visto') + '</div><div style="font-size:.82rem;color:#666;margin-top:2px;">Empresa: ' + (melhor.empresas?.nome || '—') + '</div></div>';
      const dashMain = document.querySelector('.dash-main');
      const dashCards = document.querySelector('.dash-cards');
      if (dashCards) dashMain.insertBefore(estadoDiv, dashCards);
    }
  } catch(e) { console.log('Erro estado:', e); }
  
  // Mostrar estado da candidatura
  const estado = Candidaturas.getEstado(user.id);
  const estadoDiv = document.createElement('div');
  estadoDiv.style.cssText = 'background:white;border-radius:16px;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 4px 24px rgba(26,107,60,.08);display:flex;align-items:center;gap:1rem;';
  estadoDiv.innerHTML = `
    <div style="width:52px;height:52px;border-radius:50%;background:${estado.cor}20;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">${estado.texto.split(' ')[0]}</div>
    <div>
      <div style="font-weight:700;color:#1a1a2e;font-size:1rem;">${estado.texto}</div>
      <div style="font-size:0.82rem;color:#666;margin-top:2px;">Estado do teu currículo na plataforma</div>
    </div>
  `;
  document.querySelector('.dash-main').insertBefore(estadoDiv, document.querySelector('.dash-cards'));
  if (cv.nome) {
    document.getElementById('statusCurriculo').textContent = 'Completo ✅';
    const campos = ['nome','email','telefone','concelho','sobre','area','funcao','escolaridade','experiencia','competencias'];
    let preenchidos = campos.filter(c => cv[c] && cv[c].trim()).length;
    const pct = Math.round((preenchidos / campos.length) * 100);
    document.getElementById('resumoCurriculo').innerHTML = `
      <div class="cv-resumo-grid">
        <div class="cv-resumo-item"><div class="cv-resumo-label">Nome</div><div class="cv-resumo-valor">${cv.nome || '—'}</div></div>
        <div class="cv-resumo-item"><div class="cv-resumo-label">Função Desejada</div><div class="cv-resumo-valor">${cv.funcao || '—'}</div></div>
        <div class="cv-resumo-item"><div class="cv-resumo-label">Área</div><div class="cv-resumo-valor">${cv.area || '—'}</div></div>
        <div class="cv-resumo-item"><div class="cv-resumo-label">Concelho</div><div class="cv-resumo-valor">${cv.concelho || '—'}</div></div>
        <div class="cv-resumo-item"><div class="cv-resumo-label">Escolaridade</div><div class="cv-resumo-valor">${cv.escolaridade || '—'}</div></div>
        <div class="cv-resumo-item"><div class="cv-resumo-label">Experiência</div><div class="cv-resumo-valor">${cv.experiencia || '—'}</div></div>
        <div class="cv-resumo-item"><div class="cv-resumo-label">Disponibilidade</div><div class="cv-resumo-valor">${cv.disponibilidade || '—'}</div></div>
        <div class="cv-resumo-item"><div class="cv-resumo-label">Perfil completo</div><div class="cv-resumo-valor" style="color:var(--verde-escuro)">${pct}%</div></div>
      </div>
      <div style="margin-top:1.2rem"><a href="curriculo.html" class="btn btn-secundario">✏️ Editar Currículo</a></div>`;
  }
});


async function carregarNotificacoes(user) {
  try {
    const { data } = await window.db
      .from('candidaturas')
      .select('estado, criado_em, empresas(nome)')
      .eq('id_da_caminha', user.id)
      .order('criado_em', { ascending: false });

    if (!data || data.length === 0) return;

    // Atualizar badge
    const badge = document.getElementById('sinoBadge');
    const lista = document.getElementById('notifLista');
    if (badge) {
      badge.textContent = data.length;
      badge.style.display = 'flex';
    }

    // Preencher lista
    if (lista) {
      lista.innerHTML = data.map(n => {
        const emoji = n.estado === 'interesse' ? '⭐' : '📞';
        const texto = n.estado === 'interesse' ? 'tem interesse no teu perfil!' : 'quer contactar-te!';
        const data_fmt = new Date(n.criado_em).toLocaleDateString('pt-PT');
        return `<div style="padding:1rem 1.2rem;border-bottom:1px solid #f9f9f9;display:flex;gap:.8rem;align-items:flex-start;">
          <span style="font-size:1.3rem;">${emoji}</span>
          <div>
            <div style="font-weight:600;color:#1a1a2e;font-size:.9rem;">${n.empresas?.nome || 'Empresa'} ${texto}</div>
            <div style="font-size:.78rem;color:#999;margin-top:2px;">${data_fmt}</div>
          </div>
        </div>`;
      }).join('');
    }
  } catch(e) { console.log('Erro notificações:', e); }
}

function toggleNotificacoes() {
  const panel = document.getElementById('notifPanel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}
window.toggleNotificacoes = toggleNotificacoes;

// Fechar ao clicar fora
document.addEventListener('click', (e) => {
  const panel = document.getElementById('notifPanel');
  const btn = document.getElementById('sinoBTN');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.style.display = 'none';
  }
});

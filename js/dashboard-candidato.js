document.addEventListener('DOMContentLoaded', async () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'candidato') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '👤 ' + user.nome.split(' ')[0];
  document.getElementById('boasVindas').textContent = 'Olá, ' + user.nome.split(' ')[0] + '! 👋';
  document.getElementById('concelhoUser').textContent = user.concelho || '—';
  document.getElementById('areaUser').textContent = user.area || '—';
  try {
    const { data: empresas } = await window.db.from('empresas').select('id');
    document.getElementById('numEmpresas').textContent = empresas ? empresas.length : '—';
  } catch(e) { document.getElementById('numEmpresas').textContent = '—'; }
  const cv = JSON.parse(localStorage.getItem('cl_cv_' + user.id) || '{}');
  carregarNotificacoes(user);


  

  if (cv.nome) {
    document.getElementById('statusCurriculo').textContent = 'Completo ✅';
  }
});


async function carregarNotificacoes(user) {
  try {
    const { data } = await window.db
      .from('candidaturas')
      .select('id, estado, empresa_id, created_at, lida')
      .eq('candidato_id', user.id)
      .order('id', { ascending: false });

    if (!data || data.length === 0) return;

    // Atualizar badge
    const badge = document.getElementById('sinoBadge');
    const lista = document.getElementById('notifLista');
    const naoLidas = data.filter(n => !n.lida).length;
    if (badge) {
      badge.textContent = naoLidas;
      badge.style.display = 'flex';
      badge.style.position = 'absolute';
      badge.style.top = '-4px';
      badge.style.right = '-4px';
      badge.style.background = '#e74c3c';
      badge.style.color = 'white';
      badge.style.borderRadius = '50%';
      badge.style.width = '18px';
      badge.style.height = '18px';
      badge.style.fontSize = '.7rem';
      badge.style.fontWeight = '700';
      badge.style.alignItems = 'center';
      badge.style.justifyContent = 'center';
    }

    // Preencher lista
    if (lista) {
      // Adicionar botão limpar
      const btnLimpar = document.getElementById('btnLimparNotif');
      if (btnLimpar) {
        btnLimpar.style.display = 'block';
        btnLimpar.onclick = async () => {
          await window.db.from('candidaturas').update({ lida: true }).eq('candidato_id', user.id);
          lista.innerHTML = '<p style="padding:1rem;color:#999;text-align:center;">Sem notificações.</p>';
          if (badge) badge.style.display = 'none';
          if (btnLimpar) btnLimpar.style.display = 'none';
        };
      }
      lista.innerHTML = data.map(n => {
        const emoji = n.estado === 'interesse' ? '⭐' : '📞';
        const texto = n.estado === 'interesse' ? 'tem interesse no teu perfil!' : 'quer contactar-te!';
        const agora = new Date();
        const criado = n.created_at ? new Date(n.created_at) : agora;
        const diff = Math.floor((agora - criado) / 1000);
        let data_fmt;
        if (diff < 60) data_fmt = 'Agora';
        else if (diff < 3600) data_fmt = Math.floor(diff/60) + ' min atrás';
        else if (diff < 86400) data_fmt = Math.floor(diff/3600) + 'h atrás';
        else data_fmt = Math.floor(diff/86400) + ' dia(s) atrás';
        return `<div style="padding:1rem 1.2rem;border-bottom:1px solid #f9f9f9;display:flex;gap:.8rem;align-items:flex-start;">
          <span style="font-size:1.3rem;">${emoji}</span>
          <div>
            <div style="font-weight:600;color:#1a1a2e;font-size:.9rem;">'Uma empresa' ${texto}</div>
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

async function limparNotificacoes() {
  const user = DB.getUtilizador();
  if (!user) return;
  await window.db.from('candidaturas').update({ lida: true }).eq('candidato_id', user.id);
  const lista = document.getElementById('notifLista');
  const badge = document.getElementById('sinoBadge');
  const btn = document.getElementById('btnLimparNotif');
  if (lista) lista.innerHTML = '<p style="padding:1rem;color:#999;text-align:center;font-size:.9rem;">Sem notificações.</p>';
  if (badge) badge.style.display = 'none';
  if (btn) btn.style.display = 'none';
}
window.limparNotificacoes = limparNotificacoes;

// Fechar ao clicar fora
document.addEventListener('click', (e) => {
  const panel = document.getElementById('notifPanel');
  const btn = document.getElementById('sinoBTN');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.style.display = 'none';
  }
});

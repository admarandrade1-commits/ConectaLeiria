document.addEventListener('DOMContentLoaded', async () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'candidato') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '👤 ' + user.nome.split(' ')[0];
  document.getElementById('boasVindas').textContent = 'Olá, ' + user.nome.split(' ')[0] + '! 👋';
  document.getElementById('concelhoUser').textContent = user.concelho || '—';
  document.getElementById('areaUser').textContent = user.area || '—';
  document.getElementById('numEmpresas').textContent = '4';
  const cv = JSON.parse(localStorage.getItem('cl_cv_' + user.id) || '{}');
  carregarNotificacoes(user);

  // Verificar se há interesse de alguma empresa no Supabase
  try {
    const { data } = await window.db.from('candidaturas').select('estado, empresas(nome)').eq('id_da_caminha', user.id).order('created_at', { ascending: false });
  } catch(e) { console.log('Erro estado:', e); }
  

  if (cv.nome) {
    document.getElementById('statusCurriculo').textContent = 'Completo ✅';
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

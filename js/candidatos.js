let todosCandidatos = [];

document.addEventListener('DOMContentLoaded', async () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'empresa') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '🏢 ' + user.nome;
  
  // Carregar candidatos do Supabase
  try {
    const { data, error } = await window.db.from('candidatos').select('*');
    if (!error && data && data.length > 0) {
      todosCandidatos = data;
    } else {
      todosCandidatos = DB.getCandidatos();
    }
  } catch(e) {
    todosCandidatos = DB.getCandidatos();
  }
  
  renderCandidatos(todosCandidatos);
});

function renderCandidatos(lista) {
  const grid = document.getElementById('gridCandidatos');
  document.getElementById('totalCandidatos').textContent = lista.length;
  if (lista.length === 0) {
    grid.innerHTML = `<div class="resumo-vazio" style="grid-column:1/-1"><div style="font-size:3rem;margin-bottom:1rem">🔍</div><h3>Nenhum candidato encontrado</h3><p>Tenta mudar os filtros.</p></div>`;
    return;
  }
  grid.innerHTML = lista.map(c => {
    const cv = JSON.parse(localStorage.getItem('cl_cv_' + c.id) || '{}');
    const iniciais = c.nome.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    return `<div class="candidato-card" onclick="verCurriculo(${c.id})">
      <div class="candidato-avatar">${iniciais}</div>
      <div class="candidato-nome">${c.nome}</div>
      <div class="candidato-funcao">${cv.funcao || 'Função não definida'}</div>
      <div class="candidato-tags">
        <span class="candidato-tag verde">${cv.area || c.area || '—'}</span>
        <span class="candidato-tag">📍 ${cv.concelho || c.concelho || '—'}</span>
        <span class="candidato-tag">💼 ${cv.experiencia || 'Não indicada'}</span>
      </div>
      <button class="candidato-btn" onclick="verCurriculo(${c.id})">Ver Currículo Completo →</button>
      <div class="candidato-acoes">
        <button class="btn-interesse" onclick="marcarInteresse(${c.id}, 'interesse', this)">⭐ Tenho Interesse</button>
        <button class="btn-contactar" onclick="marcarInteresse(${c.id}, 'contactar', this)">📞 Contactar</button>
      </div>
    </div>`;
  }).join('');
}

function filtrarCandidatos() {
  const area = document.getElementById('filtroArea').value;
  const concelho = document.getElementById('filtroConcelho').value;
  const experiencia = document.getElementById('filtroExperiencia').value;
  const filtrados = todosCandidatos.filter(c => {
    const cv = JSON.parse(localStorage.getItem('cl_cv_' + c.id) || '{}');
    if (area && (cv.area || c.area || '') !== area) return false;
    if (concelho && (cv.concelho || c.concelho || '') !== concelho) return false;
    if (experiencia && (cv.experiencia || '') !== experiencia) return false;
    return true;
  });
  renderCandidatos(filtrados);
}

function limparFiltros() {
  document.getElementById('filtroArea').value = '';
  document.getElementById('filtroConcelho').value = '';
  document.getElementById('filtroExperiencia').value = '';
  renderCandidatos(todosCandidatos);
}

function verCurriculo(id) {
  const c = todosCandidatos.find(x => x.id === id);
  const cv = JSON.parse(localStorage.getItem('cl_cv_' + id) || '{}');
  document.getElementById('modalConteudo').innerHTML = `
    <div class="modal-cv-nome">${cv.nome || c.nome}</div>
    <div class="modal-cv-funcao">🎯 ${cv.funcao || 'Função não definida'}</div>
    <div class="modal-cv-secao"><div class="modal-cv-secao-titulo">Dados Pessoais</div>
      <div class="modal-cv-linha"><strong>Email:</strong><span>${c.email}</span></div>
      <div class="modal-cv-linha"><strong>Telefone:</strong><span>${cv.telefone || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Concelho:</strong><span>${cv.concelho || c.concelho || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Carta:</strong><span>${cv.carta || '—'}</span></div>
    </div>
    ${cv.sobre ? `<div class="modal-cv-secao"><div class="modal-cv-secao-titulo">Sobre</div><p style="font-size:.9rem;color:#555;line-height:1.6">${cv.sobre}</p></div>` : ''}
    <div class="modal-cv-secao"><div class="modal-cv-secao-titulo">Área e Disponibilidade</div>
      <div class="modal-cv-linha"><strong>Área:</strong><span>${cv.area || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Contrato:</strong><span>${cv.contrato || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Disponibilidade:</strong><span>${cv.disponibilidade || '—'}</span></div>
    </div>
    <div class="modal-cv-secao"><div class="modal-cv-secao-titulo">Escolaridade</div>
      <div class="modal-cv-linha"><strong>Nível:</strong><span>${cv.escolaridade || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Curso:</strong><span>${cv.curso || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Escola:</strong><span>${cv.escola || '—'}</span></div>
    </div>
    <div class="modal-cv-secao"><div class="modal-cv-secao-titulo">Experiência</div>
      <div class="modal-cv-linha"><strong>Empresa:</strong><span>${cv.empresa_ant || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Função:</strong><span>${cv.funcao_ant || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Total:</strong><span>${cv.experiencia || '—'}</span></div>
    </div>
    <div class="modal-cv-secao"><div class="modal-cv-secao-titulo">Competências</div>
      <div class="modal-cv-linha"><strong>Competências:</strong><span>${cv.competencias || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Línguas:</strong><span>${cv.linguas || '—'}</span></div>
      <div class="modal-cv-linha"><strong>Informática:</strong><span>${cv.informatica || '—'}</span></div>
    </div>
    <div style="margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap">
      <a href="mailto:${c.email}" class="btn btn-primario">📧 Enviar Email</a>
      ${cv.telefone ? `<a href="tel:${cv.telefone}" class="btn btn-secundario">📞 Ligar</a>` : ''}
    </div>`;
  document.getElementById('modalCurriculo').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('modalCurriculo').style.display = 'none';
  document.body.style.overflow = '';
}

window.fecharModal = fecharModal;
window.verCurriculo = verCurriculo;
window.filtrarCandidatos = filtrarCandidatos;
window.limparFiltros = limparFiltros;

document.getElementById('modalCurriculo').addEventListener('click', function(e) {
  if (e.target === this) fecharModal();
});

async function marcarInteresse(candidato_id, estado, btn) {
  const user = DB.getUtilizador();
  if (!user) return;

  // Guardar no Supabase
  try {
    const { data: existing } = await window.db.from('candidaturas').select('id').eq('empresa_id', user.id).eq('candidato_id', candidato_id).maybeSingle();
    if (existing) {
      await window.db.from('candidaturas').update({ estado }).eq('id', existing.id);
    } else {
      await window.db.from('candidaturas').insert([{ empresa_id: user.id, candidato_id, estado }]);
    }
  } catch(e) { console.log('Erro:', e); }

  const acoes = btn.parentElement;
  acoes.innerHTML = estado === 'interesse'
    ? '<span style="color:#c9a84c;font-weight:700;font-size:.85rem;">⭐ Interesse marcado!</span>'
    : '<span style="color:#1a6b3c;font-weight:700;font-size:.85rem;">📞 Candidato será contactado!</span>';
  mostrarToast(estado === 'interesse' ? '⭐ Interesse marcado!' : '📞 Candidato será contactado!');
}
window.marcarInteresse = marcarInteresse;

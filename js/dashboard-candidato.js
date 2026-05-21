document.addEventListener('DOMContentLoaded', () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'candidato') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '👤 ' + user.nome.split(' ')[0];
  document.getElementById('boasVindas').textContent = 'Olá, ' + user.nome.split(' ')[0] + '! 👋';
  document.getElementById('concelhoUser').textContent = user.concelho || '—';
  document.getElementById('areaUser').textContent = user.area || '—';
  document.getElementById('numEmpresas').textContent = DB.getEmpresas().length;
  const cv = JSON.parse(localStorage.getItem('cl_cv_' + user.id) || '{}');
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

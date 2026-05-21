document.addEventListener('DOMContentLoaded', () => {
  const user = DB.getUtilizador();
  if (!user || user.tipo !== 'candidato') { window.location.href = 'login.html'; return; }
  document.getElementById('nomeUtilizador').textContent = '👤 ' + user.nome.split(' ')[0];
  const cv = JSON.parse(localStorage.getItem('cl_cv_' + user.id) || '{}');
  const campos = ['nome','nascimento','telefone','email','concelho','carta','sobre','area','funcao','contrato','disponibilidade','escolaridade','curso','escola','ano','empresa_ant','funcao_ant','periodo','experiencia','desc_exp','competencias','linguas','informatica','certificados'];
  campos.forEach(c => { const el = document.getElementById('cv_' + c); if (el && cv[c]) el.value = cv[c]; });
  if (!cv.nome && user.nome) document.getElementById('cv_nome').value = user.nome;
  if (!cv.email && user.email) document.getElementById('cv_email').value = user.email;
  if (!cv.telefone && user.telefone) document.getElementById('cv_telefone').value = user.telefone;
  if (!cv.concelho && user.concelho) document.getElementById('cv_concelho').value = user.concelho;
  if (!cv.area && user.area) document.getElementById('cv_area').value = user.area;
  atualizarProgresso();
  document.querySelectorAll('input, select, textarea').forEach(el => { el.addEventListener('input', atualizarProgresso); el.addEventListener('change', atualizarProgresso); });
});

function atualizarProgresso() {
  const campos = ['cv_nome','cv_email','cv_telefone','cv_concelho','cv_sobre','cv_area','cv_funcao','cv_escolaridade','cv_experiencia','cv_competencias'];
  let preenchidos = 0;
  campos.forEach(id => { const el = document.getElementById(id); if (el && el.value.trim() !== '') preenchidos++; });
  const pct = Math.round((preenchidos / campos.length) * 100);
  document.getElementById('progressoFill').style.width = pct + '%';
  document.getElementById('progressoPercent').textContent = pct + '%';
}

document.getElementById('formCurriculo').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = DB.getUtilizador();
  const cv = {
    nome: document.getElementById('cv_nome').value,
    nascimento: document.getElementById('cv_nascimento').value,
    telefone: document.getElementById('cv_telefone').value,
    email: document.getElementById('cv_email').value,
    concelho: document.getElementById('cv_concelho').value,
    carta: document.getElementById('cv_carta').value,
    sobre: document.getElementById('cv_sobre').value,
    area: document.getElementById('cv_area').value,
    funcao: document.getElementById('cv_funcao').value,
    contrato: document.getElementById('cv_contrato').value,
    disponibilidade: document.getElementById('cv_disponibilidade').value,
    escolaridade: document.getElementById('cv_escolaridade').value,
    curso: document.getElementById('cv_curso').value,
    escola: document.getElementById('cv_escola').value,
    ano: document.getElementById('cv_ano').value,
    empresa_ant: document.getElementById('cv_empresa_ant').value,
    funcao_ant: document.getElementById('cv_funcao_ant').value,
    periodo: document.getElementById('cv_periodo').value,
    experiencia: document.getElementById('cv_experiencia').value,
    desc_exp: document.getElementById('cv_desc_exp').value,
    competencias: document.getElementById('cv_competencias').value,
    linguas: document.getElementById('cv_linguas').value,
    informatica: document.getElementById('cv_informatica').value,
    certificados: document.getElementById('cv_certificados').value,
    atualizado: new Date().toISOString()
  };
  localStorage.setItem('cl_cv_' + user.id, JSON.stringify(cv));
  const candidatos = DB.getCandidatos();
  const idx = candidatos.findIndex(c => c.id === user.id);
  if (idx !== -1) { candidatos[idx].cv = cv; localStorage.setItem('cl_candidatos', JSON.stringify(candidatos)); }
  mostrarToast('Currículo guardado com sucesso! 💾');
  atualizarProgresso();
});

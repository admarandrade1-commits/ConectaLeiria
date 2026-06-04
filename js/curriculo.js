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

document.getElementById('formCurriculo').addEventListener('submit', async function(e) {
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
  
  // Guardar no Supabase
  try {
    if (window.db) {
      const { data: existing } = await window.db.from('curriculos').select('id').eq('id_da_caminha', user.id).single();
      if (existing) {
        await window.db.from('curriculos').update({...cv, updated_at: new Date().toISOString()}).eq('id_da_caminha', user.id);
      } else {
        await window.db.from('curriculos').insert([{id_da_caminha: user.id, ...cv}]);
      }
    }
  } catch(e) { console.log('Supabase erro:', e); }

  mostrarToast('Currículo guardado com sucesso! 💾');
  atualizarProgresso();
});

// FOTO DE PERFIL
const fotoInput = document.getElementById('fotoInput');
if (fotoInput) {
  // Carregar foto guardada
  const user = DB.getUtilizador();
  if (user) {
    const fotoGuardada = localStorage.getItem('cl_foto_' + user.id);
    if (fotoGuardada) {
      document.getElementById('fotoEmoji').style.display = 'none';
      const img = document.createElement('img');
      img.src = fotoGuardada;
      document.getElementById('fotoPreview').appendChild(img);
    }
  }

  // Quando escolhe foto
  fotoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      mostrarToast('A foto é muito grande! Máximo 2MB.', 'erro');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('fotoPreview');
      document.getElementById('fotoEmoji').style.display = 'none';
      
      // Remover img anterior
      const imgAnterior = preview.querySelector('img');
      if (imgAnterior) imgAnterior.remove();

      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);

      // Guardar no localStorage
      const user = DB.getUtilizador();
      if (user) {
        localStorage.setItem('cl_foto_' + user.id, e.target.result);
        mostrarToast('Foto atualizada com sucesso! 📸');
      }
    };
    reader.readAsDataURL(file);
  });
}

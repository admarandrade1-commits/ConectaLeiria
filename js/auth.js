// ============================================
//   CONECTALEIRIA — JavaScript de Auth
// ============================================

// Mostrar/Esconder senha
function toggleSenha(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}
window.toggleSenha = toggleSenha;

// Validar email
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mostrar erro num campo
function mostrarErro(id, msg) {
  const el = document.getElementById('erro-' + id);
  if (el) el.textContent = msg;
  const input = document.getElementById(id);
  if (input) input.classList.add('invalido');
}

// Limpar erro
function limparErro(id) {
  const el = document.getElementById('erro-' + id);
  if (el) el.textContent = '';
  const input = document.getElementById(id);
  if (input) { input.classList.remove('invalido'); input.classList.add('valido'); }
}

// ── REGISTO DE CANDIDATO ──
const formRegisto = document.getElementById('formRegisto');
if (formRegisto) {
  formRegisto.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;

    const nome     = document.getElementById('nome').value.trim();
    const email    = document.getElementById('email').value.trim();
    const senha    = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar').value;
    const termos   = document.getElementById('termos').checked;

    // Validações
    if (nome.length < 3) {
      mostrarErro('nome', 'O nome deve ter pelo menos 3 caracteres.'); valido = false;
    } else limparErro('nome');

    if (!validarEmail(email)) {
      mostrarErro('email', 'Insere um email válido.'); valido = false;
    } else limparErro('email');

    if (senha.length < 6) {
      mostrarErro('senha', 'A senha deve ter pelo menos 6 caracteres.'); valido = false;
    } else limparErro('senha');

    if (senha !== confirmar) {
      mostrarErro('confirmar', 'As senhas não coincidem.'); valido = false;
    } else if (confirmar.length >= 6) limparErro('confirmar');

    if (!termos) {
      mostrarErro('termos', 'Tens de aceitar os termos para continuar.'); valido = false;
    } else limparErro('termos');

    // Verificar se email já existe
    const candidatos = DB.getCandidatos();
    if (candidatos.find(c => c.email === email)) {
      mostrarErro('email', 'Este email já está registado.'); valido = false;
    }

    if (!valido) return;

    // Guardar candidato
    const dados = {
      nome,
      email,
      senha,
      telefone: document.getElementById('telefone').value,
      concelho: document.getElementById('concelho').value,
      area: document.getElementById('area').value,
    };

    DB.addCandidato(dados);
    localStorage.setItem('cl_utilizador', JSON.stringify({ ...dados, tipo: 'candidato' }));

    mostrarToast('Conta criada com sucesso! Bem-vindo ao ConectaLeiria 🎉');
    setTimeout(() => { window.location.href = 'curriculo.html'; }, 1500);
  });
}

// ── LOGIN DE CANDIDATO ──
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!validarEmail(email)) {
      mostrarErro('email', 'Insere um email válido.'); valido = false;
    } else limparErro('email');

    if (senha.length < 1) {
      mostrarErro('senha', 'Insere a tua senha.'); valido = false;
    } else limparErro('senha');

    if (!valido) return;

    const user = DB.login(email, senha, 'candidato');
    if (!user) {
      mostrarErro('email', 'Email ou senha incorretos.');
      mostrarErro('senha', ' ');
      return;
    }

    mostrarToast('Bem-vindo de volta, ' + user.nome.split(' ')[0] + '! 👋');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
}

// ── REGISTO DE EMPRESA ──
const formRegistoEmpresa = document.getElementById('formRegistoEmpresa');
if (formRegistoEmpresa) {
  formRegistoEmpresa.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;

    const nome  = document.getElementById('nomeEmpresa').value.trim();
    const email = document.getElementById('emailEmpresa').value.trim();
    const senha = document.getElementById('senhaEmpresa').value;
    const confirmar = document.getElementById('confirmarEmpresa').value;
    const termos = document.getElementById('termosEmpresa').checked;

    if (nome.length < 2) {
      mostrarErro('nomeEmpresa', 'Insere o nome da empresa.'); valido = false;
    } else limparErro('nomeEmpresa');

    if (!validarEmail(email)) {
      mostrarErro('emailEmpresa', 'Insere um email válido.'); valido = false;
    } else limparErro('emailEmpresa');

    if (senha.length < 6) {
      mostrarErro('senhaEmpresa', 'A senha deve ter pelo menos 6 caracteres.'); valido = false;
    } else limparErro('senhaEmpresa');

    if (senha !== confirmar) {
      mostrarErro('confirmarEmpresa', 'As senhas não coincidem.'); valido = false;
    }

    if (!termos) {
      mostrarErro('termosEmpresa', 'Tens de aceitar os termos.'); valido = false;
    }

    const empresas = DB.getEmpresas();
    if (empresas.find(c => c.email === email)) {
      mostrarErro('emailEmpresa', 'Este email já está registado.'); valido = false;
    }

    if (!valido) return;

    const dados = {
      nome,
      email,
      senha,
      tipo_negocio: document.getElementById('tipoEmpresa').value,
      concelho: document.getElementById('concelhoEmpresa').value,
      morada: document.getElementById('morada').value,
      telefone: document.getElementById('telefoneEmpresa').value,
    };

    DB.addEmpresa(dados);
    localStorage.setItem('cl_utilizador', JSON.stringify({ ...dados, tipo: 'empresa' }));

    mostrarToast('Empresa registada com sucesso! 🏢');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
}

// ── LOGIN DE EMPRESA ──
const formLoginEmpresa = document.getElementById('formLoginEmpresa');
if (formLoginEmpresa) {
  formLoginEmpresa.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!validarEmail(email)) {
      mostrarErro('email', 'Insere um email válido.'); valido = false;
    } else limparErro('email');

    if (senha.length < 1) {
      mostrarErro('senha', 'Insere a tua senha.'); valido = false;
    } else limparErro('senha');

    if (!valido) return;

    const user = DB.login(email, senha, 'empresa');
    if (!user) {
      mostrarErro('email', 'Email ou senha incorretos.');
      return;
    }

    mostrarToast('Bem-vindo de volta, ' + user.nome + '! 🏢');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
}
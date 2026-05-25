// CONECTALEIRIA — Auth com Supabase

function toggleSenha(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}
window.toggleSenha = toggleSenha;

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mostrarErro(id, msg) {
  const el = document.getElementById('erro-' + id);
  if (el) el.textContent = msg;
  const input = document.getElementById(id);
  if (input) input.classList.add('invalido');
}

function limparErro(id) {
  const el = document.getElementById('erro-' + id);
  if (el) el.textContent = '';
  const input = document.getElementById(id);
  if (input) { input.classList.remove('invalido'); input.classList.add('valido'); }
}

// REGISTO CANDIDATO
const formRegisto = document.getElementById('formRegisto');
if (formRegisto) {
  formRegisto.addEventListener('submit', async function(e) {
    e.preventDefault();
    let valido = true;

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar').value;
    const termos = document.getElementById('termos').checked;

    if (nome.length < 3) { mostrarErro('nome', 'O nome deve ter pelo menos 3 caracteres.'); valido = false; } else limparErro('nome');
    if (!validarEmail(email)) { mostrarErro('email', 'Insere um email válido.'); valido = false; } else limparErro('email');
    if (senha.length < 6) { mostrarErro('senha', 'A senha deve ter pelo menos 6 caracteres.'); valido = false; } else limparErro('senha');
    if (senha !== confirmar) { mostrarErro('confirmar', 'As senhas não coincidem.'); valido = false; } else limparErro('confirmar');
    if (!termos) { mostrarErro('termos', 'Tens de aceitar os termos.'); valido = false; }
    if (!valido) return;

    const btn = formRegisto.querySelector('button[type="submit"]');
    btn.textContent = 'A criar conta...';
    btn.disabled = true;

    try {
      const dados = {
        nome, email, senha,
        telefone: document.getElementById('telefone').value,
        concelho: document.getElementById('concelho').value,
        area: document.getElementById('area').value,
      };

      const user = await Database.registarCandidato(dados);
      localStorage.setItem('cl_utilizador', JSON.stringify({ ...user, tipo: 'candidato' }));
      mostrarToast('Conta criada com sucesso! Bem-vindo ao ConectaLeiria 🎉');
      setTimeout(() => { window.location.href = 'curriculo.html'; }, 1500);
    } catch(err) {
      if (err.message && err.message.includes('duplicate')) {
        mostrarErro('email', 'Este email já está registado.');
      } else {
        mostrarErro('email', 'Erro ao criar conta. Tenta novamente.');
      }
      btn.textContent = 'Criar Conta Grátis 🚀';
      btn.disabled = false;
    }
  });
}

// LOGIN CANDIDATO
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', async function(e) {
    e.preventDefault();
    let valido = true;

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!validarEmail(email)) { mostrarErro('email', 'Insere um email válido.'); valido = false; } else limparErro('email');
    if (senha.length < 1) { mostrarErro('senha', 'Insere a tua senha.'); valido = false; } else limparErro('senha');
    if (!valido) return;

    const btn = formLogin.querySelector('button[type="submit"]');
    btn.textContent = 'A entrar...';
    btn.disabled = true;

    const user = await Database.loginCandidato(email, senha);
    if (!user) {
      mostrarErro('email', 'Email ou senha incorretos.');
      btn.textContent = 'Entrar na minha conta →';
      btn.disabled = false;
      return;
    }

    localStorage.setItem('cl_utilizador', JSON.stringify({ ...user, tipo: 'candidato' }));
    mostrarToast('Bem-vindo de volta, ' + user.nome.split(' ')[0] + '! 👋');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
}

// REGISTO EMPRESA
const formRegistoEmpresa = document.getElementById('formRegistoEmpresa');
if (formRegistoEmpresa) {
  formRegistoEmpresa.addEventListener('submit', async function(e) {
    e.preventDefault();
    let valido = true;

    const nome = document.getElementById('nomeEmpresa').value.trim();
    const email = document.getElementById('emailEmpresa').value.trim();
    const senha = document.getElementById('senhaEmpresa').value;
    const confirmar = document.getElementById('confirmarEmpresa').value;
    const termos = document.getElementById('termosEmpresa').checked;

    if (nome.length < 2) { mostrarErro('nomeEmpresa', 'Insere o nome da empresa.'); valido = false; } else limparErro('nomeEmpresa');
    if (!validarEmail(email)) { mostrarErro('emailEmpresa', 'Insere um email válido.'); valido = false; } else limparErro('emailEmpresa');
    if (senha.length < 6) { mostrarErro('senhaEmpresa', 'A senha deve ter pelo menos 6 caracteres.'); valido = false; } else limparErro('senhaEmpresa');
    if (senha !== confirmar) { mostrarErro('confirmarEmpresa', 'As senhas não coincidem.'); valido = false; }
    if (!termos) { mostrarErro('termosEmpresa', 'Tens de aceitar os termos.'); valido = false; }
    if (!valido) return;

    const btn = formRegistoEmpresa.querySelector('button[type="submit"]');
    btn.textContent = 'A registar...';
    btn.disabled = true;

    try {
      const dados = {
        nome, email, senha,
        tipo_negocio: document.getElementById('tipoEmpresa').value,
        concelho: document.getElementById('concelhoEmpresa').value,
        morada: document.getElementById('morada').value,
        telefone: document.getElementById('telefoneEmpresa').value,
      };

      const empresa = await Database.registarEmpresa(dados);
      localStorage.setItem('cl_utilizador', JSON.stringify({ ...empresa, tipo: 'empresa' }));
      mostrarToast('Empresa registada com sucesso! 🏢');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
    } catch(err) {
      if (err.message && err.message.includes('duplicate')) {
        mostrarErro('emailEmpresa', 'Este email já está registado.');
      } else {
        mostrarErro('emailEmpresa', 'Erro ao registar. Tenta novamente.');
      }
      btn.textContent = 'Registar Empresa 🏢';
      btn.disabled = false;
    }
  });
}

// LOGIN EMPRESA
const formLoginEmpresa = document.getElementById('formLoginEmpresa');
if (formLoginEmpresa) {
  formLoginEmpresa.addEventListener('submit', async function(e) {
    e.preventDefault();
    let valido = true;

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!validarEmail(email)) { mostrarErro('email', 'Insere um email válido.'); valido = false; } else limparErro('email');
    if (senha.length < 1) { mostrarErro('senha', 'Insere a tua senha.'); valido = false; } else limparErro('senha');
    if (!valido) return;

    const btn = formLoginEmpresa.querySelector('button[type="submit"]');
    btn.textContent = 'A entrar...';
    btn.disabled = true;

    const empresa = await Database.loginEmpresa(email, senha);
    if (!empresa) {
      mostrarErro('email', 'Email ou senha incorretos.');
      btn.textContent = 'Entrar como Empresa →';
      btn.disabled = false;
      return;
    }

    localStorage.setItem('cl_utilizador', JSON.stringify({ ...empresa, tipo: 'empresa' }));
    mostrarToast('Bem-vindo de volta, ' + empresa.nome + '! 🏢');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
}

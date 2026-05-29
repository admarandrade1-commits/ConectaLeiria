// CONECTALEIRIA — JavaScript

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (menuToggle) menuToggle.addEventListener('click', () => { mobileMenu.classList.add('aberto'); document.body.style.overflow = 'hidden'; });
if (mobileClose) mobileClose.addEventListener('click', () => { mobileMenu.classList.remove('aberto'); document.body.style.overflow = ''; });
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => { mobileMenu.classList.remove('aberto'); document.body.style.overflow = ''; }));

// Tabs Como Funciona
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    const tipo = btn.dataset.tipo;
    document.querySelectorAll('.passos-conteudo').forEach(g => {
      g.style.display = g.dataset.tipo === tipo ? 'grid' : 'none';
    });
  });
});

// Base de Dados (localStorage)
const DB = {
  getCandidatos: () => JSON.parse(localStorage.getItem('cl_candidatos') || '[]'),
  addCandidato: (dados) => { const l = DB.getCandidatos(); l.push({ id: Date.now(), ...dados }); localStorage.setItem('cl_candidatos', JSON.stringify(l)); },
  getEmpresas: () => JSON.parse(localStorage.getItem('cl_empresas') || '[]'),
  addEmpresa: (dados) => { const l = DB.getEmpresas(); l.push({ id: Date.now(), ...dados }); localStorage.setItem('cl_empresas', JSON.stringify(l)); },
  getVagas: () => JSON.parse(localStorage.getItem('cl_vagas') || '[]'),
  addVaga: (dados) => { const l = DB.getVagas(); l.push({ id: Date.now(), ...dados }); localStorage.setItem('cl_vagas', JSON.stringify(l)); },
  login: (email, senha, tipo) => {
    const tabela = tipo === 'candidato' ? DB.getCandidatos() : DB.getEmpresas();
    const user = tabela.find(u => u.email === email && u.senha === senha);
    if (user) { localStorage.setItem('cl_utilizador', JSON.stringify({ ...user, tipo })); return user; }
    return null;
  },
  logout: () => { localStorage.removeItem('cl_utilizador'); window.location.href = "/ConectaLeiria/index.html";; },
  getUtilizador: () => JSON.parse(localStorage.getItem('cl_utilizador') || 'null')
};
window.DB = DB;

// Toast de notificação
function mostrarToast(msg, tipo = 'sucesso') {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:2rem;right:2rem;z-index:9999;background:${tipo==='sucesso'?'#1a6b3c':'#c0392b'};color:white;padding:1rem 1.5rem;border-radius:12px;display:flex;align-items:center;gap:.6rem;box-shadow:0 8px 32px rgba(0,0,0,.2);font-family:'DM Sans',sans-serif;font-weight:500;transform:translateX(120%);transition:transform .4s cubic-bezier(.4,0,.2,1);`;
  t.innerHTML = `<span>${tipo==='sucesso'?'✓':'✕'}</span><span>${msg}</span>`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.style.transform = 'translateX(0)');
  setTimeout(() => { t.style.transform = 'translateX(120%)'; setTimeout(() => t.remove(), 400); }, 3500);
}
window.mostrarToast = mostrarToast;
// BOTÃO INSTALAR PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Mostrar botão
  const btn = document.getElementById('btnInstalarApp');
  if (btn) {
    btn.style.display = 'flex';
    btn.addEventListener('click', async () => {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        mostrarToast('App instalada com sucesso! 📱');
        btn.style.display = 'none';
      }
      deferredPrompt = null;
    });
  }
});

// Verificar se utilizador já está logado na página inicial
document.addEventListener('DOMContentLoaded', () => {
  const user = DB.getUtilizador();
  if (user && window.location.pathname.includes('index.html') || 
      user && window.location.pathname.endsWith('/ConectaLeiria/')) {
    const ctas = document.querySelector('.navbar-ctas');
    if (ctas) {
      ctas.innerHTML = `
        <span class="navbar-user">👤 ${user.nome ? user.nome.split(' ')[0] : user.nome}</span>
        <a href="/ConectaLeiria/pages/${user.tipo}/dashboard.html" class="btn btn-primario">Dashboard</a>
        <button onclick="DB.logout()" class="btn btn-secundario">Sair</button>
      `;
    }
  }
});

// Verificar sessão na página inicial
document.addEventListener('DOMContentLoaded', () => {
  const user = DB.getUtilizador();
  const isIndex = window.location.pathname.endsWith('/') || 
                  window.location.pathname.includes('index.html');
  
  if (user && isIndex) {
    const ctas = document.querySelector('.navbar-ctas');
    if (ctas) {
      const nome = user.nome ? user.nome.split(' ')[0] : 'Utilizador';
      const dashLink = user.tipo === 'candidato' 
        ? 'pages/candidato/dashboard.html' 
        : 'pages/empresa/dashboard.html';
      ctas.innerHTML = `
        <span class="navbar-user">👤 ${nome}</span>
        <a href="${dashLink}" class="btn btn-primario">Dashboard</a>
        <button onclick="DB.logout()" class="btn btn-secundario">Sair</button>
      `;
    }
  }
});



// Mostrar casinha quando logado (não clicável)
document.addEventListener('DOMContentLoaded', () => {
  const user = DB.getUtilizador();
  const isIndex = window.location.pathname.endsWith('/') || 
                  window.location.pathname.includes('index.html');
  
  if (user && isIndex) {
    const logo = document.querySelector('.navbar-logo');
    if (logo) {
      logo.removeAttribute('href');
      logo.style.cursor = 'default';
      logo.innerHTML = '<span style="font-size:1.8rem;">🏠</span>';
    }
  }
});

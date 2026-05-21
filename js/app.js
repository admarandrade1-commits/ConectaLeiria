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
  logout: () => { localStorage.removeItem('cl_utilizador'); window.location.href = '/index.html'; },
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
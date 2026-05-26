// CONECTALEIRIA — Assistente Virtual com IA

const CONTEXTO_SITE = `
És o assistente virtual do ConectaLeiria, uma plataforma de emprego do Distrito de Leiria, Portugal.
O teu nome é "Leia" e és simpático, profissional e helpful.
Respondes SEMPRE em português de Portugal.
Respostas curtas e diretas (máximo 3-4 frases).

SOBRE O CONECTALEIRIA:
- Plataforma gratuita de emprego para o Distrito de Leiria
- Conecta candidatos a emprego com empresas e restaurantes da região
- Site: https://admarandrade1-commits.github.io/ConectaLeiria

CONCELHOS COBERTOS: Nazaré, Leiria, Alcobaça, Caldas da Rainha, Marinha Grande, Pombal, Batalha, Peniche, Óbidos, Pedrógão Grande, Figueiró dos Vinhos, Ansião

ÁREAS DE EMPREGO: Restauração, Hotelaria, Comércio, Indústria, Construção, Saúde & Bem-estar, Tecnologia, Outras

PARA CANDIDATOS:
1. Criar conta gratuita em /pages/candidato/registo.html
2. Preencher currículo digital completo
3. Escolher área de interesse
4. Empresas veem o currículo e contactam

PARA EMPRESAS:
1. Registar empresa em /pages/empresa/registo.html
2. Fazer login e aceder ao dashboard
3. Ver e filtrar currículos de candidatos
4. Contactar diretamente os candidatos

TECNOLOGIAS: HTML, CSS, JavaScript, Supabase (base de dados), GitHub Pages, PWA
PROJETO: PAP (Prova de Aptidão Profissional) - EDFR Nazaré 2026

Se perguntarem sobre algo que não sabes, diz que não tens essa informação mas oferece ajuda com o que sabes sobre o ConectaLeiria.
`;

let historicoMensagens = [];
let assistenteAberto = false;

// Criar HTML do assistente
function criarAssistente() {
  const html = `
    <button class="assistente-btn" id="assistenteBtn" title="Assistente Virtual">
      🤖
    </button>

    <div class="assistente-janela" id="assistenteJanela">
      <div class="assistente-header">
        <div class="assistente-avatar">🤖</div>
        <div class="assistente-header-info">
          <div class="assistente-nome">Leia — Assistente ConectaLeiria</div>
          <div class="assistente-status">Online agora</div>
        </div>
        <button class="assistente-fechar" id="assistenteFechar">✕</button>
      </div>

      <div class="assistente-mensagens" id="assistenteMensagens">
        <div class="msg msg-ia">
          <div class="msg-avatar">🤖</div>
          <div class="msg-balao">
            Olá! 👋 Sou a <strong>Leia</strong>, a assistente virtual do ConectaLeiria!<br><br>
            Posso ajudar-te a encontrar emprego, registar a tua empresa ou responder a qualquer dúvida sobre a plataforma. Como posso ajudar?
          </div>
        </div>
      </div>

      <div class="assistente-sugestoes">
        <button class="sugestao-btn" onclick="enviarSugestao('Como me registro?')">Como me registro?</button>
        <button class="sugestao-btn" onclick="enviarSugestao('Que áreas existem?')">Que áreas existem?</button>
        <button class="sugestao-btn" onclick="enviarSugestao('Sou empresa, como funciona?')">Sou empresa</button>
      </div>

      <div class="assistente-input-wrap">
        <input
          type="text"
          class="assistente-input"
          id="assistenteInput"
          placeholder="Escreve a tua pergunta..."
          maxlength="500"
        />
        <button class="assistente-enviar" id="assistenteEnviar">➤</button>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);

  // Eventos
  document.getElementById('assistenteBtn').addEventListener('click', toggleAssistente);
  document.getElementById('assistenteFechar').addEventListener('click', fecharAssistente);
  document.getElementById('assistenteEnviar').addEventListener('click', enviarMensagem);
  document.getElementById('assistenteInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensagem();
  });
}

function toggleAssistente() {
  assistenteAberto ? fecharAssistente() : abrirAssistente();
}

function abrirAssistente() {
  assistenteAberto = true;
  document.getElementById('assistenteJanela').classList.add('visivel');
  document.getElementById('assistenteBtn').classList.add('aberto');
  document.getElementById('assistenteBtn').textContent = '✕';
  document.getElementById('assistenteInput').focus();
}

function fecharAssistente() {
  assistenteAberto = false;
  document.getElementById('assistenteJanela').classList.remove('visivel');
  document.getElementById('assistenteBtn').classList.remove('aberto');
  document.getElementById('assistenteBtn').textContent = '🤖';
}

function adicionarMensagem(texto, tipo) {
  const msgs = document.getElementById('assistenteMensagens');
  const div = document.createElement('div');
  div.className = `msg msg-${tipo}`;
  div.innerHTML = tipo === 'ia'
    ? `<div class="msg-avatar">🤖</div><div class="msg-balao">${texto}</div>`
    : `<div class="msg-balao">${texto}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function mostrarTyping() {
  const msgs = document.getElementById('assistenteMensagens');
  const div = document.createElement('div');
  div.className = 'msg msg-ia msg-typing';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-balao"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removerTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

async function enviarMensagem() {
  const input = document.getElementById('assistenteInput');
  const texto = input.value.trim();
  if (!texto) return;

  input.value = '';
  adicionarMensagem(texto, 'user');
  historicoMensagens.push({ role: 'user', content: texto });

  const btn = document.getElementById('assistenteEnviar');
  btn.disabled = true;
  mostrarTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: CONTEXTO_SITE,
        messages: historicoMensagens
      })
    });

    const data = await response.json();
    const resposta = data.content[0].text;

    removerTyping();
    historicoMensagens.push({ role: 'assistant', content: resposta });
    adicionarMensagem(resposta, 'ia');

  } catch(err) {
    removerTyping();
    adicionarMensagem('Desculpa, tive um problema técnico. Tenta novamente! 🙏', 'ia');
  }

  btn.disabled = false;
  input.focus();
}

function enviarSugestao(texto) {
  document.getElementById('assistenteInput').value = texto;
  enviarMensagem();
}

window.enviarSugestao = enviarSugestao;

// Inicializar quando página carrega
document.addEventListener('DOMContentLoaded', criarAssistente);

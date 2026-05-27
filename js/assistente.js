// CONECTALEIRIA — Assistente Virtual Lili com IA Real

const WORKER_URL = 'https://conectaleiria-lili.admarandrade1.workers.dev';

let historicoMensagens = [];
let assistenteAberto = false;

function criarAssistente() {
  const div = document.createElement('div');
  div.innerHTML = `
    <button class="assistente-btn" id="assistenteBtn" title="Assistente Virtual Lili">🤖</button>
    <div class="assistente-janela" id="assistenteJanela">
      <div class="assistente-header">
        <div class="assistente-avatar">🤖</div>
        <div class="assistente-header-info">
          <div class="assistente-nome">Lili — Assistente ConectaLeiria</div>
          <div class="assistente-status">Online agora</div>
        </div>
        <button class="assistente-fechar" id="assistenteFechar">✕</button>
      </div>
      <div class="assistente-mensagens" id="assistenteMensagens">
        <div class="msg msg-ia">
          <div class="msg-avatar">🤖</div>
          <div class="msg-balao">Olá! 👋 Sou a <strong>Lili</strong>, assistente virtual do ConectaLeiria!<br><br>Posso responder a qualquer pergunta sobre a plataforma, emprego no Distrito de Leiria, ou ajudar-te a navegar no site. Como posso ajudar? 😊</div>
        </div>
      </div>
      <div class="assistente-sugestoes">
        <button class="sugestao-btn" onclick="enviarSugestao('Como me registro no site?')">Como me registro?</button>
        <button class="sugestao-btn" onclick="enviarSugestao('Que áreas de emprego existem?')">Que áreas existem?</button>
        <button class="sugestao-btn" onclick="enviarSugestao('Como funciona para empresas?')">Sou empresa</button>
      </div>
      <div class="assistente-input-wrap">
        <input type="text" class="assistente-input" id="assistenteInput" placeholder="Escreve a tua pergunta..." maxlength="500" />
        <button class="assistente-enviar" id="assistenteEnviar">➤</button>
      </div>
    </div>`;
  document.body.appendChild(div);

  document.getElementById('assistenteBtn').addEventListener('click', toggleAssistente);
  document.getElementById('assistenteFechar').addEventListener('click', fecharAssistente);
  document.getElementById('assistenteEnviar').addEventListener('click', enviarMensagem);
  document.getElementById('assistenteInput').addEventListener('keypress', e => {
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
  document.getElementById('assistenteBtn').innerHTML = '✕';
  document.getElementById('assistenteInput').focus();
}

function fecharAssistente() {
  assistenteAberto = false;
  document.getElementById('assistenteJanela').classList.remove('visivel');
  document.getElementById('assistenteBtn').classList.remove('aberto');
  document.getElementById('assistenteBtn').innerHTML = '🤖';
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
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
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
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mensagem: texto,
        historico: historicoMensagens.slice(-6)
      })
    });

    const data = await response.json();
    removerTyping();

    if (data.resposta) {
      historicoMensagens.push({ role: 'assistant', content: data.resposta });
      adicionarMensagem(data.resposta.replace(/\n/g, '<br>'), 'ia');
    } else {
      adicionarMensagem('Desculpa, tive um problema técnico. Tenta novamente! 🙏', 'ia');
    }
  } catch(err) {
    removerTyping();
    adicionarMensagem('Desculpa, não consegui responder agora. Tenta novamente! 🙏', 'ia');
  }

  btn.disabled = false;
  input.focus();
}

function enviarSugestao(texto) {
  document.getElementById('assistenteInput').value = texto;
  enviarMensagem();
}

window.enviarSugestao = enviarSugestao;
document.addEventListener('DOMContentLoaded', criarAssistente);

// CONECTALEIRIA — Assistente Virtual Leia

const respostas = {
  // REGISTO
  'registro|registar|criar conta|como me registro|como criar': {
    resposta: `Para te registares no ConectaLeiria é muito simples! 😊<br><br>
    1️⃣ Clica em <strong>"Criar Conta"</strong> no menu<br>
    2️⃣ Preenche o teu nome, email e senha<br>
    3️⃣ Escolhe o teu concelho e área de interesse<br>
    4️⃣ Aceita os termos e clica em <strong>"Criar Conta Grátis"</strong><br><br>
    É totalmente gratuito! 🎉`,
    link: '/pages/candidato/registo.html',
    linkTexto: '👤 Criar Conta Agora'
  },
  'empresa|restaurante|sou empresa|registar empresa': {
    resposta: `Para registar a tua empresa no ConectaLeiria! 🏢<br><br>
    1️⃣ Clica em <strong>"Sou Empresa"</strong> na página inicial<br>
    2️⃣ Preenche o nome, tipo de negócio e localização<br>
    3️⃣ Após o registo tens acesso a todos os currículos<br>
    4️⃣ Filtra por área e concelho para encontrar o candidato ideal<br><br>
    Também é gratuito para empresas! ✅`,
    link: '/pages/empresa/registo.html',
    linkTexto: '🏢 Registar Empresa'
  },
  'areas|área|áreas|tipos de emprego|que areas': {
    resposta: `O ConectaLeiria cobre 8 áreas de emprego! 🎯<br><br>
    🍽️ <strong>Restauração</strong> — Cozinheiros, Empregados de Mesa<br>
    🏨 <strong>Hotelaria</strong> — Rececionistas, Limpeza<br>
    🛍️ <strong>Comércio</strong> — Vendedores, Repositores<br>
    🏭 <strong>Indústria</strong> — Operadores, Técnicos<br>
    🏗️ <strong>Construção</strong> — Pedreiros, Eletricistas<br>
    ⚕️ <strong>Saúde</strong> — Auxiliares, Cuidadores<br>
    💻 <strong>Tecnologia</strong> — Programadores, IT<br>
    📦 <strong>Outras</strong> — Logística, Agricultura`
  },
  'concelhos|distrito|leiria|nazaré|alcobaça|caldas|marinha|pombal': {
    resposta: `O ConectaLeiria cobre todo o Distrito de Leiria! 🗺️<br><br>
    🏖️ Nazaré &nbsp; 🏰 Leiria &nbsp; 🌊 Alcobaça<br>
    🌡️ Caldas da Rainha &nbsp; 🏭 Marinha Grande<br>
    🌾 Pombal &nbsp; 🏘️ Batalha &nbsp; 🐟 Peniche<br>
    ⛵ Óbidos &nbsp; 🌲 Pedrógão Grande<br>
    🏞️ Figueiró dos Vinhos &nbsp; 🌳 Ansião<br><br>
    São 12 concelhos no total! 📍`,
    link: '/pages/mapa.html',
    linkTexto: '🗺️ Ver Mapa'
  },
  'curriculo|currículo|como preencher|cv': {
    resposta: `Preencher o teu currículo é fácil! 📄<br><br>
    Após o registo, vais automaticamente para o currículo onde podes preencher:<br><br>
    👤 Dados pessoais e foto<br>
    🎯 Área e disponibilidade<br>
    🎓 Escolaridade<br>
    💼 Experiência profissional<br>
    ⭐ Competências e línguas<br><br>
    Quanto mais completo, mais hipóteses tens de ser contactado! 💪`
  },
  'gratuito|gratis|pagar|custo|preço': {
    resposta: `O ConectaLeiria é <strong>100% gratuito</strong> para candidatos! 🎉<br><br>
    ✅ Registo gratuito<br>
    ✅ Currículo digital gratuito<br>
    ✅ Visível para todas as empresas gratuitamente<br><br>
    Para empresas, o acesso básico também é gratuito! 🏢`
  },
  'como funciona|funcionamento|explicar': {
    resposta: `O ConectaLeiria funciona assim! 🔄<br><br>
    <strong>Para candidatos:</strong><br>
    1️⃣ Registas-te gratuitamente<br>
    2️⃣ Prenches o teu currículo<br>
    3️⃣ As empresas encontram-te e contactam-te<br><br>
    <strong>Para empresas:</strong><br>
    1️⃣ Registam a empresa<br>
    2️⃣ Acedem aos currículos filtrados<br>
    3️⃣ Contactam diretamente os candidatos`
  },
  'login|entrar|aceder|palavra passe|senha': {
    resposta: `Para entrares na tua conta! 🔑<br><br>
    1️⃣ Clica em <strong>"Entrar"</strong> no menu<br>
    2️⃣ Escolhe se és candidato ou empresa<br>
    3️⃣ Insere o teu email e senha<br>
    4️⃣ Clica em <strong>"Entrar"</strong><br><br>
    Se esqueceste a senha, contacta-nos na página de Contacto! 📧`,
    link: '/pages/candidato/login.html',
    linkTexto: '🔑 Entrar Agora'
  },
  'contacto|contactar|email|suporte|ajuda': {
    resposta: `Podes contactar-nos facilmente! 📧<br><br>
    📨 Através da nossa página de contacto<br>
    📧 Email: geral@conectaleiria.pt<br>
    🕐 Horário: Segunda a Sexta, 9h-18h<br><br>
    Respondemos sempre em 24-48 horas! ⏰`,
    link: '/pages/contacto.html',
    linkTexto: '📧 Ir para Contacto'
  },
  'ola|olá|bom dia|boa tarde|boa noite|hi|hello': {
    resposta: `Olá! 👋 Bem-vindo ao ConectaLeiria!<br><br>
    Sou a <strong>Leia</strong>, a tua assistente virtual! Posso ajudar-te com:<br><br>
    🔍 Como encontrar emprego<br>
    🏢 Como registar a tua empresa<br>
    📍 Concelhos e áreas disponíveis<br>
    ❓ Qualquer dúvida sobre a plataforma<br><br>
    O que precisas? 😊`
  },
  'obrigado|obrigada|brigado|thanks': {
    resposta: `De nada! Fico feliz em ajudar! 😊<br><br>
    Se tiveres mais alguma dúvida sobre o ConectaLeiria estou sempre aqui! 🤖<br><br>
    Boa sorte na tua procura de emprego! 🍀`
  },
  'pap|projeto|escola|nazaré|edfr': {
    resposta: `O ConectaLeiria é um projeto PAP! 🎓<br><br>
    📚 <strong>Projeto:</strong> Prova de Aptidão Profissional 2026<br>
    🏫 <strong>Escola:</strong> EDFR — Nazaré<br>
    💻 <strong>Tecnologias:</strong> HTML, CSS, JavaScript, Supabase<br>
    🌐 <strong>Publicado:</strong> GitHub Pages<br><br>
    Um projeto criado para conectar talentos ao futuro no Distrito de Leiria! 💚`
  }
};

const respostaPadrao = `Hmm, não tenho essa informação específica! 🤔<br><br>
Posso ajudar-te com:<br>
✅ Como te registares<br>
✅ Áreas e concelhos disponíveis<br>
✅ Como funciona a plataforma<br>
✅ Informações sobre o projeto<br><br>
Tenta reformular a pergunta ou escolhe uma das sugestões! 😊`;

function obterResposta(pergunta) {
  const p = pergunta.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  for (const [chaves, dados] of Object.entries(respostas)) {
    const palavras = chaves.split('|');
    if (palavras.some(palavra => p.includes(palavra))) {
      return dados;
    }
  }
  return { resposta: respostaPadrao };
}

let assistenteAberto = false;

function criarAssistente() {
  const div = document.createElement('div');
  div.innerHTML = `
    <button class="assistente-btn" id="assistenteBtn" title="Assistente Virtual Leia">🤖</button>
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
          <div class="msg-balao">Olá! 👋 Sou a <strong>Leia</strong>, assistente do ConectaLeiria!<br><br>Como posso ajudar-te hoje? 😊</div>
        </div>
      </div>
      <div class="assistente-sugestoes">
        <button class="sugestao-btn" onclick="enviarSugestao('Como me registro?')">Como me registro?</button>
        <button class="sugestao-btn" onclick="enviarSugestao('Que áreas existem?')">Que áreas existem?</button>
        <button class="sugestao-btn" onclick="enviarSugestao('Sou empresa')">Sou empresa</button>
      </div>
      <div class="assistente-input-wrap">
        <input type="text" class="assistente-input" id="assistenteInput" placeholder="Escreve a tua pergunta..." maxlength="200" />
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

function adicionarMensagem(texto, tipo, link, linkTexto) {
  const msgs = document.getElementById('assistenteMensagens');
  const div = document.createElement('div');
  div.className = `msg msg-${tipo}`;
  let conteudo = tipo === 'ia'
    ? `<div class="msg-avatar">🤖</div><div class="msg-balao">${texto}${link ? `<br><br><a href="${link}" class="btn btn-primario" style="font-size:.8rem;padding:.5rem 1rem;display:inline-flex;">${linkTexto}</a>` : ''}</div>`
    : `<div class="msg-balao">${texto}</div>`;
  div.innerHTML = conteudo;
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

function enviarMensagem() {
  const input = document.getElementById('assistenteInput');
  const texto = input.value.trim();
  if (!texto) return;
  input.value = '';
  adicionarMensagem(texto, 'user');
  mostrarTyping();
  setTimeout(() => {
    removerTyping();
    const { resposta, link, linkTexto } = obterResposta(texto);
    adicionarMensagem(resposta, 'ia', link, linkTexto);
  }, 800);
}

function enviarSugestao(texto) {
  document.getElementById('assistenteInput').value = texto;
  enviarMensagem();
}

window.enviarSugestao = enviarSugestao;
document.addEventListener('DOMContentLoaded', criarAssistente);

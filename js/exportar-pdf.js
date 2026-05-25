// CONECTALEIRIA — Exportar Currículo em PDF

function exportarPDF() {
  const user = DB.getUtilizador();
  if (!user) return;

  const cv = JSON.parse(localStorage.getItem('cl_cv_' + user.id) || '{}');
  if (!cv.nome) {
    mostrarToast('Preenche o currículo primeiro!', 'erro');
    return;
  }

  const conteudo = `
    <!DOCTYPE html>
    <html lang="pt-PT">
    <head>
      <meta charset="UTF-8"/>
      <title>Currículo — ${cv.nome}</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: Georgia, serif; color: #2d2d2d; padding: 40px; font-size: 13px; }
        .cv-header { border-bottom: 3px solid #1a6b3c; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
        .cv-nome { font-size: 28px; font-weight: 900; color: #1a1a2e; margin-bottom: 4px; }
        .cv-funcao { font-size: 15px; color: #1a6b3c; font-weight: 600; margin-bottom: 8px; }
        .cv-contactos { font-size: 11px; color: #666; line-height: 1.8; }
        .cv-logo { text-align: right; }
        .cv-logo-texto { font-size: 20px; font-weight: 900; color: #1a1a2e; }
        .cv-logo-verde { color: #1a6b3c; }
        .cv-logo-tag { font-size: 9px; color: #999; letter-spacing: 1px; }
        .cv-secao { margin-bottom: 20px; }
        .cv-secao-titulo { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #1a6b3c; font-weight: 700; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px; margin-bottom: 10px; }
        .cv-linha { display: flex; margin-bottom: 5px; font-size: 12px; }
        .cv-linha-label { min-width: 140px; color: #888; font-size: 11px; }
        .cv-linha-valor { color: #2d2d2d; font-weight: 500; flex: 1; }
        .cv-sobre { font-size: 12px; color: #444; line-height: 1.7; font-style: italic; background: #f9f9f9; padding: 12px; border-left: 3px solid #1a6b3c; border-radius: 4px; }
        .cv-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
        .cv-tag { background: #e8f5e9; color: #1a6b3c; padding: 3px 10px; border-radius: 50px; font-size: 10px; font-weight: 600; }
        .cv-footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #eee; text-align: center; font-size: 10px; color: #bbb; }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>

      <div class="cv-header">
        <div>
          <div class="cv-nome">${cv.nome || '—'}</div>
          <div class="cv-funcao">${cv.funcao || 'Candidato'}</div>
          <div class="cv-contactos">
            📧 ${cv.email || '—'} &nbsp;|&nbsp;
            📞 ${cv.telefone || '—'} &nbsp;|&nbsp;
            📍 ${cv.concelho || '—'}
            ${cv.carta && cv.carta !== 'Não tenho' ? ' &nbsp;|&nbsp; 🚗 ' + cv.carta : ''}
          </div>
          <div class="cv-tags">
            ${cv.area ? `<span class="cv-tag">🎯 ${cv.area}</span>` : ''}
            ${cv.contrato ? `<span class="cv-tag">📋 ${cv.contrato}</span>` : ''}
            ${cv.disponibilidade ? `<span class="cv-tag">⏰ ${cv.disponibilidade}</span>` : ''}
          </div>
        </div>
        <div class="cv-logo">
          <div class="cv-logo-texto">Conecta<span class="cv-logo-verde">Leiria</span></div>
          <div class="cv-logo-tag">PLATAFORMA DE EMPREGO</div>
        </div>
      </div>

      ${cv.sobre ? `
      <div class="cv-secao">
        <div class="cv-secao-titulo">Sobre Mim</div>
        <div class="cv-sobre">${cv.sobre}</div>
      </div>` : ''}

      <div class="cv-secao">
        <div class="cv-secao-titulo">Escolaridade</div>
        <div class="cv-linha"><span class="cv-linha-label">Nível:</span><span class="cv-linha-valor">${cv.escolaridade || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Curso:</span><span class="cv-linha-valor">${cv.curso || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Escola:</span><span class="cv-linha-valor">${cv.escola || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Ano de Conclusão:</span><span class="cv-linha-valor">${cv.ano || '—'}</span></div>
      </div>

      <div class="cv-secao">
        <div class="cv-secao-titulo">Experiência Profissional</div>
        <div class="cv-linha"><span class="cv-linha-label">Empresa:</span><span class="cv-linha-valor">${cv.empresa_ant || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Função:</span><span class="cv-linha-valor">${cv.funcao_ant || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Período:</span><span class="cv-linha-valor">${cv.periodo || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Experiência Total:</span><span class="cv-linha-valor">${cv.experiencia || '—'}</span></div>
        ${cv.desc_exp ? `<div class="cv-sobre" style="margin-top:8px">${cv.desc_exp}</div>` : ''}
      </div>

      <div class="cv-secao">
        <div class="cv-secao-titulo">Competências e Línguas</div>
        <div class="cv-linha"><span class="cv-linha-label">Competências:</span><span class="cv-linha-valor">${cv.competencias || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Línguas:</span><span class="cv-linha-valor">${cv.linguas || '—'}</span></div>
        <div class="cv-linha"><span class="cv-linha-label">Informática:</span><span class="cv-linha-valor">${cv.informatica || '—'}</span></div>
        ${cv.certificados ? `<div class="cv-linha"><span class="cv-linha-label">Certificados:</span><span class="cv-linha-valor">${cv.certificados}</span></div>` : ''}
      </div>

      <div class="cv-footer">
        Currículo gerado pelo ConectaLeiria — admarandrade1-commits.github.io/ConectaLeiria
      </div>

    </body>
    </html>
  `;

  const janela = window.open('', '_blank');
  janela.document.write(conteudo);
  janela.document.close();
  janela.focus();
  setTimeout(() => {
    janela.print();
  }, 500);
}

window.exportarPDF = exportarPDF;

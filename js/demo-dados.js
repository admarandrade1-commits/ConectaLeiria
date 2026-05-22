// CONECTALEIRIA — Dados de Demonstração para o PAP

function carregarDadosDemo() {
  // Só carrega se não houver dados ainda
  if (localStorage.getItem('cl_demo_carregado')) return;

  // CANDIDATOS DE DEMONSTRAÇÃO
  const candidatos = [
    { id: 1001, nome: "Ana Costa", email: "ana.costa@email.com", senha: "123456", telefone: "912345678", concelho: "Nazaré", area: "Restauração" },
    { id: 1002, nome: "João Ferreira", email: "joao.ferreira@email.com", senha: "123456", telefone: "923456789", concelho: "Leiria", area: "Hotelaria" },
    { id: 1003, nome: "Maria Rodrigues", email: "maria.r@email.com", senha: "123456", telefone: "934567890", concelho: "Alcobaça", area: "Comércio" },
    { id: 1004, nome: "Tiago Pereira", email: "tiago.p@email.com", senha: "123456", telefone: "945678901", concelho: "Caldas da Rainha", area: "Indústria" },
    { id: 1005, nome: "Sofia Mendes", email: "sofia.m@email.com", senha: "123456", telefone: "956789012", concelho: "Marinha Grande", area: "Tecnologia" },
    { id: 1006, nome: "Carlos Santos", email: "carlos.s@email.com", senha: "123456", telefone: "967890123", concelho: "Pombal", area: "Construção" },
    { id: 1007, nome: "Inês Oliveira", email: "ines.o@email.com", senha: "123456", telefone: "978901234", concelho: "Batalha", area: "Saúde & Bem-estar" },
    { id: 1008, nome: "Rui Gomes", email: "rui.g@email.com", senha: "123456", telefone: "989012345", concelho: "Nazaré", area: "Restauração" },
  ];

  // CURRÍCULOS DE DEMONSTRAÇÃO
  const curriculos = {
    1001: { nome: "Ana Costa", nascimento: "1998-05-14", telefone: "912345678", email: "ana.costa@email.com", concelho: "Nazaré", carta: "Categoria B", sobre: "Sou uma profissional apaixonada pela área da restauração com 3 anos de experiência. Adoro trabalhar em equipa e estou sempre disposta a aprender.", area: "Restauração", funcao: "Cozinheira", contrato: "Tempo Inteiro", disponibilidade: "Imediata", escolaridade: "Curso Profissional", curso: "Cozinha e Pastelaria", escola: "Escola Hotelaria da Nazaré", ano: "2020", empresa_ant: "Restaurante Mar e Sol", funcao_ant: "Ajudante de Cozinha", periodo: "Jan 2021 — Dez 2023", experiencia: "3 a 5 anos", desc_exp: "Preparação de pratos, gestão do mise en place, apoio ao chef principal.", competencias: "Trabalho em equipa, Gestão de stress, Criatividade", linguas: "Português (nativo), Espanhol (básico)", informatica: "Word, Excel", certificados: "HACCP, Manipulação de Alimentos" },
    1002: { nome: "João Ferreira", nascimento: "1995-08-22", telefone: "923456789", email: "joao.ferreira@email.com", concelho: "Leiria", carta: "Categoria B", sobre: "Rececionista com 5 anos de experiência em hotelaria. Fluente em inglês e francês. Orientado para o cliente e com excelente capacidade de resolução de problemas.", area: "Hotelaria", funcao: "Rececionista", contrato: "Tempo Inteiro", disponibilidade: "2 semanas", escolaridade: "Licenciatura", curso: "Gestão Hoteleira", escola: "ESTM Peniche", ano: "2018", empresa_ant: "Hotel Golden Leiria", funcao_ant: "Rececionista", periodo: "Mar 2019 — Presente", experiencia: "Mais de 5 anos", desc_exp: "Check-in e check-out, gestão de reservas, atendimento ao cliente.", competencias: "Comunicação, Línguas, Organização", linguas: "Português (nativo), Inglês (avançado), Francês (intermédio)", informatica: "Opera PMS, Word, Excel", certificados: "Atendimento ao Cliente, First Aid" },
    1003: { nome: "Maria Rodrigues", nascimento: "2000-03-10", telefone: "934567890", email: "maria.r@email.com", concelho: "Alcobaça", carta: "Não tenho", sobre: "Recém-formada em gestão comercial, motivada e com muita vontade de aprender. Tenho experiência em atendimento ao público.", area: "Comércio", funcao: "Vendedora", contrato: "Tempo Inteiro", disponibilidade: "Imediata", escolaridade: "12º Ano", curso: "Técnico de Gestão", escola: "Escola Secundária de Alcobaça", ano: "2022", empresa_ant: "Supermercado Pingo Doce", funcao_ant: "Repositora", periodo: "Jun 2022 — Ago 2023", experiencia: "1 a 2 anos", desc_exp: "Reposição de produtos, atendimento ao cliente, gestão de caixa.", competencias: "Atendimento ao cliente, Simpatia, Responsabilidade", linguas: "Português (nativo), Inglês (básico)", informatica: "Word, Internet", certificados: "Curso de Vendas" },
    1004: { nome: "Tiago Pereira", nascimento: "1990-11-05", telefone: "945678901", email: "tiago.p@email.com", concelho: "Caldas da Rainha", carta: "Categoria B + C", sobre: "Operador industrial com 10 anos de experiência em linha de produção. Rigoroso, pontual e com bom registo de segurança.", area: "Indústria", funcao: "Operador de Linha", contrato: "Tempo Inteiro", disponibilidade: "1 mês", escolaridade: "9º Ano", curso: "—", escola: "EB Caldas da Rainha", ano: "2006", empresa_ant: "Fábrica Vitrocristal", funcao_ant: "Operador de Produção", periodo: "Jan 2014 — Mar 2024", experiencia: "Mais de 5 anos", desc_exp: "Operação de máquinas CNC, controlo de qualidade, manutenção básica.", competencias: "Atenção ao detalhe, Segurança, Trabalho em equipa", linguas: "Português (nativo)", informatica: "Básico", certificados: "Segurança e Higiene no Trabalho, Empilhador" },
    1005: { nome: "Sofia Mendes", nascimento: "1997-07-18", telefone: "956789012", email: "sofia.m@email.com", concelho: "Marinha Grande", carta: "Categoria B", sobre: "Programadora web com 4 anos de experiência. Especializada em HTML, CSS, JavaScript e React. Apaixonada por criar interfaces bonitas e funcionais.", area: "Tecnologia", funcao: "Programadora Web", contrato: "Tempo Inteiro", disponibilidade: "2 semanas", escolaridade: "Licenciatura", curso: "Engenharia Informática", escola: "IPLeiria", ano: "2021", empresa_ant: "Softinsa Leiria", funcao_ant: "Desenvolvedora Frontend", periodo: "Set 2021 — Presente", experiencia: "3 a 5 anos", desc_exp: "Desenvolvimento de aplicações web, manutenção de sistemas, trabalho em equipa ágil.", competencias: "HTML, CSS, JavaScript, React, Git", linguas: "Português (nativo), Inglês (avançado)", informatica: "VS Code, Git, Figma, Linux", certificados: "AWS Cloud Practitioner, Scrum Master" },
    1006: { nome: "Carlos Santos", nascimento: "1985-02-28", telefone: "967890123", email: "carlos.s@email.com", concelho: "Pombal", carta: "Categoria B + C", sobre: "Pedreiro com 15 anos de experiência em construção civil. Especializado em alvenaria e acabamentos. Sério e responsável.", area: "Construção", funcao: "Pedreiro", contrato: "Tempo Inteiro", disponibilidade: "Imediata", escolaridade: "6º Ano", curso: "—", escola: "EB Pombal", ano: "2000", empresa_ant: "Construções Leiria SA", funcao_ant: "Pedreiro Oficial", periodo: "Fev 2009 — Jan 2025", experiencia: "Mais de 5 anos", desc_exp: "Alvenaria, reboco, pavimentos, acabamentos interiores e exteriores.", competencias: "Leitura de plantas, Rigor, Responsabilidade", linguas: "Português (nativo)", informatica: "Básico", certificados: "Segurança em Obras, Trabalhos em Altura" },
    1007: { nome: "Inês Oliveira", nascimento: "1993-09-12", telefone: "978901234", email: "ines.o@email.com", concelho: "Batalha", carta: "Categoria B", sobre: "Auxiliar de saúde com 6 anos de experiência em cuidados de idosos. Empática, paciente e dedicada ao bem-estar dos utentes.", area: "Saúde & Bem-estar", funcao: "Auxiliar de Saúde", contrato: "Tempo Inteiro", disponibilidade: "1 semana", escolaridade: "Curso Profissional", curso: "Apoio à Família e Comunidade", escola: "CEPRA Leiria", ano: "2016", empresa_ant: "Lar Rainha Santa Batalha", funcao_ant: "Auxiliar de Ação Direta", periodo: "Out 2016 — Presente", experiencia: "Mais de 5 anos", desc_exp: "Cuidados de higiene pessoal, apoio na alimentação, acompanhamento de atividades.", competencias: "Empatia, Paciência, Responsabilidade, Trabalho em equipa", linguas: "Português (nativo)", informatica: "Básico", certificados: "Primeiros Socorros, HACCP, Geriatria" },
    1008: { nome: "Rui Gomes", nascimento: "2002-01-30", telefone: "989012345", email: "rui.g@email.com", concelho: "Nazaré", carta: "Não tenho", sobre: "Jovem à procura do primeiro emprego na área da restauração. Estou a terminar o curso profissional e tenho muita vontade de aprender.", area: "Restauração", funcao: "Empregado de Mesa", contrato: "Tempo Parcial", disponibilidade: "Imediata", escolaridade: "Curso Profissional", curso: "Restauração e Bar", escola: "Escola Profissional da Nazaré", ano: "2025", empresa_ant: "—", funcao_ant: "—", periodo: "—", experiencia: "Sem experiência", desc_exp: "—", competencias: "Simpatia, Pontualidade, Vontade de aprender", linguas: "Português (nativo), Inglês (básico)", informatica: "Básico", certificados: "A terminar curso profissional" },
  };

  // EMPRESAS DE DEMONSTRAÇÃO
  const empresas = [
    { id: 2001, nome: "Restaurante Solar do Lis", email: "solar@email.com", senha: "123456", tipo_negocio: "Restaurante", concelho: "Leiria", morada: "Rua do Lis, 45, Leiria", telefone: "244123456" },
    { id: 2002, nome: "Hotel Nazaré Mar", email: "hotel@email.com", senha: "123456", tipo_negocio: "Hotel", concelho: "Nazaré", morada: "Av. da República, 12, Nazaré", telefone: "262123456" },
    { id: 2003, nome: "Supermercado Alcobaça", email: "super@email.com", senha: "123456", tipo_negocio: "Comércio", concelho: "Alcobaça", morada: "Rua Principal, 78, Alcobaça", telefone: "262987654" },
    { id: 2004, nome: "Vitrocristal Marinha Grande", email: "vitro@email.com", senha: "123456", tipo_negocio: "Indústria", concelho: "Marinha Grande", morada: "Zona Industrial, Marinha Grande", telefone: "244987654" },
  ];

  // Guardar na base de dados
  localStorage.setItem('cl_candidatos', JSON.stringify(candidatos));
  localStorage.setItem('cl_empresas', JSON.stringify(empresas));

  // Guardar currículos
  Object.entries(curriculos).forEach(([id, cv]) => {
    localStorage.setItem('cl_cv_' + id, JSON.stringify(cv));
  });

  localStorage.setItem('cl_demo_carregado', 'true');
  console.log('✅ Dados de demonstração carregados!');
}

// Carregar automaticamente
carregarDadosDemo();

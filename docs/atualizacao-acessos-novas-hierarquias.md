# Atualização de acessos — novas hierarquias

Documento de análise e proposta para inclusão de três hierarquias no portal ALT (`admin_alt`): **profissional da saúde**, **funcionário** e **pais/responsáveis**.

O objetivo é alinhar produto, frontend e backend antes da implementação. Os acessos obrigatórios abaixo foram definidos pelo time; o restante é sugestão baseada no que o projeto já oferece hoje.

---

## 1. Contexto atual

### 1.1 Hierarquias existentes

O frontend identifica o papel pelo campo `hierarquia` persistido no login (`UserRole` em `src/data/constants/user-roles.ts`):

| ID | Enum | Uso atual na clínica ALT |
| --- | --- | --- |
| 1 | `ADMIN` | Acesso amplo de gestão. Home reutiliza o layout de coordenador. |
| 2 | `COORDINATOR` | Coordenação da unidade: alunos, profissionais, sessões, indicadores e grupos. |
| 3 | `TEACHER` | Papel mais próximo do atendimento: sessões, alunos (listagem), indicadores e grupos. **Não cadastra** aluno. |
| 4 | `STUDENT` | Aluno/paciente. Home própria, sem Central de Gestão. |
| 5 | `SECRETARY` | Gestão da rede/unidade: monitoramento institucional, unidades, cadastros e sessões. |

Não existem hoje papéis de profissional da saúde, funcionário administrativo ou responsável com login.

### 1.2 Como o acesso é controlado hoje

Há **dois mecanismos**, e eles não são equivalentes:

1. **Menu** (`src/data/constants/menu-list.ts` + `Header/Menu`): o item só aparece se `hierarchy` contém o `hierarquia` do usuário.
2. **Checagens pontuais na UI**: `UserRole` em Home (`Painel`), Alunos (`SelectType`, `ModalShow`), Perfil e Login.

O `MainRouter` **não protege rotas por hierarquia**. Qualquer usuário autenticado pode abrir `/monitoring`, `/indicators`, `/students`, `/alt_session` etc. pela URL. A restrição atual é só visual.

A Home e o Perfil usam **array indexado pelo número da hierarquia**:

```ts
componentsByHierarchy[Number(getData("hierarquia"))]
```

Incluir IDs `6`, `7` e `8` sem ajustar esses arrays quebra a tela. O padrão correto na implementação é um **mapa por papel**, não índice de array.

### 1.3 Mapa de módulos atuais

| Módulo | Rota | Quem acessa hoje | Observação |
| --- | --- | --- | --- |
| Início | `/` | Todas as hierarquias atuais | Layout muda por papel. |
| Acompanhamento ALT (painel unidade) | `/monitoring` | Admin, Secretário | Relatório institucional da unidade/rede. |
| Indicadores (painel do aluno) | `/indicators` | Admin, Secretário, Coordenador, Professor | Progresso, desempenho, aproveitamento e relatório de desenvolvimento. |
| Relatório do aluno | `/report-student` | Fora do menu; entra pela ficha em `/students` | Perfil, responsável, sessões, ABA, comportamentos etc. |
| Unidades | `/units` | Admin, Secretário | Cadastro institucional. |
| Profissionais | `/professionals` | Admin, Secretário, Coordenador | CRUD de profissionais clínicos (`clinicProfessional`). |
| Alunos | `/students` | Admin, Secretário, Coordenador, Professor | Professor só lista (regra antiga em `SelectType`). Cadastro já exige dados do responsável. |
| Grupos | `/groups` | Admin, Coordenador, Professor | Tela ainda em esboço. |
| Sessões ALT | `/alt_session` | Admin, Secretário, Coordenador, Professor | Agenda, status, prontuário e PDF. |
| Perfil | `/profile` | Coordenador, Professor, Aluno | Admin e Secretário ficam de fora do menu (Secretário tem tela de perfil, mas o menu não aponta). |
| Suporte | `/support` | Todas as hierarquias atuais | Contato institucional. |
| Alfabetização | `/didactic` | Professor, Aluno | Item de menu com `status: 0` (oculto). |

### 1.4 O que ainda não existe

- Módulo de **mensagens**.
- Módulo de **orientações** do profissional para a família.
- Login de **responsável** (o responsável já é entidade no cadastro do aluno: nome, e-mail, CPF, parentesco, endereço e contato).
- Guard de rota por hierarquia.
- Filtro de sessão “somente as minhas” para o profissional logado.

---

## 2. Novas hierarquias propostas

IDs sugeridos para **não colidir** com os papéis atuais. Confirmar com o backend antes de implementar.

```ts
export enum UserRole {
  ADMIN = 1,
  COORDINATOR = 2,
  TEACHER = 3,
  STUDENT = 4,
  SECRETARY = 5,
  HEALTH_PROFESSIONAL = 6, // Profissional da saúde
  EMPLOYEE = 7,             // Funcionário
  PARENT = 8,               // Pais / responsável
}
```

| Papel | Responsabilidade | Analogia atual |
| --- | --- | --- |
| Profissional da saúde | Atendimento clínico do aluno | Próximo de `TEACHER`, com foco clínico (sessão + prontuário + painel). |
| Funcionário | Operação da unidade (agenda e cadastros) | Próximo de `SECRETARY`, **sem** relatórios. |
| Pais | Acompanhamento familiar | Novo. Parte dos dados já existe em `responsavel` no cadastro do aluno. |

`TEACHER` e `HEALTH_PROFESSIONAL` devem coexistir se a plataforma continuar atendendo escola e clínica. Se a clínica ALT passar a usar só o papel de saúde, o backend precisa devolver `6` no login dos profissionais clínicos — o frontend hoje trata esses usuários como `TEACHER` (3).

---

## 3. Requisitos de acesso (obrigatórios)

### 3.1 Profissional da saúde

Acesso a:

- **Sessões** (`/alt_session`)
- **Painel do aluno** (`/indicators`)
- **Alunos** (`/students`)

### 3.2 Funcionário

Pode:

- **Criar sessões**
- **Cadastrar alunos**
- **Cadastrar profissionais**

Não pode:

- **Relatórios da unidade** (`/monitoring` — Painel Unidade / Acompanhamento ALT)
- **Relatórios de alunos** (`/indicators` e `/report-student`)

Leitura da restrição: o funcionário opera cadastro e agenda, mas não vê indicadores nem relatório clínico/pedagógico. Ele **precisa** entrar em `/students` para cadastrar; o que se bloqueia é a visão analítica, não o cadastro.

### 3.3 Pais

Acesso a:

- **Mensagens**
- **Orientações dos profissionais**

Esses dois módulos **ainda não existem** no frontend. Precisam ser criados (telas, rotas, i18n, serviços e APIs).

---

## 4. Matriz de acessos (obrigatório + sugerido)

Legenda: **S** = sim (obrigatório) · **Sug.** = sugerido · **Não** = bloquear · **N/A** = não se aplica / módulo inexistente para o papel.

| Recurso | Prof. saúde | Funcionário | Pais |
| --- | --- | --- | --- |
| Início | Sug. | Sug. | Sug. |
| Perfil | Sug. | Sug. | Sug. |
| Suporte | Sug. | Sug. | Sug. |
| Sessões — listar | **S** | Sug. (agenda da unidade) | Sug. (só do filho, leitura) |
| Sessões — criar / editar | Sug. | **S** | Não |
| Sessões — prontuário clínico | Sug. | Não | Não |
| Sessões — PDF / exportar | Sug. | Sug. (comprovante de agenda) | Não |
| Alunos — listar | **S** | Sug. (necessário para agendar e cadastrar) | Não (vê só o próprio filho na Home) |
| Alunos — cadastrar / editar | Sug. (editar dados clínicos úteis) | **S** | Não |
| Alunos — excluir | Não | Não | Não |
| Painel do aluno (`/indicators`) | **S** | Não | Não |
| Relatório do aluno (`/report-student`) | Sug. | Não | Não (usar visão familiar, se houver) |
| Profissionais — listar | Sug. (equipe da unidade, leitura) | Sug. | Não |
| Profissionais — cadastrar / editar | Não | **S** | Não |
| Unidades | Não | Não | Não |
| Relatórios da unidade (`/monitoring`) | Não | **Não** | Não |
| Grupos | Não | Não | Não |
| Mensagens | Sug. (enviar à família) | Sug. (avisos operacionais) | **S** |
| Orientações | Sug. (criar / editar as próprias) | Não | **S** (somente leitura) |

---

## 5. Detalhamento por hierarquia

### 5.1 Profissional da saúde

Papel clínico. Deve conseguir preparar, realizar e registrar o atendimento, e acompanhar o desenvolvimento do aluno.

**Obrigatório**

- Listar e abrir sessões.
- Abrir o painel do aluno (`/indicators`).
- Listar alunos da unidade.

**Sugestões**

- Home com atalho para Painel do aluno e lista de **sessões do dia** (o bloco de sessões de hoje já existe na Home de coordenador/professor/secretário).
- Criar e editar sessões em que está vinculado; preencher **prontuário** (`FormMedicalRecord`).
- Filtro padrão “minhas sessões”; visualizar as da equipe só em leitura, se a coordenação quiser continuidade de caso.
- Abrir `/report-student` a partir da ficha do aluno (CID, sessões, comportamentos, ABA). É o complemento clínico do painel.
- Editar dados do aluno relevantes ao atendimento (CID, responsável para contato). Sem excluir aluno.
- Listar profissionais da unidade em leitura, para encaminhamento interno.
- Perfil próprio (nome, registro, especialidades, unidade, senha).
- **Mensagens e orientações**: o profissional é quem produz o conteúdo que os pais consomem. Sem esse acesso, o módulo familiar fica incompleto.
- Suporte.

**Não sugerido**

- Unidades, Acompanhamento ALT, cadastro de profissionais, exclusão de alunos, grupos.

**Escopo de dados**

- Unidade (ou unidades) em que atende.
- Alunos vinculados às suas sessões; opcionalmente todos os alunos da unidade, se a clínica trabalhar em equipe.

### 5.2 Funcionário

Papel operacional da recepção/secretaria da clínica. Agenda e cadastra; não analisa desempenho nem prontuário.

**Obrigatório**

- Criar sessões.
- Cadastrar alunos (incluindo responsável, já exigido em `FormStudent`).
- Cadastrar profissionais.

**Sugestões**

- Home operacional: atalhos para “Nova sessão”, “Cadastrar aluno”, “Cadastrar profissional” e agenda do dia.
- Listar / filtrar / reagendar / cancelar sessões da unidade. Sem abrir prontuário e sem alterar respostas clínicas.
- Listar alunos para localizar cadastro e vincular na sessão. Botão **Ver relatório** oculto.
- Editar aluno e profissional (correção cadastral). Sem excluir.
- Listar profissionais para montar a agenda.
- Mensagens operacionais para a família (lembrete de sessão, troca de horário). Sem criar orientação clínica.
- Perfil e suporte.

**Não**

- `/monitoring` (relatório da unidade).
- `/indicators` e `/report-student` (relatórios do aluno).
- `/units`.
- Prontuário da sessão.

**Por que listar alunos mesmo sem “acesso a relatórios de alunos”**

Sem listagem, o funcionário não encontra o paciente para agendar nem corrige cadastro. A restrição deve recair sobre **indicadores e relatório**, não sobre a ficha cadastral.

### 5.3 Pais / responsável

Papel familiar. Vê apenas o(s) aluno(s) vinculado(s) no cadastro (`responsavel`).

**Obrigatório**

- Mensagens.
- Orientações dos profissionais.

**Sugestões**

- Home simples: próximo atendimento, mensagens não lidas e última orientação.
- Perfil do responsável (dados já coletados no cadastro: nome, e-mail, CPF, parentesco, contato).
- Agenda do filho em **leitura** (data, profissional, tipo de sessão, status). Sem prontuário.
- Visão familiar resumida (presença nas sessões, próximas orientações). Sem ICA/IAP, mapa de competências técnico, relatório ABA ou dados de CID detalhados.
- Responder mensagens; marcar orientação como lida.
- Suporte (canal da clínica, não o pedagógico interno da equipe).

**Não**

- Cadastros, sessões em modo edição, profissionais, unidades, monitoramento, indicadores, grupos.

**Vínculo**

O cadastro de aluno já envia `responsavel` + `responsavel_endereco` + `responsavel_contato`. Falta o backend criar usuário com `hierarquia = 8` (ou convite por e-mail) e associar `id_aluno` / `id_usuario` do filho.

---

## 6. Módulos novos (pais)

### 6.1 Mensagens (`/messages`)

Conversa entre família e clínica.

Sugestão de regras:

| Quem | Pode |
| --- | --- |
| Pais | Ler e responder threads dos seus filhos. |
| Profissional da saúde | Iniciar e responder sobre alunos que atende. |
| Funcionário | Iniciar avisos operacionais (agenda, documentos). |
| Coordenador / Secretário | Visão da unidade (moderação), se desejado na fase 2. |

Campos mínimos: aluno, remetente, destinatário, texto, data, lida/não lida, anexo opcional.

Não reutilizar a página `Support` (contato MBR). Mensagens são do contexto da unidade.

### 6.2 Orientações (`/guidances`)

Conteúdo clínico/pedagógico pontual do profissional para a família (rotina em casa, combinados, exercícios). Não é o prontuário completo.

Sugestão de regras:

| Quem | Pode |
| --- | --- |
| Profissional da saúde | Criar, editar e publicar orientação vinculada ao aluno e, se possível, à sessão. |
| Pais | Somente leitura das orientações dos seus filhos. |
| Funcionário | Sem acesso (conteúdo clínico). |
| Coordenador | Leitura da unidade (fase 2). |

Campos mínimos: aluno, profissional, sessão (opcional), título, texto, data, status (rascunho/publicado), confirmação de leitura pelo responsável.

---

## 7. Impacto no frontend

Arquivos e pontos que precisam passar a conhecer os novos IDs:

| Área | Arquivo | O que mudar |
| --- | --- | --- |
| Enum | `src/data/constants/user-roles.ts` | Incluir `HEALTH_PROFESSIONAL`, `EMPLOYEE`, `PARENT`. |
| Menu | `src/data/constants/menu-list.ts` | Novos itens e `hierarchy` por papel. |
| Rotas | `src/app/routes/MainRouter/index.tsx` | Rotas `/messages` e `/guidances`. **Guard por hierarquia** (hoje inexistente). |
| Login | `src/app/pages/Login/context/login-context.tsx` | Resolução de `id_unidade` para os novos papéis (hoje só Secretário vs. demais). |
| Home | `src/app/pages/Home/components/Container/index.tsx` | Trocar array por mapa; layouts Home do profissional, funcionário e pais. |
| Home painel | `src/app/pages/Home/components/Painel/index.tsx` | Painel do aluno para profissional da saúde; **não** exibir Painel Unidade nem Painel Aluno para funcionário e pais. |
| Perfil | `src/app/pages/Profile/components/Container/index.tsx` | Telas de perfil dos três papéis; incluir no menu. |
| Alunos | `SelectType`, `Container`, `ModalShow`, `FormStudent` | Cadastro para funcionário; listagem para profissional; ocultar “Ver relatório” para funcionário. |
| Sessões | `AltSession/components/Container` | Funcionário: criar/editar agenda, sem prontuário. Profissional: prontuário + filtro “minhas sessões”. |
| Profissionais | `Professionals/components/Container` | Liberar CRUD para funcionário. |
| i18n | `src/lib/i18n/header/*` e namespaces novos | Labels de menu e das telas de mensagens/orientações. |

### 7.1 Menu sugerido

**Profissional da saúde**

- Início
- Central de Gestão → Sessões, Alunos, Indicadores
- Mensagens
- Orientações
- Perfil
- Suporte

**Funcionário**

- Início
- Central de Gestão → Sessões, Alunos, Profissionais
- Mensagens (opcional)
- Perfil
- Suporte

**Pais**

- Início
- Mensagens
- Orientações
- Perfil
- Suporte

### 7.2 Guard de rota

Criar um componente que redireciona para `/` se o papel não estiver na lista da rota. Sem isso, o menu novo não impede acesso direto pela URL — o buraco já existe para as hierarquias atuais.

---

## 8. Dependências de backend

O frontend não define `hierarquia` no cadastro de profissional (`createClinicProfessional` não envia o papel). O ID do usuário logado vem do `Auth`. Sem API, os novos papéis não entram.

Necessário alinhar:

1. Inclusão dos IDs `6`, `7` e `8` (ou os IDs oficiais) na tabela de hierarquia.
2. Login devolvendo `hierarquia` correto para profissional clínico, funcionário e responsável.
3. Cadastro de profissional/funcionário informando o papel, ou regra automática (clínico → 6, administrativo → 7).
4. Criação de usuário do responsável no `createClinicStudent` (ou convite posterior).
5. APIs de mensagens e orientações, com filtro por aluno / unidade / profissional.
6. Sessões: query “por profissional logado” e permissão de prontuário só para papel clínico.
7. Relatórios (`/monitoring`, `/indicators`, `/report-student`) recusando `EMPLOYEE` e `PARENT` no servidor — a UI sozinha não é controle de acesso.

---

## 9. LGPD e dados clínicos

Pais não devem ver prontuário, CID detalhado, relatórios técnicos nem indicadores internos.

Funcionário não deve ver prontuário nem relatórios de desempenho.

Profissional da saúde vê dados clínicos apenas dos alunos da sua unidade (ou dos seus atendimentos).

Mensagens e orientações são dados pessoais do menor: retenção, consentimento do responsável e trilha de leitura precisam ser definidos com o backend.

---

## 10. Fases de implementação sugeridas

1. **Contrato de IDs** com a API e enum no frontend.
2. **Menu + guard de rota + Home/Perfil** dos três papéis (mesmo com telas simples).
3. **Reaproveitar telas existentes**: sessões, alunos e profissionais com as regras da matriz.
4. **Ocultar relatórios** para funcionário e pais (menu, botões e API).
5. **Mensagens e orientações** (novo produto), incluindo o profissional como autor.
6. **Convite/login do responsável** a partir do cadastro de aluno já existente.

---

## 11. Pontos em aberto

1. Os IDs `6`, `7` e `8` estão confirmados no banco?
2. Profissionais clínicos já cadastrados entram como `TEACHER` (3) ou serão migrados para `HEALTH_PROFESSIONAL` (6)?
3. Funcionário lista todos os alunos da unidade ou só cadastra?
4. Profissional da saúde vê todos os alunos da unidade ou só os de suas sessões?
5. Pais com mais de um filho: uma conta e seletor de aluno, ou uma conta por vínculo?
6. Mensagens são chat contínuo ou recados avulsos?
7. Orientação nasce no prontuário da sessão ou é cadastro separado?
8. Coordenador/Secretário enxergam mensagens e orientações da unidade?

---

## 12. Resumo executivo

| Hierarquia | Essencial | Recusar | Completar (sugestão) |
| --- | --- | --- | --- |
| Profissional da saúde | Sessões, painel do aluno, alunos | Unidades, relatório institucional, cadastro de profissionais | Prontuário, relatório do aluno, mensagens e orientações que ele emite, perfil |
| Funcionário | Criar sessão, cadastrar aluno, cadastrar profissional | Relatório da unidade, painel/relatório do aluno, prontuário | Listar alunos/sessões para operar a agenda, perfil, avisos operacionais |
| Pais | Mensagens, orientações | Qualquer cadastro, relatório e dado clínico interno | Home do filho, agenda em leitura, perfil do responsável |

O maior gap de produto não é o menu: é a **ausência de mensagens/orientações**, a **falta de guard de rota** e o fato de o **responsável já existir como dado, mas não como usuário**.

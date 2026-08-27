# Endpoints da API — conteúdo a traduzir (backend)

Documento gerado a partir de `src/data/services/*` e `src/data/models/*`, cruzado com uso na UI.

**Idiomas alvo:** `pt_BR` (padrão), `en`, `es`  
**Contrato sugerido:** header `Accept-Language` e/ou query/`id_idioma` (`1` = pt_BR, `2` = en, `3` = es) — alinhado ao seletor do admin.

---

## Critérios

| Critério | Regra |
|---|---|
| Fonte | Apenas endpoints presentes nos services do front |
| Traduzir | Texto de catálogo, didático, clínico, labels de UI vindos da API |
| Não traduzir | IDs, e-mails, nomes próprios, datas, números, URLs, tokens, códigos técnicos (ex.: sigla CID) |
| **ALTA** | Didático, catálogo, labels de formulário/relatório exibidos ao usuário |
| **MÉDIA** | Relatórios / descrições de negócio / eventos |
| **BAIXA** | Cadastro (pessoas, unidades como nome próprio) |
| Revisar payload | Sem model claro ou response opaco |

---

## Resumo — backlog sugerido (ALTA)

1. Didático — módulos / atividades (`descricao`, `categoria`, `instrucao`)
2. Prontuário — perguntas e opções (`getMedicalRecordQuestions`)
3. CID — grupos, subtítulos e descrições
4. Profissões / tipo de atendimento → `tipo_sessao`
5. Relatório de desenvolvimento — tags, subtags, competências, categorias, atividades recomendadas
6. Conquistas — `titulo` / `label`
7. ReportUserSession — `descricao`, `tipo_sessao`, relatório técnico IA
8. ABA — `rotulo`, `interpretacao*`, classificações
9. Painel individual — `modulo`, `atividade`, `idioma`, `conteudo`, `descricao`

**MÉDIA:** eventos da Home; `periodo` em evolução; status de sessão (se não for i18n no front).

**BAIXA:** cadastros (aluno, profissional, unidade, SME, selects de indicadores); nomes de rede/unidade.

---

## 1. Didactic

**Service:** `Didactic/index.ts` · **Model:** `project-infos-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getStudentProjectInfoWithModules` | GET | `projectInfos/getStudentProjectInfoWithModules/{id}` | `categoria`; `modulos[].descricao` | `id`, `id_projeto`, `cor`, `icone`, séries, `status`, datas | **ALTA** |
| `getProjectInfosWithModules` | GET | `projectInfos/getProjectInfosWithModules/{id}` | Idem | Idem | **ALTA** |
| `getAllProjectModuleActivityByModule` | GET | `projectModuleActivity/getAllProjectModuleActivityByModule/{id}` | `descricao`; `instrucao`; `tags` (se texto legível) | `id`, `id_modulo`, `cor`, `icone`, `status`, `atividade_id`, scores | **ALTA** |

---

## 2. CID

**Service:** `CID/index.ts` · **Model:** `cid-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getAllCidGrouped` | GET | `cid/getAllCidGrouped` | `data[].titulo`; `subcategoria[].titulo`; `siglas[].descricao` | `siglas[].id`; `siglas[].sigla` (código) | **ALTA** |

---

## 3. Professionals

**Service:** `Professionals/index.ts` · **Model:** `professionals-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getAllClinicProfession` | GET | `clinicProfession/getAllClinicProfession` | `descricao`; `tipo_atendimento` | `id` | **ALTA** |
| `getClinicProfessionalsByNetwork` | GET | `clinicProfessional/getClinicProfessionalsByNetwork?id_unidade_rede=&page=` | `profissoes[].descricao`; `profissoes[].tipo_atendimento` | `nome`, `email`, CPF/CNPJ, registro, IDs; `especialidade` (texto livre) | **ALTA** (profissões) / **BAIXA** (cadastro) |
| `getClinicProfessionalByUserId` | GET | `clinicProfessional/getClinicProfessionalByUserId/{id}` | — | dados cadastrais | **BAIXA** |
| `createClinicProfessional` | POST | `clinicProfessional/createClinicProfessional` | Revisar ack / `message` | — | — |
| `updateClinicProfessionalByUserId` | PATCH | `clinicProfessional/updateClinicProfessionalByUserId/{id}` | Revisar ack / `message` | — | — |

---

## 4. ATLSession

**Service:** `ATLSession/index.ts` · **Model:** `alt-session-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getAltSessionsByNetwork` | GET | `altSession/getAltSessionsByNetwork?...` | `tipo_sessao`; `status` (se enum textual PT) | nomes de pessoas, datas, IDs, paginação | **ALTA** (`tipo_sessao`) / **MÉDIA** (`status`) |
| `getAltSessionById` | GET | `altSession/getAltSessionById/{id}` | Idem | Idem | Idem |
| `getMedicalRecordQuestions` | GET | `altSession/getMedicalRecordQuestions?id_sessao=` | `pergunta[].descricao`; `opcoes[].descricao`; `tipo` (se label) | `id_pergunta`, `id_resposta`, `ordem` | **ALTA** |
| `getMedicalRecordSessionBySessionId` | GET | `altSession/getMedicalRecordSessionBySessionId/{id_sessao}` | — (respostas do profissional são conteúdo do usuário) | IDs, `status`, texto livre | **BAIXA** |
| Mutations (`create` / `update` / `changeStatus` / medical record) | POST/PATCH | paths correspondentes | Revisar `message` de erro | — | Revisar |

> Preferência: retornar códigos estáveis de `status`/`tipo` + label traduzida, ou código + i18n no front.

---

## 5. ALTDevelopmentReport

**Service:** `ALTDevelopmentReport/index.ts` · **Model:** `alt-development-report-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getGeneralDevelopmentIndex` | GET | `altDevelopmentReport/generalDevelopmentIndex?id_usuario=` | `categorias[].categoria` | IDs, índices, médias | **ALTA** |
| `getPerformanceSubtag` | GET | `altDevelopmentReport/performanceSubtag?id_usuario=` | `tag` / `subtag`; atividades recomendadas: `descricao`, `descricao_modulo`, tags | IDs, %, `cor`, `icone` | **ALTA** |
| `getCompetencyTree` | GET | `altDevelopmentReport/competencyTree?id_usuario=` | `tag`, `subtag`, `competencia` | IDs, % | **ALTA** |
| `getEvolutionAltTag` | GET | `altDevelopmentReport/evolutionAltTag?id_usuario=` | `tags[].tag`; `periodos[].periodo` | IDs, % | **ALTA** (tags) / **MÉDIA** (periodo) |
| `getDistributionActivitiesPerformed` | GET | `altDevelopmentReport/distributionActivitiesPerformed?id_usuario=` | `tags[].tag` | contagens, IDs | **ALTA** |

---

## 6. ALTDevelopmentNetwork

**Service:** `ALTDevelopmentNetwork/index.ts` · **Model:** `alt-development-network-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getStatisticNetwork` | GET | `altDevelopmentNetwork/getStatisticNetwork?id_rede=&filter=` | — | `nome_rede`, taxas, IDs | **BAIXA** |
| `getNumbersNetwork` | GET | `altDevelopmentNetwork/getNumbersNetwork?id_rede=&filter=` | — | apenas números | — |
| `getSkillsDeveloped` | GET | `altDevelopmentNetwork/getSkillsDeveloped?id_rede=&filter=` | `skills_tag.categorias[].categoria` | funil numérico, IDs | **ALTA** |
| `getUnitCompare` | GET | `altDevelopmentNetwork/getUnitCompare?id_rede=&filter=` | `status` opcional (front já tem i18n) | `unidade` (nome próprio), métricas | **BAIXA** / **MÉDIA** |

---

## 7. ReportUserSession

**Service:** `ReportUserSession/index.ts` · **Model:** `report-user-session-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getEvolution` | GET | `reportUserSession/evolution?...` | `data[].descricao` | IDs, quantidades, frequências | **ALTA** |
| `getTypeActivity` | GET | `reportUserSession/type_activity?...` | `data[].descricao` | Idem | **ALTA** |
| `getAreasWorked` | GET | `reportUserSession/areas_worked?...` | `data[].descricao` | Idem | **ALTA** |
| `getSupportLevel` | GET | `reportUserSession/support_level?...` | `data[].descricao` | Idem | **ALTA** |
| `getAttention` | GET | `reportUserSession/attention?...` | `data[].descricao` | Idem | **ALTA** |
| `getEmotionalRegulation` | GET | `reportUserSession/emotional_regulation?...` | `data[].descricao` | Idem | **ALTA** |
| `getBehaviors` | GET | `reportUserSession/behaviors?...` | `data[].descricao` | Idem | **ALTA** |
| `getBehaviorFunction` | GET | `reportUserSession/behavior_function?...` | `data[].descricao` | Idem | **ALTA** |
| `getStrategies` | GET | `reportUserSession/strategies?...` | `data[].descricao` | Idem | **ALTA** |
| `getSessionTypesDistribution` | GET | `reportUserSession/session_types_distribution?...` | `data[].tipo_sessao` | contagens | **ALTA** |
| `getTechnicalIaReport` | GET | `reportUserSession/technical_ia_report?...` | `resumo_clinico`, `engajamento`, `comunicacao`, `atencao`, `comportamento`, `interacoes_sociais`, `nivel_prompt`, `intervencoes_eficazes[]`, `dificuldades[]`, `evolucao_geral`, `observacoes_relevantes` | `id_usuario` | **ALTA** |

> **Atenção:** partes da UI fazem match de `descricao` com strings fixas em PT. Ao traduzir no backend, alinhar o front para não depender de texto em português.

> Relatório IA: gerar já no idioma solicitado (`id_idioma` / `Accept-Language`).

---

## 8. ReportABASession

**Service:** `ReportABASession/index.ts` · **Model:** `report-aba-session-service.ts`

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getABApercentageCorrect` | GET | `reportUserSession/getABApercentageCorrect?id_usuario=` | `interpretacao_final`; `tendencia`; `variabilidade_classificacao` | métricas, IDs | **ALTA** |
| `getABAaverageHelp` | GET | `reportUserSession/getABAaverageHelp?id_usuario=` | `interpretacao` | médias, contagens | **ALTA** |
| `getABAlatencyTime` | GET | `reportUserSession/getABAlatencyTime?id_usuario=` | — | valores/médias | — |
| `getABAfrequencyBehavior` | GET | `reportUserSession/getABAfrequencyBehavior?id_usuario=` | `data[].rotulo` | `total` | **ALTA** |
| `getABAMediumIntensity` | GET | `reportUserSession/getABAMediumIntensity?id_usuario=` | `data[].rotulo`; `interpretacao` | pesos/frequências | **ALTA** |
| `getABAengagement` | GET | `reportUserSession/getABAengagement?id_usuario=` | `data[].rotulo` | pesos/totais | **ALTA** |
| `getABAperformance` | GET | `reportUserSession/getABAperformance?id_usuario=` | `data[].rotulo`; `classificacao_tecnica`; `interpretacao_clinica` | métricas | **ALTA** |

---

## 9. Profile

**Service:** `Profile/index.ts` · **Models:** `achievement-service.ts`, `avatar-service.ts`, profile/student

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getAllAchievementsForHomeByUserId` | GET | `achievements/getAllAchievementsForHomeByUserId/{idUser}` | `conquistas[].titulo`; `conquistas[].label` | ícone, XP, moeda, %, `feito`, IDs, datas | **ALTA** |
| `getAllAvatars` | GET | `avatar/getAllAvatars` | — | `id`, `link`, `status`, datas | — |
| `getTeacherProfile` / `getCoordinatorProfile` | GET | `teacher/getTeacherProfile` · `coordinator/getCoordinatorProfile` | — (`unidades[].descricao` = nome próprio) | nome, usuário, avatar | **BAIXA** |
| `getStudentByStudentId` | GET | `student/getStudentByStudentId/{id_hierarquia}` | — | cadastro | **BAIXA** |
| `updateAvatar` | PATCH | `user/updateAvatar?idUser=&idAvatar=` | Revisar ack | — | — |

---

## 10. PainelStudent

**Service:** `PainelStudent/index.ts` · tipagem inferida nas Tables de Indicators

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `studentALTAverage` | GET | `individualReport/studentALTAverage?id_aluno=&page=&limit=10` | `idioma`, `modulo`, `atividade`, `conteudo` | totais, %, datas, IDs, flag imagem | **ALTA** |
| `studentALTRounds` | GET | `individualReport/studentALTRounds?id_aluno=&page=&limit=10` | `descricao`, `atividade`, `idioma`; `alternativa_*` se texto | tempos, datas, imagens | **ALTA** |
| `studentALTFrequency` | GET | `individualReport/studentALTFrequency?id_aluno=&page=&limit=10` | `atividade` (+ campos textuais da row) | métricas | **ALTA** |
| `getStudentByStudentId` | GET | `student/getStudentByStudentId/{idUser}` | — | cadastro | **BAIXA** |
| `getLogAltTotalStudentPlayed` | GET | `logAlt/getLogAltTotalStudentPlayed` | Revisar payload | `nome_unidade` (próprio), totais | **BAIXA** |

---

## 11. Home

**Service:** `Home/index.ts` · tipagem parcial (`eventsActivity`, ranking)

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getStudentDatasForHomeALT` | GET | `home/getStudentDatasForHomeALT` | `eventsActivity[].titulo`, `descricao` | `name` (pessoa), ranking, IDs, datas, XP | **MÉDIA** / **BAIXA** |
| `getTeacherDatasForHomeALTClinic` | GET | `home/getTeacherDatasForHomeALTClinic` | Idem se mesma shape | Idem | **MÉDIA** / **BAIXA** |
| `getSecretaryDatasForHomeALTClinic` | GET | `home/getSecretaryDatasForHomeALTClinic` | Idem | Idem | **MÉDIA** / **BAIXA** |
| `getCoordinatorDatasForHomeALTClinc` | GET | `home/getCoordinatorDatasForHomeALTClinc` | Idem | Idem | **MÉDIA** / **BAIXA** |

> **Revisar payload:** resposta agregada sem interface formal em `models/`.

---

## 12. Monitoring

| Método | HTTP | Path | Campos a traduzir | Não traduzir | Prioridade |
|---|---|---|---|---|---|
| `getLogAltTotalStudentPlayed` | GET | `logAlt/getLogAltTotalStudentPlayed` | Revisar payload | `nome_unidade`, totais, IDs | **BAIXA** |

---

## 13. Indicators

**Service:** `Indicators/index.ts` — selects de turma/aluno/unidade (cadastro)

| Método | HTTP | Path | Campos a traduzir | Prioridade |
|---|---|---|---|---|
| `getAllClassesByTeacher` | GET | `classTeacher/getAllClassByTeacher?idUser=&idUnit=` | — (nomes de turma) | **BAIXA** |
| `getAllStudentByClass` | GET | `classStudent/getAllStudentByClass/{id}` | — | **BAIXA** |
| `getStudentsByUnit` | GET | `unitUser/getStudentsByUnit/{idUnit}` | — | **BAIXA** |
| `getAllClassByUnit` | GET | `class/getAllClassByUnit/{id}` | — | **BAIXA** |
| `getAllUnitsFromUnitNetworkByUser` | GET | `unitNetwork/getAllUnitsFromUnitNetworkByUser/{id}` | — | **BAIXA** |

---

## 14. Student

| Método | HTTP | Path | Campos a traduzir | Prioridade |
|---|---|---|---|---|
| `getStudentsByUnitPaged` | GET | `unitUser/getStudentsByUnitPaged?...` | — | **BAIXA** |
| `getAllStudentsNetwork` | GET | `student/getAllStudentsNetwork/{id_rede}?...` | — | **BAIXA** |
| `getClinicStudentByUserId` | GET | `clinicStudent/getClinicStudentByUserId/{id}` | `cid_usuario[].descricao` | **ALTA** (CID) / **BAIXA** (resto) |
| `getUnitById` | GET | `unit/getUnitById/{id}` | — | **BAIXA** |
| `verifyUser` + creates/updates/delete | GET/POST/PATCH | paths correspondentes | Revisar `message` | — |

---

## 15. Unit / SME / Login / User

| Domínio | Endpoints | Traduzir? | Prioridade |
|---|---|---|---|
| **Unit** | listagem / get / create / update / delete | Nomes de unidade e endereço = próprios; revisar `message` | **BAIXA** |
| **SME** | `secretary/getSecretaryByUserId/{id}` (+ update) | Cadastro | **BAIXA** |
| **Login** | `authWebALT/login`, unidades do usuário | Token + nomes de unidade | — / **BAIXA** |
| **User** | `user/verifyUser?user=` | Flag de existência | — |

---

## Observações para o backend

1. **Mensagens de erro:** várias telas usam `get_error(error)` em toasts — respostas de erro também devem respeitar o idioma.
2. **Enums vs labels:** preferir códigos estáveis (`status`, `tipo_sessao`) + label traduzida no response (ou só código e i18n no front).
3. **Conteúdo gerado por IA:** `technical_ia_report` e interpretações ABA — gerar já no locale pedido.
4. **Payloads sem model** (Home, Monitoring log, várias mutations): validar contrato OpenAPI antes de fechar o escopo.
5. **Front:** UI estática já cobre `react-i18next` (`pt_BR` / `en` / `es`). Este documento cobre só **conteúdo dinâmico da API**.

---

*Nenhum endpoint foi inventado — inventário baseado no código do admin ALT.*

import altAtividadeSubtag from "./alt_atividade_subtag.json";
import altAtividadeTag from "./alt_atividade_tag.json";
import altTag from "./alt_tag.json";
import projetoModulo from "./projeto_modulo.json";
import clinicaProfissao from "./clinica_profissao.json";
import cidCategoria from "./cid_categoria.json";
import cidSubcategoria from "./cid_subcategoria.json";
import cid from "./cid.json";
import prontuarioOpcoes from "./prontuario_opcoes.json";
import prontuarioPerguntas from "./prontuario_perguntas.json";
import { resolveLanguageFromBrowser } from "../resolve-language";

interface IDescricaoRow {
  id: string;
  descricao_pt: string;
  descricao_en: string;
  descricao_es: string;
}

interface IClinicaProfissaoRow extends IDescricaoRow {
  tipo_atendimento_pt: string;
  tipo_atendimento_en: string;
  tipo_atendimento_es: string;
}

interface IObservacaoRow {
  id: string;
  observacao_pt: string;
  observacao_en: string;
  observacao_es: string;
}

interface IDescricaoTableFile {
  name: string;
  data: IDescricaoRow[];
}

interface IObservacaoTableFile {
  name: string;
  data: IObservacaoRow[];
}

type TDescricaoField = "descricao_pt" | "descricao_en" | "descricao_es";
type TObservacaoField = "observacao_pt" | "observacao_en" | "observacao_es";
type TTipoAtendimentoField = "tipo_atendimento_pt" | "tipo_atendimento_en" | "tipo_atendimento_es";
type TTipoAtendimentoLang = "pt" | "en" | "es";

type TranslateFn = (key: string, options?: { ns?: string }) => string;

function buildDescricaoIndex(rows: IDescricaoRow[]): Map<string, IDescricaoRow> {
  return new Map(rows.map((row) => [String(row.id), row]));
}

function buildObservacaoIndex(rows: IObservacaoRow[]): Map<string, IObservacaoRow> {
  return new Map(rows.map((row) => [String(row.id), row]));
}

function normalizeDescricaoKey(value: string): string {
  return value
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function buildDescricaoPtIndex(rows: IDescricaoRow[]): Map<string, IDescricaoRow> {
  return new Map(
    rows.map((row) => [normalizeDescricaoKey(row.descricao_pt), row])
  );
}

const atividadeTagIndex = buildDescricaoIndex(
  (altAtividadeTag as IDescricaoTableFile[])[0]?.data ?? []
);
const atividadeSubtagIndex = buildDescricaoIndex(
  (altAtividadeSubtag as IDescricaoTableFile[])[0]?.data ?? []
);
const projetoModuloIndex = buildDescricaoIndex(
  (projetoModulo as IDescricaoTableFile[])[0]?.data ?? []
);
const clinicaProfissaoRows = ((clinicaProfissao as IDescricaoTableFile[])[0]?.data ??
  []) as IClinicaProfissaoRow[];
const clinicaProfissaoIndex = buildDescricaoIndex(clinicaProfissaoRows);
const clinicaProfissaoByPtIndex = buildDescricaoPtIndex(clinicaProfissaoRows);
const clinicaProfissaoTipoByIdIndex = new Map(
  clinicaProfissaoRows.map((row) => [String(row.id), row])
);
const clinicaProfissaoTipoByPtIndex = new Map(
  clinicaProfissaoRows
    .filter((row) => (row.tipo_atendimento_pt ?? "").trim())
    .map((row) => [normalizeDescricaoKey(row.tipo_atendimento_pt), row])
);
const cidCategoriaByPtIndex = buildDescricaoPtIndex(
  (cidCategoria as IDescricaoTableFile[])[0]?.data ?? []
);
const cidSubcategoriaByPtIndex = buildDescricaoPtIndex(
  (cidSubcategoria as IDescricaoTableFile[])[0]?.data ?? []
);
const cidByIdIndex = buildDescricaoIndex((cid as IDescricaoTableFile[])[0]?.data ?? []);
const prontuarioPerguntasRows = (prontuarioPerguntas as IDescricaoTableFile[])[0]?.data ?? [];
const prontuarioPerguntasIndex = buildDescricaoIndex(prontuarioPerguntasRows);
const prontuarioPerguntasByPtIndex = buildDescricaoPtIndex(prontuarioPerguntasRows);
const prontuarioOpcoesIndex = buildDescricaoIndex(
  (prontuarioOpcoes as IDescricaoTableFile[])[0]?.data ?? []
);
const prontuarioOpcoesByPtIndex = buildDescricaoPtIndex(
  (prontuarioOpcoes as IDescricaoTableFile[])[0]?.data ?? []
);
const altTagIndex = buildObservacaoIndex((altTag as IObservacaoTableFile[])[0]?.data ?? []);

function resolveDescricaoField(language?: string): TDescricaoField {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "descricao_pt";
  if (resolved === "es") return "descricao_es";
  return "descricao_en";
}

function resolveObservacaoField(language?: string): TObservacaoField {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "observacao_pt";
  if (resolved === "es") return "observacao_es";
  return "observacao_en";
}

function resolveTipoAtendimentoField(language?: string): TTipoAtendimentoField {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "tipo_atendimento_pt";
  if (resolved === "es") return "tipo_atendimento_es";
  return "tipo_atendimento_en";
}

function splitTipoAtendimento(value: string): string[] {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function resolveTipoAtendimentoLang(language?: string): TTipoAtendimentoLang {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "pt";
  if (resolved === "es") return "es";
  return "en";
}

const tipoAtendimentoPartIndex = new Map<string, Record<TTipoAtendimentoLang, string>>();

for (const row of clinicaProfissaoRows) {
  const ptParts = splitTipoAtendimento(row.tipo_atendimento_pt ?? "");
  const enParts = splitTipoAtendimento(row.tipo_atendimento_en ?? "");
  const esParts = splitTipoAtendimento(row.tipo_atendimento_es ?? "");

  ptParts.forEach((part, index) => {
    const key = normalizeDescricaoKey(part);
    if (!key || tipoAtendimentoPartIndex.has(key)) return;
    tipoAtendimentoPartIndex.set(key, {
      pt: part,
      en: enParts[index] ?? part,
      es: esParts[index] ?? part,
    });
  });
}

function translateFromDescricaoIndex(
  index: Map<string, IDescricaoRow>,
  id: string | number | null | undefined,
  language: string | undefined,
  fallback?: string
): string {
  if (id === null || id === undefined || id === "") {
    return fallback ?? "";
  }

  const row = index.get(String(id));
  if (!row) return fallback ?? "";

  const field = resolveDescricaoField(language);
  return row[field] || row.descricao_pt || fallback || "";
}

function translateFromDescricaoPtIndex(
  index: Map<string, IDescricaoRow>,
  descricaoPt: string | null | undefined,
  language: string | undefined,
  fallback?: string
): string {
  const raw = (descricaoPt ?? "").trim();
  if (!raw) return fallback ?? "";

  const row = index.get(normalizeDescricaoKey(raw));
  if (!row) return fallback ?? raw;

  const field = resolveDescricaoField(language);
  return row[field] || row.descricao_pt || fallback || raw;
}

/** Traduz categoria (`id_tag`) via `alt_atividade_tag.json`. */
export function translateAltTagById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoIndex(atividadeTagIndex, id, language, fallback);
}

/** Traduz subtag (`id_subtag`) via `alt_atividade_subtag.json`. */
export function translateAltSubtagById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoIndex(atividadeSubtagIndex, id, language, fallback);
}

/** Traduz módulo (`id_modulo`) via `projeto_modulo.json`. */
export function translateProjetoModuloById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoIndex(projetoModuloIndex, id, language, fallback);
}

/** Traduz profissão clínica (`id`) via `clinica_profissao.json`. */
export function translateClinicaProfissaoById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoIndex(clinicaProfissaoIndex, id, language, fallback);
}

/** Traduz profissão clínica comparando o texto com `descricao_pt` em `clinica_profissao.json`. */
export function translateClinicaProfissaoByDescricaoPt(
  descricaoPt: string | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoPtIndex(clinicaProfissaoByPtIndex, descricaoPt, language, fallback);
}

/** Traduz tipo de atendimento (`id` da profissão) via `clinica_profissao.json`. */
export function translateTipoAtendimentoById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  if (id === null || id === undefined || id === "") {
    return translateTipoAtendimento(fallback, language, fallback);
  }

  const row = clinicaProfissaoTipoByIdIndex.get(String(id));
  if (!row || !(row.tipo_atendimento_pt ?? "").trim()) {
    return translateTipoAtendimento(fallback, language, fallback);
  }

  const field = resolveTipoAtendimentoField(language);
  return row[field] || row.tipo_atendimento_pt || fallback || "";
}

/**
 * Traduz tipo de atendimento / `tipo_sessao` comparando com `tipo_atendimento_pt`.
 * Aceita a lista completa ("Avaliação, Sessão Terapêutica, Devolutiva") ou um item isolado.
 */
export function translateTipoAtendimento(
  tipoAtendimentoPt: string | null | undefined,
  language?: string,
  fallback?: string
): string {
  const raw = (tipoAtendimentoPt ?? "").trim();
  if (!raw) return fallback ?? "";

  const field = resolveTipoAtendimentoField(language);
  const fullRow = clinicaProfissaoTipoByPtIndex.get(normalizeDescricaoKey(raw));
  if (fullRow) {
    return fullRow[field] || fullRow.tipo_atendimento_pt || fallback || raw;
  }

  const lang = resolveTipoAtendimentoLang(language);
  const parts = splitTipoAtendimento(raw);
  if (parts.length === 0) return fallback ?? raw;

  return parts
    .map((part) => {
      const match = tipoAtendimentoPartIndex.get(normalizeDescricaoKey(part));
      return match?.[lang] || part;
    })
    .join(", ");
}

/** Traduz categoria CID (`data[].titulo`) via `cid_categoria.json` comparando `descricao_pt`. */
export function translateCidCategoriaByTitulo(
  titulo: string | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoPtIndex(cidCategoriaByPtIndex, titulo, language, fallback);
}

/** Traduz subcategoria CID (`subcategoria[].titulo`) via `cid_subcategoria.json` comparando `descricao_pt`. */
export function translateCidSubcategoriaByTitulo(
  titulo: string | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoPtIndex(cidSubcategoriaByPtIndex, titulo, language, fallback);
}

/** Traduz descrição CID (`siglas[].id`) via `cid.json`. */
export function translateCidById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoIndex(cidByIdIndex, id, language, fallback);
}

/** Traduz pergunta do prontuário (`id_pergunta`) via `prontuario_perguntas.json`. */
export function translateProntuarioPerguntaById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoIndex(prontuarioPerguntasIndex, id, language, fallback);
}

/** Traduz pergunta do prontuário comparando o texto com `descricao_pt` em `prontuario_perguntas.json`. */
export function translateProntuarioPerguntaByDescricaoPt(
  descricaoPt: string | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoPtIndex(prontuarioPerguntasByPtIndex, descricaoPt, language, fallback);
}

/** Traduz pergunta do prontuário por `id_pergunta`, com fallback pelo texto em PT. */
export function translateProntuarioPergunta(
  id: string | number | null | undefined,
  descricaoPt?: string | null,
  language?: string
): string {
  const fallback = (descricaoPt ?? "").trim();
  const byId = translateFromDescricaoIndex(prontuarioPerguntasIndex, id, language, "");
  if (byId) return byId;
  return translateFromDescricaoPtIndex(prontuarioPerguntasByPtIndex, descricaoPt, language, fallback);
}

/** Traduz opção do prontuário (`id_resposta`) via `prontuario_opcoes.json`. */
export function translateProntuarioOpcaoById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoIndex(prontuarioOpcoesIndex, id, language, fallback);
}

/** Traduz opção do prontuário comparando o texto com `descricao_pt` em `prontuario_opcoes.json`. */
export function translateProntuarioOpcaoByDescricaoPt(
  descricaoPt: string | null | undefined,
  language?: string,
  fallback?: string
): string {
  return translateFromDescricaoPtIndex(prontuarioOpcoesByPtIndex, descricaoPt, language, fallback);
}

/** Traduz opção do prontuário por `id_resposta`, com fallback pelo texto em PT. */
export function translateProntuarioOpcao(
  id: string | number | null | undefined,
  descricaoPt?: string | null,
  language?: string
): string {
  const fallback = (descricaoPt ?? "").trim();
  const byId = translateFromDescricaoIndex(prontuarioOpcoesIndex, id, language, "");
  if (byId) return byId;
  return translateFromDescricaoPtIndex(prontuarioOpcoesByPtIndex, descricaoPt, language, fallback);
}

/** Traduz observação da atividade (`id_tag` em `atividades[].tags`) via `alt_tag.json`. */
export function translateAltTagObservacaoById(
  id: string | number | null | undefined,
  language?: string,
  fallback?: string
): string {
  if (id === null || id === undefined || id === "") {
    return fallback ?? "";
  }

  const row = altTagIndex.get(String(id));
  if (!row) return fallback ?? "";

  const field = resolveObservacaoField(language);
  return row[field] || row.observacao_pt || fallback || "";
}

const ACTIVITY_TYPE_KEYS: Record<string, string> = {
  aprendendo: "activity_type_learning",
  atividade: "activity_type_activity",
  escrevendo: "activity_type_writing",
};

/**
 * Traduz fase da atividade (`descricao`).
 * Exemplos: "Aprendendo", "Escrevendo", "Atividade 1" → "Activity 1".
 */
export function translateActivityTypeLabel(
  t: TranslateFn,
  descricao: string | null | undefined,
  fallback?: string
): string {
  const raw = (descricao ?? "").trim();
  if (!raw) return fallback ?? "";

  const match = raw.match(/^(.+?)(?:\s+(\d+))?$/u);
  if (!match) return fallback ?? raw;

  const labelPart = match[1].trim();
  const numberPart = match[2];
  const key = ACTIVITY_TYPE_KEYS[labelPart.toLocaleLowerCase("pt-BR")];

  if (!key) return fallback ?? raw;

  const translated = t(key, { ns: "common" });
  return numberPart ? `${translated} ${numberPart}` : translated;
}

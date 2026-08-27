import * as S from "./styles";
import { AltSessionService } from "@/data/models";
import { ChangeEvent } from "react";
import { useFormMedicalRecord } from "./hook";
import { useTranslation } from "react-i18next";
import { resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";
import { translateProntuarioOpcao, translateProntuarioPergunta, translateTipoAtendimento } from "@/lib/i18n/tables/lookup";

function toDateLocale(language: string): string {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "pt-BR";
  if (resolved === "es") return "es-ES";
  return "en-US";
}

function formatSessionDateTime(iso: string, language: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString(toDateLocale(language), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSessionDuration(startIso: string, endIso: string): string {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return "00:00";
  const totalMinutes = Math.floor((end - start) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

interface IFormMedicalRecord {
  session: AltSessionService.IAltSession;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export function FormMedicalRecord({ session, onClose, onSuccess }: IFormMedicalRecord) {
  const { t, i18n } = useTranslation("altSession");
  const props = useFormMedicalRecord({ session, onClose, onSuccess });

  const sessionTypeLabel = translateTipoAtendimento(
    props.session.tipo_sessao,
    i18n.language,
    props.session.tipo_sessao
  );

  if (props.isLoading) {
    return (
      <S.Container>
        <S.SkeletonCard>
          <S.SkeletonLine />
          <S.SkeletonLine />
          <S.SkeletonLine />
        </S.SkeletonCard>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.FormCard>
        <S.Header>
          <S.FormTitle>{t("record_title")}</S.FormTitle>
        </S.Header>

        <S.SessionInfo>
          <S.SessionInfoLine>
            {t("field_patient")}: {props.session.nome_paciente}
          </S.SessionInfoLine>
          <S.SessionInfoLine>
            {t("field_session_type")}: {sessionTypeLabel}
          </S.SessionInfoLine>
          <S.SessionInfoLine>
            {t("field_start")}: {formatSessionDateTime(props.session.data_inicio, i18n.language)} - {t("field_end")}:{" "}
            {formatSessionDateTime(props.session.data_final, i18n.language)} - {t("record_duration")}:{" "}
            {formatSessionDuration(props.session.data_inicio, props.session.data_final)}
          </S.SessionInfoLine>
          <S.SessionInfoLine>
            {t("field_professional")}: {props.session.nome_profissional}
          </S.SessionInfoLine>
        </S.SessionInfo>

        <S.Sections>
          {!props.hasQuestions && <S.EmptyState>{t("record_empty")}</S.EmptyState>}

          {props.questions.map((question) => {
            const answer = props.answersByQuestion[question.id_pergunta];
            const questionType = props.getQuestionType(question);
            const questionLabel = translateProntuarioPergunta(
              question.id_pergunta,
              question.descricao,
              i18n.language
            );

            if (questionType === "input_number") {
              return (
                <S.NumberQuestionCard key={question.id_pergunta}>
                  <S.QuestionLabel htmlFor={`question-${question.id_pergunta}`}>{questionLabel}</S.QuestionLabel>
                  <S.NumberInput
                    id={`question-${question.id_pergunta}`}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={answer?.resposta_texto ?? ""}
                    placeholder={t("placeholder_number_answer")}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      props.handleAnswerText(question.id_pergunta, e.target.value)
                    }
                  />
                </S.NumberQuestionCard>
              );
            }

            return (
              <S.QuestionCard key={question.id_pergunta}>
                <S.QuestionLabel htmlFor={`question-${question.id_pergunta}`}>{questionLabel}</S.QuestionLabel>

                {questionType === "check" ? (
                  <S.OptionsGroup>
                    {question.opcoes.map((option) => (
                      <S.OptionLabel key={option.id_resposta}>
                        <S.OptionInput
                          type="checkbox"
                          checked={(answer?.id_respostas ?? []).includes(option.id_resposta)}
                          onChange={() => props.handleToggleAnswerOption(question.id_pergunta, option.id_resposta)}
                        />
                        {translateProntuarioOpcao(option.id_resposta, option.descricao, i18n.language)}
                      </S.OptionLabel>
                    ))}
                  </S.OptionsGroup>
                ) : questionType === "select" ? (
                  <S.OptionsGroup>
                    {question.opcoes.map((option) => (
                      <S.OptionLabel key={option.id_resposta}>
                        <S.OptionInput
                          type="radio"
                          name={`question-${question.id_pergunta}`}
                          checked={answer?.id_resposta === option.id_resposta}
                          onChange={() => props.handleAnswerOption(question.id_pergunta, option.id_resposta)}
                        />
                        {translateProntuarioOpcao(option.id_resposta, option.descricao, i18n.language)}
                      </S.OptionLabel>
                    ))}
                  </S.OptionsGroup>
                ) : (
                  <S.TextArea
                    id={`question-${question.id_pergunta}`}
                    rows={5}
                    value={answer?.resposta_texto ?? ""}
                    placeholder={t("placeholder_text_answer")}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.handleAnswerText(question.id_pergunta, e.target.value)}
                  />
                )}
              </S.QuestionCard>
            );
          })}
        </S.Sections>

        <S.Footer>
          <S.Button type="button" $variant="secondary" onClick={onClose}>
            {t("button_back")}
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn || !props.hasQuestions}>
            {props.isEditMode ? t("button_update_record") : t("button_save_record")}
          </S.Button>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  );
}

import * as S from "./styles";
import { AltSessionService } from "@/data/models";
import { ChangeEvent } from "react";
import { useFormMedicalRecord } from "./hook";

function formatSessionDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("pt-BR", {
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
  const props = useFormMedicalRecord({ session, onClose, onSuccess });

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
          <S.FormTitle>Prontuário da sessão</S.FormTitle>
        </S.Header>

        <S.SessionInfo>
          <S.SessionInfoLine>Paciente: {props.session.nome_paciente}</S.SessionInfoLine>
          <S.SessionInfoLine>Tipo Sessão: {props.session.tipo_sessao}</S.SessionInfoLine>
          <S.SessionInfoLine>
            Data Início: {formatSessionDateTime(props.session.data_inicio)} - Data Término:{" "}
            {formatSessionDateTime(props.session.data_final)} - Duração:{" "}
            {formatSessionDuration(props.session.data_inicio, props.session.data_final)}
          </S.SessionInfoLine>
          <S.SessionInfoLine>Profissional: {props.session.nome_profissional}</S.SessionInfoLine>
        </S.SessionInfo>

        <S.Sections>
          {!props.hasQuestions && <S.EmptyState>Nenhuma pergunta de prontuário foi encontrada.</S.EmptyState>}

          {props.questions.map((question) => {
            const answer = props.answersByQuestion[question.id_pergunta];
            const questionType = props.getQuestionType(question);

            return (
              <S.QuestionCard key={question.id_pergunta}>
                <S.QuestionLabel htmlFor={`question-${question.id_pergunta}`}>{question.descricao}</S.QuestionLabel>

                {questionType === "check" ? (
                  <S.OptionsGroup>
                    {question.opcoes.map((option) => (
                      <S.OptionLabel key={option.id_resposta}>
                        <S.OptionInput
                          type="checkbox"
                          checked={(answer?.id_respostas ?? []).includes(option.id_resposta)}
                          onChange={() => props.handleToggleAnswerOption(question.id_pergunta, option.id_resposta)}
                        />
                        {option.descricao}
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
                        {option.descricao}
                      </S.OptionLabel>
                    ))}
                  </S.OptionsGroup>
                ) : (
                  <S.TextArea
                    id={`question-${question.id_pergunta}`}
                    rows={5}
                    value={answer?.resposta_texto ?? ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.handleAnswerText(question.id_pergunta, e.target.value)}
                  />
                )}
              </S.QuestionCard>
            );
          })}
        </S.Sections>

        <S.Footer>
          <S.Button type="button" $variant="secondary" onClick={onClose}>
            Voltar
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn || !props.hasQuestions}>
            {props.isEditMode ? "Atualizar prontuário" : "Salvar prontuário"}
          </S.Button>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  );
}

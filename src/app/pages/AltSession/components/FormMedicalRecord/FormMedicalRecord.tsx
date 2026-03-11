import * as S from "./styles";
import { AltSessionService } from "@/data/models";
import { ChangeEvent } from "react";
import { useFormMedicalRecord } from "./hook";

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
          Profissional: {props.session.nome_profissional} | Paciente: {props.session.nome_paciente}
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

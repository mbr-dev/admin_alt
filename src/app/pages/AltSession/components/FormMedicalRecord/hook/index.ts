import { ATLSession } from "@/data/services";
import { AltSessionService } from "@/data/models";
import { useMain, useToast } from "@/data/hooks";
import { useEffect, useMemo, useRef, useState } from "react";

interface IUseFormMedicalRecord {
  session: AltSessionService.IAltSession;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

interface IAnswerValue {
  id_resposta?: number;
  id_respostas?: number[];
  resposta_texto?: string;
}

export function useFormMedicalRecord({ session, onClose, onSuccess }: IUseFormMedicalRecord) {
  const { setLoad } = useMain();
  const { toast } = useToast();
  const { getMedicalRecordQuestions, createMedicalRecordSession, getMedicalRecordSessionBySessionId, updateMedicalRecordSessionBySessionId } =
    ATLSession();

  const [questions, setQuestions] = useState<AltSessionService.IMedicalRecordQuestion[]>([]);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<number, IAnswerValue>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const getMedicalRecordQuestionsRef = useRef(getMedicalRecordQuestions);
  const getMedicalRecordSessionBySessionIdRef = useRef(getMedicalRecordSessionBySessionId);

  useEffect(() => {
    getMedicalRecordQuestionsRef.current = getMedicalRecordQuestions;
    getMedicalRecordSessionBySessionIdRef.current = getMedicalRecordSessionBySessionId;
  }, [getMedicalRecordQuestions, getMedicalRecordSessionBySessionId]);

  const hasQuestions = useMemo(() => questions.length > 0, [questions]);

  const getQuestionType = (question: AltSessionService.IMedicalRecordQuestion) => {
    const normalizedType = (question.tipo ?? "").toLowerCase();
    if (normalizedType.includes("check")) return "check";
    if (normalizedType.includes("select")) return "select";
    return "input";
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const [questionsResponse, medicalRecordSessionResponse] = await Promise.all([
          getMedicalRecordQuestionsRef.current(session.id),
          session.preenchimento_formulario ? getMedicalRecordSessionBySessionIdRef.current(session.id) : Promise.resolve(null),
        ]);

        const loadedQuestions = questionsResponse?.data?.flatMap((item) => item.pergunta ?? []) ?? [];
        setQuestions(loadedQuestions);

        const hasSavedMedicalRecord = Array.isArray(medicalRecordSessionResponse) && medicalRecordSessionResponse.length > 0;
        setIsEditMode(hasSavedMedicalRecord);

        if (!hasSavedMedicalRecord) return;

        const mappedAnswers: Record<number, IAnswerValue> = {};

        for (const question of loadedQuestions) {
          const questionType = getQuestionType(question);
          const answersFromApi = medicalRecordSessionResponse.filter((item) => item.id_pergunta === question.id_pergunta);

          if (answersFromApi.length === 0) continue;

          if (questionType === "check") {
            mappedAnswers[question.id_pergunta] = {
              id_respostas: answersFromApi
                .map((answer) => answer.id_resposta)
                .filter((value): value is number => typeof value === "number"),
            };
            continue;
          }

          if (questionType === "select") {
            mappedAnswers[question.id_pergunta] = { id_resposta: answersFromApi[0]?.id_resposta };
            continue;
          }

          mappedAnswers[question.id_pergunta] = { resposta_texto: answersFromApi[0]?.resposta_texto ?? "" };
        }

        setAnswersByQuestion(mappedAnswers);
      } finally {
        setIsLoading(false);
      }
    };

    void loadQuestions();
  }, [session.id, session.preenchimento_formulario]);

  const handleAnswerOption = (questionId: number, optionId: number) => {
    setAnswersByQuestion((prev) => ({
      ...prev,
      [questionId]: { id_resposta: optionId, id_respostas: undefined, resposta_texto: undefined },
    }));
  };

  const handleToggleAnswerOption = (questionId: number, optionId: number) => {
    setAnswersByQuestion((prev) => {
      const currentIds = prev[questionId]?.id_respostas ?? [];
      const nextIds = currentIds.includes(optionId) ? currentIds.filter((id) => id !== optionId) : [...currentIds, optionId];

      return {
        ...prev,
        [questionId]: { id_respostas: nextIds, id_resposta: undefined, resposta_texto: undefined },
      };
    });
  };

  const handleAnswerText = (questionId: number, text: string) => {
    setAnswersByQuestion((prev) => ({
      ...prev,
      [questionId]: { resposta_texto: text, id_resposta: undefined, id_respostas: undefined },
    }));
  };

  const verifyData = () => {
    if (!hasQuestions) {
      toast({ title: "Prontuário", description: "Nenhuma pergunta disponível para preenchimento.", variant: "destructive" });
      return false;
    }

    for (const question of questions) {
      const answer = answersByQuestion[question.id_pergunta];
      const questionType = getQuestionType(question);

      if (questionType === "check" && (!answer?.id_respostas || answer.id_respostas.length === 0)) {
        toast({ title: "Prontuário", description: "Preencha todas as perguntas obrigatórias.", variant: "destructive" });
        return false;
      }

      if (questionType === "select" && !answer?.id_resposta) {
        toast({ title: "Prontuário", description: "Preencha todas as perguntas obrigatórias.", variant: "destructive" });
        return false;
      }

      if (questionType === "input" && !answer?.resposta_texto?.trim()) {
        toast({ title: "Prontuário", description: "Preencha todas as perguntas obrigatórias.", variant: "destructive" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;

      const payload = questions.flatMap<AltSessionService.ICreateMedicalRecordSessionItem>((question) => {
        const answer = answersByQuestion[question.id_pergunta];
        const questionType = getQuestionType(question);
        const basePayload = {
          id_sessao: session.id,
          id_pergunta: question.id_pergunta,
          status: 1,
        };

        if (questionType === "check") {
          const selectedIds = answer?.id_respostas ?? [];
          return selectedIds.map((optionId) => ({
            ...basePayload,
            id_resposta: optionId,
          }));
        }

        if (questionType === "select") {
          if (typeof answer?.id_resposta !== "number") return [];
          return [{ ...basePayload, id_resposta: answer.id_resposta }];
        }

        return [{ ...basePayload, resposta_texto: answer?.resposta_texto?.trim() ?? "" }];
      });

      const response = isEditMode
        ? await updateMedicalRecordSessionBySessionId(session.id, payload)
        : await createMedicalRecordSession(payload);
      if (!response) return;

      toast({
        title: "Prontuário",
        description: isEditMode ? "Prontuário atualizado com sucesso!" : "Prontuário salvo com sucesso!",
        variant: "successful",
      });
      await onSuccess();
      onClose();
    } finally {
      setDisabledBtn(false);
      setLoad(false);
    }
  };

  return {
    session,
    questions,
    answersByQuestion,
    isLoading,
    disabledBtn,
    isEditMode,
    hasQuestions,
    getQuestionType,
    handleAnswerOption,
    handleToggleAnswerOption,
    handleAnswerText,
    handleSubmit,
  };
}

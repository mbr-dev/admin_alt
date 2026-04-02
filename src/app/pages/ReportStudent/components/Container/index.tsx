import * as S from "./styles";
import { Animations } from "../Animations";
import { Box1Profile } from "../Box1Profile";
import { Box2SessionCharts } from "../Box2SessionCharts";
import { Box3SessionCharts } from "../Box3SessionCharts";
import { Box4SupportLevel } from "../Box4SupportLevel";
import { Box5Behaviors } from "../Box5Behaviors";
import { Box6AttentionEmotion } from "../Box6AttentionEmotion";
import { Box7AltSessions } from "../Box7AltSessions";
import { Student } from "@/data/services";
import { StudentService } from "@/data/models";
import { decryptJS } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Container() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getClinicStudentByUserId } = Student();

  const [loading, setLoading] = useState(true);
  const [studentPayload, setStudentPayload] = useState<StudentService.IClinicStudentDetails | null>(null);
  const [reportUserId, setReportUserId] = useState<number | null>(null);

  const redirectToStudents = useCallback(() => {
    navigate("/students", { replace: true });
  }, [navigate]);

  /** Só o valor do query param dispara nova busca. getClinicStudentByUserId não vai nas deps: useApi recria axios a cada render e o callback muda sempre, gerando loop. */
  const encryptedId = searchParams.get("id");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setStudentPayload(null);
      setReportUserId(null);

      if (!encryptedId?.trim()) {
        redirectToStudents();
        return;
      }

      const decrypted = await decryptJS(encryptedId);
      const idUsuario = Number.parseInt(decrypted, 10);

      if (cancelled) return;
      if (!decrypted || Number.isNaN(idUsuario) || idUsuario <= 0) {
        redirectToStudents();
        return;
      }

      const data = await getClinicStudentByUserId(idUsuario);
      if (cancelled) return;

      if (!data) {
        redirectToStudents();
        return;
      }

      setStudentPayload(data);
      setReportUserId(idUsuario);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getClinicStudentByUserId instável por axios recriado em useApi
  }, [encryptedId, redirectToStudents]);

  return (
    <S.Container>
      <Animations />

      <S.Main>
        <S.ContentArea>
          <S.Title>Relatório do aluno</S.Title>

          {loading ? (
            <S.LoadingBox>Carregando dados do aluno…</S.LoadingBox>
          ) : studentPayload && reportUserId != null ? (
            <>
              <Box1Profile data={studentPayload} />
              <Box2SessionCharts idUsuario={reportUserId} />
              <Box3SessionCharts idUsuario={reportUserId} />
              <Box6AttentionEmotion idUsuario={reportUserId} />
              <Box5Behaviors idUsuario={reportUserId} />
              <Box4SupportLevel idUsuario={reportUserId} />
              <Box7AltSessions idUnidade={studentPayload.usuario.unidade} nomeAluno={studentPayload.aluno.nome} />
            </>
          ) : null}
        </S.ContentArea>
      </S.Main>
    </S.Container>
  );
}

import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { useEffect, useState, type ReactNode } from "react";

type Props = {
  idUsuario: number;
};

const C = {
  engajamento: "#46C080",
  comunicacao: "#51B4DF",
  atencao: "#FDDB20",
  comportamento: "#F07DB0",
  interacoesSociais: "#E14FBE",
  evolucaoGeral: "#FEC04F",
  nivelPrompt: "#0065A4",
} as const;

function ThemeCard({
  accent,
  title,
  children,
}: {
  accent: string;
  title: string;
  children: ReactNode;
}) {
  if (children == null) return null;
  if (typeof children === "string" && !children.trim()) return null;

  return (
    <S.ThemeCard>
      <S.ThemeCardHeader style={{ backgroundColor: accent }}>{title}</S.ThemeCardHeader>
      <S.ThemeCardBody>{children}</S.ThemeCardBody>
    </S.ThemeCard>
  );
}

export function Box8TechnicalIaReport({ idUsuario }: Props) {
  const { getTechnicalIaReport } = ReportUserSession();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<ReportUserSessionService.ITechnicalIaReportResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!idUsuario || idUsuario <= 0) {
        setReport(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setReport(null);

      const data = await getTechnicalIaReport({ id_usuario: idUsuario });

      if (cancelled) return;
      setReport(data);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getTechnicalIaReport instável (useApi)
  }, [idUsuario]);

  if (!idUsuario || idUsuario <= 0) {
    return (
      <S.Box>
        <S.Title>Resumo técnico (IA)</S.Title>
        <S.Body>
          <S.Hint>Identificador de usuário inválido.</S.Hint>
        </S.Body>
      </S.Box>
    );
  }

  if (loading) {
    return (
      <S.Box>
        <S.Title>Resumo técnico (IA)</S.Title>
        <S.Body>
          <S.Loading>Gerando resumo…</S.Loading>
        </S.Body>
      </S.Box>
    );
  }

  if (!report) {
    return (
      <S.Box>
        <S.Title>Resumo técnico (IA)</S.Title>
        <S.Body>
          <S.Hint>Não foi possível carregar o resumo técnico.</S.Hint>
        </S.Body>
      </S.Box>
    );
  }

  const intervencoes = report.intervencoes_eficazes ?? [];
  const dificuldades = report.dificuldades ?? [];

  return (
    <S.Box>
      <S.Title>Resumo técnico (IA)</S.Title>
      <S.Body>
        {/* 1 — Resumo clínico */}
        {report.resumo_clinico ? (
          <section>
            <S.Subtitle>Resumo clínico</S.Subtitle>
            <S.Lead>{report.resumo_clinico}</S.Lead>
          </section>
        ) : null}

        {/* 2 — Engajamento, Comunicação, Atenção */}
        <S.CardGrid3>
          <ThemeCard accent={C.engajamento} title="Engajamento">
            {report.engajamento}
          </ThemeCard>
          <ThemeCard accent={C.comunicacao} title="Comunicação">
            {report.comunicacao}
          </ThemeCard>
          <ThemeCard accent={C.atencao} title="Atenção">
            {report.atencao}
          </ThemeCard>
        </S.CardGrid3>

        {/* 3 — Comportamento, Interações sociais, Evolução geral */}
        <S.CardGrid3>
          <ThemeCard accent={C.comportamento} title="Comportamento">
            {report.comportamento}
          </ThemeCard>
          <ThemeCard accent={C.interacoesSociais} title="Interações sociais">
            {report.interacoes_sociais}
          </ThemeCard>
          <ThemeCard accent={C.evolucaoGeral} title="Evolução geral">
            {report.evolucao_geral}
          </ThemeCard>
        </S.CardGrid3>

        {/* 4 — Intervenções eficazes (verde) e Dificuldades (vermelho) */}
        <S.CardGrid2>
          <S.ThemeCard>
            <S.ThemeCardHeader style={{ backgroundColor: "#46C080" }}>Intervenções eficazes</S.ThemeCardHeader>
            <S.ThemeCardBody>
              {intervencoes.length === 0 ? (
                <span className="text-mbr-gray-50">Nenhuma intervenção listada.</span>
              ) : (
                <S.PillRow>
                  {intervencoes.map((item, i) => (
                    <S.PillGreen key={`${i}-${item}`}>{item}</S.PillGreen>
                  ))}
                </S.PillRow>
              )}
            </S.ThemeCardBody>
          </S.ThemeCard>

          <S.ThemeCard>
            <S.ThemeCardHeader style={{ backgroundColor: "#E53935" }}>Dificuldades</S.ThemeCardHeader>
            <S.ThemeCardBody>
              {dificuldades.length === 0 ? (
                <span className="text-mbr-gray-50">Nenhuma dificuldade listada.</span>
              ) : (
                <S.ListRed>
                  {dificuldades.map((item, i) => (
                    <li key={`${i}-${item}`}>{item}</li>
                  ))}
                </S.ListRed>
              )}
            </S.ThemeCardBody>
          </S.ThemeCard>
        </S.CardGrid2>

        {/* 5 — Observações relevantes (formato anterior) */}
        {report.observacoes_relevantes ? (
          <section>
            <S.Subtitle>Observações relevantes</S.Subtitle>
            <S.Lead>{report.observacoes_relevantes}</S.Lead>
          </section>
        ) : null}
      </S.Body>
    </S.Box>
  );
}

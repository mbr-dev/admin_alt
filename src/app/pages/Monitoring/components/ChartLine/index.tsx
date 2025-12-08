import { useMemo } from "react";
import { useStorage } from "@/data/hooks"
import { ChartCardContainer, ChartLineLegendRow, ChartTitle } from "./styles";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MESES_KEYS = [
  [],
  ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
  ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
];

export interface ChartLineCardProps {
  unidades: any[];
  dataKey?: "total_rodadas" | "total_alunos";
  title?: string;
}

export const ChartLine = ({ unidades, dataKey = "total_rodadas", title }: ChartLineCardProps) => {
  const { getData } = useStorage();

  const topUnidades = useMemo(() => unidades.slice(0, 3), [unidades]);

  const meses = useMemo(() => Array.from(new Set(topUnidades.flatMap(u => u.data_log.map((d: any) => d.mes)))), [topUnidades]);

  const data = useMemo(() => meses.map(mes => {
    const entry: Record<string, number | string> = { mes };
    topUnidades.forEach(u => {
      const found = u.data_log.find((d: any) => d.mes === mes);
      entry[u.nome_unidade] = found ? found[dataKey] : 0;
    });
    return entry;
  }), [meses, topUnidades, dataKey]);

  const formatMes = (mes: string) => {
    // mes: "2025-02" => "Fev"
    const idx = Number(mes.slice(5, 7)) - 1;
    return MESES_KEYS[Number(getData("id_idioma"))][idx] || mes;
  }

  return (
    <ChartCardContainer>
      <ChartTitle>
        {title}
      </ChartTitle>
      <ChartLineLegendRow>
        <Legend
          layout="vertical"
          verticalAlign="top"
          align="left"
          iconType="circle"
          wrapperStyle={{ paddingLeft: 0, position: "relative", left: 0 }}
          payload={topUnidades.map((u, idx) => ({
            value: u.nome_unidade,
            type: "circle",
            color: ["#F7789F", "#207FE6", "#F7B801"][idx],
            id: String(u.id_unidade),
          }))}
        />
      </ChartLineLegendRow>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 32, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="mes" tickFormatter={(mes) => formatMes(mes)} />
          <YAxis />
          <Tooltip />
          {topUnidades.map((u, idx) => (
            <Line
              key={u.id_unidade}
              type="monotone"
              dataKey={u.nome_unidade}
              stroke={["#F7789F", "#207FE6", "#F7B801"][idx]}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCardContainer>
  );
} 
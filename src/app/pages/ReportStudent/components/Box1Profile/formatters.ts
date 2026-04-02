import { StudentService } from "@/data/models";

/** Primeira letra do nome + primeira letra do segundo termo (igual ao card de alunos). */
export function getStudentInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  if (parts.length === 1) return `${first}`.toUpperCase();
  return `${first}${parts[1][0]}`.toUpperCase();
}

export function formatBirthDateDisplay(birthDate: string | null | undefined): string {
  if (!birthDate) return "—";
  const [year, month, day] = birthDate.split("T")[0].split("-");
  if (!year || !month || !day) return "—";
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export function getAgeYears(birthDate: string | null | undefined): number | null {
  if (!birthDate) return null;
  const [ys, ms, ds] = birthDate.split("T")[0].split("-");
  const year = Number(ys);
  const month = Number(ms);
  const day = Number(ds);
  if (!year || !month || !day) return null;

  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age -= 1;
  }
  return age;
}

export function formatBirthWithAge(birthDate: string | null | undefined): string {
  const dateStr = formatBirthDateDisplay(birthDate);
  const age = getAgeYears(birthDate);
  if (dateStr === "—" && age === null) return "—";
  if (age === null) return dateStr;
  return `${dateStr} • ${age} anos`;
}

export function normalizeCidRows(
  cid: StudentService.IClinicCidUsuarioFromApi | undefined
): { sigla: string; descricao: string }[] {
  if (cid === undefined || cid === null) return [];
  if (Array.isArray(cid)) {
    if (cid.length === 0) return [];
    const first = cid[0];
    if (typeof first === "number") {
      return (cid as number[]).map((id) => ({ sigla: String(id), descricao: "" }));
    }
    return (cid as StudentService.IClinicCidUsuarioItem[]).map((item) => ({
      sigla: item.sigla?.trim() || "—",
      descricao: item.descricao?.trim() ?? "",
    }));
  }
  const item = cid as StudentService.IClinicCidUsuarioItem;
  return [{ sigla: item.sigla?.trim() || "—", descricao: item.descricao?.trim() ?? "" }];
}

export function formatCidLine(row: { sigla: string; descricao: string }): string {
  if (!row.descricao) return row.sigla;
  return `${row.sigla} - ${row.descricao}`;
}

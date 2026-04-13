import { AxiosError } from "axios";

/** Extrai texto de `response.data` (NestJS, validação, etc.). */
export function extractApiErrorMessage(data: unknown): string | undefined {
  if (data == null) return undefined;
  if (typeof data === "string" && data.trim()) return data.trim();
  if (typeof data !== "object") return undefined;

  const d = data as Record<string, unknown>;

  const msg = d.message;
  if (typeof msg === "string" && msg.trim()) return msg.trim();
  if (Array.isArray(msg)) {
    const parts = msg.filter((m): m is string => typeof m === "string");
    if (parts.length) return parts.join(" ");
  }

  if (typeof d.error === "string" && d.error.trim()) return d.error.trim();
  if (typeof d.msg === "string" && d.msg.trim()) return d.msg.trim();

  return undefined;
}

export function GetError(error: unknown): string {
  if (error instanceof AxiosError) {
    const fromData = extractApiErrorMessage(error.response?.data);
    if (fromData) return fromData;
    if (error.response?.status === 403) return "Acesso negado.";
    return error.message || "Erro na requisição.";
  }
  if (error instanceof Error) return error.message;
  return String(error ?? "Erro desconhecido.");
}

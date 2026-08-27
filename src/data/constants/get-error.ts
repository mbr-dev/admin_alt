import { AxiosError } from "axios";

export function formatValidationFieldMessage(message: string): string {
  const parts = message.split(".");
  const fieldPart = parts.length > 1 ? parts[1] : parts[0];
  const fieldName = fieldPart.split(" must ")[0]?.trim() ?? fieldPart.trim();
  return fieldName.replace(/_/g, " ");
}

export function formatValidationErrorDescription(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (data && typeof data === "object") {
      const msg = (data as Record<string, unknown>).message;
      if (Array.isArray(msg)) {
        const formatted = [...new Set(
          msg
            .filter((item): item is string => typeof item === "string")
            .map(formatValidationFieldMessage)
        )];

        if (formatted.length) {
          return `Revise o formulário para verificar se existe algum campo faltando ou inválido: ${formatted.join(", ")}.`;
        }
      }
    }
  }

  return GetError(error);
}

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

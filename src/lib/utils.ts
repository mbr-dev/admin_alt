import CryptoJS from "crypto-js";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

const secret_key = "PROJECT-MBR-WEB-PLAY";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//Função que criptografa
export function encryptJS(id: string) {
  return CryptoJS.AES.encrypt(id, secret_key).toString();
}
//Função que decriptografar
export async function decryptJS(encrypted: string) {
  try {
    const decoded = decodeURIComponent(encrypted);
    const bytes = CryptoJS.AES.decrypt(decoded, secret_key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.log("ta caindo no error")
    console.error("Erro ao descriptografar:", error);
    return "";
  }
};
//Formatar segundo em tempo
export function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // Adiciona zero à esquerda quando necessário
  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
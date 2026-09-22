import { useRef, type MouseEvent } from "react";
import * as S from "./styles";
import { IoClose } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslation } from "react-i18next";

interface IQRCodeModal {
  isOpen: boolean;
  classDescription: string;
  code: string;
  onClose: () => void;
}

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9-_]/g, "-");
}

export function QRCodeModal({ isOpen, classDescription, code, onClose }: IQRCodeModal) {
  const { t } = useTranslation("classes");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qrcode-turma-${sanitizeFileName(code)}.png`;
    link.click();
  }

  return (
    <S.Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="class-qrcode-modal-title"
      onClick={onClose}
    >
      <S.Card onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}>
        <S.Header>
          <S.Title id="class-qrcode-modal-title">{t("modal_qrcode_title")}</S.Title>
          <S.CloseButton type="button" aria-label={t("modal_close")} onClick={onClose}>
            <IoClose />
          </S.CloseButton>
        </S.Header>

        <S.ClassName>{classDescription}</S.ClassName>

        <S.QrBox>
          <S.QrFrame>
            <QRCodeCanvas
              ref={canvasRef}
              value={code}
              size={240}
              marginSize={2}
              level="H"
              fgColor="#0065A4"
              bgColor="#FFFFFF"
              title={t("modal_qrcode_title")}
            />
          </S.QrFrame>
          <S.Code>{t("modal_qrcode_code", { code })}</S.Code>
        </S.QrBox>

        <S.DownloadButton type="button" onClick={handleDownload} aria-label={t("modal_qrcode_download")}>
          <FaDownload />
          {t("modal_qrcode_download")}
        </S.DownloadButton>
      </S.Card>
    </S.Overlay>
  );
}

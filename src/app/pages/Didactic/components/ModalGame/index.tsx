
import * as S from "./styles";
import { useDidactic } from "../../hook";
import { Dialog } from "@/components/ui";
import { useEffect, useRef } from "react";
import { useStorage } from "@/data/hooks";
import { ImgSVG } from "@/components/images";

const URL_ALT = import.meta.env.VITE_ALT;

export const ModalGame = () => {
  const { getData } = useStorage();
  const didacticContext = useDidactic();

  const token = getData("token");
  const url = `${URL_ALT}?token=${token}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClose = () => {
    didacticContext.setShowGame(false);
  }

  const onLoad = () => {
    if (iframeRef?.current?.contentWindow) {
      const params = JSON.stringify({
        token: token,
        modulo: didacticContext.selected.id_modulo,
        atividade: didacticContext.selected.id_atividade,
      });
      iframeRef.current.contentWindow.postMessage({ type: "urlParams", params, originCode: token }, url);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "NAVIGATE_TO_DIDACTICS") {
        didacticContext.setShowGame(false);
        window.location.href = `${window.location.origin}/choice-didactic`;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <Dialog.Dialog open={didacticContext.showGame} modal={true}>
      <Dialog.DialogContent className="fixed bg-transparent [&>div+button]:hidden p-0 border-0 w-full h-full max-w-[100dvw] max-h-[100dvh]">
        <div className="w-full h-full relative">
          <S.DidacticFrame
            ref={iframeRef}
            src={url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            sandbox="allow-same-origin allow-scripts allow-modals allow-forms allow-popups"
            allowFullScreen
            onLoad={onLoad}
          />

          <S.ButtonClose onClick={handleClose}>
            <img src={ImgSVG.Close} alt="Botão fechar" />
          </S.ButtonClose>
        </div>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
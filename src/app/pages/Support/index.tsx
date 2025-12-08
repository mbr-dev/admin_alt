import * as S from "./styles";
import { Animations } from "./components";
import { TfiEmail } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa";
import { Page } from "@/components/template";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";

export const Support = () => {
  const { t } = useTranslation("support");

  return (
    <Page>
      <S.Container>
        <Animations />

        <S.Card>
          <S.Infos>
            <h2>{t("suport_t")}</h2>
            <p>{t("contact")}</p>
          </S.Infos>

          <S.Contact>
            <S.Button
              className="hover:text-mbr-red-20 ease-in-out"
              href="mailto:suporte@mbr.net.br?subject=Contato%20via%20site&body=Olá,%20gostaria%20de%20saber%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
            >
              <TfiEmail /> suporte@mbr.net.br
            </S.Button>
            <S.Button
              className="hover:text-mbr-green-20 ease-in-out"
              href="https://wa.me/5515996463919?text=Olá,%20gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> (15) 99646-3919
            </S.Button>
          </S.Contact>
        </S.Card>

        <S.Image>
          <img src={ImgSVG.IrisSupport} alt="Iris" />
        </S.Image>

        <S.Card>
          <S.Infos>
            <h2>{t("suport_tp")}</h2>
            <p>{t("contact")}</p>
          </S.Infos>

          <S.Contact>
            <S.Button
              className="hover:text-mbr-red-20 ease-in-out"
              href="mailto:pedagogico@mbr.net.br?subject=Contato%20via%20site&body=Olá,%20gostaria%20de%20saber%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
            >
              <TfiEmail /> pedagogico@mbr.net.br
            </S.Button>
            <S.Button
              className="hover:text-mbr-green-20 ease-in-out"
              href="https://wa.me/5515965891477?text=Olá,%20gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> (15) 96589-1477
            </S.Button>
          </S.Contact>
        </S.Card>
      </S.Container>
    </Page>
  )
}
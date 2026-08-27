import * as S from "./styles";
import { useHome } from "../../hook";
import { Animations } from "./components";
import { ImgSVG } from "@/components/images";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";

export function Welcome() {
  const homeContext = useHome();
  const { t, i18n } = useTranslation("home");
  const welcomeText = t("welcome", { name: homeContext.name });

  return (
    <S.Container>
      <Animations />

      <S.Main>
        <S.Div>
          {homeContext.name !== "" && (
            <TypeAnimation
              key={`${i18n.language}-${homeContext.name}`}
              sequence={[welcomeText, 1000]}
              wrapper="span"
              speed={50}
              style={{ fontWeight: "bold", display: "inline-block" }}
              repeat={Infinity}
            />
          )}
        </S.Div>

        <S.Kid>
          <img src={ImgSVG.Kid} alt="" />
        </S.Kid>
      </S.Main>
    </S.Container>
  );
}

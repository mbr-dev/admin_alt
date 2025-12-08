import * as S from "./styles";
import { cn } from "@/lib/utils";
import { useApi } from "@/data/hooks";
import { useProfile } from "../../hook";
import { useTranslation } from "react-i18next";
import { Dialog, Carousel } from "@/components/ui";

export const ModalEditAvatar = () => {
  const { URL_FILES } = useApi();
  const profileContext = useProfile();
  const { t } = useTranslation("profile");

  return (
    <Dialog.Dialog open={profileContext.showAvatars} onOpenChange={profileContext.setShowAvatars}>
      <Dialog.DialogContent className="max-w-[300px] landscape:max-w-[500px] md:max-w-[600px] landscape:lg:max-w-[800px] rounded-xl border-2 border-mbr-blue-10 overflow-hidden">
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className="text-mbr-blue-10 text-center md:text-3xl">{t("editAvatar")}</Dialog.DialogTitle>
        </Dialog.DialogHeader>

        <S.Main>
          <Carousel.Carousel className="max-w-[300px] landscape:max-w-[500px] md:max-w-[600px] landscape:lg:max-w-[800px]" opts={{ loop: false }}>
            <Carousel.CarouselContent className="pl-7">
              {profileContext?.allAvatars.length > 0 && profileContext.allAvatars.map((item, index) => {
                return item.id < 14 && (
                  <Carousel.CarouselItem key={index} className="basis-1/3 landscape:basis-1/5 md:basis-1/4">
                    <S.AvatarIMG
                      onClick={() => profileContext.handleGetAvatar(item.id, item.link)}
                      className={cn(profileContext.tempAvatar === item.id && "border-mbr-blue-10")}
                    >
                      <img src={`${URL_FILES}images/avatar/${item.link}.png`} alt="Conquistas" />
                    </S.AvatarIMG>
                  </Carousel.CarouselItem>
                )
              })}
            </Carousel.CarouselContent>
          </Carousel.Carousel>

          <S.Button onClick={profileContext.handleSaveAvatar}>{t("save")}</S.Button>
        </S.Main>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
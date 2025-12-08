import * as S from "./styles";
import { useApi } from "@/data/hooks";
import { useProfile } from "../../hook";
import { Carousel } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

export const InfosTeacher = () => {
  const { URL_FILES } = useApi();
  const { t } = useTranslation("profile");
  const profileContext = useProfile();

  return (
    <S.Container>
      <S.Main>
        <S.Div>
          <S.DivInside>
            <h3>{t("name")}</h3>
            <p>{profileContext.userData?.nome}</p>
          </S.DivInside>
          <S.DivInside>
            <h3>{t("email")}</h3>
            <p>{profileContext.userData?.email}</p>
          </S.DivInside>
        </S.Div>
    
        <S.Div>
          <S.DivInside>
            <h3>{t("unit")}</h3>
  
            <S.Dropdown>
              {profileContext.userData?.unidades && profileContext.userData?.unidades.length > 1 ?
                <S.ButtonDropdown onClick={() => profileContext.handleDropdown(0)}>
                  <p title={profileContext?.userData?.unidades[0].descricao}>{profileContext?.userData?.unidades[0].descricao}</p>
                  {profileContext.dropDown === 0 ? <FaChevronUp /> : <FaChevronDown />}
                </S.ButtonDropdown>
                :
                <p title={profileContext?.userData?.unidades[0].descricao}>{profileContext?.userData?.unidades[0].descricao}</p>
              }
              {profileContext.dropDown === 0 &&
                <S.DropdownItem>
                  {profileContext?.userData?.unidades && profileContext?.userData?.unidades.map((item, index) => {
                    return index > 0 && (
                      <p key={index} title={item.descricao}>{item.descricao}</p>
                    )
                  })}
                </S.DropdownItem>
              }
            </S.Dropdown>
          </S.DivInside>

          <S.DivInside>
            <h3>{t("class")}</h3>

            <S.Dropdown>
              {profileContext.userData?.turmas && profileContext.userData?.turmas.length > 1 ?
                <S.ButtonDropdown onClick={() => profileContext.handleDropdown(0)}>
                  <p title={profileContext?.userData?.turmas[0].descricao}>{profileContext?.userData?.turmas[0].descricao}</p>
                  {profileContext.dropDown === 0 ? <FaChevronUp /> : <FaChevronDown />}
                </S.ButtonDropdown>
                :
                <p title={profileContext?.userData?.turmas && profileContext?.userData?.turmas[0].descricao}>{profileContext?.userData?.turmas && profileContext?.userData?.turmas[0].descricao}</p>
              }
              {profileContext.dropDown === 0 &&
                <S.DropdownItem>
                  {profileContext?.userData?.turmas && profileContext?.userData?.turmas.map((item, index) => {
                    return index > 0 && (
                      <p key={index} title={item.descricao}>{item.descricao}</p>
                    )
                  })}
                </S.DropdownItem>
              }
            </S.Dropdown>
          </S.DivInside>
        </S.Div>

        <S.DivInsideFull>
          <h3>{t("myConquest")}</h3>

          <Carousel.Carousel>
            <Carousel.CarouselContent>
              {profileContext?.achievements && profileContext.achievements.conquistas.map((item, index) => {
                return item.feito === 1 &&
                  <Carousel.CarouselItem key={index} className="basis-1/5 md:basis-1/4 landscape:lg:basis-1/5 landscape:xl:basis-1/6">
                    <S.AchievementIMG title={item.label}>
                      <img src={`${URL_FILES}${item.icone}`} alt="Conquistas" />
                    </S.AchievementIMG>
                  </Carousel.CarouselItem>
              })}
            </Carousel.CarouselContent>
          </Carousel.Carousel>
        </S.DivInsideFull>
  
        <S.DivInsideFull>
          <h3>{t("totalConquest")}</h3>

          <S.Grafico>
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={profileContext.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {profileContext.data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={profileContext.COLORS[index % profileContext.COLORS.length]} />
                  ))}

                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {profileContext?.achievements?.total_feito}/{profileContext?.achievements?.total_conquistas}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              {t("conquests")}
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </S.Grafico>
        </S.DivInsideFull>

        <S.DivInsideFull>
          <h3>{t("allConquest")}</h3>
          <Carousel.Carousel>
            <Carousel.CarouselContent>
              {profileContext?.achievements && profileContext.achievements.conquistas.map((item, index) => (
                <Carousel.CarouselItem key={index} className="basis-1/5 md:basis-1/4 landscape:lg:basis-1/5 landscape:xl:basis-1/6">
                  <S.AchievementIMG title={item.label}>
                    <img src={`${URL_FILES}${item.icone}`} alt="Conquistas" />
                  </S.AchievementIMG>
                </Carousel.CarouselItem>
              ))}
            </Carousel.CarouselContent>
          </Carousel.Carousel>
        </S.DivInsideFull>
      </S.Main>
    </S.Container>
  )
}
import { useApi } from "@/data/hooks";
import { useProfile } from "../../hook";
import { Carousel } from "@/components/ui";
import * as SIT from "../InfosTeacher/styles";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

export const InfosStudent = () => {
  const { URL_FILES } = useApi();
  const { t } = useTranslation("profile");
  const profileContext = useProfile();

  return (
    <SIT.Container>
      <SIT.Main>
        <SIT.Div>
          <SIT.DivInside>
            <h3>{t("name")}</h3>
            <p>{profileContext.userData?.nome}</p>
          </SIT.DivInside>
          <SIT.DivInside>
            <h3>{t("email")}</h3>
            <p>{profileContext.userData?.email}</p>
          </SIT.DivInside>
        </SIT.Div>
    
        <SIT.Div>
          <SIT.DivInside>
            <h3>{t("unit")}</h3>
            <p>{profileContext.userData?.unidade}</p>
          </SIT.DivInside>

          <SIT.DivInside>
            <h3>{t("class")}</h3>
            <p>{profileContext.userData?.turma}</p>
          </SIT.DivInside>
        </SIT.Div>

        <SIT.DivInsideFull>
          <h3>{t("myConquest")}</h3>

          <Carousel.Carousel>
            <Carousel.CarouselContent>
              {profileContext?.achievements && profileContext.achievements.conquistas.map((item, index) => {
                return item.feito === 1 &&
                  <Carousel.CarouselItem key={index} className="basis-1/5 md:basis-1/4 landscape:lg:basis-1/5 landscape:xl:basis-1/6">
                    <SIT.AchievementIMG title={item.label}>
                      <img src={`${URL_FILES}${item.icone}`} alt="Conquistas" />
                    </SIT.AchievementIMG>
                  </Carousel.CarouselItem>
              })}
            </Carousel.CarouselContent>
          </Carousel.Carousel>
        </SIT.DivInsideFull>
  
        <SIT.DivInsideFull>
          <h3>{t("totalConquest")}</h3>

          <SIT.Grafico>
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
          </SIT.Grafico>
        </SIT.DivInsideFull>

        <SIT.DivInsideFull>
          <h3>{t("allConquest")}</h3>
          <Carousel.Carousel>
            <Carousel.CarouselContent>
              {profileContext?.achievements && profileContext.achievements.conquistas.map((item, index) => (
                <Carousel.CarouselItem key={index} className="basis-1/5 md:basis-1/4 landscape:lg:basis-1/5 landscape:xl:basis-1/6">
                  <SIT.AchievementIMG title={item.label}>
                    <img src={`${URL_FILES}${item.icone}`} alt="Conquistas" />
                  </SIT.AchievementIMG>
                </Carousel.CarouselItem>
              ))}
            </Carousel.CarouselContent>
          </Carousel.Carousel>
        </SIT.DivInsideFull>
      </SIT.Main>
    </SIT.Container>
  )
}
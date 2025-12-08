import * as S from "./styles";
import { format } from "date-fns";
import { useEvents } from "./hook";
import { useStorage  } from "@/data/hooks";
import { useHome } from "../../../../hook";
import { UserRole } from "@/data/constants/user-roles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const Events = () => {
  const homeContext = useHome();
  const hook = useEvents();
  const { getData } = useStorage();

  return (
    <S.Container>
      <S.Main>
        {homeContext?.events && homeContext?.events.map((item) => (
          <S.Card key={item.id} onClick={() => hook.handleDropdown(item.id)}>
            <S.CardInfo>
              {Number(getData("hierarquia")) === UserRole.SECRETARY ?
                <S.Title className="text-mbr-blue-10">{format(new Date(item.data_inicio), "dd/MM")}</S.Title>
                :
                <S.Title className="text-mbr-blue-10">{format(new Date(item.data_hora), "dd/MM HH:mm")}</S.Title>}
              <S.Title title={item.titulo} className="flex-1 truncate">- {item.titulo}</S.Title>
              {(hook.dropDown === item.id) ? <FaChevronUp /> : <FaChevronDown />}
            </S.CardInfo>

            {hook.dropDown && hook.dropDown === item.id && 
              <S.Dropdown>
                <p>{item.descricao}</p>
              </S.Dropdown>
            }
          </S.Card>
        ))}
      </S.Main>
    </S.Container>
  )
}
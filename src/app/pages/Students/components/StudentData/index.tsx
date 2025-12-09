import * as S from "./styles";
import { useApi } from "@/data/hooks";
import { FaEye } from "react-icons/fa";
import { useStudents } from "../../hook";
import { StudentService } from "@/data/models";

type Props = {
  data: StudentService.IStudent;
}

export function StudentData({ data }: Props) {
  const { URL_FILES } = useApi();
  const studentsContext = useStudents();

  return (
    <S.Container>
      <S.UserIcon className="top-1" onClick={() => studentsContext.handleShowData(true, data)}>
        <FaEye />
      </S.UserIcon>

      <S.Avatar>
        <img
          src={`${URL_FILES}images/avatar/${data?.link}.png`}
          alt="Avatar"
          width={76}
          height={76}
          className="rounded-full object-cover"
        />
      </S.Avatar>
      <S.Name>{data?.nome}</S.Name>
      <S.Unit>{data?.descricao}</S.Unit>
    </S.Container>
  );
}
